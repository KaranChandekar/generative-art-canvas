import { ArtMode, ModeParams, SliderConfig } from '@/types/art';

export const MODE_LABELS: Record<ArtMode, string> = {
  'flow-field': 'Particle Flow Field',
  'fractal-tree': 'Fractal Tree',
  'circle-packing': 'Circle Packing',
  'wave-interference': 'Wave Interference',
  voronoi: 'Voronoi Art',
  spirograph: 'Spirograph',
};

export const DEFAULT_PARAMS: Record<ArtMode, ModeParams> = {
  'flow-field': {
    particleCount: 2000,
    speed: 1.5,
    noiseScale: 200,
    trailLength: 50,
    particleSize: 2,
  },
  'fractal-tree': {
    angle: 25,
    depth: 10,
    lengthDecay: 0.72,
    wind: 0,
    thickness: 3,
  },
  'circle-packing': {
    growthRate: 1,
    minRadius: 3,
    maxRadius: 80,
    circleCount: 300,
  },
  'wave-interference': {
    frequency1: 0.5,
    frequency2: 0.5,
    amplitude1: 50,
    amplitude2: 50,
    phase: 0,
  },
  voronoi: {
    seedCount: 30,
    animate: 1,
    cellBorder: 1,
    speed: 1,
  },
  spirograph: {
    outerRadius: 200,
    innerRadius: 80,
    penOffset: 60,
    speed: 1,
  },
};

export const SLIDER_CONFIGS: Record<ArtMode, Record<string, SliderConfig>> = {
  'flow-field': {
    particleCount: { min: 100, max: 10000, step: 100, label: 'Particle Count' },
    speed: { min: 0.1, max: 5, step: 0.1, label: 'Speed' },
    noiseScale: { min: 10, max: 500, step: 10, label: 'Noise Scale' },
    trailLength: { min: 5, max: 200, step: 5, label: 'Trail Length' },
    particleSize: { min: 1, max: 20, step: 0.5, label: 'Particle Size' },
  },
  'fractal-tree': {
    angle: { min: 10, max: 90, step: 1, label: 'Branch Angle' },
    depth: { min: 5, max: 14, step: 1, label: 'Recursion Depth' },
    lengthDecay: { min: 0.5, max: 0.95, step: 0.01, label: 'Length Decay' },
    wind: { min: -30, max: 30, step: 1, label: 'Wind' },
    thickness: { min: 1, max: 8, step: 0.5, label: 'Thickness' },
  },
  'circle-packing': {
    growthRate: { min: 0.1, max: 5, step: 0.1, label: 'Growth Rate' },
    minRadius: { min: 2, max: 20, step: 1, label: 'Min Radius' },
    maxRadius: { min: 30, max: 300, step: 10, label: 'Max Radius' },
    circleCount: { min: 50, max: 1000, step: 50, label: 'Circle Count' },
  },
  'wave-interference': {
    frequency1: { min: 0.1, max: 2, step: 0.05, label: 'Frequency 1' },
    frequency2: { min: 0.1, max: 2, step: 0.05, label: 'Frequency 2' },
    amplitude1: { min: 10, max: 100, step: 5, label: 'Amplitude 1' },
    amplitude2: { min: 10, max: 100, step: 5, label: 'Amplitude 2' },
    phase: { min: 0, max: 360, step: 5, label: 'Phase Offset' },
  },
  voronoi: {
    seedCount: { min: 5, max: 100, step: 1, label: 'Seed Count' },
    animate: { min: 0, max: 1, step: 1, label: 'Animate' },
    cellBorder: { min: 0, max: 1, step: 1, label: 'Cell Borders' },
    speed: { min: 0.1, max: 3, step: 0.1, label: 'Speed' },
  },
  spirograph: {
    outerRadius: { min: 50, max: 300, step: 5, label: 'Outer Radius' },
    innerRadius: { min: 5, max: 200, step: 5, label: 'Inner Radius' },
    penOffset: { min: 1, max: 150, step: 1, label: 'Pen Offset' },
    speed: { min: 0.1, max: 3, step: 0.1, label: 'Speed' },
  },
};

export const ALL_MODES: ArtMode[] = [
  'flow-field',
  'fractal-tree',
  'circle-packing',
  'wave-interference',
  'voronoi',
  'spirograph',
];

export const MAX_HISTORY = 10;
export const MAX_GALLERY = 50;
