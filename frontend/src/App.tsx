import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './styles/theme';
import { LanguageProvider } from './contexts/LanguageContext';
import Navbar from './components/layout/Navbar';
import AppRoutes from './routes/AppRoutes';
import './App.css';

function App() {
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setIsDark(savedTheme === 'dark');
    } else {
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      setIsDark(prefersDark);
    }
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem('theme', newTheme ? 'dark' : 'light');
  };

  return (
    <LanguageProvider>
      <BrowserRouter>
        <ThemeProvider theme={isDark ? darkTheme : lightTheme}>
          <CssBaseline />
          <Navbar isDark={isDark} toggleTheme={toggleTheme} />
          <AppRoutes />
        </ThemeProvider>
      </BrowserRouter>
    </LanguageProvider>
  );
}

export default App;
