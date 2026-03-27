'use client';

import { useEffect } from 'react';
import { useArtStore } from '@/store/artStore';

export function useKeyboardShortcuts() {
  const undo = useArtStore((s) => s.undo);
  const redo = useArtStore((s) => s.redo);
  const randomize = useArtStore((s) => s.randomize);
  const toggleExport = useArtStore((s) => s.toggleExport);
  const togglePause = useArtStore((s) => s.togglePause);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Ignore if typing in an input
      const tag = (e.target as HTMLElement)?.tagName;
      if (tag === 'INPUT' || tag === 'TEXTAREA' || tag === 'SELECT') return;

      if ((e.ctrlKey || e.metaKey) && e.key === 'z') {
        e.preventDefault();
        if (e.shiftKey) {
          redo();
        } else {
          undo();
        }
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key === 'y') {
        e.preventDefault();
        redo();
        return;
      }

      if (e.key === 'r' && !e.ctrlKey && !e.metaKey) {
        randomize();
        return;
      }

      if (e.key === 'e' && !e.ctrlKey && !e.metaKey) {
        toggleExport();
        return;
      }

      if (e.key === ' ') {
        e.preventDefault();
        togglePause();
        return;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [undo, redo, randomize, toggleExport, togglePause]);
}
