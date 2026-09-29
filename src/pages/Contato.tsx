import { useSeo } from '@/hooks/useSeo';
import { PageHero } from '@/components/layout/PageHero';
import { Button } from '@/components/ui/Button';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { Contact } from '@/sections/Contact';
import { Faq } from '@/sections/Faq';
import { whatsappUrl } from '@/utils/whatsapp';

export default function Contato() {
  useSeo({
    title: 'Contato e Orçamento',
    path: '/contato',
    description: 'Solicite uma avaliação de impermeabilização com a Construtora MI. Envie fotos do problema pelo formulário ou fale pelo WhatsApp.',
  });
  return (
    <>
      <PageHero
        eyebrow="Contato"
        title={'Vamos conversar\nsobre a sua *obra*'}
        lead="Descreva o problema, envie fotos e receba o retorno da nossa equipe para agendar uma avaliação."
        image="pagina-contato"
        crumbs={[{ label: 'Início', to: '/' }, { label: 'Contato' }]}
      >
        <Button href={whatsappUrl()} size="lg" magnetic icon={<WhatsAppIcon />}>
          Falar no WhatsApp
        </Button>
      </PageHero>
      <Contact eyebrow="Orçamento" />
      <Faq eyebrow="Dúvidas frequentes" />
    </>
  );
}
