import { useSeo } from '@/hooks/useSeo';
import { PLACEHOLDER, site } from '@/config/site';
import { PageHero } from '@/components/layout/PageHero';
import './Privacidade.css';

/**
 * MODELO de Política de Privacidade.
 * Revise com assessoria jurídica e preencha os campos [INFORMAÇÃO A DEFINIR] antes de publicar.
 */
export default function Privacidade() {
  useSeo({ title: 'Política de Privacidade', path: '/politica-de-privacidade', description: 'Política de Privacidade do site da Construtora MI & Serviços EIRELI.' });
  const ph = <span className="placeholder-text">{PLACEHOLDER}</span>;
  return (
    <>
      <PageHero
        eyebrow="Institucional"
        title="Política de Privacidade"
        image="textura-fissura"
        crumbs={[{ label: 'Início', to: '/' }, { label: 'Política de Privacidade' }]}
      />
      <section className="section">
        <div className="container prose">
          <p className="prose__notice">
            <span className="demo-badge">Modelo</span> Este texto é um modelo inicial e deve ser revisado pela empresa antes da publicação definitiva.
          </p>
          <p>Última atualização: {ph}</p>

          <h2>1. Quem somos</h2>
          <p>
            Este site pertence a {site.legalName}, inscrita no CNPJ {ph}, com sede em {ph}. Para assuntos relacionados a dados pessoais, entre em
            contato pelo e-mail {site.contact.email ?? ph}.
          </p>

          <h2>2. Quais dados coletamos</h2>
          <p>Coletamos apenas os dados que você nos fornece voluntariamente ao solicitar um orçamento ou entrar em contato:</p>
          <ul>
            <li>nome, telefone/WhatsApp, e-mail (opcional) e cidade;</li>
            <li>informações sobre o imóvel e a descrição do problema;</li>
            <li>fotos que você decidir nos enviar.</li>
          </ul>

          <h2>3. Para que usamos os dados</h2>
          <p>
            Os dados são utilizados exclusivamente para responder à sua solicitação, agendar avaliações e elaborar orçamentos, com base no seu
            consentimento e no procedimento preliminar à contratação (art. 7º, I e V, da Lei nº 13.709/2018 — LGPD).
          </p>

          <h2>4. Compartilhamento</h2>
          <p>
            Não vendemos dados pessoais. Quando o contato é feito pelo WhatsApp, a comunicação também está sujeita às políticas do próprio
            aplicativo. {ph}
          </p>

          <h2>5. Armazenamento e segurança</h2>
          <p>Os dados são mantidos pelo tempo necessário ao atendimento da solicitação e às obrigações legais aplicáveis. {ph}</p>

          <h2>6. Seus direitos</h2>
          <p>
            Você pode solicitar a confirmação, o acesso, a correção ou a exclusão dos seus dados, bem como revogar o consentimento, entrando em
            contato pelos canais informados neste site.
          </p>

          <h2>7. Cookies</h2>
          <p>
            Este site não utiliza cookies de rastreamento ou publicidade. Ele armazena apenas uma preferência técnica na sessão do navegador
            (para não repetir a animação de abertura). Quando o mapa do Google for exibido na página de contato, o Google poderá utilizar
            cookies próprios, conforme a política dele. Caso ferramentas de análise sejam adicionadas no futuro, esta política será atualizada.
          </p>
        </div>
      </section>
    </>
  );
}
