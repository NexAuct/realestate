# Malaysian Real Estate Platform Frontend

This is the frontend application for the Malaysian Real Estate Blockchain Platform, providing a modern and user-friendly interface for property transactions powered by blockchain technology and a Multi-Agent System.

## Features

- **Bilingual Interface**
  - Full support for Bahasa Melayu and English
  - Localized content and formatting

- **Property Management**
  - Property listing and search functionality
  - Advanced filtering and sorting options
  - Interactive property maps and galleries
  - Virtual property tours

- **Transaction Dashboard**
  - Real-time transaction status tracking
  - Document verification interface
  - Smart contract interaction
  - Payment processing integration (DuitNow, FPX)

- **Agent Interaction**
  - Communication with autonomous agents
  - Automated negotiation interface
  - Document submission and verification
  - Progress tracking

## Technology Stack

- **Core**
  - React 19
  - TypeScript
  - Material-UI (MUI) v7
  - React Router v7

- **State Management**
  - Redux Toolkit

- **API Integration**
  - Axios for REST API calls
  - Web3.js for blockchain interaction

- **Testing**
  - Jest
  - React Testing Library

## Current Project Structure

```
src/
├── App.tsx         # Main application component
├── App.css         # Application styles
├── index.tsx       # Application entry point
├── index.css       # Global styles
└── setupTests.ts   # Test configuration

Note: The project structure will be expanded as we implement features for:
- Components (UI components)
- Pages (Route-level components)
- Features (Feature-specific logic)
- Services (API/blockchain integration)
- Store (Redux state management)
- Utils (Helper functions)
- Types (TypeScript definitions)
- Locales (i18n support)
```

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- MetaMask or similar Web3 wallet for blockchain interactions

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-username/real-estate-blockchain-mas-malaysia.git
   cd real-estate-blockchain-mas-malaysia/frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

### Available Scripts

- **Development Server**
  ```bash
  npm start
  ```
  Runs the app in development mode at [http://localhost:3000](http://localhost:3000)

- **Production Build**
  ```bash
  npm run build
  ```
  Builds the app for production to the `build` folder

- **Run Tests**
  ```bash
  npm test
  ```
  Launches the test runner in interactive watch mode

- **Code Analysis**
  ```bash
  npm run lint
  ```
  Runs ESLint to check code quality

## Development Guidelines

### Code Style

- Follow TypeScript best practices
- Use functional components with hooks
- Implement proper error handling
- Write unit tests for components
- Use Material-UI theming system
- Follow atomic design principles

### Blockchain Integration

- Use Web3.js for smart contract interactions
- Implement proper error handling for transaction failures
- Support multiple networks (testnet/mainnet)
- Handle wallet connection states

### Internationalization

- Use React-Intl for translations
- Support both Bahasa Melayu and English
- Follow Malaysian date and currency formats
- Implement right-to-left (RTL) support where needed

## Integration Points

### Backend API

- RESTful API endpoints at `/api/v1`
- WebSocket connections for real-time updates
- Authentication via JWT tokens

### Blockchain

- Smart contract interactions
- Transaction signing and verification
- Property token management
- Payment processing

### Multi-Agent System

- Agent communication interface
- Real-time negotiation updates
- Document verification status
- Automated process tracking

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Support

For support, email [nexgenauction@gmail.com] or open an issue in the repository.
