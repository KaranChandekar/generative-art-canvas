'use client';

import { motion } from 'framer-motion';
import { PALETTES, PALETTE_NAMES } from '@/utils/palettes';
import { useArtStore } from '@/store/artStore';

export default function ColorPicker() {
  const palette = useArtStore((s) => s.palette);
  const setPalette = useArtStore((s) => s.setPalette);

  return (
    <div className="mb-6">
      <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3 block">
        Color Palette
      </label>
      <div className="grid grid-cols-2 gap-2">
        {PALETTE_NAMES.map((name, i) => (
          <motion.button
            key={name}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.05 }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => setPalette(name)}
            className={`flex gap-0.5 p-2 rounded-lg border transition-all ${
              palette === name
                ? 'border-purple-500 bg-purple-500/10 shadow-[0_0_12px_rgba(168,85,247,0.2)]'
                : 'border-white/5 bg-gray-800/50 hover:border-white/15'
            }`}
          >
            <div className="flex gap-0.5 flex-1">
              {PALETTES[name].map((color) => (
                <div
                  key={color}
                  className="flex-1 h-5 rounded-sm first:rounded-l last:rounded-r"
                  style={{ backgroundColor: color }}
                />
              ))}
            </div>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
