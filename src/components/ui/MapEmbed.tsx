import { MapPin } from 'lucide-react';
import { site } from '@/config/site';
import './MapEmbed.css';

/** Google Maps — só é exibido quando o endereço estiver configurado em src/config/site.ts */
export function MapEmbed() {
  const address = site.contact.address;
  if (!address) {
    return (
      <div className="map map--empty">
        <MapPin aria-hidden />
        <p>
          Mapa disponível quando o endereço for informado.
          <span className="placeholder-text">[INFORMAÇÃO A DEFINIR]</span>
        </p>
      </div>
    );
  }
  return (
    <div className="map">
      <iframe
        title={`Mapa: ${address}`}
        src={`https://www.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
