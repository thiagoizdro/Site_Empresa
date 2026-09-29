import { useRef } from 'react';
import { useReveal } from '@/hooks/useReveal';
import { SplitText } from '@/components/ui/SplitText';
import { ContactList } from '@/components/ui/ContactList';
import { MapEmbed } from '@/components/ui/MapEmbed';
import { QuoteForm } from '@/components/forms/QuoteForm';
import './Contact.css';

interface Props {
  eyebrow?: string;
  defaultService?: string;
  headingLevel?: 'h1' | 'h2';
}

export function Contact({ eyebrow = '10 — Contato', defaultService, headingLevel = 'h2' }: Props) {
  const root = useRef<HTMLElement>(null);
  useReveal(root);
  return (
    <section ref={root} className="contact" id="contato" aria-labelledby="contact-title">
      <div className="container contact__grid">
        <div className="contact__info on-dark">
          <p className="eyebrow" data-reveal>
            {eyebrow}
          </p>
          <SplitText as={headingLevel} id="contact-title" className="title-xl contact__title" text={'Solicite uma\n*avaliação*'} />
          <p className="lead" data-reveal>
            Conte o que está acontecendo no seu imóvel. Com as informações e fotos, nossa equipe consegue orientar o próximo passo com mais
            objetividade.
          </p>
          <div data-reveal>
            <ContactList />
          </div>
          <div data-reveal>
            <MapEmbed />
          </div>
        </div>

        <div className="contact__form" id="orcamento" data-reveal>
          <div className="contact__form-head">
            <p className="mono contact__form-label">Formulário de orçamento</p>
            <h3 className="contact__form-title">Dados da solicitação</h3>
          </div>
          <QuoteForm defaultService={defaultService} />
        </div>
      </div>
    </section>
  );
}
