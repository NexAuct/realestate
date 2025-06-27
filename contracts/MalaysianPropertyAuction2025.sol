// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/AccessControl.sol";
import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/security/Pausable.sol";

contract MalaysianPropertyAuction2025 is AccessControl, ReentrancyGuard, Pausable {
    bytes32 public constant AUCTIONEER_ROLE = keccak256("AUCTIONEER_ROLE");
    bytes32 public constant REGULATOR_ROLE = keccak256("REGULATOR_ROLE");
    bytes32 public constant MAS_AGENT_ROLE = keccak256("MAS_AGENT_ROLE");

    struct Property {
        string titleNumber;
        string location;
        uint256 reservePrice;
        uint256 currentBid;
        address currentBidder;
        uint256 endTime;
        bool ended;
        PropertyType propertyType;
        LandTitleType landTitleType;
        bool isRizabMelayu;
        bool isDistressed;
        string eTanahRef;
        string metadata; // JSON: {en: {}, bm: {}}
    }

    struct Bidder {
        bool kycVerified;
        KYCLevel kycLevel;
        uint256 preApprovedAmount;
        string icNumber;
        bool amlCleared;
        uint256 riskScore;
        bool isRizabMelayuEligible;
    }

    struct AuctionResult {
        uint256 finalPrice;
        address winner;
        uint256 rpgtAmount;
        uint256 stampDuty;
        bool titleTransferred;
        bool rpgtPaid;
        string eConsentRef;
        string eStampRef;
    }

    enum PropertyType { RESIDENTIAL, COMMERCIAL, INDUSTRIAL, AGRICULTURAL }
    enum LandTitleType { GERAN, HAKMILIK_SEMENTARA, PAJAKAN, RIZAB_MELAYU }
    enum KYCLevel { BASIC, ENHANCED, PREMIUM }

    mapping(string => Property) public properties;
    mapping(address => Bidder) public bidders;
    mapping(string => AuctionResult) public auctionResults;
    mapping(string => uint256[]) public bidHistory;
    mapping(string => address[]) public auctionBidders;

    // RPGT rates (basis points: 100 = 1%)
    uint256 public constant RPGT_CITIZEN_YEAR1 = 3000; // 30%
    uint256 public constant RPGT_CITIZEN_YEAR2 = 2000; // 20%
    uint256 public constant RPGT_CITIZEN_YEAR3 = 1500; // 15%
    uint256 public constant RPGT_CITIZEN_YEAR4 = 1000; // 10%
    uint256 public constant RPGT_CITIZEN_YEAR5 = 500;  // 5%
    uint256 public constant RPGT_DISTRESSED_EXEMPTION = 0; // 0% for distressed properties

    event PropertyRegistered(string indexed propertyId, string titleNumber, uint256 reservePrice);
    event BidPlaced(string indexed propertyId, address indexed bidder, uint256 amount, uint256 timestamp);
    event AuctionEnded(string indexed propertyId, address winner, uint256 finalPrice);
    event KYCVerified(address indexed bidder, KYCLevel level, uint256 timestamp);
    event SuspiciousActivity(string indexed propertyId, address indexed bidder, string reason);
    event TitleTransferInitiated(string indexed propertyId, string eTanahRef, string eConsentRef);
    event RPGTCalculated(string indexed propertyId, uint256 amount, bool exempted);
    event StampDutyCalculated(string indexed propertyId, uint256 amount, string eStampRef);
    event MASAlert(string indexed propertyId, address indexed bidder, uint256 riskScore, string alertType);

    modifier onlyVerifiedBidder() {
        require(bidders[msg.sender].kycVerified, "KYC verification required");
        require(bidders[msg.sender].amlCleared, "AML clearance required");
        _;
    }

    modifier propertyExists(string memory propertyId) {
        require(bytes(properties[propertyId].titleNumber).length > 0, "Property does not exist");
        _;
    }

    constructor() {
        _grantRole(DEFAULT_ADMIN_ROLE, msg.sender);
        _grantRole(AUCTIONEER_ROLE, msg.sender);
        _grantRole(REGULATOR_ROLE, msg.sender);
    }

    function registerProperty(
        string memory propertyId,
        string memory titleNumber,
        string memory location,
        uint256 reservePrice,
        uint256 duration,
        PropertyType propertyType,
        LandTitleType landTitleType,
        bool isRizabMelayu,
        bool isDistressed,
        string memory eTanahRef,
        string memory metadata
    ) external onlyRole(AUCTIONEER_ROLE) {
        require(bytes(properties[propertyId].titleNumber).length == 0, "Property already exists");
        require(reservePrice > 0, "Reserve price must be greater than 0");

        properties[propertyId] = Property({
            titleNumber: titleNumber,
            location: location,
            reservePrice: reservePrice,
            currentBid: 0,
            currentBidder: address(0),
            endTime: block.timestamp + duration,
            ended: false,
            propertyType: propertyType,
            landTitleType: landTitleType,
            isRizabMelayu: isRizabMelayu,
            isDistressed: isDistressed,
            eTanahRef: eTanahRef,
            metadata: metadata
        });

        emit PropertyRegistered(propertyId, titleNumber, reservePrice);
    }

    function registerBidder(
        address bidderAddress,
        string memory icNumber,
        uint256 preApprovedAmount,
        KYCLevel kycLevel,
        bool isRizabMelayuEligible
    ) external onlyRole(AUCTIONEER_ROLE) {
        bidders[bidderAddress] = Bidder({
            kycVerified: true,
            kycLevel: kycLevel,
            preApprovedAmount: preApprovedAmount,
            icNumber: icNumber,
            amlCleared: true,
            riskScore: 0,
            isRizabMelayuEligible: isRizabMelayuEligible
        });

        emit KYCVerified(bidderAddress, kycLevel, block.timestamp);
    }

    function placeBid(string memory propertyId, uint256 bidAmount) 
        external 
        payable
        onlyVerifiedBidder 
        propertyExists(propertyId) 
        nonReentrant 
        whenNotPaused 
    {
        Property storage property = properties[propertyId];
        Bidder storage bidder = bidders[msg.sender];
        
        require(!property.ended, "Auction has ended");
        require(block.timestamp < property.endTime, "Auction time expired");
        require(bidAmount > property.currentBid, "Bid must be higher than current bid");
        require(bidAmount >= property.reservePrice, "Bid must meet reserve price");
        require(bidAmount <= bidder.preApprovedAmount, "Bid exceeds pre-approved amount");
        require(msg.value >= bidAmount, "Insufficient payment");

        // Rizab Melayu eligibility check
        if (property.isRizabMelayu) {
            require(bidder.isRizabMelayuEligible, "Not eligible for Rizab Melayu property");
        }

        // MAS risk assessment
        uint256 riskScore = calculateRiskScore(propertyId, msg.sender, bidAmount);
        if (riskScore > 70) {
            emit SuspiciousActivity(propertyId, msg.sender, "High risk score detected");
            emit MASAlert(propertyId, msg.sender, riskScore, "HIGH_RISK_BID");
        }

        // Refund previous bidder
        if (property.currentBidder != address(0)) {
            payable(property.currentBidder).transfer(property.currentBid);
        }

        property.currentBid = bidAmount;
        property.currentBidder = msg.sender;
        
        auctionBidders[propertyId].push(msg.sender);
        bidHistory[propertyId].push(bidAmount);

        // Refund excess payment
        if (msg.value > bidAmount) {
            payable(msg.sender).transfer(msg.value - bidAmount);
        }

        emit BidPlaced(propertyId, msg.sender, bidAmount, block.timestamp);
    }

    function endAuction(string memory propertyId) 
        external 
        onlyRole(AUCTIONEER_ROLE) 
        propertyExists(propertyId) 
    {
        Property storage property = properties[propertyId];
        require(!property.ended, "Auction already ended");
        require(block.timestamp >= property.endTime, "Auction still active");

        property.ended = true;

        if (property.currentBidder != address(0)) {
            // Calculate RPGT
            uint256 rpgtAmount = calculateRPGT(propertyId, property.currentBid);
            
            // Calculate stamp duty
            uint256 stampDuty = calculateStampDuty(property.currentBid);
            
            auctionResults[propertyId] = AuctionResult({
                finalPrice: property.currentBid,
                winner: property.currentBidder,
                rpgtAmount: rpgtAmount,
                stampDuty: stampDuty,
                titleTransferred: false,
                rpgtPaid: false,
                eConsentRef: "",
                eStampRef: ""
            });

            emit AuctionEnded(propertyId, property.currentBidder, property.currentBid);
            emit RPGTCalculated(propertyId, rpgtAmount, property.isDistressed);
            emit StampDutyCalculated(propertyId, stampDuty, "");
        } else {
            emit AuctionEnded(propertyId, address(0), 0);
        }
    }

    function initiateTitleTransfer(
        string memory propertyId,
        string memory eConsentRef,
        string memory eStampRef
    ) external onlyRole(AUCTIONEER_ROLE) propertyExists(propertyId) {
        Property storage property = properties[propertyId];
        AuctionResult storage result = auctionResults[propertyId];
        
        require(property.ended, "Auction not ended");
        require(result.winner != address(0), "No winner");
        require(!result.titleTransferred, "Title already transferred");

        result.eConsentRef = eConsentRef;
        result.eStampRef = eStampRef;
        result.titleTransferred = true;

        emit TitleTransferInitiated(propertyId, property.eTanahRef, eConsentRef);
    }

    function payRPGT(string memory propertyId) 
        external 
        payable 
        propertyExists(propertyId) 
    {
        AuctionResult storage result = auctionResults[propertyId];
        require(result.winner == msg.sender, "Only winner can pay RPGT");
        require(!result.rpgtPaid, "RPGT already paid");
        require(msg.value >= result.rpgtAmount, "Insufficient RPGT payment");

        result.rpgtPaid = true;

        // Refund excess payment
        if (msg.value > result.rpgtAmount) {
            payable(msg.sender).transfer(msg.value - result.rpgtAmount);
        }
    }

    function calculateRPGT(string memory propertyId, uint256 salePrice) 
        internal 
        view 
        returns (uint256) 
    {
        Property storage property = properties[propertyId];
        
        // Distressed property exemption
        if (property.isDistressed) {
            return 0;
        }

        // Simplified RPGT calculation (assumes 1-year holding period)
        // In production, this would integrate with LHDN API
        return (salePrice * RPGT_CITIZEN_YEAR1) / 10000;
    }

    function calculateStampDuty(uint256 salePrice) internal pure returns (uint256) {
        // Malaysian stamp duty rates 2025
        if (salePrice <= 100000) {
            return (salePrice * 100) / 10000; // 1%
        } else if (salePrice <= 500000) {
            return 1000 + ((salePrice - 100000) * 200) / 10000; // 2%
        } else if (salePrice <= 1000000) {
            return 9000 + ((salePrice - 500000) * 300) / 10000; // 3%
        } else {
            return 24000 + ((salePrice - 1000000) * 400) / 10000; // 4%
        }
    }

    function calculateRiskScore(
        string memory propertyId,
        address bidder,
        uint256 bidAmount
    ) internal view returns (uint256) {
        Bidder storage bidderInfo = bidders[bidder];
        Property storage property = properties[propertyId];
        
        uint256 riskScore = 0;
        
        // High bid amount relative to reserve
        if (bidAmount > property.reservePrice * 150 / 100) {
            riskScore += 30;
        }
        
        // New bidder with high amount
        if (bidderInfo.kycLevel == KYCLevel.BASIC && bidAmount > 500000) {
            riskScore += 25;
        }
        
        // Rapid bidding pattern (simplified)
        if (bidHistory[propertyId].length > 5) {
            riskScore += 20;
        }
        
        return riskScore;
    }

    function reportSuspiciousActivity(
        string memory propertyId,
        address suspiciousBidder,
        string memory reason
    ) external onlyRole(MAS_AGENT_ROLE) {
        emit SuspiciousActivity(propertyId, suspiciousBidder, reason);
    }

    function updateBidderRiskScore(
        address bidder,
        uint256 newRiskScore
    ) external onlyRole(MAS_AGENT_ROLE) {
        bidders[bidder].riskScore = newRiskScore;
        
        if (newRiskScore > 80) {
            bidders[bidder].amlCleared = false;
        }
    }

    function emergencyPause() external onlyRole(REGULATOR_ROLE) {
        _pause();
    }

    function emergencyUnpause() external onlyRole(REGULATOR_ROLE) {
        _unpause();
    }

    function getPropertyDetails(string memory propertyId) 
        external 
        view 
        returns (
            string memory titleNumber,
            string memory location,
            uint256 reservePrice,
            uint256 currentBid,
            address currentBidder,
            uint256 endTime,
            bool ended,
            bool isRizabMelayu
        ) 
    {
        Property storage property = properties[propertyId];
        return (
            property.titleNumber,
            property.location,
            property.reservePrice,
            property.currentBid,
            property.currentBidder,
            property.endTime,
            property.ended,
            property.isRizabMelayu
        );
    }

    function getBidHistory(string memory propertyId) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return bidHistory[propertyId];
    }

    function getAuctionResult(string memory propertyId) 
        external 
        view 
        returns (
            uint256 finalPrice,
            address winner,
            uint256 rpgtAmount,
            uint256 stampDuty,
            bool titleTransferred,
            bool rpgtPaid
        ) 
    {
        AuctionResult storage result = auctionResults[propertyId];
        return (
            result.finalPrice,
            result.winner,
            result.rpgtAmount,
            result.stampDuty,
            result.titleTransferred,
            result.rpgtPaid
        );
    }

    receive() external payable {}
}