/**
 * Símbolo "MI" reconstruído em vetor a partir da logo oficial
 * (barras inclinadas + "i" com ponto laranja).
 * Substitua pelos vetores oficiais caso a empresa os forneça.
 */
export const MARK_PATHS = {
  bars: [
    'M134 34L240 34L204.6 211L98.6 211Z',
    'M254 34L360 34L292.6 371L186.6 371Z',
    'M379 34L485 34L417.6 371L311.6 371Z',
    'M504 34L610 34L542.6 371L436.6 371Z',
  ],
  stem: 'M614 164L716 164L674.6 371L572.6 371Z',
  dot: 'M650 34L750 34L729.6 136L629.6 136Z',
};

interface Props {
  className?: string;
  /** light = para fundos escuros; color = cores originais para fundo claro */
  variant?: 'light' | 'color';
  title?: string;
}

export function BrandMark({ className, variant = 'light', title }: Props) {
  const bar = variant === 'light' ? '#FFFFFF' : '#172B45';
  const stem = variant === 'light' ? '#9FB6D3' : '#2F5486';
  return (
    <svg
      className={className}
      viewBox="88 24 674 357"
      xmlns="http://www.w3.org/2000/svg"
      role={title ? 'img' : undefined}
      aria-hidden={title ? undefined : true}
      aria-label={title}
    >
      <g strokeLinejoin="round" strokeWidth="12">
        {MARK_PATHS.bars.map((d, i) => (
          <path key={i} className="mark-bar" d={d} fill={bar} stroke={bar} />
        ))}
        <path className="mark-stem" d={MARK_PATHS.stem} fill={stem} stroke={stem} />
        <path className="mark-dot" d={MARK_PATHS.dot} fill="#F47B20" stroke="#F47B20" />
      </g>
    </svg>
  );
}
