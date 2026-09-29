// QA de interações (dev). Uso: node scripts/qa-interactions.mjs <pasta-de-saida>
import puppeteer from 'puppeteer-core';

const OUT = process.argv[2] || '.';
const BASE = 'http://localhost:4173';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await puppeteer.launch({
  executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  headless: 'new',
  args: ['--no-sandbox', '--hide-scrollbars', '--disable-background-timer-throttling', '--disable-renderer-backgrounding', '--disable-backgrounding-occluded-windows'],
  protocolTimeout: 30000,
});
const log = [];
const errs = [];
const newPage = async (w, h, mobile = false) => {
  const p = await browser.newPage();
  await p.setViewport({ width: w, height: h, isMobile: mobile, hasTouch: mobile });
  p.on('pageerror', (e) => errs.push(e.message));
  p.on('console', (m) => m.type() === 'error' && errs.push(m.text()));
  return p;
};

// 1. Preloader
  console.error("STEP 1");
{
  const p = await newPage(1440, 900);
  await p.goto(BASE + '/', { waitUntil: 'domcontentloaded' });
  await wait(650);
  await p.screenshot({ path: `${OUT}/01-preloader-a.png` });
  await wait(600);
  await p.screenshot({ path: `${OUT}/01-preloader-b.png` });
  await wait(1500);
  log.push(['preloader removed', await p.evaluate(() => !document.querySelector('.pl'))]);

  // 2. Diagrama problema → solução em estágios
  console.error("STEP 2");
  for (const stage of [2, 4, 5]) {
    const y = await p.evaluate((s) => {
      const el = document.querySelectorAll('.ps__step')[s - 1];
      return el.getBoundingClientRect().top + window.scrollY - window.innerHeight * 0.35;
    }, stage);
    await p.evaluate((yy) => window.scrollTo(0, yy), y);
    await wait(1600);
    const st = await p.evaluate(() => document.querySelector('.slab')?.getAttribute('data-stage'));
    log.push([`slab stage (esperado ${stage})`, st]);
    await p.screenshot({ path: `${OUT}/02-slab-${stage}.png` });
  }

  // 3. Timeline do processo (meio da seção sticky)
  console.error("STEP 3");
  const py = await p.evaluate(() => {
    const el = document.querySelector('.process');
    return el.getBoundingClientRect().top + window.scrollY + el.offsetHeight * 0.45;
  });
  await p.evaluate((yy) => window.scrollTo(0, yy), py);
  await wait(1200);
  log.push(['process steps done', await p.evaluate(() => document.querySelectorAll('.process__step.is-done').length)]);
  await p.screenshot({ path: `${OUT}/03-process.png` });

  // 4. Cursor "VER" sobre projeto
  console.error("STEP 4");
  await p.evaluate(() => document.querySelector('.pcard')?.scrollIntoView({ block: 'center' }));
  await wait(1200);
  const box = await (await p.$('.pcard__media')).boundingBox();
  await p.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 8 });
  await wait(700);
  log.push(['cursor mode on project', await p.evaluate(() => document.querySelector('.cursor')?.getAttribute('data-mode'))]);
  await p.screenshot({ path: `${OUT}/04-cursor-view.png` });

  // 5. Antes/depois: arrastar
  console.error("STEP 5");
  await p.evaluate(() => document.querySelector('.ba')?.scrollIntoView({ block: 'center' }));
  await wait(1200);
  const ba = await (await p.$('.ba')).boundingBox();
  await p.mouse.move(ba.x + ba.width * 0.5, ba.y + ba.height / 2);
  await p.mouse.down();
  await p.mouse.move(ba.x + ba.width * 0.2, ba.y + ba.height / 2, { steps: 10 });
  await p.mouse.up();
  await wait(300);
  log.push(['before/after value after drag to 20%', await p.evaluate(() => document.querySelector('.ba__handle')?.getAttribute('aria-valuenow'))]);
  await p.focus('.ba__handle');
  await p.keyboard.press('ArrowRight');
  await p.keyboard.press('ArrowRight');
  log.push(['before/after after 2x ArrowRight', await p.evaluate(() => document.querySelector('.ba__handle')?.getAttribute('aria-valuenow'))]);

  // 6. Formulário: envio vazio → erros
  console.error("STEP 6");
  await p.evaluate(() => document.querySelector('#orcamento')?.scrollIntoView({ block: 'start' }));
  await wait(1200);
  await p.click('.qform button[type=submit]');
  await wait(500);
  log.push(['form errors shown', await p.evaluate(() => document.querySelectorAll('.qform .field__msg').length)]);
  log.push(['focused after invalid submit', await p.evaluate(() => document.activeElement?.getAttribute('name'))]);
  await p.screenshot({ path: `${OUT}/05-form-errors.png` });

  // preenche e envia
  await p.type('input[name=name]', 'Maria Teste');
  await p.type('input[name=phone]', '11987654321');
  await p.type('input[name=city]', 'Cidade Teste');
  await p.select('select[name=service]', 'Manta Asfáltica');
  await p.click('.qform__chip:nth-child(3) span');
  await p.type('textarea[name=message]', 'Manchas no teto do banheiro depois das chuvas.');
  const [fileInput] = await p.$$('input[type=file]');
  await fileInput.uploadFile('src/assets/images/antes-sm.webp', 'src/assets/images/depois-sm.webp');
  await wait(500);
  log.push(['photo previews', await p.evaluate(() => document.querySelectorAll('.qform__preview').length)]);
  log.push(['phone masked', await p.evaluate(() => document.querySelector('input[name=phone]').value)]);
  await p.click('.qform__consent input');
  await p.screenshot({ path: `${OUT}/06-form-filled.png` });
  const popup = new Promise((res) => browser.once('targetcreated', (t) => res(t.url())));
  await p.click('.qform button[type=submit]');
  const url = await Promise.race([popup, wait(3000).then(() => 'NO POPUP')]);
  log.push(['whatsapp url', decodeURIComponent(url).slice(0, 160)]);
  for (const pg of await browser.pages()) if (pg !== p && !pg.url().startsWith(BASE)) await pg.close();
  await p.bringToFront();
  await wait(1200);
  log.push(['success state', await p.evaluate(() => document.querySelector('.qform__result h3')?.textContent)]);
  await p.screenshot({ path: `${OUT}/07-form-success.png` });

  // fecha a aba do WhatsApp e volta o foco para o site
  for (const pg of await browser.pages()) if (pg.url().includes('wa.me') || pg.url().includes('whatsapp')) await pg.close();
  await p.bringToFront();
  // 7. Transição de página
  console.error("STEP 7");
  await p.evaluate(() => window.scrollTo(0, 0));
  await wait(900);
  await p.click('.header__nav a[href="/servicos"]');
  await wait(380);
  await p.screenshot({ path: `${OUT}/08-transition-mid.png` });
  await wait(1800);
  log.push(['after transition path', await p.evaluate(() => location.pathname + ' | ' + document.title)]);
  await p.screenshot({ path: `${OUT}/09-servicos.png` });

  // 8. Link âncora de outra página (/#faq)
  console.error("STEP 8");
  await p.click('.header__nav a[href="/#faq"]');
  await wait(2600);
  log.push(['faq anchor visible', await p.evaluate(() => Math.round(document.querySelector('#faq').getBoundingClientRect().top))]);
}

// 9. Menu mobile
  console.error("STEP 9");
{
  const p = await newPage(390, 844, true);
  await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await wait(2400);
  await p.tap('.burger');
  await wait(1100);
  await p.screenshot({ path: `${OUT}/10-mobile-menu.png` });
  log.push(['menu open', await p.evaluate(() => !!document.querySelector('.mmenu'))]);
  await p.keyboard.press('Escape');
  await wait(900);
  log.push(['menu closed by Esc', await p.evaluate(() => !document.querySelector('.mmenu'))]);
}

// 10. Reduced motion: conteúdo visível sem animações
  console.error("STEP 10");
{
  const p = await newPage(1440, 900);
  await p.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await p.goto(BASE + '/', { waitUntil: 'networkidle0' });
  await wait(1200);
  const hidden = await p.evaluate(
    () => [...document.querySelectorAll('[data-reveal], .split-inner, [data-stagger] > *')].filter((el) => getComputedStyle(el).opacity === '0' || getComputedStyle(el).visibility === 'hidden').length,
  );
  log.push(['reduced-motion hidden elements', hidden]);
  log.push(['lenis active under reduced motion', await p.evaluate(() => document.documentElement.classList.contains('lenis'))]);
}

console.log(log.map(([k, v]) => `${k}: ${v}`).join('\n'));
console.log('errors:', errs.length ? errs : 'none');
await browser.close();
