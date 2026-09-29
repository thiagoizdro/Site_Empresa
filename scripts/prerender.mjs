// Pré-renderiza cada rota em HTML estático (SSG) usando o bundle SSR (dist-ssr/entry-server.js).
// Cada página recebe conteúdo completo + title/description/canonical/Open Graph próprios.
import fs from 'node:fs';
import path from 'node:path';
import { pathToFileURL } from 'node:url';

const { render, routes } = await import(pathToFileURL(path.resolve('dist-ssr/entry-server.js')).href);
const template = fs.readFileSync('dist/index.html', 'utf8');

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const setAttr = (html, re, value) => {
  if (!re.test(html)) throw new Error(`Tag não encontrada no template: ${re}`);
  return html.replace(re, (_m, before, after) => `${before}${esc(value)}${after}`);
};

function page(url) {
  const { html, seo } = render(url);
  if (!seo) throw new Error(`A rota ${url} não chamou useSeo()`);
  let out = template
    .replace('<html lang="pt-BR">', '<html lang="pt-BR" data-prerendered>')
    .replace('<div id="root"></div>', `<div id="root">${html}</div>`)
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(seo.title)}</title>`);
  out = setAttr(out, /(<meta name="description" content=")[^"]*(")/, seo.description);
  out = setAttr(out, /(<meta name="robots" content=")[^"]*(")/, seo.robots);
  out = setAttr(out, /(<link rel="canonical" href=")[^"]*(")/, seo.url);
  out = setAttr(out, /(<meta property="og:title" content=")[^"]*(")/, seo.title);
  out = setAttr(out, /(<meta property="og:description" content=")[^"]*(")/, seo.description);
  out = setAttr(out, /(<meta property="og:url" content=")[^"]*(")/, seo.url);
  out = setAttr(out, /(<meta name="twitter:title" content=")[^"]*(")/, seo.title);
  out = setAttr(out, /(<meta name="twitter:description" content=")[^"]*(")/, seo.description);
  return out;
}

for (const url of routes) {
  const file = url === '/' ? 'dist/index.html' : path.join('dist', url, 'index.html');
  fs.mkdirSync(path.dirname(file), { recursive: true });
  fs.writeFileSync(file, page(url));
}
// Página 404 estática (servida por hospedagens que suportam 404.html)
fs.writeFileSync('dist/404.html', page('/404'));
fs.rmSync('dist-ssr', { recursive: true, force: true });
console.log(`SSG: ${routes.length} rotas + 404 pré-renderizadas.`);
