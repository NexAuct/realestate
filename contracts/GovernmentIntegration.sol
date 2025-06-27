// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

contract GovernmentIntegration is Ownable {
    struct ETanahRecord {
        string titleNumber;
        string ownerIC;
        string propertyStatus; // "CLEAR", "ENCUMBERED", "DISPUTED"
        uint256 lastUpdated;
        bool verified;
    }
    
    struct EConsentRecord {
        string propertyId;
        string consentRef;
        address fromOwner;
        address toOwner;
        uint256 salePrice;
        bool approved;
        uint256 approvalDate;
    }
    
    struct EStampRecord {
        string propertyId;
        uint256 stampDuty;
        string stampRef;
        bool paid;
        uint256 paidDate;
    }
    
    struct LHDNRecord {
        string propertyId;
        address taxpayer;
        uint256 rpgtAmount;
        bool paid;
        string returnRef;
        uint256 submissionDate;
    }
    
    mapping(string => ETanahRecord) public eTanahRecords;
    mapping(string => EConsentRecord) public eConsentRecords;
    mapping(string => EStampRecord) public eStampRecords;
    mapping(string => LHDNRecord) public lhdnRecords;
    
    mapping(address => bool) public authorizedGovAgencies;
    
    event ETanahVerified(string indexed titleNumber, string status);
    event EConsentApproved(string indexed propertyId, string consentRef);
    event EStampGenerated(string indexed propertyId, uint256 stampDuty, string stampRef);
    event RPGTSubmitted(string indexed propertyId, address taxpayer, uint256 amount);
    
    modifier onlyGovAgency() {
        require(authorizedGovAgencies[msg.sender], "Not authorized government agency");
        _;
    }
    
    constructor() {
        authorizedGovAgencies[msg.sender] = true;
    }
    
    function authorizeGovAgency(address agency) external onlyOwner {
        authorizedGovAgencies[agency] = true;
    }
    
    // e-Tanah Integration
    function updateETanahRecord(
        string memory titleNumber,
        string memory ownerIC,
        string memory propertyStatus
    ) external onlyGovAgency {
        eTanahRecords[titleNumber] = ETanahRecord({
            titleNumber: titleNumber,
            ownerIC: ownerIC,
            propertyStatus: propertyStatus,
            lastUpdated: block.timestamp,
            verified: true
        });
        
        emit ETanahVerified(titleNumber, propertyStatus);
    }
    
    function verifyTitleStatus(string memory titleNumber) 
        external 
        view 
        returns (bool isValid, string memory status) 
    {
        ETanahRecord storage record = eTanahRecords[titleNumber];
        return (record.verified, record.propertyStatus);
    }
    
    // e-Consent Integration
    function submitEConsent(
        string memory propertyId,
        string memory consentRef,
        address fromOwner,
        address toOwner,
        uint256 salePrice
    ) external onlyGovAgency {
        eConsentRecords[propertyId] = EConsentRecord({
            propertyId: propertyId,
            consentRef: consentRef,
            fromOwner: fromOwner,
            toOwner: toOwner,
            salePrice: salePrice,
            approved: false,
            approvalDate: 0
        });
    }
    
    function approveEConsent(string memory propertyId) external onlyGovAgency {
        EConsentRecord storage record = eConsentRecords[propertyId];
        require(bytes(record.propertyId).length > 0, "Consent record not found");
        
        record.approved = true;
        record.approvalDate = block.timestamp;
        
        emit EConsentApproved(propertyId, record.consentRef);
    }
    
    // e-Stamp Integration
    function generateEStamp(
        string memory propertyId,
        uint256 stampDuty
    ) external onlyGovAgency returns (string memory stampRef) {
        stampRef = string(abi.encodePacked("ESTMP", block.timestamp, propertyId));
        
        eStampRecords[propertyId] = EStampRecord({
            propertyId: propertyId,
            stampDuty: stampDuty,
            stampRef: stampRef,
            paid: false,
            paidDate: 0
        });
        
        emit EStampGenerated(propertyId, stampDuty, stampRef);
        return stampRef;
    }
    
    function payEStamp(string memory propertyId) external payable {
        EStampRecord storage record = eStampRecords[propertyId];
        require(msg.value >= record.stampDuty, "Insufficient stamp duty payment");
        require(!record.paid, "Stamp duty already paid");
        
        record.paid = true;
        record.paidDate = block.timestamp;
        
        // Refund excess payment
        if (msg.value > record.stampDuty) {
            payable(msg.sender).transfer(msg.value - record.stampDuty);
        }
    }
    
    // LHDN RPGT Integration
    function submitRPGTReturn(
        string memory propertyId,
        address taxpayer,
        uint256 rpgtAmount
    ) external onlyGovAgency returns (string memory returnRef) {
        returnRef = string(abi.encodePacked("RPGT", block.timestamp, propertyId));
        
        lhdnRecords[propertyId] = LHDNRecord({
            propertyId: propertyId,
            taxpayer: taxpayer,
            rpgtAmount: rpgtAmount,
            paid: false,
            returnRef: returnRef,
            submissionDate: block.timestamp
        });
        
        emit RPGTSubmitted(propertyId, taxpayer, rpgtAmount);
        return returnRef;
    }
    
    function payRPGT(string memory propertyId) external payable {
        LHDNRecord storage record = lhdnRecords[propertyId];
        require(msg.sender == record.taxpayer, "Only taxpayer can pay RPGT");
        require(msg.value >= record.rpgtAmount, "Insufficient RPGT payment");
        require(!record.paid, "RPGT already paid");
        
        record.paid = true;
        
        // Refund excess payment
        if (msg.value > record.rpgtAmount) {
            payable(msg.sender).transfer(msg.value - record.rpgtAmount);
        }
    }
    
    // Compliance Check Functions
    function isPropertyClearForAuction(string memory titleNumber) 
        external 
        view 
        returns (bool) 
    {
        ETanahRecord storage record = eTanahRecords[titleNumber];
        return record.verified && 
               keccak256(bytes(record.propertyStatus)) == keccak256(bytes("CLEAR"));
    }
    
    function isEConsentApproved(string memory propertyId) 
        external 
        view 
        returns (bool) 
    {
        return eConsentRecords[propertyId].approved;
    }
    
    function isStampDutyPaid(string memory propertyId) 
        external 
        view 
        returns (bool) 
    {
        return eStampRecords[propertyId].paid;
    }
    
    function isRPGTPaid(string memory propertyId) 
        external 
        view 
        returns (bool) 
    {
        return lhdnRecords[propertyId].paid;
    }
    
    // Emergency functions
    function emergencyWithdraw() external onlyOwner {
        payable(owner()).transfer(address(this).balance);
    }
    
    receive() external payable {}
}