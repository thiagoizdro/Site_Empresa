// Gera variantes da logo a partir do PNG original (fundo branco).
// Uso: node scripts/process-logo.mjs  — substitua scripts/logo-original.png pela versão em alta resolução/vetor quando disponível.
import sharp from 'sharp';

const src = 'scripts/logo-original.png';
const { data, info } = await sharp(src).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
const { width: W, height: H } = info;

// "color to alpha": remove o fundo branco preservando o antialias
const color = Buffer.alloc(data.length);
for (let i = 0; i < data.length; i += 4) {
  const r = data[i], g = data[i + 1], b = data[i + 2];
  const a = Math.max(255 - r, 255 - g, 255 - b) / 255;
  if (a < 0.04) { color[i + 3] = 0; continue; }
  const un = (c) => Math.max(0, Math.min(255, Math.round((c - 255 * (1 - a)) / a)));
  color[i] = un(r); color[i + 1] = un(g); color[i + 2] = un(b); color[i + 3] = Math.round(a * 255);
}

// variante para fundo escuro: azul -> branco, laranja preservado
const white = Buffer.from(color);
for (let i = 0; i < white.length; i += 4) {
  const r = white[i], g = white[i + 1], b = white[i + 2];
  const isOrange = r > 150 && r - b > 70;
  if (!isOrange) { white[i] = 255; white[i + 1] = 255; white[i + 2] = 255; }
}

// perfil de linhas para localizar a divisão símbolo / texto
const rows = [];
for (let y = 0; y < H; y++) { let c = 0; for (let x = 0; x < W; x++) if (color[(y * W + x) * 4 + 3] > 60) c++; rows.push(c); }
if (process.argv.includes('--rows')) console.log(rows.map((c, y) => `${y}:${c}`).join(' '));

const raw = { raw: { width: W, height: H, channels: 4 } };
const up = (buf, out, crop) => {
  let s = sharp(buf, raw);
  if (crop) s = sharp(buf, raw).extract(crop);
  return s.png().toBuffer().then((b) => sharp(b).trim({ threshold: 1 }).resize({ width: (crop?.width ?? W) * 4, kernel: 'lanczos3' }).png({ compressionLevel: 9 }).toFile(out));
};
const MARK_BOTTOM = Number(process.env.MARK_BOTTOM ?? 0);
await up(color, 'src/assets/brand/logo-color.png');
await up(white, 'src/assets/brand/logo-white.png');
if (MARK_BOTTOM) {
  await up(color, 'src/assets/brand/mark-color.png', { left: 0, top: 0, width: W, height: MARK_BOTTOM });
  await up(white, 'src/assets/brand/mark-white.png', { left: 0, top: 0, width: W, height: MARK_BOTTOM });
}
console.log('ok');
