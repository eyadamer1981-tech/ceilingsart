// Deprecated: Gallery import disabled. Use Projects import instead.

console.log('Gallery import script disabled. Use scripts/import-projects.js');
process.exit(0);

const SUPPORTED_EXTENSIONS = new Set(['.jpg', '.jpeg', '.png', '.webp', '.avif']);

function fileToDataUrl(filePath) {
  const buffer = fs.readFileSync(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const mime = ext === '.png'
    ? 'image/png'
    : ext === '.webp'
    ? 'image/webp'
    : ext === '.avif'
    ? 'image/avif'
    : 'image/jpeg';
  const base64 = buffer.toString('base64');
  return `data:${mime};base64,${base64}`;
}

function titleFromFilename(filename) {
  const name = filename.replace(path.extname(filename), '');
  return name
    .replace(/[_.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

function categoryFromDirs(dirs) {
  const lowered = dirs.map((d) => d.toLowerCase());
  for (const d of lowered) {
    if (d.includes('stretch')) return 'Stretch Ceiling';
    if (d.includes('acoustic')) return 'Acoustic';
    if (d.includes('wood wool')) return 'Wood Wool';
    if (d.includes('fiber optic')) return 'Fiber Optic';
    if (d.includes('mirror')) return 'Mirror Stretch Ceiling';
    if (d.includes('glossy')) return 'Glossy Stretch Ceiling';
    if (d.includes('printed')) return 'Printed Stretch Ceiling';
    if (d.includes('translucent')) return 'Translucent Stretch Ceiling';
  }
  const last = dirs[dirs.length - 1] || 'General';
  return last
    .replace(/[_.-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

async function main() {
  const args = process.argv.slice(2);
  const rootIdx = args.indexOf('--root');
  const customRoot = rootIdx !== -1 ? args[rootIdx + 1] : undefined;
  const dryRun = args.includes('--dry');
  const doUpdate = args.includes('--update');
  const doForce = args.includes('--force');

  const workspaceRoot = process.cwd();
  const artImagesRoot = customRoot ? path.resolve(customRoot) : path.resolve(workspaceRoot, 'art_images');

  if (!fs.existsSync(artImagesRoot)) {
    console.error(`art_images not found at ${artImagesRoot}`);
    process.exit(1);
  }

  const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/artceiling';
  await mongoose.connect(MONGODB_URI, { bufferCommands: false });

  const galleryImageSchema = new mongoose.Schema({
    src: { type: String, required: true },
    title: { type: String, default: '' },
    category: { type: String, default: '' },
    descriptionEn: { type: String, default: '' },
    descriptionAr: { type: String, default: '' },
    createdAt: { type: Date, default: Date.now },
  });
  const GalleryImage = mongoose.models.GalleryImage || mongoose.model('GalleryImage', galleryImageSchema);

  const discovered = [];
  function walk(dir) {
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walk(fullPath);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (!SUPPORTED_EXTENSIONS.has(ext)) continue;
        const relative = path.relative(artImagesRoot, fullPath);
        const parts = relative.split(path.sep);
        const filename = parts[parts.length - 1];
        const dirParts = parts.slice(0, parts.length - 1);
        const title = titleFromFilename(filename);
        const category = categoryFromDirs(dirParts);
        discovered.push({ relative, title, category });
      }
    }
  }

  walk(artImagesRoot);

  let created = 0;
  let skipped = 0;
  let updated = 0;
  if (!dryRun) {
    for (const item of discovered) {
      const exists = await GalleryImage.findOne({ title: item.title, category: item.category });
      const abs = path.join(artImagesRoot, item.relative);
      const dataUrl = fileToDataUrl(abs);
      const descriptionEn = `${item.title} in ${item.category}`;
      const descriptionAr = `${item.title} - ${item.category}`;

      if (exists) {
        if (doForce || doUpdate) {
          const update = {};
          if (doForce) {
            update.src = dataUrl;
          }
          if (doForce || doUpdate) {
            if (!exists.descriptionEn) update.descriptionEn = descriptionEn;
            if (!exists.descriptionAr) update.descriptionAr = descriptionAr;
          }
          if (Object.keys(update).length > 0) {
            await GalleryImage.updateOne({ _id: exists._id }, { $set: update });
            updated += 1;
          } else {
            skipped += 1;
          }
        } else {
          skipped += 1;
        }
        continue;
      }

      const doc = new GalleryImage({
        src: dataUrl,
        title: item.title,
        category: item.category,
        descriptionEn,
        descriptionAr,
      });
      await doc.save();
      created += 1;
    }
  }

  console.log(JSON.stringify({ root: artImagesRoot, discovered: discovered.length, created: dryRun ? 0 : created, updated, skipped, dryRun, update: doUpdate, force: doForce }, null, 2));
  await mongoose.disconnect();
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});


