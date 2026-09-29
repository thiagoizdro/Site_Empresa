import { createContext, useContext, useState, type ReactNode } from 'react';

const KEY = 'mi-intro-seen';

function shouldPlayIntro() {
  try {
    return !sessionStorage.getItem(KEY);
  } catch {
    return true;
  }
}

interface IntroState {
  /** true quando a animação de entrada terminou (ou foi pulada) */
  done: boolean;
  play: boolean;
  finish: () => void;
}

const IntroContext = createContext<IntroState>({ done: true, play: false, finish: () => {} });

export function IntroProvider({ children }: { children: ReactNode }) {
  const [play] = useState(shouldPlayIntro);
  const [done, setDone] = useState(!play);
  const finish = () => {
    try {
      sessionStorage.setItem(KEY, '1');
    } catch {
      /* sessionStorage indisponível: a intro volta a tocar na próxima visita */
    }
    setDone(true);
  };
  return <IntroContext.Provider value={{ done, play, finish }}>{children}</IntroContext.Provider>;
}

export const useIntro = () => useContext(IntroContext);
