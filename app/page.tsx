'use client';

import { useRef, useState, useCallback } from 'react';
import { AnimatePresence } from 'framer-motion';
import { useArtStore } from '@/store/artStore';
import SketchCanvas from '@/components/Canvas/SketchCanvas';
import type { P5CanvasHandle } from '@/components/Canvas/P5Canvas';
import ControlPanel from '@/components/Controls/ControlPanel';
import PerformanceMonitor from '@/components/UI/PerformanceMonitor';
import ExportPanel from '@/components/UI/ExportPanel';
import BottomSheet from '@/components/Mobile/BottomSheet';
import SliderControl from '@/components/Controls/SliderControl';
import ColorPicker from '@/components/Controls/ColorPicker';
import PresetSelector from '@/components/Controls/PresetSelector';
import { useKeyboardShortcuts } from '@/hooks/useKeyboardShortcuts';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { MODE_LABELS, SLIDER_CONFIGS, ALL_MODES } from '@/utils/constants';
import { ArtMode } from '@/types/art';

export default function Home() {
  const canvasRef = useRef<P5CanvasHandle>(null);
  const [fps, setFps] = useState(60);
  const isMobile = useMediaQuery('(max-width: 768px)');

  const mode = useArtStore((s) => s.mode);
  const params = useArtStore((s) => s.params[s.mode]);
  const palette = useArtStore((s) => s.palette);
  const isPaused = useArtStore((s) => s.isPaused);
  const showExport = useArtStore((s) => s.showExport);
  const toggleExport = useArtStore((s) => s.toggleExport);
  const saveToGallery = useArtStore((s) => s.saveToGallery);
  const setMode = useArtStore((s) => s.setMode);
  const updateParam = useArtStore((s) => s.updateParam);
  const randomize = useArtStore((s) => s.randomize);
  const reset = useArtStore((s) => s.reset);

  useKeyboardShortcuts();

  const handleSaveToGallery = useCallback(() => {
    if (canvasRef.current) {
      const thumbnail = canvasRef.current.getThumbnail();
      saveToGallery(thumbnail);
    }
  }, [saveToGallery]);

  const getCanvas = useCallback(() => {
    return canvasRef.current?.getCanvas() ?? null;
  }, []);

  const sliderConfigs = SLIDER_CONFIGS[mode];

  return (
    <main className="h-screen w-screen overflow-hidden">
      {/* Desktop Control Panel */}
      {!isMobile && (
        <ControlPanel onSaveToGallery={handleSaveToGallery} />
      )}

      {/* Canvas */}
      <div
        className={`h-screen ${isMobile ? 'w-screen' : 'ml-80'}`}
      >
        <SketchCanvas
          ref={canvasRef}
          mode={mode}
          params={params}
          palette={palette}
          isPaused={isPaused}
          onFpsUpdate={setFps}
        />
      </div>

      {/* Performance Monitor */}
      <PerformanceMonitor fps={fps} mode={MODE_LABELS[mode]} />

      {/* Pause indicator */}
      {isPaused && (
        <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 bg-black/60 backdrop-blur-sm px-6 py-3 rounded-xl pointer-events-none">
          <p className="text-white text-lg font-medium">Paused</p>
          <p className="text-gray-400 text-xs text-center">Press Space to resume</p>
        </div>
      )}

      {/* Export Panel */}
      <AnimatePresence>
        {showExport && (
          <ExportPanel getCanvas={getCanvas} onClose={toggleExport} />
        )}
      </AnimatePresence>

      {/* Gallery link */}
      <a
        href="/gallery"
        className="fixed bottom-4 left-4 md:left-84 z-20 px-3 py-1.5 text-xs text-gray-500 hover:text-white bg-gray-950/60 backdrop-blur-sm rounded-md border border-white/5 hover:border-white/15 transition-all"
      >
        Gallery
      </a>

      {/* Keyboard shortcuts hint */}
      <div className="fixed bottom-4 right-4 z-20 text-[10px] text-gray-700 hidden md:block">
        Space: pause | R: randomize | E: export | Ctrl+Z/Y: undo/redo
      </div>

      {/* Mobile Bottom Sheet */}
      {isMobile && (
        <BottomSheet>
          <div className="space-y-6 pt-2">
            {/* Mode Selector */}
            <div>
              <label className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-2 block">
                Art Mode
              </label>
              <select
                value={mode}
                onChange={(e) => setMode(e.target.value as ArtMode)}
                className="w-full px-3 py-2.5 text-sm bg-gray-800/80 rounded-lg border border-white/5 text-white"
              >
                {ALL_MODES.map((m) => (
                  <option key={m} value={m}>{MODE_LABELS[m]}</option>
                ))}
              </select>
            </div>

            {/* Parameters */}
            <div className="space-y-4">
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

            <ColorPicker />
            <PresetSelector />

            {/* Actions */}
            <div className="grid grid-cols-2 gap-3 pb-4">
              <button onClick={randomize} className="py-2.5 text-sm font-medium bg-purple-600 rounded-lg">
                Randomize
              </button>
              <button onClick={reset} className="py-2.5 text-sm font-medium bg-gray-800 rounded-lg border border-white/5">
                Reset
              </button>
              <button onClick={toggleExport} className="py-2.5 text-sm font-medium bg-blue-600 rounded-lg">
                Export
              </button>
              <button onClick={handleSaveToGallery} className="py-2.5 text-sm font-medium bg-emerald-600 rounded-lg">
                Save
              </button>
            </div>
          </div>
        </BottomSheet>
      )}
    </main>
  );
}
