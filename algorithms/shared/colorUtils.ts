import p5 from 'p5';
import { hexToRgb, getPaletteColors } from '@/utils/palettes';

export function getColorFromPalette(
  p: p5,
  paletteName: string,
  index: number,
  alpha: number = 255
): p5.Color {
  const colors = getPaletteColors(paletteName);
  const hex = colors[index % colors.length];
  const [r, g, b] = hexToRgb(hex);
  return p.color(r, g, b, alpha);
}

export function getColorByRatio(
  p: p5,
  paletteName: string,
  ratio: number,
  alpha: number = 255
): p5.Color {
  const colors = getPaletteColors(paletteName);
  const clampedRatio = Math.max(0, Math.min(1, ratio));
  const scaledIndex = clampedRatio * (colors.length - 1);
  const lowIndex = Math.floor(scaledIndex);
  const highIndex = Math.min(lowIndex + 1, colors.length - 1);
  const t = scaledIndex - lowIndex;

  const [r1, g1, b1] = hexToRgb(colors[lowIndex]);
  const [r2, g2, b2] = hexToRgb(colors[highIndex]);

  return p.color(
    r1 + (r2 - r1) * t,
    g1 + (g2 - g1) * t,
    b1 + (b2 - b1) * t,
    alpha
  );
}

export function hslToRgb(h: number, s: number, l: number): [number, number, number] {
  h = h / 360;
  s = s / 100;
  l = l / 100;
  let r, g, b;

  if (s === 0) {
    r = g = b = l;
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const pp = 2 * l - q;
    r = hue2rgb(pp, q, h + 1 / 3);
    g = hue2rgb(pp, q, h);
    b = hue2rgb(pp, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
