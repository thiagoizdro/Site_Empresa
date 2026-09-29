import { useLocation } from 'react-router-dom';
import { useSeo } from '@/hooks/useSeo';
import { Button } from '@/components/ui/Button';
import { BrandMark } from '@/components/ui/BrandMark';
import './NotFound.css';

export default function NotFound() {
  const { pathname } = useLocation();
  useSeo({ title: 'Página não encontrada', path: pathname, noindex: true });
  return (
    <section className="nf" aria-labelledby="nf-title">
      <BrandMark className="nf__mark" />
      <div className="container nf__inner">
        <p className="eyebrow">Erro 404</p>
        <h1 id="nf-title" className="nf__title">
          Página não
          <br />
          encontrada<span className="accent">.</span>
        </h1>
        <p className="lead">O endereço acessado não existe ou foi alterado.</p>
        <div className="nf__actions">
          <Button to="/" size="lg">
            Voltar ao início
          </Button>
          <Button to="/servicos" variant="outline" size="lg">
            Ver serviços
          </Button>
        </div>
      </div>
    </section>
  );
}
