import { useRef } from 'react';
import { useSeo } from '@/hooks/useSeo';
import { useReveal } from '@/hooks/useReveal';
import { PLACEHOLDER, site } from '@/config/site';
import { PageHero } from '@/components/layout/PageHero';
import { SectionHeader } from '@/components/ui/SectionHeader';
import { Button } from '@/components/ui/Button';
import { About } from '@/sections/About';
import { Differentials } from '@/sections/Differentials';
import { Process } from '@/sections/Process';
import { CtaBanner } from '@/sections/CtaBanner';
import { pad2 } from '@/utils/format';
import './Empresa.css';

const commitments = [
  { title: 'Diagnóstico antes da solução', text: 'Nenhum sistema é indicado sem entender a origem do problema e as condições do local.' },
  { title: 'Transparência na proposta', text: 'Escopo, etapas e condições de execução apresentados de forma clara antes do início.' },
  { title: 'Cuidado com os detalhes', text: 'Ralos, rodapés, emendas e arremates recebem a mesma atenção que a área principal.' },
  { title: 'Respeito ao imóvel', text: 'Organização e limpeza durante a execução, com comunicação direta com o cliente.' },
];

export default function Empresa() {
  useSeo({
    title: 'A Empresa',
    path: '/empresa',
    description:
      'Conheça a Construtora MI & Serviços EIRELI: impermeabilização e serviços de construção civil com foco em proteção e durabilidade das estruturas.',
  });
  const root = useRef<HTMLDivElement>(null);
  useReveal(root);

  // Campos null exibem o placeholder até a empresa fornecer os dados reais
  const info = [
    { label: 'Razão social', value: site.legalName },
    { label: 'CNPJ', value: null },
    { label: 'Área de atuação', value: site.contact.serviceArea },
    { label: 'Responsável técnico', value: null },
    { label: 'Início das atividades', value: null },
  ];

  return (
    <>
      <PageHero
        eyebrow="A empresa"
        title={'Engenharia a serviço\nda *proteção*'}
        lead="Impermeabilização e serviços de construção civil executados com método, do diagnóstico à entrega."
        image="pagina-empresa"
        crumbs={[{ label: 'Início', to: '/' }, { label: 'Empresa' }]}
      />
      <About showLink={false} eyebrow="Quem somos" />

      <div ref={root}>
        <section className="section section--gray" aria-labelledby="commit-title">
          <div className="container">
            <SectionHeader
              eyebrow="Compromissos"
              title={'Como\n*trabalhamos*'}
              id="commit-title"
              lead="Princípios que orientam cada atendimento da Construtora MI."
            />
            <ol className="commit" data-stagger>
              {commitments.map((c, i) => (
                <li key={c.title}>
                  <span className="commit__n mono">{pad2(i + 1)}</span>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </li>
              ))}
            </ol>
          </div>
        </section>

        <section className="section" aria-labelledby="data-title">
          <div className="container company-data">
            <div>
              <p className="eyebrow" data-reveal>
                Dados institucionais
              </p>
              <h2 id="data-title" className="title-xl company-data__title" data-reveal>
                Informações da empresa
              </h2>
              <p className="lead" data-reveal>
                Dados cadastrais oficiais. Os campos marcados serão preenchidos com as informações fornecidas pela empresa.
              </p>
              <div data-reveal>
                <Button to="/contato" variant="outline-dark">
                  Entrar em contato
                </Button>
              </div>
            </div>
            <dl className="company-data__list" data-stagger>
              {info.map((it) => (
                <div key={it.label}>
                  <dt className="mono">{it.label}</dt>
                  <dd>{it.value ?? <span className="placeholder-text">{PLACEHOLDER}</span>}</dd>
                </div>
              ))}
            </dl>
          </div>
        </section>
      </div>

      <Differentials eyebrow="Diferenciais" />
      <Process eyebrow="Método" />
      <CtaBanner />
    </>
  );
}
