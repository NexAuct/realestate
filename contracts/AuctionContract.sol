// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract MalaysianPropertyAuction {
    struct Auction {
        string propertyId;
        string titleNumber;
        address auctioneer;
        uint256 reservePrice;
        uint256 currentBid;
        address currentBidder;
        uint256 endTime;
        bool ended;
        string state;
        string propertyType;
    }

    struct Bidder {
        bool kycVerified;
        bool amlCleared;
        uint256 preApprovedAmount;
        string icNumber;
        bool isRizabMelayuEligible;
    }

    mapping(string => Auction) public auctions;
    mapping(address => Bidder) public bidders;
    mapping(string => uint256[]) public bidHistory;
    
    address public owner;
    
    event AuctionCreated(string indexed auctionId, string titleNumber, uint256 reservePrice);
    event BidPlaced(string indexed auctionId, address indexed bidder, uint256 amount);
    event AuctionEnded(string indexed auctionId, address winner, uint256 finalPrice);
    event TitleTransferInitiated(string indexed auctionId, string titleNumber, address newOwner);
    event RPGTCalculated(string indexed auctionId, uint256 rpgtAmount);

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    modifier onlyVerifiedBidder() {
        require(bidders[msg.sender].kycVerified, "KYC verification required");
        require(bidders[msg.sender].amlCleared, "AML clearance required");
        _;
    }

    constructor() {
        owner = msg.sender;
    }

    function createAuction(
        string memory auctionId,
        string memory propertyId,
        string memory titleNumber,
        uint256 reservePrice,
        uint256 duration,
        string memory state,
        string memory propertyType
    ) external onlyOwner {
        auctions[auctionId] = Auction({
            propertyId: propertyId,
            titleNumber: titleNumber,
            auctioneer: msg.sender,
            reservePrice: reservePrice,
            currentBid: 0,
            currentBidder: address(0),
            endTime: block.timestamp + duration,
            ended: false,
            state: state,
            propertyType: propertyType
        });

        emit AuctionCreated(auctionId, titleNumber, reservePrice);
    }

    function registerBidder(
        address bidderAddress,
        string memory icNumber,
        uint256 preApprovedAmount,
        bool isRizabMelayuEligible
    ) external onlyOwner {
        bidders[bidderAddress] = Bidder({
            kycVerified: true,
            amlCleared: true,
            preApprovedAmount: preApprovedAmount,
            icNumber: icNumber,
            isRizabMelayuEligible: isRizabMelayuEligible
        });
    }

    function placeBid(string memory auctionId, uint256 bidAmount) external onlyVerifiedBidder {
        Auction storage auction = auctions[auctionId];
        
        require(!auction.ended, "Auction has ended");
        require(block.timestamp < auction.endTime, "Auction time expired");
        require(bidAmount > auction.currentBid, "Bid must be higher than current bid");
        require(bidAmount >= auction.reservePrice, "Bid must meet reserve price");

        if (keccak256(bytes(auction.propertyType)) == keccak256(bytes("RIZAB_MELAYU"))) {
            require(bidders[msg.sender].isRizabMelayuEligible, "Not eligible for Rizab Melayu property");
        }

        auction.currentBid = bidAmount;
        auction.currentBidder = msg.sender;
        bidHistory[auctionId].push(bidAmount);

        emit BidPlaced(auctionId, msg.sender, bidAmount);
    }

    function endAuction(string memory auctionId) external onlyOwner {
        Auction storage auction = auctions[auctionId];
        require(!auction.ended, "Auction already ended");

        auction.ended = true;

        if (auction.currentBidder != address(0)) {
            uint256 rpgtAmount = (auction.currentBid * 5) / 100;
            emit RPGTCalculated(auctionId, rpgtAmount);
            emit TitleTransferInitiated(auctionId, auction.titleNumber, auction.currentBidder);
            emit AuctionEnded(auctionId, auction.currentBidder, auction.currentBid);
        }
    }

    function getAuctionDetails(string memory auctionId) external view returns (
        string memory propertyId,
        uint256 reservePrice,
        uint256 currentBid,
        address currentBidder,
        uint256 endTime,
        bool ended
    ) {
        Auction memory auction = auctions[auctionId];
        return (auction.propertyId, auction.reservePrice, auction.currentBid, auction.currentBidder, auction.endTime, auction.ended);
    }
}