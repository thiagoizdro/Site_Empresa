// Ferramenta de QA visual (dev): capturas, erros de console e detecção de overflow horizontal.
// Uso: node scripts/shoot.mjs <rota> <largura> <altura> <saida.png> [--full] [--reduced] [--at=px]
import puppeteer from 'puppeteer-core';

const [, , route = '/', w = '1440', h = '900', out = 'shot.png', ...flags] = process.argv;
const full = flags.includes('--full');
const reduced = flags.includes('--reduced');
const at = Number((flags.find((f) => f.startsWith('--at=')) || '').slice(5) || 0);
const mobile = Number(w) < 1024;

const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars'],
});
const page = await browser.newPage();
await page.setViewport({ width: Number(w), height: Number(h), deviceScaleFactor: 1, isMobile: mobile, hasTouch: mobile });
if (reduced) await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
const errors = [];
page.on('console', (m) => ['error', 'warning'].includes(m.type()) && errors.push(`[${m.type()}] ${m.text()}`));
page.on('pageerror', (e) => errors.push(`[pageerror] ${e.message}`));
page.on('requestfailed', (r) => errors.push(`[requestfailed] ${r.url()} ${r.failure()?.errorText}`));

await page.goto(`http://localhost:4173${route}`, { waitUntil: 'networkidle0' });
await new Promise((r) => setTimeout(r, 2200));

// Percorre a página para disparar as animações de scroll
const total = await page.evaluate(() => document.documentElement.scrollHeight);
for (let y = 0; y < total; y += Math.round(Number(h) * 0.6)) {
  await page.evaluate((yy) => window.scrollTo(0, yy), y);
  await new Promise((r) => setTimeout(r, 140));
}
await new Promise((r) => setTimeout(r, 900));
await page.evaluate((yy) => window.scrollTo(0, yy), at);
await new Promise((r) => setTimeout(r, 1300));

const overflow = await page.evaluate(() => {
  const vw = document.documentElement.clientWidth;
  const res = { scrollWidth: document.documentElement.scrollWidth, vw, offenders: [] };
  for (const el of document.querySelectorAll('body *')) {
    const r = el.getBoundingClientRect();
    if (r.width === 0) continue;
    if (r.right > vw + 1 || r.left < -1) {
      // ignora elementos dentro de contêineres com overflow oculto
      let p = el.parentElement, clipped = false;
      while (p && p !== document.body) {
        const cs = getComputedStyle(p);
        if (/(hidden|clip)/.test(cs.overflowX) || /(hidden|clip)/.test(cs.overflow)) { clipped = true; break; }
        p = p.parentElement;
      }
      if (!clipped) res.offenders.push(`${el.tagName.toLowerCase()}.${[...el.classList].join('.')} [${Math.round(r.left)}, ${Math.round(r.right)}]`);
    }
  }
  res.offenders = res.offenders.slice(0, 12);
  return res;
});

if (flags.includes('--sections')) {
  // Uma captura por seção (evita o limite de ~16k px das capturas full-page do Chrome)
  const tops = await page.evaluate(() =>
    [...document.querySelectorAll('main section, footer')]
      .filter((el) => !el.parentElement.closest('section'))
      .map((el) => Math.round(el.getBoundingClientRect().top + window.scrollY)),
  );
  for (let i = 0; i < tops.length; i++) {
    await page.evaluate((yy) => window.scrollTo(0, yy), tops[i]);
    await new Promise((r) => setTimeout(r, 900));
    await page.screenshot({ path: out.replace('.png', `-${String(i).padStart(2, '0')}.png`) });
  }
  console.log('sections:', tops.length);
} else {
  await page.screenshot({ path: out, fullPage: full });
}
console.log(JSON.stringify({ route, w, h, overflow, errors: errors.slice(0, 15) }, null, 1));
await browser.close();
