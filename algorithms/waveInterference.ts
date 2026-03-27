import p5 from 'p5';
import { ModeParams } from '@/types/art';
import { getPaletteColors, hexToRgb } from '@/utils/palettes';

export function setupWaveInterference(p: p5) {
  p.background(0);
  p.pixelDensity(1);
}

export function drawWaveInterference(
  p: p5,
  params: ModeParams,
  palette: string,
  frameCount: number
) {
  const colors = getPaletteColors(palette);
  const pixelSize = 3;
  const time = frameCount * 0.02;

  p.loadPixels();

  for (let x = 0; x < p.width; x += pixelSize) {
    for (let y = 0; y < p.height; y += pixelSize) {
      const wave1 =
        Math.sin(x * params.frequency1 * 0.02 + time) * params.amplitude1;
      const wave2 =
        Math.cos(y * params.frequency2 * 0.02 + (params.phase * Math.PI) / 180 + time * 0.7) *
        params.amplitude2;
      const wave3 =
        Math.sin((x + y) * 0.01 * (params.frequency1 + params.frequency2) * 0.5 + time * 0.5) *
        ((params.amplitude1 + params.amplitude2) * 0.3);

      const interference = wave1 + wave2 + wave3;
      const normalized = (interference + 200) / 400; // Normalize to 0-1
      const clamped = Math.max(0, Math.min(1, normalized));

      // Map to palette color
      const colorIndex = clamped * (colors.length - 1);
      const lowIdx = Math.floor(colorIndex);
      const highIdx = Math.min(lowIdx + 1, colors.length - 1);
      const t = colorIndex - lowIdx;

      const [r1, g1, b1] = hexToRgb(colors[lowIdx]);
      const [r2, g2, b2] = hexToRgb(colors[highIdx]);

      const r = Math.round(r1 + (r2 - r1) * t);
      const g = Math.round(g1 + (g2 - g1) * t);
      const b = Math.round(b1 + (b2 - b1) * t);

      for (let px = 0; px < pixelSize && x + px < p.width; px++) {
        for (let py = 0; py < pixelSize && y + py < p.height; py++) {
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
}
