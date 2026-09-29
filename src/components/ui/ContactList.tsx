import { Clock, Mail, MapPin, Phone } from 'lucide-react';
import type { ReactNode } from 'react';
import { PLACEHOLDER, site } from '@/config/site';
import { InstagramIcon, WhatsAppIcon } from './BrandIcons';
import { whatsappUrl } from '@/utils/whatsapp';
import { cn } from '@/utils/cn';
import './ContactList.css';

interface Item {
  label: string;
  icon: ReactNode;
  value: string | null;
  href?: string;
  external?: boolean;
}

/** Lista de contatos a partir de src/config/site.ts — exibe placeholder quando o dado não existe. */
export function ContactList({ compact, className }: { compact?: boolean; className?: string }) {
  const c = site.contact;
  const items: Item[] = [
    { label: 'Telefone', icon: <Phone />, value: c.phone, href: c.phone ? `tel:${c.phone.replace(/\D/g, '')}` : undefined },
    { label: 'WhatsApp', icon: <WhatsAppIcon />, value: c.whatsappDisplay, href: site.whatsapp ? whatsappUrl() : undefined, external: true },
    { label: 'E-mail', icon: <Mail />, value: c.email, href: c.email ? `mailto:${c.email}` : undefined },
    { label: 'Instagram', icon: <InstagramIcon />, value: c.instagram ? `@${c.instagram}` : null, href: c.instagram ? `https://instagram.com/${c.instagram}` : undefined, external: true },
    { label: 'Endereço', icon: <MapPin />, value: c.address },
    { label: 'Horário', icon: <Clock />, value: c.hours },
  ];

  return (
    <dl className={cn('clist', compact && 'clist--compact', className)}>
      {items.map((it) => (
        <div className="clist__item" key={it.label}>
          <span className="clist__icon" aria-hidden="true">
            {it.icon}
          </span>
          <dt className="clist__label mono">{it.label}</dt>
          <dd className="clist__value">
            {it.value ? (
              it.href ? (
                <a href={it.href} className="clist__link" {...(it.external ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                  {it.value}
                </a>
              ) : (
                it.value
              )
            ) : (
              <span className="placeholder-text">{PLACEHOLDER}</span>
            )}
          </dd>
        </div>
      ))}
    </dl>
  );
}
