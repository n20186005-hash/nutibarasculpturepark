/**
 * Optimize & normalize gallery photos for the web.
 *
 * What it does:
 *  - Renames public/gallery/*.jpg to the normalized form
 *    `cerro-de-nutibara-sculpture-park-N.jpg` (no spaces/parentheses).
 *  - Re-encodes every photo with `sharp`: max width 1600px, mozjpeg quality 80.
 *  - Rebuilds public/images/hero.jpg (width 1920) from the first photo
 *    for Open Graph / schema markup.
 *
 * Run from the project root:  node scripts/optimize-images.mjs
 */
import { readdirSync, unlinkSync, statSync, existsSync } from 'node:fs';
import { join } from 'node:path';
import sharp from 'sharp';

const root = process.cwd();
const galleryDir = join(root, 'public', 'gallery');
const imagesDir = join(root, 'public', 'images');

const OLD_PATTERN = /^cerro-de-nutibara-sculpture-park \((\d+)\)\.jpg$/i;

function kb(bytes) {
  return `${(bytes / 1024).toFixed(0)} KB`;
}

async function main() {
  const files = readdirSync(galleryDir).filter((f) => OLD_PATTERN.test(f));
  if (files.length === 0) {
    console.log('No files matching the old naming pattern were found.');
    return;
  }

  files.sort((a, b) => {
    const na = Number(a.match(OLD_PATTERN)[1]);
    const nb = Number(b.match(OLD_PATTERN)[1]);
    return na - nb;
  });

  const results = [];

  // Pass 1: write optimized copies under the new normalized names.
  for (let i = 0; i < files.length; i++) {
    const oldName = files[i];
    const newName = `cerro-de-nutibara-sculpture-park-${i + 1}.jpg`;
    const src = join(galleryDir, oldName);
    const dest = join(galleryDir, newName);

    const before = statSync(src).size;
    await sharp(src)
      .rotate()
      .resize({ width: 1600, withoutEnlargement: true })
      .jpeg({ quality: 80, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' })
      .toFile(dest);

    const after = statSync(dest).size;
    results.push({ newName, oldName, before, after });

    // hero image = first gallery photo (also reused on the landing page)
    if (i === 0) {
      const heroDest = join(imagesDir, 'hero.jpg');
      await sharp(src)
        .rotate()
        .resize({ width: 1920, withoutEnlargement: true })
        .jpeg({ quality: 82, mozjpeg: true, progressive: true, chromaSubsampling: '4:2:0' })
        .toFile(heroDest);
      results.push({ newName: 'images/hero.jpg', oldName, before, after: statSync(heroDest).size });
    }
  }

  // Pass 2: only remove the originals after every optimized file was written.
  for (const f of files) {
    const target = join(galleryDir, f);
    if (existsSync(target)) unlinkSync(target);
  }

  let saved = 0;
  for (const r of results) {
    const reduced = r.after - r.before;
    saved += reduced;
    console.log(`${r.newName.padEnd(42)} ${kb(r.before).padStart(9)} -> ${kb(r.after).padStart(9)} (${reduced < 0 ? '+' : '-'}${kb(Math.abs(reduced)).trim()})`);
  }
  console.log(`\nDone. ${files.length} photos normalized & optimized. Net change: ${saved < 0 ? '+' : '-'}${kb(Math.abs(saved)).trim()}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
