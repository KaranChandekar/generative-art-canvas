'use client';

import { useEffect, useRef, useCallback, forwardRef, useImperativeHandle } from 'react';
import p5 from 'p5';
import { ArtMode, ModeParams } from '@/types/art';
import { setupParticleFlow, drawParticleFlow } from '@/algorithms/particleFlow';
import { setupFractalTree, drawFractalTree } from '@/algorithms/fractalTree';
import { setupCirclePacking, drawCirclePacking } from '@/algorithms/circlePacking';
import { setupWaveInterference, drawWaveInterference } from '@/algorithms/waveInterference';
import { setupVoronoi, drawVoronoi } from '@/algorithms/voronoiArt';
import { setupSpirograph, drawSpirograph, resetSpirograph } from '@/algorithms/spirograph';

interface P5CanvasProps {
  mode: ArtMode;
  params: ModeParams;
  palette: string;
  isPaused: boolean;
  onFpsUpdate?: (fps: number) => void;
}

export interface P5CanvasHandle {
  getCanvas: () => HTMLCanvasElement | null;
  getThumbnail: () => string;
}

const P5Canvas = forwardRef<P5CanvasHandle, P5CanvasProps>(
  ({ mode, params, palette, isPaused, onFpsUpdate }, ref) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const p5Ref = useRef<p5 | null>(null);
    const paramsRef = useRef(params);
    const paletteRef = useRef(palette);
    const modeRef = useRef(mode);
    const isPausedRef = useRef(isPaused);
    const frameCountRef = useRef(0);
    const lastModeRef = useRef(mode);

    // FPS tracking
    const fpsFrameCount = useRef(0);
    const fpsLastTime = useRef(performance.now());

    paramsRef.current = params;
    paletteRef.current = palette;
    modeRef.current = mode;
    isPausedRef.current = isPaused;

    useImperativeHandle(ref, () => ({
      getCanvas: () => {
        if (!containerRef.current) return null;
        return containerRef.current.querySelector('canvas');
      },
      getThumbnail: () => {
        const canvas = containerRef.current?.querySelector('canvas');
        if (!canvas) return '';
        return canvas.toDataURL('image/png', 0.3);
      },
    }));

    useEffect(() => {
      if (!containerRef.current) return;

      const sketch = (p: p5) => {
        p.setup = () => {
          const container = containerRef.current!;
          const canvas = p.createCanvas(container.clientWidth, container.clientHeight);
          canvas.parent(container);
          p.pixelDensity(1);

          runSetup(p, modeRef.current, paramsRef.current);
        };

        p.draw = () => {
          if (isPausedRef.current) return;

          // FPS calculation
          fpsFrameCount.current++;
          const now = performance.now();
          if (now - fpsLastTime.current >= 1000) {
            onFpsUpdate?.(fpsFrameCount.current);
            fpsFrameCount.current = 0;
            fpsLastTime.current = now;
          }

          // Mode changed - run setup again
          if (modeRef.current !== lastModeRef.current) {
            runSetup(p, modeRef.current, paramsRef.current);
            lastModeRef.current = modeRef.current;
            frameCountRef.current = 0;
          }

          frameCountRef.current++;

          switch (modeRef.current) {
            case 'flow-field':
              drawParticleFlow(p, paramsRef.current, paletteRef.current, frameCountRef.current);
              break;
            case 'fractal-tree':
              drawFractalTree(p, paramsRef.current, paletteRef.current, frameCountRef.current);
              break;
            case 'circle-packing':
              drawCirclePacking(p, paramsRef.current, paletteRef.current, frameCountRef.current);
              break;
            case 'wave-interference':
              drawWaveInterference(p, paramsRef.current, paletteRef.current, frameCountRef.current);
              break;
            case 'voronoi':
              drawVoronoi(p, paramsRef.current, paletteRef.current, frameCountRef.current);
              break;
            case 'spirograph':
              drawSpirograph(p, paramsRef.current, paletteRef.current, frameCountRef.current);
              break;
          }
        };

        p.windowResized = () => {
          if (containerRef.current) {
            p.resizeCanvas(containerRef.current.clientWidth, containerRef.current.clientHeight);
            runSetup(p, modeRef.current, paramsRef.current);
            frameCountRef.current = 0;
          }
        };
      };

      p5Ref.current = new p5(sketch);

      return () => {
        p5Ref.current?.remove();
        p5Ref.current = null;
      };
    }, []);

    return <div ref={containerRef} className="w-full h-full" />;
  }
);

P5Canvas.displayName = 'P5Canvas';

function runSetup(p: p5, mode: ArtMode, params: ModeParams) {
  switch (mode) {
    case 'flow-field':
      setupParticleFlow(p, params);
      break;
    case 'fractal-tree':
      setupFractalTree(p);
      break;
    case 'circle-packing':
      setupCirclePacking(p, params);
      break;
    case 'wave-interference':
      setupWaveInterference(p);
      break;
    case 'voronoi':
      setupVoronoi(p, params);
      break;
    case 'spirograph':
      setupSpirograph(p);
      break;
  }
}

export default P5Canvas;
