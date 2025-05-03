import React from 'react';
import { motion } from 'framer-motion';
import { Shield, AlertTriangle, AreaChart, Map } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden pt-20">
      {/* Background Animation */}
      <div className="absolute inset-0 z-0 bg-gray-50">
        <div className="absolute inset-0 opacity-30">
          {Array.from({ length: 15 }).map((_, index) => (
            <motion.div
              key={index}
              className="absolute rounded-full bg-primary-100"
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 100 + 50}px`,
                height: `${Math.random() * 100 + 50}px`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: 'reverse',
              }}
            />
          ))}
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-6 z-10 pt-10 md:pt-0">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Text Content */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold leading-tight text-gray-900 mb-6">
              Real-Time Gas Leak Detection & Instant SOS Alerts
            </h1>
            <p className="text-xl text-gray-700 mb-8 max-w-lg">
              VaayuRakshak's smart gas detection system keeps your environment safe with 24/7 monitoring, precise location tracking, and immediate emergency notifications.
            </p>
            <div className="flex flex-wrap gap-4">
              <a 
                href="#contact" 
                className="bg-primary-500 hover:bg-primary-600 text-white font-medium px-6 py-3 rounded-md transition-colors inline-flex items-center"
              >
                Request Demo
                <Shield className="ml-2 h-5 w-5" />
              </a>
              <a 
                href="#features" 
                className="bg-white hover:bg-gray-100 text-gray-900 border border-gray-300 font-medium px-6 py-3 rounded-md transition-colors"
              >
                How It Works
              </a>
            </div>
          </motion.div>

          {/* Image/Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative bg-white p-4 rounded-2xl shadow-xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-transparent"></div>
              <img 
                src="https://images.pexels.com/photos/3825581/pexels-photo-3825581.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2" 
                alt="VaayuRakshak Smart Gas Detection System" 
                className="w-full h-auto rounded-xl object-cover z-10 relative"
              />
              
              {/* Floating Feature Icons */}
              <motion.div 
                className="absolute top-6 right-6 bg-white p-3 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <AlertTriangle className="h-6 w-6 text-alert-500" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-6 left-6 bg-white p-3 rounded-full shadow-lg"
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 1 }}
              >
                <AreaChart className="h-6 w-6 text-primary-500" />
              </motion.div>
              
              <motion.div 
                className="absolute bottom-6 right-20 bg-white p-3 rounded-full shadow-lg"
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: 2 }}
              >
                <Map className="h-6 w-6 text-success-500" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;