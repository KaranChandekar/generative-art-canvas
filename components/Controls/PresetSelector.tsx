'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useArtStore } from '@/store/artStore';

export default function PresetSelector() {
  const presets = useArtStore((s) => s.presets);
  const savePreset = useArtStore((s) => s.savePreset);
  const loadPreset = useArtStore((s) => s.loadPreset);
  const deletePreset = useArtStore((s) => s.deletePreset);
  const [showInput, setShowInput] = useState(false);
  const [name, setName] = useState('');
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleSave = () => {
    if (name.trim()) {
      savePreset(name.trim());
      setName('');
      setShowInput(false);
    }
  };

  return (
    <div className="mb-6">
      <div className="flex items-center justify-between mb-3">
        <label className="text-xs font-medium text-gray-400 uppercase tracking-wider">
          Presets
        </label>
        <button
          onClick={() => setShowInput(!showInput)}
          className="text-xs text-purple-400 hover:text-purple-300 transition-colors"
        >
          {showInput ? 'Cancel' : '+ Save'}
        </button>
      </div>

      <AnimatePresence>
        {showInput && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden mb-3"
          >
            <div className="flex gap-2">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleSave()}
                placeholder="Preset name..."
                className="flex-1 px-3 py-1.5 text-sm bg-gray-800 border border-gray-700 rounded-md text-white placeholder-gray-500 focus:outline-none focus:border-purple-500"
              />
              <button
                onClick={handleSave}
                className="px-3 py-1.5 text-sm bg-purple-600 rounded-md hover:bg-purple-500 transition-colors"
              >
                Save
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {presets.length === 0 ? (
        <p className="text-xs text-gray-600 italic">No presets saved</p>
      ) : (
        <div className="space-y-1.5 max-h-40 overflow-y-auto">
          {presets.map((preset) => (
            <motion.div
              key={preset.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-2 p-2 bg-gray-800/50 rounded-md group"
            >
              <button
                onClick={() => loadPreset(preset)}
                className="flex-1 text-left text-sm text-gray-300 hover:text-white truncate transition-colors"
              >
                {preset.name}
              </button>
              {confirmDelete === preset.id ? (
                <div className="flex gap-1">
                  <button
                    onClick={() => {
                      deletePreset(preset.id);
                      setConfirmDelete(null);
                    }}
                    className="text-xs text-red-400 hover:text-red-300"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => setConfirmDelete(null)}
                    className="text-xs text-gray-500 hover:text-gray-400"
                  >
                    No
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => setConfirmDelete(preset.id)}
                  className="text-xs text-gray-600 opacity-0 group-hover:opacity-100 hover:text-red-400 transition-all"
                >
                  Del
                </button>
              )}
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
