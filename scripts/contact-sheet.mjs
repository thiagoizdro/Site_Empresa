import sharp from 'sharp'; import fs from 'fs'; import path from 'path';
const dir = process.argv[2], out = process.argv[3];
const files = fs.readdirSync(dir).filter(f => f.endsWith('.jpg')).sort();
const cols = 5, w = 360, h = 240, lh = 22;
const rows = Math.ceil(files.length / cols);
const comps = [];
for (let i = 0; i < files.length; i++) {
  const x = (i % cols) * w, y = Math.floor(i / cols) * (h + lh);
  try { comps.push({ input: await sharp(path.join(dir, files[i])).resize(w, h, { fit: 'cover' }).toBuffer(), left: x, top: y }); } catch { }
  const label = `<svg width="${w}" height="${lh}"><rect width="100%" height="100%" fill="#000"/><text x="4" y="16" font-size="14" fill="#fff" font-family="monospace">${i}: ${files[i].replace('.jpg','').slice(0,34)}</text></svg>`;
  comps.push({ input: Buffer.from(label), left: x, top: y + h });
}
await sharp({ create: { width: cols * w, height: rows * (h + lh), channels: 3, background: '#333' } }).composite(comps).jpeg({ quality: 70 }).toFile(out);
console.log(files.length);
