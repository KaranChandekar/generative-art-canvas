import p5 from 'p5';
import { ModeParams } from '@/types/art';
import { getColorByRatio } from './shared/colorUtils';

export function setupFractalTree(p: p5) {
  p.background(20, 20, 30);
}

export function drawFractalTree(
  p: p5,
  params: ModeParams,
  palette: string,
  frameCount: number
) {
  p.background(20, 20, 30);

  const maxDepth = Math.floor(params.depth);
  const time = frameCount * 0.01;
  const baseLength = Math.min(p.height, p.width) * 0.22;

  function drawBranch(
    x: number,
    y: number,
    angle: number,
    depth: number,
    length: number
  ) {
    if (depth <= 0) {
      // Draw leaves
      const leafCol = getColorByRatio(p, palette, 0.8, 200);
      p.noStroke();
      p.fill(leafCol);
      p.ellipse(x, y, 6 + Math.random() * 4, 6 + Math.random() * 4);
      return;
    }

    // Wind sway based on depth (deeper branches sway more)
    const windOffset =
      Math.sin(time + depth * 0.5) * params.wind * 0.005 * (maxDepth - depth);

    const endX = x + Math.cos(angle + windOffset) * length;
    const endY = y + Math.sin(angle + windOffset) * length;

    // Branch color based on depth
    const depthRatio = 1 - depth / maxDepth;
    const col = getColorByRatio(p, palette, depthRatio * 0.6, 255);
    p.stroke(col);
    p.strokeWeight(Math.max(1, params.thickness * (depth / maxDepth)));
    p.line(x, y, endX, endY);

    const angleRad = (params.angle * Math.PI) / 180;
    const nextLength = length * params.lengthDecay;

    // Left branch
    drawBranch(endX, endY, angle - angleRad, depth - 1, nextLength);
    // Right branch
    drawBranch(endX, endY, angle + angleRad, depth - 1, nextLength);
  }

  p.push();
  drawBranch(p.width / 2, p.height * 0.9, -Math.PI / 2, maxDepth, baseLength);
  p.pop();
}
