export type ArtMode =
  | 'flow-field'
  | 'fractal-tree'
  | 'circle-packing'
  | 'wave-interference'
  | 'voronoi'
  | 'spirograph';

export interface FlowFieldParams {
  particleCount: number;
  speed: number;
  noiseScale: number;
  trailLength: number;
  particleSize: number;
}

export interface FractalTreeParams {
  angle: number;
  depth: number;
  lengthDecay: number;
  wind: number;
  thickness: number;
}

export interface CirclePackingParams {
  growthRate: number;
  minRadius: number;
  maxRadius: number;
  circleCount: number;
}

export interface WaveInterferenceParams {
  frequency1: number;
  frequency2: number;
  amplitude1: number;
  amplitude2: number;
  phase: number;
}

export interface VoronoiParams {
  seedCount: number;
  animate: number;
  cellBorder: number;
  speed: number;
}

export interface SpirographParams {
  outerRadius: number;
  innerRadius: number;
  penOffset: number;
  speed: number;
}

export type ModeParams = Record<string, number>;

export interface SavedArtwork {
  id: string;
  timestamp: number;
  mode: ArtMode;
  params: ModeParams;
  palette: string;
  thumbnail: string;
}

export interface Preset {
  id: string;
  name: string;
  mode: ArtMode;
  params: ModeParams;
  palette: string;
}

export interface HistoryEntry {
  mode: ArtMode;
  params: Record<ArtMode, ModeParams>;
  palette: string;
}

export interface SliderConfig {
  min: number;
  max: number;
  step: number;
  label: string;
}
