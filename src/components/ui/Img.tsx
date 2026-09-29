import { getImage, type ImageName } from '@/assets/images';
import type { ImgHTMLAttributes } from 'react';

interface Props extends Omit<ImgHTMLAttributes<HTMLImageElement>, 'src' | 'srcSet'> {
  name: ImageName;
  alt: string;
  /** Imagem acima da dobra: carregamento imediato e prioridade alta */
  priority?: boolean;
}

/** Imagem responsiva otimizada (srcset WebP + lazy loading). */
export function Img({ name, alt, priority, sizes = '100vw', ...rest }: Props) {
  const img = getImage(name);
  return (
    <img
      src={img.src}
      srcSet={img.srcSet}
      sizes={sizes}
      alt={alt}
      loading={priority ? 'eager' : 'lazy'}
      decoding={priority ? 'sync' : 'async'}
      fetchPriority={priority ? 'high' : 'auto'}
      width={1600}
      height={Math.round(1600 / img.ratio)}
      {...rest}
    />
  );
}
