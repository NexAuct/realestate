import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from '../pages/HomePage';
import PropertiesPage from '../pages/PropertiesPage';
import AgentsPage from '../pages/AgentsPage';
import AboutPage from '../pages/AboutPage';
import BlogPage from '../pages/BlogPage';
import ContactPage from '../pages/ContactPage';
import CMSDashboardPage from '../pages/CMSDashboardPage';
import AuctionsPage from '../pages/AuctionsPage';
import DocsPage from '../pages/DocsPage';
import DemoPage from '../pages/DemoPage';
import MapViewPage from '../pages/MapViewPage';
import PropertyDetailsPage from '../pages/PropertyDetailsPage';
import BlogPostPage from '../pages/BlogPostPage';
import AgentProfilePage from '../pages/AgentProfilePage';
import DashboardPage from '../pages/DashboardPage';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/properties" element={<PropertiesPage />} />
      <Route path="/properties/:id" element={<PropertyDetailsPage />} />
      <Route path="/auctions" element={<AuctionsPage />} />
      <Route path="/agents" element={<AgentsPage />} />
      <Route path="/agents/:id" element={<AgentProfilePage />} />
      <Route path="/about" element={<AboutPage />} />
      <Route path="/blog" element={<BlogPage />} />
      <Route path="/blog/:id" element={<BlogPostPage />} />
      <Route path="/contact" element={<ContactPage />} />
      <Route path="/cms-dashboard" element={<CMSDashboardPage />} />
      <Route path="/docs" element={<DocsPage />} />
      <Route path="/demo" element={<DemoPage />} />
      <Route path="/map-view" element={<MapViewPage />} />
      <Route path="/dashboard" element={<DashboardPage />} />
    </Routes>
  );
};

export default AppRoutes;
