import { saveAs } from 'file-saver';

export async function exportAsImage(
  canvas: HTMLCanvasElement,
  resolution: 1 | 2 | 4,
  format: 'png' | 'jpg'
): Promise<Blob> {
  const offCanvas = document.createElement('canvas');
  offCanvas.width = canvas.width * resolution;
  offCanvas.height = canvas.height * resolution;

  const ctx = offCanvas.getContext('2d')!;
  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = 'high';
  ctx.scale(resolution, resolution);
  ctx.drawImage(canvas, 0, 0);

  return new Promise<Blob>((resolve, reject) => {
    offCanvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error('Failed to create blob'));
      },
      format === 'png' ? 'image/png' : 'image/jpeg',
      0.95
    );
  });
}

export async function downloadImage(
  canvas: HTMLCanvasElement,
  filename: string,
  resolution: 1 | 2 | 4 = 2,
  format: 'png' | 'jpg' = 'png'
) {
  const blob = await exportAsImage(canvas, resolution, format);
  saveAs(blob, filename);
}

export function getEstimatedSize(
  width: number,
  height: number,
  resolution: 1 | 2 | 4,
  format: 'png' | 'jpg'
): string {
  const pixels = width * resolution * height * resolution;
  const bytesPerPixel = format === 'png' ? 3 : 0.5;
  const bytes = pixels * bytesPerPixel;

  if (bytes > 1024 * 1024) {
    return `~${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  }
  return `~${(bytes / 1024).toFixed(0)} KB`;
}
