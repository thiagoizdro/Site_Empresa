import { Suspense, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';
import { WhatsAppFloat } from '@/components/ui/WhatsAppFloat';
import { Cursor } from '@/components/effects/Cursor';
import { ScrollProgress } from '@/components/effects/ScrollProgress';
import { Preloader } from '@/components/effects/Preloader';
import { ScrollTrigger } from '@/utils/gsap';

function PageFallback() {
  return <div style={{ minHeight: '100svh', background: 'var(--navy)' }} aria-busy="true" />;
}

export function Layout() {
  // Recalcula posições de ScrollTrigger quando fontes e imagens terminam de carregar
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    document.fonts?.ready.then(refresh);
    window.addEventListener('load', refresh);
    return () => window.removeEventListener('load', refresh);
  }, []);

  return (
    <>
      <a href="#conteudo" className="skip-link">
        Pular para o conteúdo
      </a>
      <ScrollProgress />
      <Header />
      <main id="conteudo" tabIndex={-1}>
        <Suspense fallback={<PageFallback />}>
          <Outlet />
        </Suspense>
      </main>
      <Footer />
      <WhatsAppFloat />
      <Cursor />
      <Preloader />
    </>
  );
}
