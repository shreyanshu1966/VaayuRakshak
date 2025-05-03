import React, { useState, useEffect } from 'react';
import { Menu, X, Shield, AlertTriangle } from 'lucide-react';

const Navbar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Handle scroll event to change navbar style
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white shadow-md py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <Shield className="h-8 w-8 text-primary-500" />
            <span className="font-display font-bold text-xl md:text-2xl text-gray-900">
              VaayuRakshak
            </span>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="#features" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Features
            </a>
            <a href="#dashboard" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Dashboard
            </a>
            <a href="#tracking" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Tracking
            </a>
            <a href="#alerts" className="text-gray-700 hover:text-primary-500 font-medium transition-colors">
              Alerts
            </a>
            <a href="#contact" className="flex items-center space-x-1 bg-primary-500 hover:bg-primary-600 text-white font-medium px-5 py-2 rounded-md transition-colors">
              <span>Request Demo</span>
              <AlertTriangle className="h-4 w-4" />
            </a>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 focus:outline-none"
              aria-label="Toggle menu"
            >
              {isMenuOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pt-4 pb-2 animate-slide-down">
            <a 
              href="#features" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#dashboard" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Dashboard
            </a>
            <a 
              href="#tracking" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Tracking
            </a>
            <a 
              href="#alerts" 
              className="block py-2 text-gray-700 hover:text-primary-500"
              onClick={() => setIsMenuOpen(false)}
            >
              Alerts
            </a>
            <a 
              href="#contact" 
              className="inline-block mt-2 bg-primary-500 hover:bg-primary-600 text-white font-medium px-4 py-2 rounded-md"
              onClick={() => setIsMenuOpen(false)}
            >
              Request Demo
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;