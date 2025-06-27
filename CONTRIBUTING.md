# Contributing to Real Estate Blockchain + MAS 2025

🇲🇾 **Selamat datang kepada projek Real Estate Blockchain + Multi-Agent System untuk pasaran lelongan hartanah Malaysia 2025!**

🇬🇧 **Welcome to the Real Estate Blockchain + Multi-Agent System project for Malaysia's 2025 auction property market!**

## 🎯 Project Vision

Membangunkan platform blockchain yang komprehensif dengan sistem multi-agent bertenaga AI untuk pasaran lelongan hartanah Malaysia, dengan pematuhan peraturan penuh, sokongan dwibahasa, dan reka bentuk mobile-first.

*Building a comprehensive blockchain platform with AI-powered multi-agent system for Malaysian property auctions, featuring full regulatory compliance, bilingual support, and mobile-first design.*

## 🤝 How to Contribute

### 1. Getting Started
```bash
# Fork the repository
git clone https://github.com/your-username/real-estate-blockchain-mas-2025.git
cd real-estate-blockchain-mas-2025

# Install dependencies
npm run install-all

# Create feature branch
git checkout -b feature/your-feature-name
```

### 2. Development Guidelines

#### 🏛️ Regulatory Compliance
- **MUST** comply with Malaysian regulations (BNM, LHDN, e-Tanah)
- **MUST** include proper KYC/AML checks
- **MUST** support RPGT calculations
- **MUST** integrate with government APIs

#### 🌐 Bilingual Support
- **MUST** support Bahasa Melayu and English
- **MUST** use translation keys, not hardcoded text
- **MUST** test both language versions
- **MUST** follow Malaysian terminology standards

#### 📱 Mobile-First Design
- **MUST** be responsive for mobile devices
- **MUST** work on low-bandwidth connections
- **MUST** support offline functionality where possible
- **MUST** optimize for rural/urban usage patterns

#### 🤖 Multi-Agent System
- **MUST** follow agent architecture patterns
- **MUST** include proper error handling
- **MUST** support AI-powered decision making
- **MUST** maintain agent communication protocols

### 3. Code Standards

#### TypeScript/JavaScript
```typescript
// Use proper typing
interface AuctionProperty {
  id: string;
  titleNumber: string;
  // ... other properties
}

// Use async/await
async function processAuction(auctionId: string): Promise<void> {
  try {
    const result = await auctionService.process(auctionId);
    // Handle success
  } catch (error) {
    // Handle error
    console.error('Auction processing failed:', error);
  }
}
```

#### React Components
```tsx
// Use functional components with hooks
const AuctionComponent: React.FC<Props> = ({ auctionId }) => {
  const { t } = useLanguage();
  
  return (
    <Box>
      <Typography>{t('auction.title')}</Typography>
    </Box>
  );
};
```

#### Smart Contracts
```solidity
// Follow Solidity best practices
contract MalaysianPropertyAuction {
    // Use proper access modifiers
    mapping(string => Auction) private auctions;
    
    // Include proper events
    event AuctionCreated(string indexed auctionId);
    
    // Use modifiers for validation
    modifier onlyVerifiedBidder() {
        require(bidders[msg.sender].kycVerified, "KYC required");
        _;
    }
}
```

### 4. Testing Requirements

#### Unit Tests
```typescript
describe('AuctioneerAgent', () => {
  it('should start auction with valid data', async () => {
    const agent = new AuctioneerAgent();
    const auctionId = await agent.startAuction(validAuctionData);
    expect(auctionId).toBeDefined();
  });
});
```

#### Integration Tests
```typescript
describe('Government API Integration', () => {
  it('should verify title status with e-Tanah', async () => {
    const api = new MalaysianGovAPI2025();
    const status = await api.getTitleStatus('test-title');
    expect(status).toHaveProperty('status');
  });
});
```

### 5. Documentation Standards

#### API Documentation
```typescript
/**
 * Starts a new property auction
 * @param propertyData - Property details for auction
 * @returns Promise<string> - Auction ID
 * @throws {Error} - If property validation fails
 */
async function startAuction(propertyData: AuctionProperty): Promise<string>
```

#### Component Documentation
```tsx
/**
 * Live auction dashboard component
 * Displays real-time bidding information and allows bid placement
 * 
 * @param auctionId - ID of the auction to display
 * @param onBidPlaced - Callback when bid is placed
 */
interface LiveAuctionDashboardProps {
  auctionId: string;
  onBidPlaced?: (bidAmount: number) => void;
}
```

## 🏗️ Project Structure

```
real-estate-blockchain-mas-2025/
├── frontend/                 # React frontend application
│   ├── src/
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/          # Page components
│   │   ├── contexts/       # React contexts
│   │   ├── i18n/          # Internationalization
│   │   └── types/         # TypeScript type definitions
├── backend/                 # Node.js backend API
│   ├── src/
│   │   ├── agents/        # Multi-agent system
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic services
│   │   ├── models/        # Database models
│   │   └── types/         # TypeScript types
├── contracts/              # Smart contracts
├── docs/                   # Documentation
│   ├── api/               # API documentation
│   ├── agents/            # Agent system docs
│   ├── compliance/        # Regulatory compliance
│   └── case-studies/      # Real-world examples
└── tests/                  # Test files
```

## 🎯 Contribution Areas

### 🔥 High Priority
1. **Government API Integration**
   - e-Tanah system integration
   - JPPH valuation API
   - BNM AML/KYC services
   - LHDN RPGT automation

2. **AI Agent Development**
   - Fraud detection algorithms
   - Bidding behavior analysis
   - Compliance monitoring
   - Market valuation agents

3. **Mobile Optimization**
   - React Native app development
   - Offline functionality
   - Performance optimization
   - Rural connectivity support

### 🚀 Medium Priority
1. **Smart Contract Features**
   - Escrow functionality
   - Multi-signature support
   - Automated compliance checks
   - Gas optimization

2. **User Experience**
   - Accessibility improvements
   - Voice commands (Bahasa Melayu)
   - Gesture controls
   - Dark mode support

### 💡 Nice to Have
1. **Advanced Features**
   - AR property viewing
   - Blockchain analytics
   - Predictive pricing
   - Social features

## 🧪 Testing Your Contributions

### Local Testing
```bash
# Run all tests
npm run test-all

# Test specific components
cd frontend && npm test -- --testPathPattern=auction
cd backend && npm test -- --testPathPattern=agents

# Test compliance
npm run test:compliance
```

### Integration Testing
```bash
# Test with government APIs (requires API keys)
npm run test:integration

# Test multi-agent system
npm run test:agents

# Test blockchain integration
npm run test:contracts
```

## 📋 Pull Request Process

### 1. Before Submitting
- [ ] Code follows project standards
- [ ] All tests pass
- [ ] Documentation updated
- [ ] Bilingual support tested
- [ ] Mobile responsiveness verified
- [ ] Compliance requirements met

### 2. PR Template
```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update
- [ ] Compliance update

## Malaysian Compliance
- [ ] BNM regulations considered
- [ ] LHDN requirements met
- [ ] e-Tanah integration tested
- [ ] KYC/AML compliance verified

## Testing
- [ ] Unit tests added/updated
- [ ] Integration tests pass
- [ ] Manual testing completed
- [ ] Both languages tested

## Screenshots (if applicable)
Add screenshots for UI changes
```

### 3. Review Process
1. **Automated Checks**: CI/CD pipeline runs
2. **Code Review**: Maintainer reviews code
3. **Compliance Review**: Regulatory compliance checked
4. **Testing**: Manual testing performed
5. **Approval**: PR approved and merged

## 🏢 Stakeholder Engagement

### Government Agencies
- **Bank Negara Malaysia (BNM)**: AML/KYC compliance
- **Lembaga Hasil Dalam Negeri (LHDN)**: Tax compliance
- **Jabatan Penilaian dan Perkhidmatan Harta (JPPH)**: Property valuation
- **Pejabat Tanah**: Land title management

### Industry Partners
- **REHDA**: Real estate developers
- **Malaysian Institute of Estate Agents**: Property agents
- **Blockchain Malaysia**: Technology standards
- **PropTech Malaysia**: Innovation collaboration

## 📞 Getting Help

### Communication Channels
- **GitHub Issues**: Bug reports and feature requests
- **Telegram**: @RealEstateBlockchainMY
- **Email**: contributors@realestate-blockchain-mas.my
- **Documentation**: [docs.realestate-blockchain-mas.my](https://docs.realestate-blockchain-mas.my)

### Mentorship Program
New contributors can request mentorship from experienced team members:
- **Blockchain Development**: Smart contract guidance
- **Multi-Agent Systems**: AI agent development
- **Malaysian Compliance**: Regulatory requirements
- **Mobile Development**: React Native expertise

## 🎖️ Recognition

### Contributor Levels
- **🌟 Contributor**: First merged PR
- **⭐ Regular Contributor**: 5+ merged PRs
- **🏆 Core Contributor**: 20+ merged PRs + significant features
- **👑 Maintainer**: Ongoing project maintenance

### Hall of Fame
Outstanding contributors will be featured in:
- Project README
- Annual contributor report
- Malaysian PropTech conferences
- Government technology showcases

## 📄 License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

**🇲🇾 Terima kasih kerana menyumbang kepada masa depan digital hartanah Malaysia! 🇲🇾**

**🇬🇧 Thank you for contributing to Malaysia's digital property future! 🇬🇧**