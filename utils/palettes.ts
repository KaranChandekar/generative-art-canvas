export const PALETTES: Record<string, string[]> = {
  neon: ['#FF006E', '#FB5607', '#FFBE0B', '#8338EC', '#3A86FF'],
  ocean: ['#001D3D', '#003566', '#0077B6', '#00B4D8', '#90E0EF'],
  sunset: ['#FF6B6B', '#FF8E53', '#FFA500', '#FFD700', '#FFB347'],
  night: ['#0A0E27', '#16213E', '#0F3460', '#533483', '#E94560'],
  forest: ['#1B4332', '#2D6A4F', '#40916C', '#52B788', '#95D5B2'],
  candy: ['#FF69B4', '#FF1493', '#C71585', '#DB7093', '#FFB6C1'],
  monochrome: ['#111111', '#333333', '#666666', '#999999', '#CCCCCC'],
  aurora: ['#00FF87', '#60EFFF', '#0061FF', '#B200FF', '#FF00D4'],
};

export const PALETTE_NAMES = Object.keys(PALETTES);

export function getPaletteColors(name: string): string[] {
  return PALETTES[name] || PALETTES.neon;
}

export function hexToRgb(hex: string): [number, number, number] {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result
    ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)]
    : [255, 255, 255];
}
