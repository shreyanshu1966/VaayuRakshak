// Generate mock gas level data
export const generateGasData = (count: number) => {
  const data = [];
  const now = new Date();
  
  for (let i = count - 1; i >= 0; i--) {
    const time = new Date(now.getTime() - (i * 60 * 60 * 1000)); // Every hour
    
    // Realistic gas reading with some randomness
    let baseValue = 5; // Base safe level
    
    // Add some patterns
    if (time.getHours() > 12 && time.getHours() < 18) {
      baseValue += 3; // Higher during afternoon operation
    }
    
    // Add occasional spikes
    if (Math.random() > 0.85) {
      baseValue += Math.random() * 20; // Random spike
    }
    
    // Add randomness
    const value = baseValue + (Math.random() * 3);
    
    data.push({
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      value,
      timestamp: time
    });
  }
  
  return data;
};

// Generate mock detector locations
export interface Detector {
  id: string;
  name: string;
  lat: number;
  lng: number;
  status: 'normal' | 'alert';
  updatedAt: string;
}

export const generateDetectorLocations = (count: number): Detector[] => {
  const detectors: Detector[] = [];
  
  // Delhi area as base coordinates
  const baseLat = 28.6139;
  const baseLng = 77.2090;
  
  for (let i = 0; i < count; i++) {
    // Random offset within ~5km
    const latOffset = (Math.random() - 0.5) * 0.05;
    const lngOffset = (Math.random() - 0.5) * 0.05;
    
    detectors.push({
      id: `detector-${i + 1}`,
      name: `Detector ${i + 1}`,
      lat: baseLat + latOffset,
      lng: baseLng + lngOffset,
      status: Math.random() > 0.7 ? 'alert' : 'normal',
      updatedAt: new Date().toLocaleTimeString(),
    });
  }
  
  return detectors;
};