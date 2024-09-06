// app/imagemake/actions.ts
'use server';

import { writeFile } from 'fs/promises';
import { join } from 'path';
import { createCanvas, loadImage, CanvasRenderingContext2D } from 'canvas';
import os from 'os';
import AdmZip from 'adm-zip';

export async function combineImages(formData: FormData): Promise<string> {
  const files = formData.getAll('images');
  const direction = (formData.get('direction') as 'vertical' | 'horizontal') || 'vertical';
  const spacing = Number(formData.get('spacing')) || 0;
  const backgroundColor =
    (formData.get('backgroundColor') as 'transparent' | 'white') || 'transparent';
  const outputFormat = (formData.get('outputFormat') as 'jpg' | 'png') || 'png';

  if (!files || files.length === 0) {
    throw new Error('No images uploaded');
  }

  try {
    const tempDir = os.tmpdir();
    let images: Buffer[] = [];

    for (const file of files) {
      if (!(file instanceof File)) {
        throw new Error('Invalid file type');
      }

      const bytes = await file.arrayBuffer();
      const buffer = Buffer.from(bytes);

      if (file.name.endsWith('.zip')) {
        const zip = new AdmZip(buffer);
        const zipEntries = zip.getEntries();

        for (const entry of zipEntries) {
          if (entry.entryName.match(/\.(jpg|jpeg|png|gif)$/i)) {
            images.push(entry.getData());
          }
        }
      } else {
        images.push(buffer);
      }
    }

    if (images.length === 0) {
      throw new Error('No valid images found');
    }

    const loadedImages = await Promise.all(images.map((img) => loadImage(img)));

    let canvasWidth: number;
    let canvasHeight: number;

    if (direction === 'vertical') {
      canvasWidth = Math.max(...loadedImages.map((img) => img.width));
      canvasHeight =
        loadedImages.reduce((sum, img) => sum + img.height, 0) +
        (loadedImages.length - 1) * spacing;
    } else {
      canvasWidth =
        loadedImages.reduce((sum, img) => sum + img.width, 0) + (loadedImages.length - 1) * spacing;
      canvasHeight = Math.max(...loadedImages.map((img) => img.height));
    }

    const canvas = createCanvas(canvasWidth, canvasHeight);
    const ctx = canvas.getContext('2d');

    // Set background color
    if (backgroundColor === 'white') {
      ctx.fillStyle = 'white';
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);
    }

    let x = 0;
    let y = 0;
    for (const img of loadedImages) {
      ctx.drawImage(img, x, y);
      if (direction === 'vertical') {
        y += img.height + spacing;
      } else {
        x += img.width + spacing;
      }
    }

    let buffer: Buffer;
    if (outputFormat === 'jpg') {
      buffer = canvas.toBuffer('image/jpeg', { quality: 0.8 });
    } else {
      buffer = canvas.toBuffer('image/png');
    }

    const base64 = buffer.toString('base64');
    return `data:image/${outputFormat};base64,${base64}`;
  } catch (error) {
    console.error('Error processing images:', error);
    throw new Error(`Error processing images: ${(error as Error).message}`);
  }
}
