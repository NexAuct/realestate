import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PropertiesPage from '../pages/PropertiesPage';
import AgentsPage from '../pages/AgentsPage';
import AboutPage from '../pages/AboutPage';
import BlogPage from '../pages/BlogPage';
import ContactPage from '../pages/ContactPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/contact" element={<ContactPage />} />
    </Routes>
  );
};

export default AppRoutes;
