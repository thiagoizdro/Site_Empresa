import { useRef } from 'react';
import { faq } from '@/data/content';
import { useReveal } from '@/hooks/useReveal';
import { SplitText } from '@/components/ui/SplitText';
import { Accordion } from '@/components/ui/Accordion';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { whatsappUrl } from '@/utils/whatsapp';
import './Faq.css';

export function Faq({ eyebrow = '09 — Dúvidas frequentes' }: { eyebrow?: string }) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className="section faq" id="faq" aria-labelledby="faq-title">
      <div className="container faq__grid">
        <div className="faq__side">
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
          <SplitText as="h2" id="faq-title" className="title-xl" text={'Perguntas\n*frequentes*'} />
          <div className="faq__card" data-reveal>
            <p>Não encontrou sua dúvida? Cada situação é única — fale com a nossa equipe.</p>
            <Button href={whatsappUrl()} variant="navy" icon={<WhatsAppIcon />}>
              Tirar dúvidas
            </Button>
          </div>
        </div>
        <div data-reveal>
          <Accordion items={faq} />
        </div>
      </div>
    </section>
  );
}
