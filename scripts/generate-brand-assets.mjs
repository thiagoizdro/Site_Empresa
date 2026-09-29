// Gera favicon, apple-touch-icon e imagem Open Graph a partir do símbolo vetorial.
import sharp from 'sharp';
import fs from 'fs';

const bars = ['M134 34L240 34L204.6 211L98.6 211Z', 'M254 34L360 34L292.6 371L186.6 371Z', 'M379 34L485 34L417.6 371L311.6 371Z', 'M504 34L610 34L542.6 371L436.6 371Z'];
const stem = 'M614 164L716 164L674.6 371L572.6 371Z';
const dot = 'M650 34L750 34L729.6 136L629.6 136Z';
const mark = (fg = '#FFFFFF', stemC = '#9FB6D3') => `<g stroke-linejoin="round" stroke-width="12"><g fill="${fg}" stroke="${fg}">${bars.map((d) => `<path d="${d}"/>`).join('')}</g><path d="${stem}" fill="${stemC}" stroke="${stemC}"/><path d="${dot}" fill="#F47B20" stroke="#F47B20"/></g>`;

const favicon = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64"><rect width="64" height="64" rx="12" fill="#172B45"/><g transform="translate(6.5 17) scale(0.0735)"><g transform="translate(-88 -24)">${mark()}</g></g></svg>`;
fs.writeFileSync('public/favicon.svg', favicon);
await sharp(Buffer.from(favicon)).resize(180, 180).png().toFile('public/apple-touch-icon.png');
await sharp(Buffer.from(favicon)).resize(32, 32).png().toFile('public/favicon-32.png');

const og = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <defs><linearGradient id="g" x1="0" x2="1"><stop offset="0" stop-color="#0E1B2D" stop-opacity=".96"/><stop offset=".65" stop-color="#172B45" stop-opacity=".78"/><stop offset="1" stop-color="#172B45" stop-opacity=".45"/></linearGradient></defs>
  <rect width="1200" height="630" fill="url(#g)"/>
  <g transform="translate(80 90) scale(0.24)"><g transform="translate(-88 -24)">${mark()}</g></g>
  <text x="80" y="300" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="64" fill="#fff" letter-spacing="1">PROTEÇÃO QUE COMEÇA</text>
  <text x="80" y="376" font-family="Arial, Helvetica, sans-serif" font-weight="800" font-size="64" fill="#fff" letter-spacing="1">NA ESTRUTURA<tspan fill="#F47B20">.</tspan></text>
  <rect x="80" y="420" width="96" height="4" fill="#F47B20"/>
  <text x="80" y="480" font-family="Arial, Helvetica, sans-serif" font-size="28" fill="#D6DEE8">Construtora MI &amp; Serviços EIRELI · Impermeabilização</text>
</svg>`;
await sharp('src/assets/images/hero-manta-lg.webp').resize(1200, 630, { fit: 'cover' }).composite([{ input: Buffer.from(og) }]).jpeg({ quality: 82 }).toFile('public/og-image.jpg');
console.log('brand assets ok');
