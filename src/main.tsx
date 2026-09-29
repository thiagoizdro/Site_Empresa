import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import '@fontsource-variable/manrope/index.css';
import '@fontsource/jetbrains-mono/latin-400.css';
import '@fontsource/jetbrains-mono/latin-500.css';
import '@/styles/tokens.css';
import '@/styles/base.css';
import '@/styles/utilities.css';
import { IntroProvider } from '@/components/providers/Intro';
import { SmoothScrollProvider } from '@/components/providers/SmoothScroll';
import { PageTransitionProvider } from '@/components/providers/PageTransition';
import App from './App';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <BrowserRouter>
      <IntroProvider>
        <SmoothScrollProvider>
          <PageTransitionProvider>
            <App />
          </PageTransitionProvider>
        </SmoothScrollProvider>
      </IntroProvider>
    </BrowserRouter>
  </StrictMode>,
);
