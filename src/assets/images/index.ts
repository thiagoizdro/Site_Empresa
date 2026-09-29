/**
 * Registro central de imagens.
 * ------------------------------------------------------------------
 * As imagens atuais são PROVISÓRIAS (Unsplash/Pexels — ver IMAGE-CREDITS.md).
 * Para substituir por fotos reais da Construtora MI:
 *   1. gere os arquivos `<nome>-sm.webp` (~800px) e `<nome>-lg.webp` (~1600px)
 *      nesta pasta, mantendo o mesmo <nome>;
 *   2. atualize as larguras em manifest.json (ou rode `npm run images`
 *      adaptando scripts/fetch-images.mjs para ler arquivos locais).
 */
import manifest from './manifest.json';

const files = import.meta.glob<string>('./*.webp', { eager: true, import: 'default', query: '?url' });

type Manifest = Record<string, { sm: number; lg: number; ratio: number }>;
export type ImageName = keyof typeof manifest;

export interface ImageSource {
  src: string;
  srcSet: string;
  ratio: number;
}

export function getImage(name: ImageName): ImageSource {
  const m = (manifest as Manifest)[name];
  const sm = files[`./${name}-sm.webp`];
  const lg = files[`./${name}-lg.webp`];
  return { src: lg, srcSet: `${sm} ${m.sm}w, ${lg} ${m.lg}w`, ratio: m.ratio };
}
