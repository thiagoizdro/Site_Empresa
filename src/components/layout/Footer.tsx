import { ArrowUpRight } from 'lucide-react';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { TLink } from '@/components/ui/TLink';
import { Logo } from '@/components/ui/Logo';
import { Button } from '@/components/ui/Button';
import { InstagramIcon, WhatsAppIcon } from '@/components/ui/BrandIcons';
import { ContactList } from '@/components/ui/ContactList';
import { whatsappUrl } from '@/utils/whatsapp';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import './Footer.css';

const links = [
  { label: 'Empresa', to: '/empresa' },
  { label: 'Serviços', to: '/servicos' },
  { label: 'Projetos', to: '/projetos' },
  { label: 'Contato', to: '/contato' },
  { label: 'Política de Privacidade', to: '/politica-de-privacidade' },
];

export function Footer() {
  const year = new Date().getFullYear();
  const { scrollTo } = useSmoothScroll();
  const instagram = site.contact.instagram ? `https://instagram.com/${site.contact.instagram}` : null;

  return (
    <footer className="footer on-dark">
      <div className="container">
        <div className="footer__cta">
          <p className="footer__cta-title">
            Vamos proteger
            <br />
            sua estrutura<span className="accent">?</span>
          </p>
          <Button href={whatsappUrl()} size="lg" magnetic icon={<WhatsAppIcon />}>
            Falar no WhatsApp
          </Button>
        </div>

        <div className="footer__grid">
          <div className="footer__brand">
            <TLink to="/">
              <Logo />
            </TLink>
            <p className="footer__legal-name">{site.legalName.toUpperCase()}</p>
            <p className="footer__about">
              Impermeabilização e serviços especializados de construção civil, com foco na proteção e na durabilidade das estruturas.
            </p>
            <div className="footer__social">
              {instagram ? (
                <a href={instagram} target="_blank" rel="noopener noreferrer" aria-label="Instagram da Construtora MI">
                  <InstagramIcon width={20} height={20} />
                </a>
              ) : (
                <span className="footer__social-off" title="Instagram: [INFORMAÇÃO A DEFINIR]" role="img" aria-label="Instagram ainda não informado">
                  <InstagramIcon width={20} height={20} />
                </span>
              )}
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp da Construtora MI">
                <WhatsAppIcon width={20} height={20} />
              </a>
            </div>
          </div>

          <nav className="footer__col" aria-label="Links institucionais">
            <p className="footer__heading mono">Navegação</p>
            <ul>
              {links.map((l) => (
                <li key={l.to}>
                  <TLink to={l.to} className="footer__link">
                    {l.label}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <nav className="footer__col" aria-label="Serviços">
            <p className="footer__heading mono">Serviços</p>
            <ul>
              {services.slice(0, 6).map((s) => (
                <li key={s.slug}>
                  <TLink to={`/servicos/${s.slug}`} className="footer__link">
                    {s.short}
                  </TLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="footer__col">
            <p className="footer__heading mono">Contato</p>
            <ContactList compact />
          </div>
        </div>

        <div className="footer__bottom">
          <p>
            © {year} {site.legalName}. Todos os direitos reservados.
          </p>
          <button
            type="button"
            className="footer__top"
            onClick={() => scrollTo(0)}
          >
            Voltar ao topo <ArrowUpRight aria-hidden width={16} height={16} />
          </button>
        </div>
      </div>
      <p className="footer__giant" aria-hidden="true">
        CONSTRUTORA MI
      </p>
    </footer>
  );
}
