'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { downloadImage, getEstimatedSize } from '@/utils/export';

interface ExportPanelProps {
  getCanvas: () => HTMLCanvasElement | null;
  onClose: () => void;
}

export default function ExportPanel({ getCanvas, onClose }: ExportPanelProps) {
  const [resolution, setResolution] = useState<1 | 2 | 4>(2);
  const [exporting, setExporting] = useState(false);
  const [format, setFormat] = useState<'png' | 'jpg'>('png');

  const canvas = getCanvas();
  const width = canvas?.width ?? 1920;
  const height = canvas?.height ?? 1080;

  const handleExport = async () => {
    const c = getCanvas();
    if (!c) return;
    setExporting(true);
    try {
      const ext = format;
      await downloadImage(c, `generative-art-${Date.now()}.${ext}`, resolution, format);
    } finally {
      setExporting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 20, scale: 0.95 }}
      className="fixed bottom-6 right-6 z-30 bg-gray-950/95 backdrop-blur-xl rounded-xl border border-white/10 p-5 w-72 shadow-2xl"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-white">Export Artwork</h3>
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-white transition-colors text-lg leading-none"
        >
          &times;
        </button>
      </div>

      {/* Resolution */}
      <div className="mb-4">
        <label className="text-xs text-gray-400 mb-2 block">Resolution</label>
        <div className="grid grid-cols-3 gap-2">
          {([1, 2, 4] as const).map((res) => (
            <button
              key={res}
              onClick={() => setResolution(res)}
              className={`py-1.5 text-xs rounded-md border transition-all ${
                resolution === res
                  ? 'bg-purple-600 border-purple-500 text-white'
                  : 'bg-gray-800 border-white/5 text-gray-400 hover:border-white/15'
              }`}
            >
              <span className="font-bold">{res}x</span>
              <br />
              <span className="text-[10px] opacity-70">
                {width * res}x{height * res}
              </span>
            </button>
          ))}
        </div>
        <p className="text-[10px] text-gray-600 mt-1.5">
          Est. {getEstimatedSize(width, height, resolution, format)}
        </p>
      </div>

      {/* Format */}
      <div className="mb-4">
        <label className="text-xs text-gray-400 mb-2 block">Format</label>
        <div className="grid grid-cols-2 gap-2">
          {(['png', 'jpg'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFormat(f)}
              className={`py-1.5 text-xs rounded-md border transition-all uppercase font-medium ${
                format === f
                  ? 'bg-blue-600 border-blue-500 text-white'
                  : 'bg-gray-800 border-white/5 text-gray-400 hover:border-white/15'
              }`}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Download */}
      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={handleExport}
        disabled={exporting}
        className="w-full py-2.5 text-sm font-medium bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg hover:from-purple-500 hover:to-blue-500 disabled:opacity-50 transition-all"
      >
        {exporting ? (
          <span className="flex items-center justify-center gap-2">
            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            Exporting...
          </span>
        ) : (
          'Download'
        )}
      </motion.button>
    </motion.div>
  );
}
