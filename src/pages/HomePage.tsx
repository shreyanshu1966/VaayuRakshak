import React from 'react';
import Hero from '../components/home/Hero';
import MonitoringDashboard from '../components/home/MonitoringDashboard';
import LocationMap from '../components/home/LocationMap';
import SOSAlertSystem from '../components/home/SOSAlertSystem';
import WhyVaayuRakshak from '../components/home/WhyVaayuRakshak';
import ContactSection from '../components/home/ContactSection';

const HomePage: React.FC = () => {
  return (
    <div>
      <Hero />
      <MonitoringDashboard />
      <LocationMap />
      <SOSAlertSystem />
      <WhyVaayuRakshak />
      <ContactSection />
    </div>
  );
};

export default HomePage;