import React from 'react';
import { motion } from 'framer-motion';
import './InfinityLoader.css';

const InfinityLoader = () => (
  <motion.div
    className="infinity-loader-overlay"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    transition={{ duration: 0.5 }}
  >
      <svg className="infinity-svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid">
        <defs>
          <linearGradient id="metallicGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style={{stopColor: '#999', stopOpacity: 1}} />
            <stop offset="50%" style={{stopColor: '#fff', stopOpacity: 1}} />
            <stop offset="100%" style={{stopColor: '#999', stopOpacity: 1}} />
          </linearGradient>
        </defs>
        <path fill="none" stroke="url(#metallicGradient)" strokeWidth="4" strokeDasharray="174.375 58.125" d="M24.3 30C11.4 30 5 43.3 5 50s6.4 20 19.3 20c19.3 0 32.1-40 51.4-40 C88.6 30 95 43.3 95 50s-6.4 20-19.3 20C56.4 70 43.6 30 24.3 30z" strokeLinecap="round">
          <animate attributeName="stroke-dashoffset" repeatCount="indefinite" dur="2s" keyTimes="0;1" values="0;232.5"></animate>
        </path>
      </svg>
  </motion.div>
);

export default InfinityLoader;
