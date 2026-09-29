// Baixa e otimiza as imagens provisórias (Unsplash / Pexels — licenças gratuitas para uso comercial).
// Substitua pelas fotografias reais da Construtora MI mantendo os mesmos nomes de arquivo
// (ou edite src/assets/images/index.ts). Uso: node scripts/fetch-images.mjs
import sharp from 'sharp';
import fs from 'fs';

const px = (id) => ({ url: `https://images.pexels.com/photos/${id}/pexels-photo-${id}.jpeg?auto=compress&cs=tinysrgb&w=2200`, credit: `https://www.pexels.com/photo/${id}/`, license: 'Pexels License' });
const us = (id) => ({ url: `https://images.unsplash.com/photo-${id}?w=2200&q=85&fm=jpg`, credit: `https://unsplash.com/photos/photo-${id}`, license: 'Unsplash License' });

export const manifest = {
  'hero-manta': { ...px(38510717), aspect: 16 / 10 },
  'sobre-aplicacao': px(39238313),
  'sobre-detalhe': px(39238314),
  'servico-lajes': us('1541888946425-d81bb19240f5'),
  'servico-manta': px(38781385),
  'servico-telhados': us('1632759145351-1d592919f522'),
  'servico-piscinas': us('1576013551627-0cc20b96c2a7'),
  'servico-reservatorios': px(8556428),
  'servico-areas-molhadas': us('1552321554-5fefe8c9ef14'),
  'servico-infiltracoes': px(16133610),
  'servico-estruturas': px(37733178),
  'antes': px(9990278),
  'depois': { ...px(39238331), aspect: 16 / 9 },
  'cta-obra': { ...px(38781401), aspect: 16 / 9 },
  'projeto-01': us('1504307651254-35680f356dfd'),
  'projeto-02': px(12843084),
  'projeto-03': px(38781392),
  'projeto-04': px(7108783),
  'projeto-05': us('1575517111478-7f6afd0973db'),
  'projeto-06': px(30832160),
  'projeto-07': px(29152268),
  'textura-fissura': px(10255240),
  'pagina-empresa': { ...px(7108784), aspect: 16 / 9 },
  'pagina-servicos': { ...px(38781400), aspect: 16 / 9 },
  'pagina-projetos': px(37733181),
  'pagina-contato': us('1503387762-592deb58ef4e'),
  'processo-primer': px(39238335),
};

const OUT = 'src/assets/images';
fs.mkdirSync(OUT, { recursive: true });
const credits = [];
await Promise.all(Object.entries(manifest).map(async ([name, m]) => {
  const res = await fetch(m.url);
  if (!res.ok) throw new Error(`${name}: HTTP ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  const meta = await sharp(buf).metadata();
  const portrait = !m.aspect && meta.height > meta.width * 1.2;
  // sm/lg: usados em srcset. Recortes paisagem (aspect) servem heros/CTAs em tela cheia.
  const sizes = m.aspect ? { sm: 1000, lg: 1920 } : portrait ? { sm: 600, lg: 1100 } : { sm: 800, lg: 1600 };
  for (const [key, w] of Object.entries(sizes)) {
    const opts = m.aspect ? { width: w, height: Math.round(w / m.aspect), fit: 'cover', position: 'centre' } : { width: w, withoutEnlargement: true };
    await sharp(buf).resize(opts).webp({ quality: key === 'lg' ? 64 : 70, effort: 5 }).toFile(`${OUT}/${name}-${key}.webp`);
  }
  credits.push(`| ${name} | ${m.credit} | ${m.license} |`);
  console.log('ok', name);
}));
credits.sort();
fs.writeFileSync('IMAGE-CREDITS.md', `# Créditos das imagens provisórias\n\nImagens de bancos gratuitos com licença que permite uso comercial sem atribuição obrigatória.\nSão **provisórias** e devem ser substituídas pelas fotografias reais da Construtora MI.\n\n| Arquivo | Origem | Licença |\n|---|---|---|\n${credits.join('\n')}\n`);

// Manifesto com larguras reais para srcset / proporção (evita layout shift)
const files = fs.readdirSync(OUT).filter((f) => f.endsWith('.webp'));
const out = {};
for (const f of files) {
  const [, name, key] = f.match(/^(.*)-(sm|lg)\.webp$/) ?? [];
  if (!name) continue;
  const m = await sharp(`${OUT}/${f}`).metadata();
  out[name] ??= {};
  out[name][key] = m.width;
  if (key === 'lg') out[name].ratio = +(m.width / m.height).toFixed(4);
}
fs.writeFileSync(`${OUT}/manifest.json`, JSON.stringify(out, null, 2));
