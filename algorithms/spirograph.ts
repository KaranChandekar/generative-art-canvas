import p5 from 'p5';
import { ModeParams } from '@/types/art';
import { getPaletteColors, hexToRgb } from '@/utils/palettes';
import { hslToRgb } from './shared/colorUtils';

let prevX: number | null = null;
let prevY: number | null = null;
let t = 0;
let needsReset = true;

export function setupSpirograph(p: p5) {
  p.background(10, 10, 15);
  prevX = null;
  prevY = null;
  t = 0;
  needsReset = false;
}

export function drawSpirograph(
  p: p5,
  params: ModeParams,
  palette: string,
  frameCount: number
) {
  if (needsReset) {
    p.background(10, 10, 15);
    prevX = null;
    prevY = null;
    t = 0;
    needsReset = false;
  }

  const R = params.outerRadius;
  const r = Math.min(params.innerRadius, R - 1);
  const d = Math.min(params.penOffset, r);
  const colors = getPaletteColors(palette);
  const stepsPerFrame = Math.max(1, Math.floor(params.speed * 20));

  for (let step = 0; step < stepsPerFrame; step++) {
    t += 0.02;

    const x = p.width / 2 + (R - r) * Math.cos(t) + d * Math.cos(((R - r) / r) * t);
    const y = p.height / 2 + (R - r) * Math.sin(t) - d * Math.sin(((R - r) / r) * t);

    if (prevX !== null && prevY !== null) {
      // Color based on angle
      const hue = (t * 30) % 360;
      const colorIdx = Math.floor((t * 2) % colors.length);
      const [cr, cg, cb] = hexToRgb(colors[colorIdx]);

      p.stroke(cr, cg, cb, 200);
      p.strokeWeight(1.5);
      p.line(prevX, prevY, x, y);
    }

    prevX = x;
    prevY = y;
  }

  // Slowly fade for layered effect
  if (frameCount % 300 === 0 && frameCount > 0) {
    p.noStroke();
    p.fill(10, 10, 15, 5);
    p.rect(0, 0, p.width, p.height);
  }
}

export function resetSpirograph() {
  needsReset = true;
}
