import { useEffect, useId, useRef, useState, type ChangeEvent, type DragEvent, type FormEvent } from 'react';
import { AlertTriangle, CheckCircle2, ImagePlus, RotateCcw, X } from 'lucide-react';
import { site } from '@/config/site';
import { services } from '@/data/services';
import { propertyTypes } from '@/data/content';
import { Button } from '@/components/ui/Button';
import { TLink } from '@/components/ui/TLink';
import { WhatsAppIcon } from '@/components/ui/BrandIcons';
import { maskPhone, formatBytes } from '@/utils/format';
import { MAX_FILES, MAX_FILE_MB, quoteWhatsappUrl, submitQuoteApi, validateQuote, type QuoteData, type QuoteErrors } from '@/utils/quote';
import { Field } from './Field';
import { useSmoothScroll } from '@/components/providers/SmoothScroll';
import './QuoteForm.css';

type Status = 'idle' | 'loading' | 'success' | 'error';
interface Photo {
  file: File;
  url: string;
}

const empty: QuoteData = { name: '', phone: '', email: '', city: '', service: '', property: '', message: '' };
const OTHER = 'Outro / não sei informar';

export function QuoteForm({ defaultService = '' }: { defaultService?: string }) {
  const uid = useId();
  const [data, setData] = useState<QuoteData>({ ...empty, service: defaultService });
  const [touched, setTouched] = useState<Partial<Record<keyof QuoteData | 'consent', boolean>>>({});
  const [errors, setErrors] = useState<QuoteErrors>({});
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [fileError, setFileError] = useState('');
  const [consent, setConsent] = useState(false);
  const [status, setStatus] = useState<Status>('idle');
  const [waLink, setWaLink] = useState('');
  const [dragOver, setDragOver] = useState(false);
  const form = useRef<HTMLFormElement>(null);
  const fileInput = useRef<HTMLInputElement>(null);
  const viaApi = Boolean(site.quoteApiUrl);
  const box = useRef<HTMLDivElement>(null);
  const { scrollTo } = useSmoothScroll();

  // Ao exibir sucesso/erro: leva o usuário ao resultado (o foco é movido pelo ref do próprio resultado)
  useEffect(() => {
    if (status !== 'success' && status !== 'error') return;
    const t = window.setTimeout(() => {
      const el = box.current?.closest<HTMLElement>('#orcamento') ?? box.current;
      if (el) scrollTo(el);
    }, 50);
    return () => window.clearTimeout(t);
  }, [status, scrollTo]);

  // Libera as URLs de preview ao desmontar
  const photosRef = useRef(photos);
  photosRef.current = photos;
  useEffect(() => () => photosRef.current.forEach((p) => URL.revokeObjectURL(p.url)), []);

  const id = (k: string) => `${uid}-${k}`;

  const set = <K extends keyof QuoteData>(key: K, value: string) => {
    const next = { ...data, [key]: key === 'phone' ? maskPhone(value) : value };
    setData(next);
    if (touched[key] || errors[key]) setErrors((e) => ({ ...e, [key]: validateQuote(next, consent)[key] }));
  };
  const blur = (key: keyof QuoteData) => {
    setTouched((t) => ({ ...t, [key]: true }));
    setErrors((e) => ({ ...e, [key]: validateQuote(data, consent)[key] }));
  };
  const valid = (key: keyof QuoteData) => Boolean(touched[key] && !errors[key] && data[key]);
  const aria = (key: keyof QuoteData) => ({
    id: id(key),
    name: key,
    'aria-invalid': errors[key] ? true : undefined,
    'aria-describedby': errors[key] ? `${id(key)}-error` : undefined,
    onBlur: () => blur(key),
  });

  const addFiles = (list: FileList | null) => {
    if (!list) return;
    setFileError('');
    const incoming = Array.from(list);
    const images = incoming.filter((f) => f.type.startsWith('image/'));
    const tooBig = images.filter((f) => f.size > MAX_FILE_MB * 1024 * 1024);
    const ok = images.filter((f) => f.size <= MAX_FILE_MB * 1024 * 1024);
    const room = MAX_FILES - photos.length;
    const accepted = ok.slice(0, Math.max(0, room));
    const msgs: string[] = [];
    if (images.length < incoming.length) msgs.push('Apenas arquivos de imagem são aceitos.');
    if (tooBig.length) msgs.push(`Cada foto deve ter até ${MAX_FILE_MB} MB.`);
    if (ok.length > accepted.length) msgs.push(`Limite de ${MAX_FILES} fotos.`);
    if (msgs.length) setFileError(msgs.join(' '));
    setPhotos((p) => [...p, ...accepted.map((file) => ({ file, url: URL.createObjectURL(file) }))]);
    if (fileInput.current) fileInput.current.value = '';
  };
  const removePhoto = (i: number) =>
    setPhotos((p) => {
      URL.revokeObjectURL(p[i].url);
      return p.filter((_, j) => j !== i);
    });

  const onDrop = (e: DragEvent) => {
    e.preventDefault();
    setDragOver(false);
    addFiles(e.dataTransfer.files);
  };

  const reset = () => {
    photos.forEach((p) => URL.revokeObjectURL(p.url));
    setPhotos([]);
    setData({ ...empty, service: defaultService });
    setTouched({});
    setErrors({});
    setConsent(false);
    setStatus('idle');
  };

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    const errs = validateQuote(data, consent);
    const clean = Object.fromEntries(Object.entries(errs).filter(([, v]) => v)) as QuoteErrors;
    setErrors(clean);
    setTouched({ name: true, phone: true, email: true, city: true, service: true, property: true, message: true, consent: true });
    const first = Object.keys(clean)[0];
    if (first) {
      const el = form.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      return;
    }

    if (viaApi) {
      setStatus('loading');
      try {
        await submitQuoteApi(
          data,
          photos.map((p) => p.file),
        );
        setStatus('success');
      } catch {
        setStatus('error');
      }
      return;
    }

    // Sem backend: o pedido é encaminhado pelo WhatsApp (a janela precisa abrir no clique)
    const url = quoteWhatsappUrl(data, photos.length);
    setWaLink(url);
    const win = window.open(url, '_blank');
    if (win) win.opener = null;
    // Sucesso imediato: a aba do WhatsApp assume o foco e timers desta página podem ser congelados
    setStatus('success');
  };

  const serviceOptions = [...services.map((s) => s.title), OTHER];

  return (
    <div className="qform" ref={box}>
        {status === 'success' || status === 'error' ? (
          <div
            key={status}
            className={`qform__result qform__result--${status}`}
            role="status"
            aria-live="polite"
            tabIndex={-1}
            ref={(el: HTMLDivElement | null) => el?.focus({ preventScroll: true })}
          >
            {status === 'success' ? (
              <>
                <CheckCircle2 className="qform__result-icon" aria-hidden />
                {viaApi ? (
                  <>
                    <h3>Solicitação enviada</h3>
                    <p>Recebemos seus dados e retornaremos pelo WhatsApp informado.</p>
                  </>
                ) : (
                  <>
                    <h3>Pedido preparado no WhatsApp</h3>
                    <p>
                      Abrimos o WhatsApp com a sua mensagem pronta. <strong>Confira e toque em enviar</strong> para concluir.
                    </p>
                    {photos.length > 0 && (
                      <p className="qform__notice">
                        O WhatsApp não permite anexar arquivos automaticamente a partir de um site. Envie as{' '}
                        <strong>{photos.length} foto(s)</strong> selecionada(s) diretamente na conversa.
                      </p>
                    )}
                    <div className="qform__result-actions">
                      <Button href={waLink} icon={<WhatsAppIcon />}>
                        Abrir WhatsApp novamente
                      </Button>
                    </div>
                  </>
                )}
                <button type="button" className="qform__again" onClick={reset}>
                  <RotateCcw aria-hidden width={16} height={16} /> Fazer outra solicitação
                </button>
              </>
            ) : (
              <>
                <AlertTriangle className="qform__result-icon" aria-hidden />
                <h3>Não foi possível enviar</h3>
                <p>Ocorreu um erro ao enviar sua solicitação. Seus dados continuam preenchidos — tente novamente ou fale conosco pelo WhatsApp.</p>
                <div className="qform__result-actions">
                  <Button onClick={() => setStatus('idle')} variant="navy" icon={<RotateCcw />}>
                    Tentar novamente
                  </Button>
                  <Button href={quoteWhatsappUrl(data, photos.length)} variant="outline-dark" icon={<WhatsAppIcon />}>
                    WhatsApp
                  </Button>
                </div>
              </>
            )}
          </div>
        ) : (
          <form key="form" ref={form} className="qform__form" onSubmit={submit} noValidate aria-describedby={`${uid}-note`}>
            <div className="qform__row">
              <Field id={id('name')} label="Nome" error={errors.name} valid={valid('name')}>
                <input type="text" autoComplete="name" value={data.name} onChange={(e) => set('name', e.target.value)} {...aria('name')} />
              </Field>
              <Field id={id('phone')} label="WhatsApp" error={errors.phone} valid={valid('phone')}>
                <input
                  type="tel"
                  inputMode="tel"
                  autoComplete="tel-national"
                  placeholder="(00) 00000-0000"
                  value={data.phone}
                  onChange={(e) => set('phone', e.target.value)}
                  {...aria('phone')}
                />
              </Field>
            </div>
            <div className="qform__row">
              <Field id={id('email')} label="E-mail" optional error={errors.email} valid={valid('email')}>
                <input type="email" autoComplete="email" value={data.email} onChange={(e) => set('email', e.target.value)} {...aria('email')} />
              </Field>
              <Field id={id('city')} label="Cidade" error={errors.city} valid={valid('city')}>
                <input type="text" autoComplete="address-level2" value={data.city} onChange={(e) => set('city', e.target.value)} {...aria('city')} />
              </Field>
            </div>

            <Field id={id('service')} label="Tipo de serviço" error={errors.service} valid={valid('service')}>
              <select value={data.service} onChange={(e) => set('service', e.target.value)} {...aria('service')}>
                <option value="" disabled>
                  Selecione
                </option>
                {serviceOptions.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </Field>

            <fieldset className={errors.property ? 'qform__chips has-error' : 'qform__chips'} aria-describedby={errors.property ? `${id('property')}-error` : undefined}>
              <legend className="field__label">
                Tipo de imóvel<span aria-hidden="true" className="field__req"> *</span>
              </legend>
              <div className="qform__chip-list">
                {propertyTypes.map((p, i) => (
                  <label key={p} className="qform__chip">
                    <input
                      type="radio"
                      name="property"
                      value={p}
                      checked={data.property === p}
                      onChange={(e) => {
                        set('property', e.target.value);
                        setTouched((t) => ({ ...t, property: true }));
                        setErrors((er) => ({ ...er, property: undefined }));
                      }}
                      id={i === 0 ? id('property') : undefined}
                    />
                    <span>{p}</span>
                  </label>
                ))}
              </div>
              {errors.property && (
                <p className="field__msg" id={`${id('property')}-error`} role="alert">
                  {errors.property}
                </p>
              )}
            </fieldset>

            <Field id={id('message')} label="Descrição do problema" error={errors.message} valid={valid('message')}>
              <textarea
                rows={5}
                placeholder="Ex.: manchas no teto do banheiro após chuvas, laje sem proteção, infiltração na parede…"
                value={data.message}
                onChange={(e) => set('message', e.target.value)}
                {...aria('message')}
              />
            </Field>

            <div className="qform__upload">
              <p className="field__label" id={`${uid}-photos-label`}>
                Envie fotos do problema <span className="field__opt">(opcional)</span>
              </p>
              <label
                className={dragOver ? 'qform__drop is-over' : 'qform__drop'}
                onDragOver={(e) => {
                  e.preventDefault();
                  setDragOver(true);
                }}
                onDragLeave={() => setDragOver(false)}
                onDrop={onDrop}
              >
                <input
                  ref={fileInput}
                  type="file"
                  accept="image/*"
                  multiple
                  className="visually-hidden"
                  aria-labelledby={`${uid}-photos-label`}
                  aria-describedby={`${uid}-photos-hint`}
                  onChange={(e: ChangeEvent<HTMLInputElement>) => addFiles(e.target.files)}
                  disabled={photos.length >= MAX_FILES}
                />
                <ImagePlus className="qform__drop-icon" aria-hidden />
                <span className="qform__drop-title">
                  {photos.length >= MAX_FILES ? 'Limite de fotos atingido' : 'Clique para selecionar ou arraste as imagens'}
                </span>
                <span className="qform__drop-hint mono" id={`${uid}-photos-hint`}>
                  Até {MAX_FILES} fotos · {MAX_FILE_MB} MB cada
                </span>
              </label>
              {fileError && (
                <p className="field__msg" role="alert">
                  {fileError}
                </p>
              )}
              {photos.length > 0 && (
                <ul className="qform__previews" aria-label="Fotos selecionadas">
                  {photos.map((p, i) => (
                    <li key={p.url} className="qform__preview">
                      <img src={p.url} alt={`Foto selecionada ${i + 1}: ${p.file.name}`} />
                      <span className="qform__preview-size mono">{formatBytes(p.file.size)}</span>
                      <button type="button" onClick={() => removePhoto(i)} aria-label={`Remover foto ${i + 1}`}>
                        <X aria-hidden />
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <label className={errors.consent ? 'qform__consent has-error' : 'qform__consent'}>
              <input
                type="checkbox"
                name="consent"
                checked={consent}
                onChange={(e) => {
                  setConsent(e.target.checked);
                  if (e.target.checked) setErrors((er) => ({ ...er, consent: undefined }));
                }}
                aria-invalid={errors.consent ? true : undefined}
              />
              <span>
                Concordo com o uso dos meus dados para retorno sobre esta solicitação, conforme a{' '}
                <TLink to="/politica-de-privacidade" className="qform__policy">
                  Política de Privacidade
                </TLink>
                .
              </span>
            </label>
            {errors.consent && (
              <p className="field__msg" role="alert">
                {errors.consent}
              </p>
            )}

            <div className="qform__submit">
              <Button type="submit" size="lg" loading={status === 'loading'} magnetic>
                {status === 'loading' ? 'Preparando…' : 'Solicitar avaliação'}
              </Button>
              <p className="qform__note" id={`${uid}-note`}>
                {viaApi
                  ? 'Seus dados serão enviados diretamente para a nossa equipe.'
                  : 'Ao enviar, abriremos o WhatsApp com os dados preenchidos para você confirmar o envio.'}
              </p>
            </div>
          </form>
        )}
    </div>
  );
}
