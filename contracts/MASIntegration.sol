// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "./MalaysianPropertyAuction2025.sol";

contract MASIntegration {
    MalaysianPropertyAuction2025 public auctionContract;
    
    struct AgentDecision {
        address agent;
        string decision; // "APPROVE", "REJECT", "INVESTIGATE"
        uint256 confidence;
        string reasoning;
        uint256 timestamp;
    }
    
    struct FraudAlert {
        string propertyId;
        address bidder;
        string alertType;
        uint256 severity; // 1-10
        bool resolved;
        string resolution;
    }
    
    mapping(string => AgentDecision[]) public agentDecisions;
    mapping(bytes32 => FraudAlert) public fraudAlerts;
    mapping(address => bool) public authorizedAgents;
    
    event AgentDecisionRecorded(string indexed propertyId, address agent, string decision);
    event FraudAlertGenerated(bytes32 indexed alertId, string propertyId, address bidder);
    event FraudAlertResolved(bytes32 indexed alertId, string resolution);
    event MASRecommendation(string indexed propertyId, string recommendation, uint256 confidence);
    
    modifier onlyAuthorizedAgent() {
        require(authorizedAgents[msg.sender], "Not authorized MAS agent");
        _;
    }
    
    constructor(address _auctionContract) {
        auctionContract = MalaysianPropertyAuction2025(_auctionContract);
        authorizedAgents[msg.sender] = true;
    }
    
    function authorizeAgent(address agent) external {
        require(msg.sender == address(auctionContract), "Only auction contract can authorize");
        authorizedAgents[agent] = true;
    }
    
    function recordAgentDecision(
        string memory propertyId,
        string memory decision,
        uint256 confidence,
        string memory reasoning
    ) external onlyAuthorizedAgent {
        agentDecisions[propertyId].push(AgentDecision({
            agent: msg.sender,
            decision: decision,
            confidence: confidence,
            reasoning: reasoning,
            timestamp: block.timestamp
        }));
        
        emit AgentDecisionRecorded(propertyId, msg.sender, decision);
    }
    
    function generateFraudAlert(
        string memory propertyId,
        address bidder,
        string memory alertType,
        uint256 severity
    ) external onlyAuthorizedAgent returns (bytes32) {
        bytes32 alertId = keccak256(abi.encodePacked(propertyId, bidder, block.timestamp));
        
        fraudAlerts[alertId] = FraudAlert({
            propertyId: propertyId,
            bidder: bidder,
            alertType: alertType,
            severity: severity,
            resolved: false,
            resolution: ""
        });
        
        emit FraudAlertGenerated(alertId, propertyId, bidder);
        
        // Auto-report to auction contract if high severity
        if (severity >= 8) {
            auctionContract.reportSuspiciousActivity(propertyId, bidder, alertType);
        }
        
        return alertId;
    }
    
    function resolveFraudAlert(
        bytes32 alertId,
        string memory resolution
    ) external onlyAuthorizedAgent {
        require(!fraudAlerts[alertId].resolved, "Alert already resolved");
        
        fraudAlerts[alertId].resolved = true;
        fraudAlerts[alertId].resolution = resolution;
        
        emit FraudAlertResolved(alertId, resolution);
    }
    
    function generateMASRecommendation(
        string memory propertyId,
        string memory recommendation,
        uint256 confidence
    ) external onlyAuthorizedAgent {
        emit MASRecommendation(propertyId, recommendation, confidence);
    }
    
    function getAgentDecisions(string memory propertyId) 
        external 
        view 
        returns (AgentDecision[] memory) 
    {
        return agentDecisions[propertyId];
    }
    
    function getFraudAlert(bytes32 alertId) 
        external 
        view 
        returns (
            string memory propertyId,
            address bidder,
            string memory alertType,
            uint256 severity,
            bool resolved,
            string memory resolution
        ) 
    {
        FraudAlert storage alert = fraudAlerts[alertId];
        return (
            alert.propertyId,
            alert.bidder,
            alert.alertType,
            alert.severity,
            alert.resolved,
            alert.resolution
        );
    }
}