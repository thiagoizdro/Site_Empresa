import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Check, ScanSearch } from 'lucide-react';
import { useSeo } from '@/hooks/useSeo';
import { useReveal } from '@/hooks/useReveal';
import { getService, services } from '@/data/services';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { SplitText } from '@/components/ui/SplitText';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { ServiceCard } from '@/components/cards/ServiceCard';
import { Process } from '@/sections/Process';
import { Contact } from '@/sections/Contact';
import { whatsappUrl } from '@/utils/whatsapp';
import { pad2 } from '@/utils/format';
import NotFound from './NotFound';
import './ServicoDetalhe.css';

export default function ServicoDetalhe() {
  const { slug = '' } = useParams();
  const service = getService(slug);
  const root = useRef<HTMLDivElement>(null);
  useReveal(root, [slug]);
  useSeo({
    title: service?.title,
    description: service ? `${service.summary} Solicite uma avaliação com a Construtora MI.` : undefined,
    path: `/servicos/${slug}`,
    noindex: !service,
  });

  if (!service) return <NotFound />;

  const index = services.findIndex((s) => s.slug === slug);
  const related = [1, 2, 3].map((o) => services[(index + o) % services.length]).filter((s) => s.slug !== slug);
  const message = `Olá! Vim pelo site da Construtora MI e gostaria de solicitar um orçamento para: ${service.title}.`;

  return (
    <>
      <PageHero
        key={slug}
        eyebrow={`Serviço ${pad2(index + 1)} / ${pad2(services.length)}`}
        title={service.title}
        lead={service.summary}
        image={service.image}
        imageAlt={service.imageAlt}
        crumbs={[{ label: 'Início', to: '/' }, { label: 'Serviços', to: '/servicos' }, { label: service.short }]}
      >
        <Button href={whatsappUrl(message)} size="lg" magnetic icon={<WhatsAppIcon />}>
          Solicitar orçamento
        </Button>
        <Button to="/contato#orcamento" variant="outline" size="lg">
          Enviar fotos do problema
        </Button>
      </PageHero>

      <div ref={root} key={`body-${slug}`}>
        <section className="section sdet" aria-labelledby="sdet-title">
          <div className="container sdet__grid">
            <div className="sdet__main">
              <p className="eyebrow" data-reveal>
                Sobre o serviço
              </p>
              <SplitText as="h2" id="sdet-title" className="title-xl sdet__title" text={'Proteção pensada\npara o *seu caso*'} />
              {service.description.map((p, i) => (
                <p key={i} className={i === 0 ? 'lead' : 'sdet__p'} data-reveal>
                  {p}
                </p>
              ))}

              <div className="sdet__consider" data-reveal>
                <h3 className="sdet__h3">
                  <ScanSearch aria-hidden /> O que avaliamos antes de indicar a solução
                </h3>
                <ol data-stagger>
                  {service.considerations.map((c, i) => (
                    <li key={c}>
                      <span className="mono">{pad2(i + 1)}</span>
                      {c}
                    </li>
                  ))}
                </ol>
              </div>
            </div>

            <aside className="sdet__aside" aria-labelledby="sdet-ind">
              <div className="sdet__card" data-reveal>
                <p className="mono sdet__card-label">Quando é indicado</p>
                <h3 id="sdet-ind" className="visually-hidden">
                  Quando é indicado
                </h3>
                <ul>
                  {service.indications.map((it) => (
                    <li key={it}>
                      <Check aria-hidden />
                      {it}
                    </li>
                  ))}
                </ul>
                <p className="sdet__disclaimer">A indicação final depende de avaliação técnica no local.</p>
                <Button href={whatsappUrl(message)} variant="navy" icon={<WhatsAppIcon />}>
                  Falar com a equipe
                </Button>
              </div>
            </aside>
          </div>
        </section>
      </div>

      <Process eyebrow="Como executamos" />

      <section className="section section--gray" aria-labelledby="related-title">
        <div className="container">
          <div className="related__head">
            <h2 id="related-title" className="title-xl related__title">
              Outras <span className="accent">soluções</span>
            </h2>
            <Button to="/servicos" variant="outline-dark">
              Todos os serviços
            </Button>
          </div>
          <div className="related__grid">
            {related.map((s) => (
              <ServiceCard key={s.slug} service={s} index={services.indexOf(s)} total={services.length} />
            ))}
          </div>
        </div>
      </section>

      <Contact eyebrow="Orçamento" defaultService={service.title} />
    </>
  );
}
