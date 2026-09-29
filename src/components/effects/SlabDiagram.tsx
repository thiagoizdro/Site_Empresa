import './SlabDiagram.css';

/**
 * Corte técnico esquemático de uma laje.
 * stage: 0 seco · 1 umidade · 2 infiltração · 3 degradação · 4 danos à estrutura · 5 proteção
 * As transições são feitas em CSS (transform/opacity) a partir de data-stage.
 */
export function SlabDiagram({ stage }: { stage: number }) {
  const rebars = [90, 170, 250, 330, 410, 490];
  const drops = [
    [120, 40],
    [210, 70],
    [300, 30],
    [390, 64],
    [470, 38],
    [540, 72],
    [60, 80],
  ];
  return (
    <svg className="slab" data-stage={stage} viewBox="0 0 600 500" role="img" aria-labelledby="slab-title slab-desc">
      <title id="slab-title">Corte esquemático de uma laje</title>
      <desc id="slab-desc">
        Ilustração da água atravessando o contrapiso e a laje de concreto até as armaduras, e da membrana de impermeabilização
        bloqueando a passagem da água.
      </desc>
      <defs>
        <pattern id="slab-aggregate" width="26" height="26" patternUnits="userSpaceOnUse">
          <circle cx="5" cy="6" r="1.6" fill="rgba(255,255,255,.12)" />
          <circle cx="17" cy="15" r="2.2" fill="rgba(255,255,255,.08)" />
          <circle cx="9" cy="21" r="1.1" fill="rgba(255,255,255,.14)" />
        </pattern>
        <linearGradient id="slab-wet" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#5b9bd5" stopOpacity=".75" />
          <stop offset="1" stopColor="#5b9bd5" stopOpacity=".15" />
        </linearGradient>
        <clipPath id="slab-body">
          <rect x="20" y="150" width="560" height="220" />
        </clipPath>
      </defs>

      {/* Chuva / água superficial */}
      <g className="slab__rain">
        {drops.map(([x, y], i) => (
          <path key={i} className="slab__drop" style={{ animationDelay: `${i * 0.23}s` }} d={`M${x} ${y} q6 12 0 16 q-6 -4 0 -16z`} />
        ))}
      </g>
      <rect className="slab__puddle" x="20" y="138" width="560" height="10" rx="2" />

      {/* Membrana (proteção) */}
      <rect className="slab__membrane" x="20" y="142" width="560" height="10" />

      {/* Contrapiso */}
      <rect x="20" y="152" width="560" height="40" fill="#34506f" />
      {/* Laje de concreto */}
      <rect x="20" y="192" width="560" height="178" fill="#2a4260" />
      <rect x="20" y="192" width="560" height="178" fill="url(#slab-aggregate)" />

      {/* Umidade avançando */}
      <g clipPath="url(#slab-body)">
        <rect className="slab__wet" x="20" y="152" width="560" height="218" fill="url(#slab-wet)" />
      </g>

      {/* Fissuras */}
      <g className="slab__cracks" fill="none" stroke="#0b1624" strokeWidth="2.5" strokeLinecap="round">
        <path pathLength={1} d="M160 152 l8 34 l-10 28 l14 36 l-6 30" />
        <path pathLength={1} d="M380 152 l-6 26 l12 30 l-8 40 l10 44 l-4 30" />
        <path pathLength={1} d="M470 370 l-8 -30 l10 -26" />
      </g>

      {/* Armaduras */}
      <g className="slab__rebars">
        {rebars.map((x) => (
          <g key={x}>
            <circle className="slab__rust" cx={x} cy={325} r={17} />
            <circle className="slab__bar" cx={x} cy={325} r={8} />
          </g>
        ))}
      </g>

      {/* Gotejamento abaixo da laje */}
      <g className="slab__drips">
        {[140, 300, 440].map((x, i) => (
          <path key={x} className="slab__drip" style={{ animationDelay: `${i * 0.5}s` }} d={`M${x} 374 q7 14 0 19 q-7 -5 0 -19z`} />
        ))}
      </g>

      {/* Escudo de proteção */}
      <g className="slab__shield">
        <path d="M20 128 H580" stroke="#F47B20" strokeWidth="2" strokeDasharray="6 8" />
      </g>

      {/* Rótulos técnicos */}
      <g className="slab__labels" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="1.2">
        <g className="slab__label slab__label--membrane">
          <line x1="560" y1="147" x2="560" y2="108" />
          <text x="560" y="100" textAnchor="end">MEMBRANA IMPERMEÁVEL</text>
        </g>
        <g className="slab__label">
          <text x="40" y="176">CONTRAPISO</text>
        </g>
        <g className="slab__label">
          <text x="40" y="236">LAJE DE CONCRETO</text>
        </g>
        <g className="slab__label">
          <text x="40" y="296">ARMADURA</text>
        </g>
      </g>

      {/* Ambiente inferior */}
      <line x1="20" y1="370" x2="580" y2="370" stroke="rgba(255,255,255,.25)" />
      <text x="40" y="470" className="slab__room" fontFamily="JetBrains Mono, monospace" fontSize="11" letterSpacing="1.2">
        AMBIENTE INFERIOR
      </text>
    </svg>
  );
}
