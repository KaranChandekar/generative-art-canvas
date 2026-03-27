import p5 from 'p5';
import { ModeParams } from '@/types/art';
import { getColorFromPalette, getColorByRatio } from './shared/colorUtils';

interface Circle {
  x: number;
  y: number;
  r: number;
  growing: boolean;
  colorIndex: number;
}

let circles: Circle[] = [];
let lastCount = 0;
let attemptsPerFrame = 10;

export function setupCirclePacking(p: p5, params: ModeParams) {
  circles = [];
  lastCount = 0;
  p.background(15, 15, 20);
}

export function drawCirclePacking(
  p: p5,
  params: ModeParams,
  palette: string,
  frameCount: number
) {
  p.background(15, 15, 20);

  const targetCount = Math.floor(params.circleCount);

  // Try to add new circles
  if (circles.length < targetCount) {
    for (let attempts = 0; attempts < attemptsPerFrame; attempts++) {
      if (circles.length >= targetCount) break;

      const x = Math.random() * p.width;
      const y = Math.random() * p.height;

      // Check if position is valid (not inside existing circle)
      let valid = true;
      for (const c of circles) {
        const d = Math.hypot(x - c.x, y - c.y);
        if (d < c.r + params.minRadius) {
          valid = false;
          break;
        }
      }

      if (valid) {
        circles.push({
          x,
          y,
          r: params.minRadius,
          growing: true,
          colorIndex: circles.length,
        });
      }
    }
  }

  // Grow circles
  for (const circle of circles) {
    if (!circle.growing) continue;

    circle.r += params.growthRate * 0.3;

    // Check collision with edges
    if (
      circle.x - circle.r < 0 ||
      circle.x + circle.r > p.width ||
      circle.y - circle.r < 0 ||
      circle.y + circle.r > p.height
    ) {
      circle.growing = false;
      continue;
    }

    // Check collision with other circles
    for (const other of circles) {
      if (other === circle) continue;
      const d = Math.hypot(circle.x - other.x, circle.y - other.y);
      if (d < circle.r + other.r + 1) {
        circle.growing = false;
        break;
      }
    }

    // Max radius check
    if (circle.r >= params.maxRadius) {
      circle.growing = false;
    }
  }

  // Draw all circles
  for (const circle of circles) {
    const ratio = (circle.colorIndex * 0.1 + frameCount * 0.001) % 1;
    const col = getColorByRatio(p, palette, ratio, 220);
    p.fill(col);
    p.stroke(255, 30);
    p.strokeWeight(1);
    p.ellipse(circle.x, circle.y, circle.r * 2);
  }

  // Reset if params changed significantly
  if (targetCount !== lastCount && Math.abs(targetCount - lastCount) > 50) {
    circles = [];
    lastCount = targetCount;
  } else {
    lastCount = targetCount;
  }
}
