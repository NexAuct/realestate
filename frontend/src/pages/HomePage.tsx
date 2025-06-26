import React from 'react';
import Hero from '../components/Hero';
import FeaturedProperties from '../components/home/FeaturedProperties';
import WhyChooseUs from '../components/home/WhyChooseUs';
import Testimonials from '../components/home/Testimonials';
import CallToAction from '../components/home/CallToAction';
import Footer from '../components/Footer';

const HomePage: React.FC = () => {
  return (
    <>
      <Hero />
      <FeaturedProperties />
      <WhyChooseUs />
      <Testimonials />
      <CallToAction />
      <Footer />
    </>
  );
};

export default HomePage;
