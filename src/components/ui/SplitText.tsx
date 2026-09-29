import { Fragment, type ElementType } from 'react';

interface Props {
  /** Use "\n" para quebrar linhas. Trechos entre *asteriscos* recebem destaque laranja. */
  text: string;
  as?: ElementType;
  className?: string;
  id?: string;
  /** Animação controlada pelo próprio componente (não usa o reveal automático) */
  manual?: boolean;
}

type Run = { text: string; accent: boolean };

/** Converte uma linha em palavras, cada uma com trechos normais/destacados. */
function parseLine(line: string): Run[][] {
  const words: Run[][] = [];
  let accent = false;
  let word: Run[] = [];
  const push = (ch: string) => {
    const last = word[word.length - 1];
    if (last && last.accent === accent) last.text += ch;
    else word.push({ text: ch, accent });
  };
  for (const ch of line) {
    if (ch === '*') accent = !accent;
    else if (ch === ' ') {
      if (word.length) words.push(word);
      word = [];
    } else push(ch);
  }
  if (word.length) words.push(word);
  return words;
}

/**
 * Divide o texto em palavras com máscara para a animação de "text reveal".
 * O texto completo fica disponível para leitores de tela em um span oculto.
 */
export function SplitText({ text, as: Tag = 'span', className, id, manual }: Props) {
  const plain = text.replace(/\*/g, '').replace(/\n/g, ' ');
  return (
    <Tag className={className} id={id} data-split="" data-split-manual={manual ? '' : undefined}>
      <span className="visually-hidden">{plain}</span>
      {text.split('\n').map((line, li) => (
        <span className="split-line" key={li} aria-hidden="true">
          {parseLine(line).map((runs, wi, arr) => (
            <Fragment key={wi}>
              <span className="split-word">
                <span className="split-inner">
                  {runs.map((r, ri) =>
                    r.accent ? (
                      <span className="accent" key={ri}>
                        {r.text}
                      </span>
                    ) : (
                      <Fragment key={ri}>{r.text}</Fragment>
                    ),
                  )}
                </span>
              </span>
              {wi < arr.length - 1 ? ' ' : null}
            </Fragment>
          ))}
        </span>
      ))}
    </Tag>
  );
}
