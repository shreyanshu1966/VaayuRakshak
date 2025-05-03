import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import L from 'leaflet';
import { Navigation, LocateFixed, Map as MapIcon, Layers, Plus, Minus } from 'lucide-react';
import { generateDetectorLocations } from '../../utils/mockData';

import 'leaflet/dist/leaflet.css';

// Fix for Leaflet marker icons
// (This is needed because the default marker icons in Leaflet use relative URLs that don't work in React)
const DefaultIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

const LocationMap: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });
  
  const [detectors, setDetectors] = useState(generateDetectorLocations(5));
  const [showAlerts, setShowAlerts] = useState(true);
  const [mapCenter] = useState<[number, number]>([28.6139, 77.2090]); // Delhi, India
  const [zoom, setZoom] = useState(12);

  // Simulate a movement for one detector
  useEffect(() => {
    const interval = setInterval(() => {
      setDetectors(prev => {
        // Update a random detector's position slightly
        const newDetectors = [...prev];
        const randomIndex = Math.floor(Math.random() * newDetectors.length);
        
        newDetectors[randomIndex] = {
          ...newDetectors[randomIndex],
          lat: newDetectors[randomIndex].lat + (Math.random() * 0.002 - 0.001),
          lng: newDetectors[randomIndex].lng + (Math.random() * 0.002 - 0.001),
          updatedAt: new Date().toLocaleTimeString(),
        };
        
        return newDetectors;
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section 
      id="tracking" 
      className="py-20 bg-gray-50 relative"
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
            Location Map Integration
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Track the exact location of gas detectors in real-time. Get precise coordinates for emergency response and monitor multiple detectors from a single dashboard.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Map Controls */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Control Panel */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-gray-700 font-medium mb-4">Map Controls</h3>
              
              <div className="space-y-4">
                <div>
                  <label className="flex items-center mb-2 text-sm text-gray-700">
                    <Layers className="w-4 h-4 mr-2" />
                    Layer Options
                  </label>
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      checked={showAlerts}
                      onChange={() => setShowAlerts(!showAlerts)}
                      className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500"
                    />
                    <label className="ml-2 text-sm text-gray-700">Show Alert Zones</label>
                  </div>
                </div>
                
                <div>
                  <label className="flex items-center mb-2 text-sm text-gray-700">
                    <MapIcon className="w-4 h-4 mr-2" />
                    Zoom Level
                  </label>
                  <div className="flex items-center space-x-2">
                    <button 
                      onClick={() => setZoom(prev => Math.max(prev - 1, 10))}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <div className="flex-1 text-center text-sm">{zoom}</div>
                    <button 
                      onClick={() => setZoom(prev => Math.min(prev + 1, 18))}
                      className="p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-100">
                <button className="w-full py-2 bg-primary-500 hover:bg-primary-600 text-white rounded-md flex justify-center items-center transition-colors">
                  <LocateFixed className="w-4 h-4 mr-2" />
                  Center Map
                </button>
              </div>
            </div>
            
            {/* Detectors List */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <h3 className="text-gray-700 font-medium mb-4">Active Detectors</h3>
              
              <div className="space-y-3 max-h-80 overflow-y-auto">
                {detectors.map((detector, index) => (
                  <motion.div 
                    key={detector.id}
                    className="p-3 rounded-lg hover:bg-gray-50 transition-colors flex items-center"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                  >
                    <div className={`relative flex items-center justify-center w-10 h-10 rounded-full ${detector.status === 'alert' ? 'bg-alert-100' : 'bg-gray-100'} mr-3`}>
                      <LocateFixed className={`w-5 h-5 ${detector.status === 'alert' ? 'text-alert-500' : 'text-primary-500'}`} />
                      {detector.status === 'alert' && (
                        <motion.div 
                          className="absolute inset-0 rounded-full border border-alert-500"
                          animate={{ scale: [1, 1.5, 1], opacity: [1, 0, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        />
                      )}
                    </div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-900">{detector.name}</div>
                      <div className="text-xs text-gray-500">Updated: {detector.updatedAt}</div>
                    </div>
                    {detector.status === 'alert' && (
                      <div className="px-2 py-1 rounded-full bg-alert-500 text-white text-xs font-medium">
                        Alert
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Map */}
          <motion.div 
            className="lg:col-span-3"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-4 border border-gray-100 h-full">
              <div className="relative h-[500px] rounded-lg overflow-hidden">
                <MapContainer 
                  center={mapCenter} 
                  zoom={zoom} 
                  style={{ height: '100%', width: '100%' }}
                  zoomControl={false}
                >
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  
                  {detectors.map(detector => (
                    <React.Fragment key={detector.id}>
                      <Marker 
                        position={[detector.lat, detector.lng]}
                        icon={detector.status === 'alert' 
                          ? new L.Icon({
                              ...DefaultIcon.options,
                              iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png'
                            }) 
                          : DefaultIcon
                        }
                      >
                        <Popup>
                          <div className="p-1">
                            <div className="font-medium">{detector.name}</div>
                            <div className="text-sm text-gray-600">Status: {detector.status === 'alert' ? 'Alert' : 'Normal'}</div>
                            <div className="text-sm text-gray-600">Last updated: {detector.updatedAt}</div>
                            <div className="text-sm">
                              <span className="text-gray-600">Coordinates: </span>
                              <span className="font-medium">{detector.lat.toFixed(4)}, {detector.lng.toFixed(4)}</span>
                            </div>
                          </div>
                        </Popup>
                      </Marker>
                      
                      {showAlerts && detector.status === 'alert' && (
                        <Circle 
                          center={[detector.lat, detector.lng]} 
                          radius={500}
                          pathOptions={{ 
                            color: '#FF6B35',
                            fillColor: '#FF6B35',
                            fillOpacity: 0.2
                          }}
                        />
                      )}
                    </React.Fragment>
                  ))}
                </MapContainer>
                
                {/* Map Legend */}
                <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-md z-[1000]">
                  <div className="text-sm font-medium mb-2">Legend</div>
                  <div className="flex items-center space-x-1 mb-1">
                    <div className="w-3 h-3 rounded-full bg-primary-500"></div>
                    <span className="text-xs">Normal Detector</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <div className="w-3 h-3 rounded-full bg-alert-500"></div>
                    <span className="text-xs">Alert Detector</span>
                  </div>
                </div>
                
                {/* Navigation Controls */}
                <div className="absolute top-4 right-4 z-[1000] space-y-2">
                  <button className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-50 transition-colors">
                    <Navigation className="w-5 h-5 text-gray-700" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default LocationMap;