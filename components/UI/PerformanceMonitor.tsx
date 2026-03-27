'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PerformanceMonitorProps {
  fps: number;
  mode: string;
}

export default function PerformanceMonitor({ fps, mode }: PerformanceMonitorProps) {
  const [visible, setVisible] = useState(true);
  const isLow = fps > 0 && fps < 45;

  return (
    <div className="fixed top-4 right-4 z-30">
      <button
        onClick={() => setVisible(!visible)}
        className="text-xs text-gray-600 hover:text-gray-400 mb-1 block ml-auto transition-colors"
      >
        {visible ? 'Hide' : 'Stats'}
      </button>
      <AnimatePresence>
        {visible && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className={`px-3 py-2 rounded-lg backdrop-blur-md text-xs font-mono ${
              isLow
                ? 'bg-red-950/60 border border-red-500/30 text-red-400'
                : 'bg-gray-950/60 border border-white/5 text-green-400'
            }`}
          >
            <p>
              FPS: <span className="font-bold">{fps}</span>
              {isLow && ' (low)'}
            </p>
            <p className="text-gray-500 mt-0.5">{mode}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
