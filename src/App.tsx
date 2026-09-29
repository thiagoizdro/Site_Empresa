import { lazy } from 'react';
import Home from '@/pages/Home';
import { AppRoutes, type Pages } from './AppRoutes';

// Páginas internas carregadas sob demanda (code splitting)
const pages: Pages = {
  Home,
  Empresa: lazy(() => import('@/pages/Empresa')),
  Servicos: lazy(() => import('@/pages/Servicos')),
  ServicoDetalhe: lazy(() => import('@/pages/ServicoDetalhe')),
  Projetos: lazy(() => import('@/pages/Projetos')),
  ProjetoDetalhe: lazy(() => import('@/pages/ProjetoDetalhe')),
  Contato: lazy(() => import('@/pages/Contato')),
  Privacidade: lazy(() => import('@/pages/Privacidade')),
  NotFound: lazy(() => import('@/pages/NotFound')),
};

export default function App() {
  return <AppRoutes pages={pages} />;
}
