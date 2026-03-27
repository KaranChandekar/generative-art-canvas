'use client';

import dynamic from 'next/dynamic';
import { forwardRef } from 'react';
import type { P5CanvasHandle } from './P5Canvas';
import { ArtMode, ModeParams } from '@/types/art';

const P5Canvas = dynamic(() => import('./P5Canvas'), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-gray-950">
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-purple-500 border-t-transparent rounded-full animate-spin" />
        <p className="text-gray-400 text-sm">Loading canvas...</p>
      </div>
    </div>
  ),
});

interface SketchCanvasProps {
  mode: ArtMode;
  params: ModeParams;
  palette: string;
  isPaused: boolean;
  onFpsUpdate?: (fps: number) => void;
}

const SketchCanvas = forwardRef<P5CanvasHandle, SketchCanvasProps>(
  (props, ref) => {
    return <P5Canvas ref={ref} {...props} />;
  }
);

SketchCanvas.displayName = 'SketchCanvas';

export default SketchCanvas;
