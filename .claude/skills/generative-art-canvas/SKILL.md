---
name: generative-art-canvas
description: Build a generative art canvas web app where users create real-time procedural art through sliders, presets, and randomization — featuring particle systems, fractal patterns, flow fields, and exportable high-res output. Use this skill when building creative coding tools, generative art apps, procedural art generators, or interactive canvas experiences. Trigger when the user mentions generative art, procedural art, creative coding canvas, particle art generator, fractal generator, flow field visualization, or p5.js art tool.
---

# Generative Art Canvas Skill

## Overview
This skill guides the development of an interactive, real-time generative art tool that empowers users to create beautiful procedural artwork through intuitive controls, presets, and randomization. The application combines p5.js for creative coding with modern React patterns, providing instant visual feedback and exportable high-resolution output for print or digital use.

## Core Technology Stack

### Frontend Framework & Canvas
- **Next.js 15**: App Router for routing and API integration, server-side rendering
- **React 18**: Component-based architecture with hooks for state management
- **p5.js 1.7.0**: Creative coding library for drawing, animation, and generative algorithms
- **react-p5**: React wrapper for p5.js enabling hooks-based lifecycle integration
- **HTML5 Canvas**: Native canvas API for direct pixel manipulation and optimization
- **TypeScript**: Full type safety across components, algorithms, and configuration

### State Management & Performance
- **Zustand 4.4+**: Lightweight, no-boilerplate state management for art parameters
- **Immer**: Immutable state updates for undo/redo functionality
- **React Query**: Optional cache layer for preset data and export history
- **Web Workers**: Offload heavy calculations to avoid blocking the UI thread

### Animation & Motion
- **Framer Motion 10+**: React-native animations for UI transitions, button effects, panel slides
- **React Spring**: Physics-based animations for smooth value transitions
- **requestAnimationFrame**: Native browser animation loop for canvas rendering

### UI Components & Styling
- **Tailwind CSS 3.4+**: Utility-first CSS framework for layout and component styling
- **Headless UI**: Accessible dialog, menu, and slider components
- **React Hook Form**: Efficient form handling for controls without re-renders
- **Radix UI Slider**: Accessible, high-performance slider components
- **react-color**: Color picker component for palette customization

### Data Processing & Export
- **html2canvas**: Capture canvas as image for download
- **jsPDF**: Export canvas as PDF for print
- **canvas-to-blob**: Convert canvas to blob for file downloads
- **file-saver**: Cross-browser file download functionality
- **jszip**: Create ZIP archives of multiple artworks

### Algorithm Libraries
- **simplex-noise**: Fast 2D Perlin noise implementation for flow fields
- **delaunay-triangulation**: Voronoi diagram generation
- **bezier-js**: Bezier curve utilities for spirograph generation
- **three.js** (optional): 3D generative art extensions

## Project Structure

```
12-generative-art-canvas/
├── app/
│   ├── layout.tsx                 # Root layout with fonts, theme
│   ├── page.tsx                   # Main canvas app page
│   ├── api/
│   │   ├── presets/route.ts       # CRUD operations for presets
│   │   ├── export/route.ts        # High-res export generation
│   │   └── palettes/route.ts      # Color palette suggestions
│   └── gallery/
│       └── page.tsx               # Saved artworks gallery
├── components/
│   ├── Canvas/
│   │   ├── SketchCanvas.tsx       # Main p5.js canvas component
│   │   ├── SketchRenderer.tsx     # Generative art mode selection
│   │   └── CanvasContainer.tsx    # Canvas wrapper with controls
│   ├── Controls/
│   │   ├── ControlPanel.tsx       # Left panel with sliders
│   │   ├── SliderControl.tsx      # Individual slider component
│   │   ├── ColorPicker.tsx        # Color palette selector
│   │   ├── PresetSelector.tsx     # Load/save preset UI
│   │   └── RandomizeButton.tsx    # Randomize parameters
│   ├── UI/
│   │   ├── Header.tsx             # Top nav with title, mode selector
│   │   ├── Footer.tsx             # Bottom stats and info
│   │   ├── Modal.tsx              # Export/save dialog
│   │   ├── PerformanceMonitor.tsx # FPS and particle count display
│   │   └── ExportPanel.tsx        # Download options
│   ├── Gallery/
│   │   ├── ArtworkCard.tsx        # Individual artwork thumbnail
│   │   ├── GalleryGrid.tsx        # Masonry layout of saved art
│   │   └── DeleteConfirm.tsx      # Confirm deletion modal
│   └── Mobile/
│       ├── BottomSheet.tsx        # Mobile-friendly control sheet
│       └── TouchControls.tsx      # Touch-optimized sliders
├── hooks/
│   ├── useSketch.ts               # p5.js sketch lifecycle hook
│   ├── useGenerativeMode.ts       # Mode-specific logic
│   ├── useArtState.ts             # Zustand store integration
│   ├── useUndo.ts                 # Undo/redo functionality
│   ├── useExport.ts               # Export resolution handling
│   └── useLocalStorage.ts         # Persist settings and gallery
├── algorithms/
│   ├── particleFlow.ts            # Particle Flow Field mode
│   ├── fractalTree.ts             # Recursive Tree Fractal mode
│   ├── circlePacking.ts           # Circle Packing algorithm
│   ├── waveInterference.ts        # Wave Interference patterns
│   ├── voronoiArt.ts              # Voronoi diagram generation
│   ├── spirograph.ts              # Spirograph parametric curves
│   └── shared/
│       ├── noiseUtils.ts          # Perlin/Simplex noise utilities
│       ├── colorUtils.ts          # Color space conversions
│       └── geometryUtils.ts       # Math and geometry helpers
├── utils/
│   ├── presets.ts                 # Curated preset definitions
│   ├── palettes.ts                # Color palette library
│   ├── export.ts                  # Export utility functions
│   ├── cn.ts                      # Classname merge utility
│   └── constants.ts               # Global constants and configs
├── types/
│   ├── art.ts                     # Art state interfaces
│   ├── modes.ts                   # Generative mode types
│   └── controls.ts                # Control configuration types
├── store/
│   └── artStore.ts                # Zustand store definition
├── styles/
│   ├── globals.css                # Global styles, CSS variables
│   ├── canvas.css                 # Canvas-specific styles
│   └── animations.css             # Keyframe animations
├── public/
│   ├── presets/                   # Preset thumbnail images
│   ├── palettes/                  # Color palette swatches
│   └── icons/                     # SVG icons
└── package.json
```

## Generative Art Modes

### 1. Particle Flow Field

**ParticleFlowField Algorithm:**

Uses Perlin noise to create a continuous flow field that guides particles:

```typescript
import SimplexNoise from 'simplex-noise';

interface FlowFieldParams {
  particleCount: number;
  speed: number;
  noiseScale: number;
  colorMode: 'gradient' | 'palette' | 'random';
  trailLength: number;
  particleSize: number;
}

export function particleFlowField(
  p: p5,
  params: FlowFieldParams,
  time: number
) {
  const simplex = new SimplexNoise();
  const particles = [];

  // Initialize particles
  for (let i = 0; i < params.particleCount; i++) {
    particles.push({
      x: Math.random() * p.width,
      y: Math.random() * p.height,
      vx: 0,
      vy: 0,
      age: 0,
    });
  }

  // Animation loop
  p.draw = () => {
    // Optional: fade background for trailing effect
    p.background(255, 255, 255, 25);

    particles.forEach((particle, i) => {
      // Get flow vector from noise field
      const angle = simplex.noise2D(
        particle.x / params.noiseScale,
        particle.y / params.noiseScale + time * 0.001
      ) * Math.PI * 2;

      // Apply velocity from flow field
      particle.vx = Math.cos(angle) * params.speed;
      particle.vy = Math.sin(angle) * params.speed;

      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;

      // Wrap around edges
      if (particle.x < 0) particle.x = p.width;
      if (particle.x > p.width) particle.x = 0;
      if (particle.y < 0) particle.y = p.height;
      if (particle.y > p.height) particle.y = 0;

      // Draw particle with fade
      const alpha = Math.max(0, 255 * (1 - particle.age / params.trailLength));
      p.fill(100, 150, 200, alpha);
      p.noStroke();
      p.ellipse(particle.x, particle.y, params.particleSize);

      particle.age = (particle.age + 1) % params.trailLength;
    });
  };
}
```

Controls:
- **Particle Count**: 100 - 10,000 (affects performance)
- **Speed**: 0.1 - 5 (pixel movement per frame)
- **Noise Scale**: 10 - 500 (frequency of flow field changes)
- **Color Mode**: Gradient (smooth color transition), Palette (discrete colors), Random
- **Trail Length**: 0 - 255 (opacity fade effect)
- **Particle Size**: 1 - 20 pixels

### 2. Fractal Tree

**Recursive branching tree with natural variations:**

```typescript
interface FractalTreeParams {
  angle: number;           // Branch angle (0-90 degrees)
  depth: number;           // Recursion depth (5-15)
  lengthDecay: number;     // 0.6-0.9 (each branch shorter)
  wind: number;            // -30 to 30 (bend effect)
  thickness: number;       // Initial branch thickness
  colorMode: 'gradient' | 'palette' | 'leaves';
}

export function fractalTree(
  p: p5,
  params: FractalTreeParams,
  time: number
) {
  const drawBranch = (
    x: number,
    y: number,
    angle: number,
    depth: number,
    length: number
  ) => {
    if (depth === 0) {
      // Draw leaves at endpoints
      p.fill(100, 180, 50);
      p.ellipse(x, y, 10, 10);
      return;
    }

    // Calculate end point
    const endX = x + Math.cos(angle) * length;
    const endY = y + Math.sin(angle) * length;

    // Draw branch
    p.stroke(100, 70, 40);
    p.strokeWeight(params.thickness * (depth / params.depth));
    p.line(x, y, endX, endY);

    // Apply wind effect (sways over time)
    const windOffset = Math.sin(time * 0.002 + depth) * params.wind;

    // Recurse for left branch
    drawBranch(
      endX,
      endY,
      angle - params.angle * Math.PI / 180 + windOffset,
      depth - 1,
      length * params.lengthDecay
    );

    // Recurse for right branch
    drawBranch(
      endX,
      endY,
      angle + params.angle * Math.PI / 180 - windOffset,
      depth - 1,
      length * params.lengthDecay
    );
  };

  p.draw = () => {
    p.background(220);
    p.translate(p.width / 2, p.height);
    drawBranch(0, 0, -Math.PI / 2, params.depth, 100);
  };
}
```

Controls:
- **Branch Angle**: 10 - 90 degrees
- **Recursion Depth**: 5 - 15 levels
- **Length Decay**: 0.5 - 0.95 (how much each branch shrinks)
- **Wind**: -30 to 30 (bending effect)
- **Thickness**: 1 - 5 pixels
- **Color Mode**: Gradient (age-based), Palette (preset colors), Leaves (green tips)

### 3. Circle Packing

**Circles grow until collision with neighbors:**

```typescript
interface CirclePackingParams {
  growthRate: number;      // How fast circles expand
  minRadius: number;       // Minimum circle size
  maxRadius: number;       // Maximum circle size
  circleCount: number;     // 50-1000
  colorMode: 'random' | 'palette' | 'distance';
}

export function circlePacking(
  p: p5,
  params: CirclePackingParams
) {
  const circles: Circle[] = [];

  interface Circle {
    x: number;
    y: number;
    r: number;
    growing: boolean;
    color: [number, number, number];
  }

  // Spawn new circles
  for (let i = 0; i < params.circleCount; i++) {
    circles.push({
      x: Math.random() * p.width,
      y: Math.random() * p.height,
      r: params.minRadius,
      growing: true,
      color: [
        Math.random() * 255,
        Math.random() * 255,
        Math.random() * 255,
      ],
    });
  }

  p.draw = () => {
    p.background(20);

    circles.forEach((circle, i) => {
      // Grow circle
      if (circle.growing) {
        circle.r += params.growthRate;

        // Check collision with other circles
        for (let j = 0; j < i; j++) {
          const other = circles[j];
          const distance = p.dist(circle.x, circle.y, other.x, other.y);
          const minDistance = circle.r + other.r;

          if (distance <= minDistance) {
            circle.r = Math.min(circle.r, minDistance - other.r);
            circle.growing = false;
            break;
          }
        }

        // Stop growing if max size reached
        if (circle.r >= params.maxRadius) {
          circle.growing = false;
        }
      }

      // Draw circle
      p.fill(circle.color[0], circle.color[1], circle.color[2]);
      p.stroke(255);
      p.strokeWeight(1);
      p.ellipse(circle.x, circle.y, circle.r * 2);
    });
  };
}
```

Controls:
- **Growth Rate**: 0.1 - 5 pixels/frame
- **Min Radius**: 2 - 20 pixels
- **Max Radius**: 50 - 300 pixels
- **Circle Count**: 50 - 1000
- **Color Mode**: Random (each circle unique), Palette (preset colors), Distance (based on center distance)

### 4. Wave Interference

**Overlapping sine/cosine waves creating interference patterns:**

```typescript
interface WaveParams {
  frequency1: number;      // 0.1 - 2
  frequency2: number;      // 0.1 - 2
  amplitude1: number;      // 10 - 100
  amplitude2: number;      // 10 - 100
  phase: number;           // 0 - 360 (degrees)
  colorMode: 'frequency' | 'amplitude' | 'phase';
}

export function waveInterference(
  p: p5,
  params: WaveParams,
  time: number
) {
  const pixelSize = 4;

  p.draw = () => {
    p.loadPixels();

    for (let x = 0; x < p.width; x += pixelSize) {
      for (let y = 0; y < p.height; y += pixelSize) {
        // Create waves
        const wave1 = Math.sin(
          (x * params.frequency1 + time * 0.001) * Math.PI / 180
        ) * params.amplitude1;

        const wave2 = Math.cos(
          (y * params.frequency2 + params.phase) * Math.PI / 180
        ) * params.amplitude2;

        // Interference
        const interference = wave1 + wave2;

        // Map to color
        const brightness = Math.abs(interference) % 256;

        for (let px = 0; px < pixelSize; px++) {
          for (let py = 0; py < pixelSize; py++) {
            const idx = ((y + py) * p.width + (x + px)) * 4;
            p.pixels[idx] = brightness;      // R
            p.pixels[idx + 1] = brightness;  // G
            p.pixels[idx + 2] = brightness;  // B
            p.pixels[idx + 3] = 255;         // A
          }
        }
      }
    }

    p.updatePixels();
  };
}
```

Controls:
- **Frequency 1**: 0.1 - 2 (wavelength along X)
- **Frequency 2**: 0.1 - 2 (wavelength along Y)
- **Amplitude 1**: 10 - 100 pixels
- **Amplitude 2**: 10 - 100 pixels
- **Phase Offset**: 0 - 360 degrees
- **Color Mode**: Frequency (based on wave frequency), Amplitude (based on height), Phase (based on phase shift)

### 5. Voronoi Art

**Animated Voronoi diagram with distance-based coloring:**

```typescript
interface VoronoiParams {
  seedCount: number;       // 5 - 100
  animate: boolean;        // Move seeds over time
  colorMode: 'distance' | 'seed' | 'gradient';
  cellBorder: boolean;     // Draw cell boundaries
}

export function voronoiArt(
  p: p5,
  params: VoronoiParams,
  time: number
) {
  const seeds: { x: number; y: number; color: [number, number, number] }[] = [];

  // Initialize seeds
  for (let i = 0; i < params.seedCount; i++) {
    seeds.push({
      x: Math.random() * p.width,
      y: Math.random() * p.height,
      color: [
        Math.random() * 255,
        Math.random() * 255,
        Math.random() * 255,
      ],
    });
  }

  const pixelSize = 2;

  p.draw = () => {
    // Animate seed positions
    if (params.animate) {
      seeds.forEach((seed, i) => {
        seed.x += Math.sin(time * 0.0005 + i) * 0.5;
        seed.y += Math.cos(time * 0.0005 + i * 2) * 0.5;

        // Wrap around
        seed.x = (seed.x + p.width) % p.width;
        seed.y = (seed.y + p.height) % p.height;
      });
    }

    p.loadPixels();

    for (let x = 0; x < p.width; x += pixelSize) {
      for (let y = 0; y < p.height; y += pixelSize) {
        // Find closest seed
        let closestSeed = 0;
        let closestDist = Infinity;

        seeds.forEach((seed, i) => {
          const dist = Math.hypot(x - seed.x, y - seed.y);
          if (dist < closestDist) {
            closestDist = dist;
            closestSeed = i;
          }
        });

        const seed = seeds[closestSeed];
        let r = seed.color[0];
        let g = seed.color[1];
        let b = seed.color[2];

        // Brighten/darken based on distance (params.colorMode)
        const brightness = Math.max(0, 255 - closestDist * 0.5);
        r = Math.min(255, r + brightness * 0.3);
        g = Math.min(255, g + brightness * 0.3);
        b = Math.min(255, b + brightness * 0.3);

        for (let px = 0; px < pixelSize; px++) {
          for (let py = 0; py < pixelSize; py++) {
            const idx = ((y + py) * p.width + (x + px)) * 4;
            p.pixels[idx] = r;
            p.pixels[idx + 1] = g;
            p.pixels[idx + 2] = b;
            p.pixels[idx + 3] = 255;
          }
        }
      }
    }

    p.updatePixels();

    // Draw cell borders
    if (params.cellBorder) {
      p.stroke(0, 50);
      seeds.forEach((seed) => {
        p.point(seed.x, seed.y);
      });
    }
  };
}
```

Controls:
- **Seed Count**: 5 - 100
- **Animate**: Toggle moving seeds
- **Color Mode**: Distance (distance-based shading), Seed (solid colors), Gradient (smooth gradients)
- **Cell Border**: Draw or hide Voronoi cell edges

### 6. Spirograph

**Parametric curves creating spirograph-like patterns:**

```typescript
interface SpirographParams {
  outerRadius: number;     // 50 - 300
  innerRadius: number;     // 1 - outerRadius
  penOffset: number;       // 0 - innerRadius
  speed: number;           // 0.1 - 2
  colorMode: 'hue' | 'time' | 'position';
}

export function spirograph(
  p: p5,
  params: SpirographParams,
  time: number
) {
  const points: { x: number; y: number; color: number }[] = [];

  p.draw = () => {
    if (points.length === 0) {
      p.background(255);
    }

    // Generate new point
    const R = params.outerRadius;
    const r = params.innerRadius;
    const d = params.penOffset;

    const t = (time * params.speed * 0.001) % (2 * Math.PI);

    const x =
      p.width / 2 +
      ((R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t));
    const y =
      p.height / 2 +
      ((R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t));

    const hue = (t / (2 * Math.PI)) * 360;

    points.push({ x, y, color: hue });

    // Draw line from last point
    if (points.length > 1) {
      const prev = points[points.length - 2];
      p.stroke(hue, 255, 200);
      p.strokeWeight(2);
      p.line(prev.x, prev.y, x, y);
    }

    // Clear old points if too many
    if (points.length > 5000) {
      points.shift();
    }
  };
}
```

Controls:
- **Outer Radius**: 50 - 300 pixels
- **Inner Radius**: 1 - (outer radius)
- **Pen Offset**: 0 - (inner radius)
- **Speed**: 0.1 - 2 iterations/frame
- **Color Mode**: Hue (rainbow), Time (gradient), Position (based on location)

## Control Panel & UI Components

### ControlPanel.tsx

Main control interface with mode selection and parameter sliders:

```typescript
export function ControlPanel() {
  const {
    mode,
    setMode,
    params,
    updateParams,
    resetParams,
    randomize,
  } = useArtState();

  return (
    <motion.div
      initial={{ opacity: 0, x: -400 }}
      animate={{ opacity: 1, x: 0 }}
      className="fixed left-0 top-0 h-screen w-96 bg-gray-900/95 backdrop-blur border-r border-white/10 overflow-y-auto p-6"
    >
      <h2 className="text-2xl font-bold mb-6">Generative Art</h2>

      {/* Mode Selector */}
      <div className="mb-8">
        <label className="text-sm font-semibold text-gray-300 mb-2 block">
          Art Mode
        </label>
        <select
          value={mode}
          onChange={(e) => setMode(e.target.value as ArtMode)}
          className="w-full px-4 py-2 bg-gray-800 rounded border border-gray-700 text-white"
        >
          <option value="flow-field">Particle Flow Field</option>
          <option value="fractal-tree">Fractal Tree</option>
          <option value="circle-packing">Circle Packing</option>
          <option value="wave-interference">Wave Interference</option>
          <option value="voronoi">Voronoi Art</option>
          <option value="spirograph">Spirograph</option>
        </select>
      </div>

      {/* Sliders for current mode */}
      <div className="space-y-6 mb-8">
        {Object.entries(params).map(([key, value]) => (
          <SliderControl
            key={key}
            label={key.replace(/([A-Z])/g, ' $1')}
            value={value}
            onChange={(newValue) => updateParams(key, newValue)}
            min={getControlRange(mode, key).min}
            max={getControlRange(mode, key).max}
            step={getControlRange(mode, key).step}
          />
        ))}
      </div>

      {/* Color Palette Selector */}
      <ColorPicker />

      {/* Preset Selector */}
      <PresetSelector />

      {/* Action Buttons */}
      <div className="grid grid-cols-2 gap-4">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={randomize}
          className="px-4 py-2 bg-purple-600 rounded hover:bg-purple-700"
        >
          Randomize
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={resetParams}
          className="px-4 py-2 bg-gray-700 rounded hover:bg-gray-600"
        >
          Reset
        </motion.button>
      </div>
    </motion.div>
  );
}
```

### SliderControl.tsx

Individual slider with animated range input:

```typescript
import { useCallback } from 'react';

export function SliderControl({
  label,
  value,
  onChange,
  min,
  max,
  step,
}: Props) {
  return (
    <div>
      <div className="flex justify-between mb-2">
        <label className="text-sm font-semibold text-gray-300">{label}</label>
        <span className="text-sm text-gray-500">{value.toFixed(2)}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(parseFloat(e.target.value))}
        className="w-full h-2 bg-gray-700 rounded appearance-none cursor-pointer"
      />
    </div>
  );
}
```

### ColorPicker.tsx

Curated color palette selector with custom picker:

```typescript
const PALETTES = {
  neon: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC'],
  ocean: ['#001D3D', '#003566', '#0066CC', '#06A77D'],
  sunset: ['#FF6B6B', '#FFA500', '#FFD700', '#FFB347'],
  night: ['#0a0e27', '#16213e', '#0f3460', '#533483'],
};

export function ColorPicker() {
  const { palette, setPalette } = useArtState();

  return (
    <div className="mb-8">
      <label className="text-sm font-semibold text-gray-300 mb-3 block">
        Color Palette
      </label>
      <div className="grid grid-cols-2 gap-3">
        {Object.entries(PALETTES).map(([name, colors]) => (
          <motion.button
            key={name}
            whileHover={{ scale: 1.05 }}
            onClick={() => setPalette(colors)}
            className="flex gap-1 p-2 bg-gray-800 rounded border-2 border-transparent hover:border-white/20"
          >
            {colors.map((color) => (
              <div
                key={color}
                className="flex-1 h-6 rounded"
                style={{ backgroundColor: color }}
              />
            ))}
          </motion.button>
        ))}
      </div>
    </div>
  );
}
```

## Export & Download Functionality

### High-Resolution Export

Export canvas at multiple resolutions (1x, 2x, 4x):

```typescript
export async function exportAsImage(
  canvas: HTMLCanvasElement,
  resolution: 1 | 2 | 4,
  format: 'png' | 'jpg'
) {
  // Create off-screen canvas at higher resolution
  const offCanvas = document.createElement('canvas');
  offCanvas.width = canvas.width * resolution;
  offCanvas.height = canvas.height * resolution;

  const ctx = offCanvas.getContext('2d')!;
  ctx.scale(resolution, resolution);
  ctx.drawImage(canvas, 0, 0);

  // Convert to blob
  return new Promise<Blob>((resolve) => {
    offCanvas.toBlob(
      (blob) => resolve(blob!),
      format === 'png' ? 'image/png' : 'image/jpeg',
      0.95
    );
  });
}

export async function downloadImage(
  canvas: HTMLCanvasElement,
  filename: string,
  resolution: 1 | 2 | 4 = 2
) {
  const blob = await exportAsImage(canvas, resolution, 'png');
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}
```

### Export Panel

```typescript
export function ExportPanel({ canvasRef }: Props) {
  const [resolution, setResolution] = useState<1 | 2 | 4>(2);

  return (
    <motion.div
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      className="fixed bottom-8 right-8 bg-gray-900 rounded-lg p-6 border border-white/20"
    >
      <h3 className="font-bold mb-4">Export</h3>

      <div className="mb-4">
        <label className="text-sm mb-2 block">Resolution</label>
        <select
          value={resolution}
          onChange={(e) => setResolution(parseInt(e.target.value) as 1 | 2 | 4)}
          className="w-full px-3 py-2 bg-gray-800 rounded border border-gray-700"
        >
          <option value={1}>1x (Canvas size)</option>
          <option value={2}>2x (2K)</option>
          <option value={4}>4x (4K)</option>
        </select>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() =>
            downloadImage(canvasRef.current!, `art-${Date.now()}.png`, resolution)
          }
          className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
        >
          PNG
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05 }}
          onClick={() =>
            downloadImage(canvasRef.current!, `art-${Date.now()}.jpg`, resolution)
          }
          className="px-4 py-2 bg-green-600 rounded hover:bg-green-700"
        >
          JPG
        </motion.button>
      </div>
    </motion.div>
  );
}
```

## Gallery & Persistence

### Local Storage Gallery

Save artworks to browser localStorage:

```typescript
interface SavedArtwork {
  id: string;
  timestamp: number;
  mode: ArtMode;
  params: Record<string, number>;
  thumbnail: string; // Base64 canvas image
}

export function saveArtwork(
  canvas: HTMLCanvasElement,
  mode: ArtMode,
  params: Record<string, number>
) {
  const artwork: SavedArtwork = {
    id: crypto.randomUUID(),
    timestamp: Date.now(),
    mode,
    params,
    thumbnail: canvas.toDataURL('image/png', 0.3),
  };

  const existing = JSON.parse(localStorage.getItem('artworks') || '[]');
  localStorage.setItem('artworks', JSON.stringify([...existing, artwork]));

  return artwork;
}

export function loadArtworks(): SavedArtwork[] {
  return JSON.parse(localStorage.getItem('artworks') || '[]');
}
```

### Gallery View

```typescript
export function ArtworkCard({ artwork, onDelete }: Props) {
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      className="relative group cursor-pointer"
    >
      <img
        src={artwork.thumbnail}
        alt="Artwork"
        className="w-full h-48 object-cover rounded"
      />

      <motion.div
        initial={{ opacity: 0 }}
        whileHover={{ opacity: 1 }}
        className="absolute inset-0 bg-black/50 rounded flex items-center justify-center gap-3"
      >
        <button className="px-3 py-2 bg-blue-600 rounded text-sm">
          Load
        </button>
        <button
          onClick={() => onDelete(artwork.id)}
          className="px-3 py-2 bg-red-600 rounded text-sm"
        >
          Delete
        </button>
      </motion.div>

      <p className="text-sm text-gray-400 mt-2">
        {new Date(artwork.timestamp).toLocaleDateString()}
      </p>
    </motion.div>
  );
}
```

## Performance Monitoring

### PerformanceMonitor Component

```typescript
export function PerformanceMonitor() {
  const [fps, setFps] = useState(60);
  const [particleCount, setParticleCount] = useState(0);

  useEffect(() => {
    let frameCount = 0;
    let lastTime = performance.now();

    const measureFps = () => {
      frameCount++;
      const currentTime = performance.now();

      if (currentTime - lastTime >= 1000) {
        setFps(frameCount);
        frameCount = 0;
        lastTime = currentTime;
      }

      requestAnimationFrame(measureFps);
    };

    measureFps();
  }, []);

  return (
    <div className="fixed top-4 left-4 bg-black/50 px-4 py-2 rounded text-sm text-green-400">
      <p>FPS: {fps}</p>
      <p>Particles: {particleCount}</p>
    </div>
  );
}
```

## Accessibility & Responsive Design

- **Keyboard Controls**: Keyboard shortcuts for play/pause, export, randomize
- **Screen Reader Support**: Descriptive labels for sliders and buttons
- **Mobile Layout**: Bottom sheet controls on mobile, full canvas on desktop
- **Touch Sliders**: Large touch targets for mobile interaction
- **Color Blind Support**: Option for colorblind-friendly palettes

## Performance Optimization Strategies

1. **Web Workers**: Offload heavy calculations to worker thread
2. **OffscreenCanvas**: Export high-res images without blocking UI
3. **Throttling**: Debounce slider updates during parameter changes
4. **Canvas Caching**: Cache static parts, only redraw changed regions
5. **Lazy Loading**: Load algorithm files only when mode is selected

This skill provides comprehensive guidance for building engaging, performant generative art tools that empower creative expression through code and intuitive controls.
