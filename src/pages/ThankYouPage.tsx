import React from 'react';
import { motion } from 'framer-motion';
import { Button } from '../components/ui/Button';
import { useNavigate, useLocation } from 'react-router-dom';

export const ThankYouPage: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  // Get order details from location state (passed from checkout)
  const order = location.state?.order || {};

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-[#f8fafc] to-[#e7e5e4] p-6">
      {/* Confetti Animation */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.7, type: 'spring' }}
        className="mb-8"
      >
        <svg width="120" height="120" viewBox="0 0 120 120" fill="none">
          <circle cx="60" cy="60" r="60" fill="#f5f3ff" />
          <text x="50%" y="50%" textAnchor="middle" dy=".3em" fontSize="48" fill="#a78bfa">🎉</text>
        </svg>
      </motion.div>
      <motion.h1
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4 text-center"
      >
        Thank You for Your Order!
      </motion.h1>
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4, duration: 0.6 }}
        className="text-lg text-gray-700 mb-8 text-center max-w-xl"
      >
        Your purchase was successful. We’re preparing your order and will send you updates soon.
      </motion.p>
      {/* Order Summary */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="w-full max-w-md bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-6 mb-8 border border-gray-100"
      >
        <h2 className="text-xl font-semibold mb-2 text-gray-900">Order Summary</h2>
        <div className="space-y-2 text-gray-700">
          <div className="flex justify-between">
            <span>Order #</span>
            <span className="font-mono">{order.id || '123456'}</span>
          </div>
          <div className="flex justify-between">
            <span>Total</span>
            <span className="font-semibold">${order.total?.toFixed(2) || '0.00'}</span>
          </div>
          <div className="flex justify-between">
            <span>Estimated Delivery</span>
            <span className="text-green-600 font-medium">{order.eta || '2-4 days'}</span>
          </div>
        </div>
      </motion.div>
      {/* Track Order Button */}
      <Button onClick={() => navigate('/orders')} className="px-8 py-3 rounded-xl text-lg font-semibold shadow-lg bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 transition-all duration-200">
        Track My Order
      </Button>
    </div>
  );
};

export default ThankYouPage; 