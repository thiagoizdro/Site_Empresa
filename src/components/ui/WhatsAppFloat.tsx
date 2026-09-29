import { useEffect, useState } from 'react';
import { WhatsAppIcon } from './BrandIcons';
import { whatsappUrl } from '@/utils/whatsapp';
import './WhatsAppFloat.css';

/** Botão flutuante discreto — aparece após o início da rolagem. */
export function WhatsAppFloat() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 240);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);
  return (
    <a
      className={show ? 'wa-float is-visible' : 'wa-float'}
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Conversar com a Construtora MI no WhatsApp"
      tabIndex={show ? 0 : -1}
    >
      <span className="wa-float__pulse" aria-hidden="true" />
      <WhatsAppIcon className="wa-float__icon" />
      <span className="wa-float__label">Fale conosco</span>
    </a>
  );
}
