# Real Estate Blockchain Powered with Multi-Agent System  
**Tailored for the Malaysian Market**

## Overview

This project is a pioneering platform designed specifically for the Malaysian real estate ecosystem, leveraging both blockchain technology and a Multi-Agent System (MAS). By integrating these innovations, the platform addresses common challenges in Malaysia such as title fraud, opaque transactions, manual paperwork, and regulatory complexity. The system ensures transparency, security, and automation for all participants in Malaysian property transactions.

## Features

- **Blockchain Integration (Malaysia Ready)**:  
  - All property records, ownership histories, and transaction data are securely stored on a blockchain, complying with Malaysian property law and regulatory requirements.
  - Smart contracts are customized for local real estate practices, including “S&P” (Sale & Purchase) agreements, stamp duty, and RPGT (Real Property Gains Tax) handling.

- **Multi-Agent System**:  
  - Autonomous agents represent local stakeholders: buyers, sellers, real estate agents, lawyers, land office officials, and government regulators.
  - Agents automate negotiation, document checks, title searches (e.g., via Pejabat Tanah & Galian), and regulatory compliance.

- **Smart Contracts**:  
  - Automate offers, deposits, payments, and transfers, following Malaysian legal norms and banking requirements (integration with DuitNow, FPX, etc.).
  - Support for escrow and conditional release of funds, with KYC/AML checks per BNM (Bank Negara Malaysia) guidelines.

- **Decentralized Marketplace**:  
  - Peer-to-peer property listing, search, and transactions, supporting Bahasa Melayu and English interfaces.
  - Integration with JPPH (Jabatan Penilaian dan Perkhidmatan Harta) for valuation and market analytics.

- **Automated Due Diligence**:  
  - Agents perform real-time checks on property status (e.g., caveats, encumbrances), verify land titles, and flag risks.
  - Document validation and digital signing in compliance with Malaysian law.

- **Audit Trail and Compliance**:  
  - Immutable, on-chain records for all actions, ensuring full traceability and auditability for regulators (e.g., LHDN, BNM).

- **Regulatory Modules**:  
  - Built-in logic for RPGT, stamp duties, and cross-checks with land office requirements.

## Architecture

1. **Blockchain Layer**:  
   - Ethereum, Polygon, or a local permissioned chain (e.g., Hyperledger Besu) for Malaysian compliance.
   - Smart contracts in Solidity tailored to Malaysian property workflows.

2. **Agent Layer**:  
   - Agents for each Malaysian transaction stakeholder.
   - FIPA-ACL compliant messaging for agent coordination.

3. **Application Layer**:  
   - Web/mobile interface for Malaysian users (supporting BM & EN).
   - RESTful APIs for integration with banks, government, and property portals.

## Agent Types

- **Buyer Agent**: Searches, negotiates, and verifies properties.
- **Seller Agent**: Lists, negotiates, and tracks transaction progress.
- **Real Estate Agent**: Matches buyers and sellers, ensures compliance.
- **Lawyer Agent**: Reviews legal documents, ensures local law compliance.
- **Land Office Agent**: Simulates interactions with Pejabat Tanah for title transfer.
- **Banking Agent**: Handles payment, loan checks, and compliance with BNM.
- **Regulator Agent**: RPGT, stamp duty, and AML checks.

## Technologies Used

- **Blockchain**: Ethereum/Polygon/Hyperledger, Solidity
- **Multi-Agent Framework**: JADE, SPADE, or custom (Python/Java)
- **Backend**: Node.js / Python
- **Frontend**: React / Angular / Vue (BM & EN support)
- **Database**: IPFS, MongoDB
- **Oracles**: Chainlink, custom for Malaysian data sources

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/real-estate-blockchain-mas-malaysia.git
   cd real-estate-blockchain-mas-malaysia
   ```

2. **Install dependencies**
   ```bash
   # Backend
   cd backend
   npm install

   # Frontend
   cd ../frontend
   npm install
   ```

3. **Configure environment**
   - Set blockchain credentials and Malaysian API keys in `.env`
   - Agent endpoints and integrations (JPPH, Land Office, Bank)

4. **Run the platform**
   ```bash
   # Start blockchain (e.g., Ganache, testnet, or permissioned network)
   # Deploy smart contracts
   # Start backend and agents
   npm start

   # Start frontend
   npm run dev
   ```

## Malaysian Use Cases

- **Property Listing and Search**:  
  List and search properties with full compliance to Malaysian regulations.

- **Automated Offers & Negotiations**:  
  Agents handle negotiations, deposits, and S&P agreements.

- **Secure, Transparent Transactions**:  
  Blockchain-based records, escrow, and payment flows with local banks.

- **Regulatory Compliance**:  
  RPGT, stamp duty, and land office transfers automated and logged.

## Contributing

Pull requests are welcome, especially from those knowledgeable in Malaysian law, real estate, or blockchain. Please open issues for feature suggestions or bug reports.

## License

MIT License

---

**Contact:**  
For demo requests, partnership, or questions, contact [nexgenauction@gmail.com].
