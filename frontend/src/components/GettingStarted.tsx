import React, { useState } from 'react';
import { Box, Container, Typography, Tabs, Tab, Paper } from '@mui/material';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { containerVariants, slideUp } from '../styles/animations';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const installationSteps = [
  {
    label: 'npm',
    code: `# Clone the repository
git clone https://github.com/your-username/real-estate-blockchain-mas-malaysia.git
cd real-estate-blockchain-mas-malaysia/frontend

# Install dependencies
npm install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
npm start`,
  },
  {
    label: 'yarn',
    code: `# Clone the repository
git clone https://github.com/your-username/real-estate-blockchain-mas-malaysia.git
cd real-estate-blockchain-mas-malaysia/frontend

# Install dependencies
yarn install

# Configure environment variables
cp .env.example .env
# Edit .env with your configuration

# Start development server
yarn start`,
  },
  {
    label: 'Docker',
    code: `# Clone the repository
git clone https://github.com/your-username/real-estate-blockchain-mas-malaysia.git
cd real-estate-blockchain-mas-malaysia

# Build and run with Docker
docker-compose up --build

# The application will be available at http://localhost:3000`,
  },
];

const GettingStarted: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box
      component="section"
      sx={{
        py: 8,
        backgroundColor: 'background.paper',
      }}
    >
      <Container maxWidth="lg">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Typography
            variant="h2"
            align="center"
            sx={{ mb: 6 }}
          >
            Getting Started
          </Typography>

          <motion.div variants={slideUp}>
            <Paper
              elevation={3}
              sx={{
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="installation methods"
                sx={{
                  backgroundColor: 'background.default',
                  '& .MuiTab-root': {
                    fontWeight: 600,
                  },
                }}
              >
                {installationSteps.map((step, index) => (
                  <Tab key={index} label={step.label} />
                ))}
              </Tabs>

              {installationSteps.map((step, index) => (
                <TabPanel key={index} value={value} index={index}>
                  <SyntaxHighlighter
                    language="bash"
                    style={vscDarkPlus}
                    customStyle={{
                      margin: 0,
                      borderRadius: 0,
                      fontSize: '14px',
                    }}
                  >
                    {step.code}
                  </SyntaxHighlighter>
                </TabPanel>
              ))}
            </Paper>
          </motion.div>

          <motion.div variants={slideUp}>
            <Typography
              variant="body1"
              align="center"
              sx={{ mt: 4, color: 'text.secondary' }}
            >
              The application will be available at{' '}
              <Typography
                component="span"
                sx={{
                  fontFamily: 'monospace',
                  backgroundColor: 'background.default',
                  px: 1,
                  py: 0.5,
                  borderRadius: 1,
                }}
              >
                http://localhost:3000
              </Typography>
            </Typography>
          </motion.div>
        </motion.div>
      </Container>
    </Box>
  );
};

export default GettingStarted;
