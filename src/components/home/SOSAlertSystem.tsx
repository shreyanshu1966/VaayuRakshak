import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { BellRing, MessageSquare, PhoneCall, AlertTriangle, CheckCircle, Shield } from 'lucide-react';

const SOSAlertSystem: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [isTestAlertActive, setIsTestAlertActive] = useState(false);
  const [alertStep, setAlertStep] = useState(0);

  const runTestAlert = () => {
    if (isTestAlertActive) return;
    
    setIsTestAlertActive(true);
    setAlertStep(1);
    
    // Simulate the alert sequence
    const timer1 = setTimeout(() => setAlertStep(2), 1500);
    const timer2 = setTimeout(() => setAlertStep(3), 3000);
    const timer3 = setTimeout(() => {
      setAlertStep(0);
      setIsTestAlertActive(false);
    }, 6000);
    
    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      clearTimeout(timer3);
    };
  };

  return (
    <section 
      id="alerts" 
      className="py-20 bg-white relative"
      ref={ref}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="text-center mb-12">
          <motion.h2 
            className="font-display text-3xl md:text-4xl font-bold mb-4 text-gray-900"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6 }}
          >
            SOS Alert System
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            When gas levels exceed safe thresholds, our system automatically triggers emergency alerts through multiple channels, ensuring rapid response.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Alert Visualization */}
          <motion.div 
            className="order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="relative bg-gray-50 rounded-xl p-8 overflow-hidden">
              {/* Alert animation area */}
              <div className="relative h-96 bg-white rounded-lg shadow-md overflow-hidden">
                {/* Alert center point */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                  <motion.div 
                    className={`relative w-24 h-24 rounded-full flex items-center justify-center ${
                      isTestAlertActive ? 'bg-alert-100' : 'bg-gray-100'
                    }`}
                    animate={isTestAlertActive ? {
                      scale: [1, 1.05, 1],
                    } : {}}
                    transition={{ duration: 0.5, repeat: isTestAlertActive ? Infinity : 0 }}
                  >
                    <AlertTriangle 
                      className={`w-12 h-12 ${isTestAlertActive ? 'text-alert-500' : 'text-gray-400'}`} 
                    />
                    
                    {isTestAlertActive && (
                      <motion.div 
                        className="absolute inset-0 rounded-full border-2 border-alert-500"
                        animate={{ scale: [1, 1.5, 1.8], opacity: [1, 0.5, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      />
                    )}
                  </motion.div>
                </div>
                
                {/* App notification */}
                <motion.div 
                  className="absolute top-1/4 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 max-w-[200px]"
                  animate={alertStep >= 1 ? {
                    x: [100, 0],
                    opacity: [0, 1],
                  } : { opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start">
                    <div className="bg-alert-100 p-2 rounded-full mr-2">
                      <BellRing className="w-4 h-4 text-alert-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Gas Alert</div>
                      <div className="text-xs text-gray-500">High gas levels detected at Office Zone B.</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* SMS notification */}
                <motion.div 
                  className="absolute top-2/3 left-1/4 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 max-w-[200px]"
                  animate={alertStep >= 2 ? {
                    x: [100, 0],
                    opacity: [0, 1],
                  } : { opacity: 0, x: 100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start">
                    <div className="bg-primary-100 p-2 rounded-full mr-2">
                      <MessageSquare className="w-4 h-4 text-primary-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Emergency SMS</div>
                      <div className="text-xs text-gray-500">ALERT: Gas leak detected at Office Zone B. Evacuate immediately. Location: 28.6139°N, 77.2090°E</div>
                    </div>
                  </div>
                </motion.div>
                
                {/* Call alert */}
                <motion.div 
                  className="absolute top-1/2 right-1/4 transform translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-lg p-3 max-w-[200px]"
                  animate={alertStep >= 3 ? {
                    x: [-100, 0],
                    opacity: [0, 1],
                  } : { opacity: 0, x: -100 }}
                  transition={{ duration: 0.5 }}
                >
                  <div className="flex items-start">
                    <div className="bg-success-100 p-2 rounded-full mr-2">
                      <PhoneCall className="w-4 h-4 text-success-500" />
                    </div>
                    <div>
                      <div className="text-sm font-medium">Auto Call Alert</div>
                      <div className="text-xs text-gray-500">Calling emergency contacts and safety team. Please respond.</div>
                    </div>
                  </div>
                </motion.div>
              </div>
              
              {/* Test Alert Button */}
              <div className="mt-6 text-center">
                <button 
                  onClick={runTestAlert}
                  disabled={isTestAlertActive}
                  className={`px-6 py-3 rounded-lg font-medium transition-colors ${
                    isTestAlertActive 
                      ? 'bg-gray-300 text-gray-600 cursor-not-allowed' 
                      : 'bg-alert-500 hover:bg-alert-600 text-white'
                  }`}
                >
                  {isTestAlertActive ? 'Alert Sequence in Progress...' : 'Test Alert Sequence'}
                </button>
              </div>
            </div>
          </motion.div>

          {/* Alert Features */}
          <motion.div 
            className="order-1 lg:order-2 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="space-y-10">
              {/* Feature 1 */}
              <motion.div 
                className="flex gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <div className="bg-primary-100 p-3 rounded-full h-14 w-14 flex items-center justify-center flex-shrink-0">
                  <BellRing className="h-7 w-7 text-primary-500" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">Instant App Notifications</h3>
                  <p className="text-gray-600">
                    Real-time alerts within the VaayuRakshak app keep you informed of any dangerous gas levels. Notifications include exact location, gas readings, and evacuation instructions.
                  </p>
                </div>
              </motion.div>
              
              {/* Feature 2 */}
              <motion.div 
                className="flex gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <div className="bg-alert-100 p-3 rounded-full h-14 w-14 flex items-center justify-center flex-shrink-0">
                  <MessageSquare className="h-7 w-7 text-alert-500" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">Emergency SMS Alerts</h3>
                  <p className="text-gray-600">
                    Automated SMS messages are sent to designated emergency contacts with precise location data, gas readings, and safety instructions for effective evacuation and response.
                  </p>
                </div>
              </motion.div>
              
              {/* Feature 3 */}
              <motion.div 
                className="flex gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.6 }}
              >
                <div className="bg-success-100 p-3 rounded-full h-14 w-14 flex items-center justify-center flex-shrink-0">
                  <PhoneCall className="h-7 w-7 text-success-500" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">Automatic Emergency Calls</h3>
                  <p className="text-gray-600">
                    When high-risk levels are detected, the system automatically initiates calls to emergency contacts, facility managers, and safety personnel to ensure immediate response.
                  </p>
                </div>
              </motion.div>
              
              {/* Feature 4 */}
              <motion.div 
                className="flex gap-5"
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                <div className="bg-gray-100 p-3 rounded-full h-14 w-14 flex items-center justify-center flex-shrink-0">
                  <Shield className="h-7 w-7 text-gray-700" />
                </div>
                <div>
                  <h3 className="text-xl font-display font-semibold mb-2">Fail-Safe Multi-Channel System</h3>
                  <p className="text-gray-600">
                    Our redundant alert system ensures that critical notifications are delivered through multiple channels, even if one communication method fails.
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SOSAlertSystem;