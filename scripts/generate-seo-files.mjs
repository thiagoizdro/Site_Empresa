// Gera dist/sitemap.xml, dist/robots.txt e dist/404.html após o build.
// A URL base vem de VITE_SITE_URL (.env). Projetos demonstrativos ficam fora do sitemap.
import fs from 'node:fs';

const env = Object.fromEntries(
  (fs.existsSync('.env') ? fs.readFileSync('.env', 'utf8') : '')
    .split(/\r?\n/)
    .filter((l) => l && !l.startsWith('#') && l.includes('='))
    .map((l) => [l.slice(0, l.indexOf('=')).trim(), l.slice(l.indexOf('=') + 1).trim()]),
);
const SITE = (process.env.VITE_SITE_URL || env.VITE_SITE_URL || 'https://SEU-DOMINIO.com.br').replace(/\/$/, '');

const slugs = (file) => [...fs.readFileSync(file, 'utf8').matchAll(/slug:\s*'([^']+)'/g)].map((m) => m[1]);

// Projetos com demo: true não são indexados
const projectsSrc = fs.readFileSync('src/data/projects.ts', 'utf8');
const realProjects = [...projectsSrc.matchAll(/slug:\s*'([^']+)',\s*\n\s*demo:\s*(true|false)/g)].filter((m) => m[2] === 'false').map((m) => m[1]);

const routes = [
  { path: '/', priority: '1.0' },
  { path: '/empresa', priority: '0.8' },
  { path: '/servicos', priority: '0.9' },
  ...slugs('src/data/services.ts').map((s) => ({ path: `/servicos/${s}`, priority: '0.8' })),
  { path: '/projetos', priority: '0.7' },
  ...realProjects.map((s) => ({ path: `/projetos/${s}`, priority: '0.6' })),
  { path: '/contato', priority: '0.8' },
  { path: '/politica-de-privacidade', priority: '0.2' },
];

const today = new Date().toISOString().slice(0, 10);
const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod><priority>${r.priority}</priority></url>`).join('\n')}
</urlset>
`;

fs.writeFileSync('dist/sitemap.xml', xml);
fs.writeFileSync('dist/robots.txt', `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`);
// Fallback para hospedagens estáticas que servem 404.html (a pré-renderização já gera uma versão própria)
if (!fs.existsSync('dist/404.html')) fs.copyFileSync('dist/index.html', 'dist/404.html');

if (SITE.includes('SEU-DOMINIO')) console.warn('⚠  VITE_SITE_URL ainda não configurada — canonical e sitemap usam um domínio de exemplo.');
console.log(`SEO: sitemap com ${routes.length} URLs e robots.txt gerados.`);
