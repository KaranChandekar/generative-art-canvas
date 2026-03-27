'use client';

import { motion } from 'framer-motion';
import { useArtStore } from '@/store/artStore';
import { MODE_LABELS, SLIDER_CONFIGS, ALL_MODES } from '@/utils/constants';
import { ArtMode } from '@/types/art';
import SliderControl from './SliderControl';
import ColorPicker from './ColorPicker';
import PresetSelector from './PresetSelector';

interface ControlPanelProps {
  onSaveToGallery: () => void;
}

export default function ControlPanel({ onSaveToGallery }: ControlPanelProps) {
  const mode = useArtStore((s) => s.mode);
  const params = useArtStore((s) => s.params[s.mode]);
  const setMode = useArtStore((s) => s.setMode);
  const updateParam = useArtStore((s) => s.updateParam);
  const randomize = useArtStore((s) => s.randomize);
  const reset = useArtStore((s) => s.reset);
  const toggleExport = useArtStore((s) => s.toggleExport);
  const undo = useArtStore((s) => s.undo);
  const redo = useArtStore((s) => s.redo);
  const historyIndex = useArtStore((s) => s.historyIndex);
  const historyLength = useArtStore((s) => s.history.length);

  const sliderConfigs = SLIDER_CONFIGS[mode];

  return (
    <motion.aside
      initial={{ opacity: 0, x: -300 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ type: 'spring', damping: 25, stiffness: 200 }}
      className="fixed left-0 top-0 h-screen w-80 bg-gray-950/95 backdrop-blur-xl border-r border-white/5 overflow-y-auto z-20 flex flex-col"
    >
      {/* Header */}
      <div className="p-5 pb-3 border-b border-white/5">
        <h1 className="text-lg font-bold text-white tracking-tight">
          Generative Art
        </h1>
        <p className="text-xs text-gray-500 mt-0.5">Create procedural artwork</p>
      </div>

      <div className="flex-1 overflow-y-auto p-5 space-y-6">
        {/* Mode Selector */}
        <div>
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 block">
            Art Mode
          </label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value as ArtMode)}
            className="w-full px-3 py-2 text-sm bg-gray-800/80 rounded-lg border border-white/5 text-white appearance-none cursor-pointer hover:border-purple-500/30 focus:outline-none focus:border-purple-500 transition-colors"
          >
            {ALL_MODES.map((m) => (
              <option key={m} value={m}>
                {MODE_LABELS[m]}
              </option>
            ))}
          </select>
        </div>

        {/* Parameters */}
        <div className="space-y-4">
          <label className="text-xs font-medium text-gray-400 uppercase tracking-wider block">
            Parameters
          </label>
          {Object.entries(sliderConfigs).map(([key, config]) => (
            <SliderControl
              key={`${mode}-${key}`}
              label={config.label}
              value={params[key] ?? config.min}
              onChange={(val) => updateParam(key, val)}
              min={config.min}
              max={config.max}
              step={config.step}
            />
          ))}
        </div>

        {/* Color Palette */}
        <ColorPicker />

        {/* Presets */}
        <PresetSelector />

        {/* Undo/Redo */}
        <div className="flex gap-2">
          <button
            onClick={undo}
            disabled={historyIndex <= 0}
            className="flex-1 px-3 py-1.5 text-xs bg-gray-800/50 rounded-md border border-white/5 text-gray-400 hover:text-white hover:border-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Undo
          </button>
          <button
            onClick={redo}
            disabled={historyIndex >= historyLength - 1}
            className="flex-1 px-3 py-1.5 text-xs bg-gray-800/50 rounded-md border border-white/5 text-gray-400 hover:text-white hover:border-white/15 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            Redo
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="p-5 pt-3 border-t border-white/5 space-y-2">
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={randomize}
            className="px-3 py-2 text-sm font-medium bg-purple-600 hover:bg-purple-500 rounded-lg transition-colors"
          >
            Randomize
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={reset}
            className="px-3 py-2 text-sm font-medium bg-gray-800 hover:bg-gray-700 rounded-lg border border-white/5 transition-colors"
          >
            Reset
          </motion.button>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={toggleExport}
            className="px-3 py-2 text-sm font-medium bg-blue-600 hover:bg-blue-500 rounded-lg transition-colors"
          >
            Export
          </motion.button>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            onClick={onSaveToGallery}
            className="px-3 py-2 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 rounded-lg transition-colors"
          >
            Save
          </motion.button>
        </div>
      </div>
    </motion.aside>
  );
}
