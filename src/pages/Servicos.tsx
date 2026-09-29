import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { Services } from '@/sections/Services';
import { ProblemSolution } from '@/sections/ProblemSolution';
import { Process } from '@/sections/Process';
import { Faq } from '@/sections/Faq';
import { CtaBanner } from '@/sections/CtaBanner';
import { services } from '@/data/services';

export default function Servicos() {
  useSeo({
    title: 'Serviços de Impermeabilização',
    path: '/servicos',
    description:
      'Impermeabilização de lajes, manta asfáltica, telhados, piscinas, reservatórios, áreas molhadas, tratamento de infiltrações e recuperação de estruturas.',
  });
  return (
    <>
      <PageHero
        eyebrow="Serviços"
        title={'Soluções para cada\n*área da obra*'}
        lead={`${services.length} frentes de atuação em impermeabilização e proteção de estruturas, sempre definidas a partir da avaliação do local.`}
        image="pagina-servicos"
        crumbs={[{ label: 'Início', to: '/' }, { label: 'Serviços' }]}
      >
        <Button to="/contato#orcamento" size="lg" magnetic>
          Solicitar orçamento
        </Button>
      </PageHero>
      <Services eyebrow="Catálogo" />
      <ProblemSolution eyebrow="O problema" />
      <Process eyebrow="Processo" />
      <Faq eyebrow="Dúvidas frequentes" />
      <CtaBanner />
    </>
  );
}
