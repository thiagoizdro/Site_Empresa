/**
 * Entrada da pré-renderização (SSG). Usada apenas no build por scripts/prerender.mjs:
 * gera o HTML estático de cada rota, com conteúdo e metadados próprios, para SEO e primeira pintura rápida.
 */
import { StrictMode } from 'react';
import { renderToString } from 'react-dom/server';
import { StaticRouter } from 'react-router';
import { IntroProvider } from '@/components/providers/Intro';
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll';
import { PageTransitionProvider } from '@/components/providers/PageTransition';
import { AppRoutes } from './AppRoutes';
import { ssrSeo } from '@/hooks/useSeo';
import { services } from '@/data/services';
import { projects } from '@/data/projects';
import Home from '@/pages/Home';
import Empresa from '@/pages/Empresa';
import Servicos from '@/pages/Servicos';
import ServicoDetalhe from '@/pages/ServicoDetalhe';
import Projetos from '@/pages/Projetos';
import ProjetoDetalhe from '@/pages/ProjetoDetalhe';
import Contato from '@/pages/Contato';
import Privacidade from '@/pages/Privacidade';
import NotFound from '@/pages/NotFound';

const pages = { Home, Empresa, Servicos, ServicoDetalhe, Projetos, ProjetoDetalhe, Contato, Privacidade, NotFound };

export const routes = [
  '/',
  '/empresa',
  '/servicos',
  ...services.map((s) => `/servicos/${s.slug}`),
  '/projetos',
  ...projects.map((p) => `/projetos/${p.slug}`),
  '/contato',
  '/politica-de-privacidade',
];

export function render(url: string) {
  ssrSeo.current = null;
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <IntroProvider>
          <SmoothScrollProvider>
            <PageTransitionProvider>
              <AppRoutes pages={pages} />
            </PageTransitionProvider>
          </SmoothScrollProvider>
        </IntroProvider>
      </StaticRouter>
    </StrictMode>,
  );
  return { html, seo: ssrSeo.current };
}
