import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath, URL } from 'node:url';
import { existsSync } from 'node:fs';
import { resolve } from 'node:path';

/**
 * Injeta <link rel="preload"> da imagem do hero (LCP) e da fonte latina principal
 * no index.html, usando os nomes finais com hash gerados pelo build.
 */
function preloadCritical(): Plugin {
  return {
    name: 'preload-critical',
    apply: 'build',
    transformIndexHtml: {
      order: 'post',
      handler(_html, ctx) {
        const files = Object.keys(ctx.bundle ?? {});
        const find = (re: RegExp) => files.find((f) => re.test(f));
        const heroSm = find(/hero-manta-sm-.*\.webp$/);
        const heroLg = find(/hero-manta-lg-.*\.webp$/);
        const font = find(/manrope-latin-wght-normal-.*\.woff2$/);
        const tags = [];
        if (heroSm && heroLg) {
          tags.push({
            tag: 'link',
            attrs: { rel: 'preload', as: 'image', type: 'image/webp', href: `/${heroLg}`, imagesrcset: `/${heroSm} 1000w, /${heroLg} 1920w`, imagesizes: '100vw', fetchpriority: 'high' },
            injectTo: 'head' as const,
          });
        }
        if (font) {
          tags.push({ tag: 'link', attrs: { rel: 'preload', as: 'font', type: 'font/woff2', href: `/${font}`, crossorigin: '' }, injectTo: 'head' as const });
        }
        return tags;
      },
    },
  };
}

/** `vite preview`: serve /rota a partir de dist/rota/index.html (como Netlify/Vercel fazem com o HTML pré-renderizado). */
function previewPrerendered(): Plugin {
  return {
    name: 'preview-prerendered',
    configurePreviewServer(server) {
      server.middlewares.use((req, _res, next) => {
        const url = req.url?.split('?')[0] ?? '/';
        if (url !== '/' && !url.includes('.') && !url.endsWith('/')) {
          const file = resolve(server.config.build.outDir, `.${decodeURIComponent(url)}`, 'index.html');
          if (existsSync(file)) req.url = `${url}/`;
        }
        next();
      });
    },
  };
}

export default defineConfig({
  plugins: [react(), preloadCritical(), previewPrerendered()],
  resolve: {
    alias: { '@': fileURLToPath(new URL('./src', import.meta.url)) },
  },
  ssr: {
    // Empacota as dependências no bundle de pré-renderização (evita problemas de ESM/CJS no Node)
    noExternal: true,
  },
  build: {
    target: 'es2020',
    // CSS único: o HTML pré-renderizado de qualquer rota já chega estilizado (inclusive sem JS)
    cssCodeSplit: false,
    assetsInlineLimit: 2048,
  },
});
