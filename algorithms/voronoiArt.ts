import p5 from 'p5';
import { ModeParams } from '@/types/art';
import { getPaletteColors, hexToRgb } from '@/utils/palettes';

interface Seed {
  x: number;
  y: number;
  vx: number;
  vy: number;
}

let seeds: Seed[] = [];
let lastSeedCount = 0;

export function setupVoronoi(p: p5, params: ModeParams) {
  seeds = [];
  lastSeedCount = 0;
  initSeeds(p, params);
  p.pixelDensity(1);
  p.background(0);
}

function initSeeds(p: p5, params: ModeParams) {
  const count = Math.floor(params.seedCount);
  seeds = [];
  for (let i = 0; i < count; i++) {
    seeds.push({
      x: Math.random() * p.width,
      y: Math.random() * p.height,
      vx: (Math.random() - 0.5) * 2,
      vy: (Math.random() - 0.5) * 2,
    });
  }
  lastSeedCount = count;
}

export function drawVoronoi(
  p: p5,
  params: ModeParams,
  palette: string,
  frameCount: number
) {
  const targetCount = Math.floor(params.seedCount);
  if (targetCount !== lastSeedCount) {
    initSeeds(p, params);
  }

  const colors = getPaletteColors(palette);
  const pixelSize = 4;

  // Animate seeds
  if (params.animate > 0.5) {
    for (const seed of seeds) {
      seed.x += seed.vx * params.speed;
      seed.y += seed.vy * params.speed;

      if (seed.x < 0 || seed.x > p.width) seed.vx *= -1;
      if (seed.y < 0 || seed.y > p.height) seed.vy *= -1;

      seed.x = Math.max(0, Math.min(p.width, seed.x));
      seed.y = Math.max(0, Math.min(p.height, seed.y));
    }
  }

  p.loadPixels();

  for (let x = 0; x < p.width; x += pixelSize) {
    for (let y = 0; y < p.height; y += pixelSize) {
      let closestIdx = 0;
      let closestDist = Infinity;
      let secondDist = Infinity;

      for (let i = 0; i < seeds.length; i++) {
        const dx = x - seeds[i].x;
        const dy = y - seeds[i].y;
        const dist = dx * dx + dy * dy;
        if (dist < closestDist) {
          secondDist = closestDist;
          closestDist = dist;
          closestIdx = i;
        } else if (dist < secondDist) {
          secondDist = dist;
        }
      }

      const hex = colors[closestIdx % colors.length];
      const [r, g, b] = hexToRgb(hex);

      // Distance-based shading
      const dist = Math.sqrt(closestDist);
      const shade = Math.max(0.3, 1 - dist * 0.003);

      // Border detection
      const borderDist = Math.sqrt(secondDist) - Math.sqrt(closestDist);
      const isBorder = params.cellBorder > 0.5 && borderDist < 3;

      for (let px = 0; px < pixelSize && x + px < p.width; px++) {
        for (let py = 0; py < pixelSize && y + py < p.height; py++) {
          const idx = ((y + py) * p.width + (x + px)) * 4;
          if (isBorder) {
            p.pixels[idx] = 255;
            p.pixels[idx + 1] = 255;
            p.pixels[idx + 2] = 255;
          } else {
            p.pixels[idx] = Math.round(r * shade);
            p.pixels[idx + 1] = Math.round(g * shade);
            p.pixels[idx + 2] = Math.round(b * shade);
          }
          p.pixels[idx + 3] = 255;
        }
      }
    }
  }

  p.updatePixels();

  // Draw seed points
  if (params.cellBorder > 0.5) {
    p.fill(255);
    p.noStroke();
    for (const seed of seeds) {
      p.ellipse(seed.x, seed.y, 4, 4);
    }
  }
}
