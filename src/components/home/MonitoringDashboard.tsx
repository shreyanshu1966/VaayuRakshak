import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js';
import { Activity, Clock, AlertTriangle, ArrowUpRight, FileText } from 'lucide-react';
import { generateGasData } from '../../utils/mockData';

// Register ChartJS components
ChartJS.register(
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
);

const MonitoringDashboard: React.FC = () => {
  const [ref, inView] = useInView({
    threshold: 0.2,
    triggerOnce: false,
  });

  const [gasData, setGasData] = useState(() => generateGasData(24));
  const [currentReading, setCurrentReading] = useState(0);
  const [currentStatus, setCurrentStatus] = useState('Normal');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      // Update gas data by removing first item and adding a new one
      setGasData(prev => {
        const newData = [...prev.slice(1), generateGasData(1)[0]];
        setCurrentReading(newData[newData.length - 1].value);
        
        // Update status based on latest reading
        if (newData[newData.length - 1].value > 20) {
          setCurrentStatus('Critical');
        } else if (newData[newData.length - 1].value > 10) {
          setCurrentStatus('Warning');
        } else {
          setCurrentStatus('Normal');
        }
        
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Chart data configuration
  const chartData = {
    labels: gasData.map(item => item.time),
    datasets: [
      {
        label: 'Gas Level',
        data: gasData.map(item => item.value),
        fill: true,
        backgroundColor: 'rgba(0, 119, 182, 0.1)',
        borderColor: '#0077B6',
        tension: 0.4,
        pointRadius: 3,
        pointHoverRadius: 6,
      },
    ],
  };

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          callback: function(value: any) {
            return value + ' ppm';
          },
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        padding: 12,
        titleColor: '#fff',
        bodyColor: '#fff',
        titleFont: {
          size: 14,
        },
        bodyFont: {
          size: 14,
        },
        displayColors: false,
        callbacks: {
          label: function(context: any) {
            return `Gas Level: ${context.parsed.y} ppm`;
          },
        },
      },
    },
    interaction: {
      mode: 'index',
      intersect: false,
    },
    elements: {
      point: {
        backgroundColor: '#fff',
        borderColor: '#0077B6',
        borderWidth: 2,
      },
    },
  };

  // Get status color
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Critical':
        return 'bg-alert-500 text-white';
      case 'Warning':
        return 'bg-yellow-500 text-white';
      case 'Normal':
        return 'bg-success-500 text-white';
      default:
        return 'bg-success-500 text-white';
    }
  };

  return (
    <section 
      id="dashboard" 
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
            Real-Time Gas Monitoring Dashboard
          </motion.h2>
          <motion.p 
            className="text-lg text-gray-600 max-w-3xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            Track gas levels in real-time with advanced monitoring technology. Get instant updates and historical data for comprehensive safety analysis.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column - Dashboard Metrics */}
          <motion.div 
            className="lg:col-span-1 space-y-6"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            {/* Current Gas Level Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <h3 className="text-gray-700 font-medium">Current Gas Level</h3>
                <div className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(currentStatus)}`}>
                  {currentStatus}
                </div>
              </div>
              <div className="flex items-end space-x-2 mb-2">
                <span className="text-4xl font-display font-bold text-gray-900">{currentReading.toFixed(1)}</span>
                <span className="text-gray-500 mb-1">ppm</span>
              </div>
              <div className="flex items-center text-sm text-gray-500">
                <Clock className="h-4 w-4 mr-1" />
                <span>Updated just now</span>
              </div>
            </div>

            {/* Recent Log Card */}
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-gray-700 font-medium">Recent Gas Level Logs</h3>
                <button className="text-primary-500 text-sm font-medium flex items-center">
                  View All <ArrowUpRight className="h-4 w-4 ml-1" />
                </button>
              </div>
              <div className="space-y-4">
                {gasData.slice(-5).reverse().map((log, index) => (
                  <motion.div 
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="flex items-center p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className={`w-2 h-10 rounded-full mr-3 ${log.value > 20 ? 'bg-alert-500' : log.value > 10 ? 'bg-yellow-500' : 'bg-success-500'}`}></div>
                    <div className="flex-1">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-gray-900">{log.value.toFixed(1)} ppm</span>
                        <span className="text-xs text-gray-500">{log.time}</span>
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {log.value > 20 ? (
                          <span className="flex items-center text-alert-500">
                            <AlertTriangle className="h-3 w-3 mr-1" /> Critical level detected
                          </span>
                        ) : log.value > 10 ? (
                          <span className="flex items-center text-yellow-500">
                            <Activity className="h-3 w-3 mr-1" /> Elevated level
                          </span>
                        ) : (
                          <span className="flex items-center text-success-500">
                            <Activity className="h-3 w-3 mr-1" /> Normal range
                          </span>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t border-gray-100 flex justify-center">
                <button className="flex items-center text-sm text-gray-600 hover:text-primary-500 transition-colors">
                  <FileText className="h-4 w-4 mr-1" />
                  Download Full Report
                </button>
              </div>
            </div>
          </motion.div>

          {/* Right column - Main Chart */}
          <motion.div 
            className="lg:col-span-2"
            initial={{ opacity: 0, x: 20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: 20 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="bg-white rounded-xl shadow-lg p-6 border border-gray-100 h-full">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-gray-700 font-medium">Gas Level Trend</h3>
                <div className="flex space-x-2">
                  <button className="px-3 py-1 text-sm rounded-md bg-primary-500 text-white">24h</button>
                  <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">7d</button>
                  <button className="px-3 py-1 text-sm rounded-md bg-gray-100 text-gray-700 hover:bg-gray-200 transition-colors">30d</button>
                </div>
              </div>
              <div className="h-[350px]">
                <Line data={chartData} options={chartOptions} />
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4 text-center">
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-sm text-gray-500">Avg Level</div>
                  <div className="text-xl font-medium text-gray-900">
                    {(gasData.reduce((acc, curr) => acc + curr.value, 0) / gasData.length).toFixed(1)} ppm
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-sm text-gray-500">Max Level</div>
                  <div className="text-xl font-medium text-gray-900">
                    {Math.max(...gasData.map(item => item.value)).toFixed(1)} ppm
                  </div>
                </div>
                <div className="p-3 rounded-lg bg-gray-50">
                  <div className="text-sm text-gray-500">Min Level</div>
                  <div className="text-xl font-medium text-gray-900">
                    {Math.min(...gasData.map(item => item.value)).toFixed(1)} ppm
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default MonitoringDashboard;