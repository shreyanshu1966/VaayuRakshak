import React from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { CheckCircle, Zap, Map, Bell, Shield, Clock, Wifi, Database } from 'lucide-react';

const WhyVaayuRakshak: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const features = [
    {
      icon: <Zap className="h-6 w-6 text-primary-500" />,
      title: "Real-Time Detection",
      description: "Continuous monitoring with instant alerts when gas levels exceed safe thresholds."
    },
    {
      icon: <Map className="h-6 w-6 text-primary-500" />,
      title: "Precise Location Tracking",
      description: "Know exactly where the leak is occurring with meter-level accuracy."
    },
    {
      icon: <Bell className="h-6 w-6 text-primary-500" />,
      title: "Multi-Channel Alerts",
      description: "Get notified via app, SMS, and automated calls for maximum safety."
    },
    {
      icon: <Shield className="h-6 w-6 text-primary-500" />,
      title: "Industry-Grade Security",
      description: "Enterprise-level encryption and data protection for all your sensor data."
    },
    {
      icon: <Clock className="h-6 w-6 text-primary-500" />,
      title: "24/7 Monitoring",
      description: "Round-the-clock surveillance with no monitoring gaps or downtime."
    },
    {
      icon: <Wifi className="h-6 w-6 text-primary-500" />,
      title: "Wireless Connectivity",
      description: "Seamless integration with Wi-Fi, 4G, and IoT networks for reliable data transmission."
    },
    {
      icon: <CheckCircle className="h-6 w-6 text-primary-500" />,
      title: "Compliance Ready",
      description: "Meets all industry safety standards and regulatory requirements."
    },
    {
      icon: <Database className="h-6 w-6 text-primary-500" />,
      title: "Historical Data Analysis",
      description: "Access past readings and patterns to identify potential issues before they become problems."
    }
  ];

  return (
    <section 
      id="features" 
      className="py-20 bg-gray-50 relative"
      ref={ref}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-16">
          <motion.h2 
            className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            Why VaayuRakshak?
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Our smart gas detection system offers unparalleled safety features and peace of mind for homes, businesses, and industrial facilities.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <motion.div 
              key={index}
              className="bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow p-6 border border-gray-100"
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.5, delay: 0.2 + (index * 0.1) }}
              whileHover={{ y: -5 }}
            >
              <div className="bg-primary-50 w-14 h-14 rounded-full flex items-center justify-center mb-4">
                {feature.icon}
              </div>
              <h3 className="text-xl font-display font-semibold mb-3">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div 
          className="mt-16 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.8 }}
        >
          <a 
            href="#contact" 
            className="inline-flex items-center bg-primary-500 hover:bg-primary-600 text-white font-medium px-8 py-3 rounded-md transition-colors"
          >
            Get Started with VaayuRakshak
            <CheckCircle className="ml-2 h-5 w-5" />
          </a>
          <p className="mt-4 text-gray-500">Join hundreds of businesses already protecting their facilities</p>
        </motion.div>
      </div>
    </section>
  );
};

export default WhyVaayuRakshak;