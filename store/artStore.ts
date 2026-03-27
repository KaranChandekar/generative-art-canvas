'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ArtMode, ModeParams, SavedArtwork, Preset, HistoryEntry } from '@/types/art';
import { DEFAULT_PARAMS, MAX_HISTORY, MAX_GALLERY, SLIDER_CONFIGS } from '@/utils/constants';

interface ArtState {
  mode: ArtMode;
  params: Record<ArtMode, ModeParams>;
  palette: string;
  history: HistoryEntry[];
  historyIndex: number;
  gallery: SavedArtwork[];
  presets: Preset[];
  showExport: boolean;
  isPaused: boolean;

  setMode: (mode: ArtMode) => void;
  updateParam: (key: string, value: number) => void;
  setPalette: (palette: string) => void;
  randomize: () => void;
  reset: () => void;
  undo: () => void;
  redo: () => void;
  saveToGallery: (thumbnail: string) => void;
  deleteFromGallery: (id: string) => void;
  loadArtwork: (artwork: SavedArtwork) => void;
  savePreset: (name: string) => void;
  loadPreset: (preset: Preset) => void;
  deletePreset: (id: string) => void;
  toggleExport: () => void;
  togglePause: () => void;
}

function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

function pushHistory(state: ArtState): HistoryEntry[] {
  const entry: HistoryEntry = {
    mode: state.mode,
    params: deepClone(state.params),
    palette: state.palette,
  };
  const history = state.history.slice(0, state.historyIndex + 1);
  history.push(entry);
  if (history.length > MAX_HISTORY) history.shift();
  return history;
}

export const useArtStore = create<ArtState>()(
  persist(
    (set, get) => ({
      mode: 'flow-field',
      params: deepClone(DEFAULT_PARAMS),
      palette: 'neon',
      history: [],
      historyIndex: -1,
      gallery: [],
      presets: [],
      showExport: false,
      isPaused: false,

      setMode: (mode) =>
        set((state) => {
          const history = pushHistory(state);
          return { mode, history, historyIndex: history.length - 1 };
        }),

      updateParam: (key, value) =>
        set((state) => {
          const history = pushHistory(state);
          const newParams = { ...state.params };
          newParams[state.mode] = { ...newParams[state.mode], [key]: value };
          return { params: newParams, history, historyIndex: history.length - 1 };
        }),

      setPalette: (palette) =>
        set((state) => {
          const history = pushHistory(state);
          return { palette, history, historyIndex: history.length - 1 };
        }),

      randomize: () =>
        set((state) => {
          const history = pushHistory(state);
          const modeConfig = SLIDER_CONFIGS[state.mode];
          const newModeParams: ModeParams = {};
          for (const [key, config] of Object.entries(modeConfig)) {
            const range = config.max - config.min;
            const steps = Math.round(range / config.step);
            const randomStep = Math.floor(Math.random() * (steps + 1));
            newModeParams[key] = config.min + randomStep * config.step;
          }
          const newParams = { ...state.params, [state.mode]: newModeParams };
          return { params: newParams, history, historyIndex: history.length - 1 };
        }),

      reset: () =>
        set((state) => {
          const history = pushHistory(state);
          const newParams = { ...state.params, [state.mode]: deepClone(DEFAULT_PARAMS[state.mode]) };
          return { params: newParams, history, historyIndex: history.length - 1 };
        }),

      undo: () =>
        set((state) => {
          if (state.historyIndex <= 0) return state;
          const newIndex = state.historyIndex - 1;
          const entry = state.history[newIndex];
          return {
            mode: entry.mode,
            params: deepClone(entry.params),
            palette: entry.palette,
            historyIndex: newIndex,
          };
        }),

      redo: () =>
        set((state) => {
          if (state.historyIndex >= state.history.length - 1) return state;
          const newIndex = state.historyIndex + 1;
          const entry = state.history[newIndex];
          return {
            mode: entry.mode,
            params: deepClone(entry.params),
            palette: entry.palette,
            historyIndex: newIndex,
          };
        }),

      saveToGallery: (thumbnail) =>
        set((state) => {
          if (state.gallery.length >= MAX_GALLERY) return state;
          const artwork: SavedArtwork = {
            id: crypto.randomUUID(),
            timestamp: Date.now(),
            mode: state.mode,
            params: deepClone(state.params[state.mode]),
            palette: state.palette,
            thumbnail,
          };
          return { gallery: [...state.gallery, artwork] };
        }),

      deleteFromGallery: (id) =>
        set((state) => ({
          gallery: state.gallery.filter((a) => a.id !== id),
        })),

      loadArtwork: (artwork) =>
        set((state) => {
          const newParams = { ...state.params, [artwork.mode]: deepClone(artwork.params) };
          return { mode: artwork.mode, params: newParams, palette: artwork.palette };
        }),

      savePreset: (name) =>
        set((state) => {
          const preset: Preset = {
            id: crypto.randomUUID(),
            name,
            mode: state.mode,
            params: deepClone(state.params[state.mode]),
            palette: state.palette,
          };
          return { presets: [...state.presets, preset] };
        }),

      loadPreset: (preset) =>
        set((state) => {
          const newParams = { ...state.params, [preset.mode]: deepClone(preset.params) };
          return { mode: preset.mode, params: newParams, palette: preset.palette };
        }),

      deletePreset: (id) =>
        set((state) => ({
          presets: state.presets.filter((p) => p.id !== id),
        })),

      toggleExport: () => set((state) => ({ showExport: !state.showExport })),
      togglePause: () => set((state) => ({ isPaused: !state.isPaused })),
    }),
    {
      name: 'generative-art-store',
      partialize: (state) => ({
        gallery: state.gallery,
        presets: state.presets,
      }),
    }
  )
);
