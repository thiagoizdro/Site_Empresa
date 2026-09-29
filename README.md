# Site institucional — Construtora MI & Serviços EIRELI

Site em React + Vite + TypeScript, com animações GSAP/ScrollTrigger, rolagem suave (Lenis) e páginas **pré-renderizadas** (cada rota vira um HTML completo, bom para SEO e para a primeira pintura).

```bash
npm install
npm run dev       # desenvolvimento em http://localhost:5173
npm run build     # build de produção em dist/ (typecheck + build + pré-renderização + sitemap)
npm run preview   # serve dist/ localmente em http://localhost:4173
```

Requer Node 20 ou superior.

---

## Antes de publicar: dados a preencher

Nada foi inventado. Onde falta um dado real, o site mostra **[INFORMAÇÃO A DEFINIR]** ou um selo **DEMONSTRATIVO**.

| O quê | Onde |
|---|---|
| Número do WhatsApp (formato `5511999999999`) | `src/config/site.ts` → `whatsapp` |
| Telefone, e-mail, Instagram, endereço, horário, região atendida | `src/config/site.ts` → `contact` |
| Domínio definitivo (canonical, Open Graph, sitemap) | `.env` → `VITE_SITE_URL` |
| CNPJ, responsável técnico, início das atividades | `src/pages/Empresa.tsx` (lista `info`) |
| Número de projetos realizados (`[XX]`) | `src/sections/About.tsx` |
| Depoimentos reais (com autorização) | `src/data/content.ts` → `testimonials` (defina `placeholder: false`) |
| Projetos reais | `src/data/projects.ts` (defina `demo: false`) |
| Política de Privacidade (é um modelo; revise com assessoria jurídica) | `src/pages/Privacidade.tsx` |

- Enquanto `whatsapp` for `null`, os botões abrem o WhatsApp com a mensagem pronta, mas **sem destinatário** (o visitante escolhe o contato).
- Preenchendo `contact.address`, o mapa do Google Maps passa a aparecer automaticamente na seção de contato.
- Projetos com `demo: true` recebem `noindex` e ficam fora do sitemap.

## Conteúdo editável

- **Serviços:** `src/data/services.ts`. Para remover um serviço que a empresa não oferece, apague o objeto. A URL `/servicos/<slug>`, o menu do rodapé, o select do formulário e o sitemap se atualizam sozinhos.
- **Diferenciais, processo, FAQ, etapas "Problema → Solução":** `src/data/content.ts`.
- **Textos das seções:** `src/sections/*.tsx`.

## Imagens

As fotos atuais são **provisórias**, de bancos gratuitos (Unsplash e Pexels, com licença que permite uso comercial). As origens estão em `IMAGE-CREDITS.md`.

Para trocar pelas fotos reais da empresa:

1. Gere `<nome>-sm.webp` (~800 px) e `<nome>-lg.webp` (~1600 px) em `src/assets/images/`, **mantendo o mesmo `<nome>`** (ex.: `hero-manta`, `servico-lajes`, `antes`, `depois`, `projeto-01`…).
2. Atualize as larguras em `src/assets/images/manifest.json`. Outra opção é adaptar `scripts/fetch-images.mjs` para ler arquivos locais e rodar `npm run images`, que otimiza e gera o manifesto.

O comparador **Antes/Depois** usa `antes` e `depois`. O ideal são duas fotos do mesmo ângulo.

## Logo

O símbolo "MI" foi **vetorizado a partir do PNG enviado (150 px)**, em `src/components/ui/BrandMark.tsx`. O PNG original tinha baixa resolução e artefatos de compressão. O nome ao lado do símbolo usa a tipografia do site.
Se a empresa tiver o arquivo vetorial oficial (SVG/AI/PDF), substitua os caminhos em `BrandMark.tsx` e rode `npm run brand` para regerar favicon e imagem de compartilhamento (`public/og-image.jpg`).

## Formulário de orçamento

- **Sem backend (padrão):** o formulário valida os dados e abre o WhatsApp com a mensagem já preenchida. O site **não finge** que enviou nada. O WhatsApp não aceita anexos vindos de um site, então o visitante é orientado a enviar as fotos na conversa.
- **Com backend:** defina `VITE_QUOTE_API_URL` no `.env`. O formulário passa a enviar `multipart/form-data` (campos + `photos[]`) para esse endereço, com estados de carregamento, sucesso e erro.

## Hospedagem

`dist/` é um site estático. Cada rota tem seu próprio `index.html` (ex.: `dist/empresa/index.html`), e também são gerados `404.html`, `sitemap.xml` e `robots.txt`.

- **Netlify:** funciona direto (`public/_redirects` já incluso).
- **Vercel:** funciona direto (`vercel.json` já incluso).
- **Outros servidores:** sirva `rota/index.html` para `/rota` e use `404.html` como página de erro.

## Estrutura

```
src/
  assets/        imagens otimizadas (+ manifest) e registro central (index.ts)
  components/    layout (header, footer, menu), ui (botões, logo, slider…), cards, forms, effects (cursor, preloader, diagrama), providers
  config/        site.ts — dados da empresa e contatos
  data/          serviços, projetos e conteúdos editáveis
  hooks/         useReveal (animações por atributo), useMagnetic, useSeo, usePresence, useProgressiveMount
  pages/         rotas
  sections/      seções da Home, reutilizadas nas páginas internas
  styles/        tokens (cores, tipografia, espaçamento), base e utilitários
  utils/         WhatsApp, formulário, gsap, formatação
scripts/         imagens, marca, pré-renderização, SEO, QA visual
```

### Animações

Declarativas por atributo (ver `src/hooks/useReveal.ts`): `data-reveal`, `data-stagger`, `data-clip`, `data-parallax`, `data-line` e títulos com `<SplitText>`.
Tudo respeita `prefers-reduced-motion`: sem movimento, nada é animado e o conteúdo aparece imediatamente. No mobile, o parallax fica desligado e as distâncias são menores. O cursor customizado só é ativado em dispositivos com mouse.

### QA visual (opcional, usa o Chrome instalado)

```bash
npm run build && npm run preview
node scripts/shoot.mjs /empresa 375 800 captura.png --sections   # capturas por seção + detecção de overflow/erros
node scripts/qa-interactions.mjs pasta-saida                      # testa preloader, formulário, menu, slider, âncoras…
```

O caminho do Chrome está definido nos scripts. Ajuste se for diferente na sua máquina.
