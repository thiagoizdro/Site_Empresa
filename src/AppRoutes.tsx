import type { ComponentType } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';

export interface Pages {
  Home: ComponentType;
  Empresa: ComponentType;
  Servicos: ComponentType;
  ServicoDetalhe: ComponentType;
  Projetos: ComponentType;
  ProjetoDetalhe: ComponentType;
  Contato: ComponentType;
  Privacidade: ComponentType;
  NotFound: ComponentType;
}

/** Tabela de rotas única, usada pelo navegador (páginas lazy) e pela pré-renderização (páginas diretas). */
export function AppRoutes({ pages: P }: { pages: Pages }) {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<P.Home />} />
        <Route path="empresa" element={<P.Empresa />} />
        <Route path="servicos" element={<P.Servicos />} />
        <Route path="servicos/:slug" element={<P.ServicoDetalhe />} />
        <Route path="projetos" element={<P.Projetos />} />
        <Route path="projetos/:slug" element={<P.ProjetoDetalhe />} />
        <Route path="contato" element={<P.Contato />} />
        <Route path="politica-de-privacidade" element={<P.Privacidade />} />
        <Route path="*" element={<P.NotFound />} />
      </Route>
    </Routes>
  );
}
