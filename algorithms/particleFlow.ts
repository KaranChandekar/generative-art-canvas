import p5 from 'p5';
import { createNoise2D } from 'simplex-noise';
import { ModeParams } from '@/types/art';
import { getColorByRatio } from './shared/colorUtils';

interface Particle {
  x: number;
  y: number;
  prevX: number;
  prevY: number;
  age: number;
}

let particles: Particle[] = [];
let noise2D: ReturnType<typeof createNoise2D>;
let lastParticleCount = 0;

export function setupParticleFlow(p: p5, params: ModeParams) {
  noise2D = createNoise2D();
  particles = [];
  lastParticleCount = params.particleCount;
  for (let i = 0; i < params.particleCount; i++) {
    particles.push({
      x: Math.random() * p.width,
      y: Math.random() * p.height,
      prevX: Math.random() * p.width,
      prevY: Math.random() * p.height,
      age: Math.floor(Math.random() * (params.trailLength || 50)),
    });
  }
  p.background(10, 10, 15);
}

export function drawParticleFlow(
  p: p5,
  params: ModeParams,
  palette: string,
  frameCount: number
) {
  if (!noise2D) {
    noise2D = createNoise2D();
  }

  // Adjust particle count if changed
  const targetCount = Math.floor(params.particleCount);
  if (targetCount !== lastParticleCount) {
    while (particles.length < targetCount) {
      particles.push({
        x: Math.random() * p.width,
        y: Math.random() * p.height,
        prevX: Math.random() * p.width,
        prevY: Math.random() * p.height,
        age: 0,
      });
    }
    if (particles.length > targetCount) {
      particles.length = targetCount;
    }
    lastParticleCount = targetCount;
  }

  // Fade background for trail effect
  p.noStroke();
  p.fill(10, 10, 15, 255 / Math.max(5, params.trailLength * 0.5));
  p.rect(0, 0, p.width, p.height);

  const time = frameCount * 0.002;

  for (let i = 0; i < particles.length; i++) {
    const particle = particles[i];
    particle.prevX = particle.x;
    particle.prevY = particle.y;

    // Flow field angle from noise
    const angle =
      noise2D(
        particle.x / params.noiseScale,
        particle.y / params.noiseScale + time
      ) *
      Math.PI *
      4;

    particle.x += Math.cos(angle) * params.speed;
    particle.y += Math.sin(angle) * params.speed;
    particle.age++;

    // Wrap around edges
    if (particle.x < 0) particle.x = p.width;
    if (particle.x > p.width) particle.x = 0;
    if (particle.y < 0) particle.y = p.height;
    if (particle.y > p.height) particle.y = 0;

    // Reset old particles
    if (particle.age > params.trailLength * 5) {
      particle.x = Math.random() * p.width;
      particle.y = Math.random() * p.height;
      particle.prevX = particle.x;
      particle.prevY = particle.y;
      particle.age = 0;
    }

    const ratio = (i / particles.length + frameCount * 0.001) % 1;
    const alpha = Math.min(255, 180);
    const col = getColorByRatio(p, palette, ratio, alpha);
    p.stroke(col);
    p.strokeWeight(params.particleSize);
    p.line(particle.prevX, particle.prevY, particle.x, particle.y);
  }
}
