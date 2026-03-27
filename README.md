# Generative Art Canvas

A real-time generative art creation tool built with Next.js and p5.js. Create procedural artwork through interactive controls, save to a gallery, and export high-resolution images.

## Features

- **6 Art Modes** — Particle Flow Fields, Fractal Trees, Circle Packing, Spirograph, Wave Interference, and Voronoi Art
- **Real-Time Controls** — Adjust parameters with sliders and see changes instantly on canvas
- **Color Palettes** — Choose from curated palettes or customize colors
- **Presets** — Save and load named parameter combinations
- **Gallery** — Save artwork with thumbnails, browse and manage up to 50 pieces
- **Export** — Download artwork as PNG images
- **Undo/Redo** — Step through parameter history with Ctrl+Z / Ctrl+Y
- **Keyboard Shortcuts** — Space (pause), R (randomize), E (export)
- **Responsive** — Desktop sidebar controls with a mobile-friendly bottom sheet

## Tech Stack

- **Next.js 15** with React 19 and TypeScript
- **p5.js** for canvas rendering and animation
- **Zustand** for state management with localStorage persistence
- **Tailwind CSS 4** for styling
- **Framer Motion** for UI animations
- **simplex-noise** for organic procedural patterns

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to start creating.

## Art Modes

| Mode | Description |
|------|-------------|
| Particle Flow | Thousands of particles guided by Perlin noise flow vectors |
| Fractal Tree | Recursive branching structures with wind and depth controls |
| Circle Packing | Circles grow to fill the canvas while avoiding overlaps |
| Spirograph | Mathematical patterns from rotating circles and pen offsets |
| Wave Interference | Dual-frequency wave equations with phase offset controls |
| Voronoi Art | Animated Voronoi diagrams with moving seed points |
