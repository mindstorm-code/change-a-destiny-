import sharp from "sharp";
import { mkdir } from "node:fs/promises";

const SRC = "public/images/source";
const OUT = "public/images";

await mkdir(OUT, { recursive: true });

async function recoverAlphaFromCheckerboard(inputPath) {
  const img = sharp(inputPath).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  for (let i = 0; i < data.length; i += channels) {
    const r = data[i];
    const g = data[i + 1];
    const b = data[i + 2];
    const max = Math.max(r, g, b);
    const min = Math.min(r, g, b);
    const saturation = max - min; // checkerboard is ~gray/white (low saturation); gold is saturated
    const alpha = Math.max(0, Math.min(255, Math.round((saturation - 8) * 6)));
    data[i + 3] = alpha;
  }

  return sharp(data, { raw: { width, height, channels } }).png();
}

// 1. Favicon: recover alpha, trim to content, export multiple sizes
const faviconRecovered = await recoverAlphaFromCheckerboard(`${SRC}/favicon-source.png`);
const trimmed = sharp(await faviconRecovered.toBuffer()).trim({ threshold: 10 });
const trimmedBuffer = await trimmed.png().toBuffer();

await sharp(trimmedBuffer).resize(32, 32, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`src/app/icon.png`);
await sharp(trimmedBuffer).resize(180, 180, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`src/app/apple-icon.png`);
await sharp(trimmedBuffer).resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } }).png().toFile(`${OUT}/logo-mark.png`);
console.log("favicon done");

// 2. Hero walking image (photorealistic) — optimize for web
await sharp(`${SRC}/hero-walking-source.jpg`)
  .resize({ width: 2400, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}/hero-walking.jpg`);
console.log("hero-walking done");

// 3. Village/mission landscape — optimize for web
await sharp(`${SRC}/village-source.jpg`)
  .resize({ width: 2400, withoutEnlargement: true })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile(`${OUT}/village-mission.jpg`);
console.log("village done");

// 4. OG social card — crop/resize to standard 1200x630
await sharp(`${SRC}/og-source.png`)
  .resize(1200, 630, { fit: "cover", position: "centre" })
  .jpeg({ quality: 88, mozjpeg: true })
  .toFile(`${OUT}/og-image.jpg`);
console.log("og-image done");

// 5. Parchment texture — modest size, subtle use only (not tiled)
await sharp(`${SRC}/parchment-source.jpg`)
  .resize({ width: 1600, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(`${OUT}/parchment.jpg`);
console.log("parchment done");

// 6. The 4 chapter photos for the 3D depth-parallax scene (texture-sized,
// not too huge — 4 are loaded into the scene at once).
for (const name of ["passion", "purpose", "power"]) {
  await sharp(`${SRC}/${name}-source.jpg`)
    .resize({ width: 1600, withoutEnlargement: true })
    .jpeg({ quality: 80, mozjpeg: true })
    .toFile(`${OUT}/${name}.jpg`);
  console.log(`${name} done`);
}

// Bonus shot — not wired into a chapter yet, kept optimized and ready.
await sharp(`${SRC}/bonus-source.jpg`)
  .resize({ width: 1600, withoutEnlargement: true })
  .jpeg({ quality: 80, mozjpeg: true })
  .toFile(`${OUT}/bonus-path.jpg`);
console.log("bonus done");

console.log("ALL DONE");
