import { useSeo } from '@/hooks/useSeo';
import { useProgressiveMount } from '@/hooks/useProgressiveMount';
import { Hero } from '@/sections/Hero';
import { About } from '@/sections/About';
import { Services } from '@/sections/Services';
import { ProblemSolution } from '@/sections/ProblemSolution';
import { Process } from '@/sections/Process';
import { BeforeAfterSection } from '@/sections/BeforeAfterSection';
import { Projects } from '@/sections/Projects';
import { Differentials } from '@/sections/Differentials';
import { CtaBanner } from '@/sections/CtaBanner';
import { Testimonials } from '@/sections/Testimonials';
import { Faq } from '@/sections/Faq';
import { Contact } from '@/sections/Contact';

/** Ordem das seções abaixo do Hero (montadas progressivamente). */
const sections = [About, Services, ProblemSolution, Process, BeforeAfterSection, Projects, Differentials, CtaBanner, Testimonials, Faq, Contact];

export default function Home() {
  useSeo({ path: '/' });
  // No HTML pré-renderizado todas as seções entram (SEO); no navegador a montagem é progressiva
  const count = useProgressiveMount(sections.length, import.meta.env.SSR ? sections.length : 1);
  return (
    <>
      <Hero />
      {sections.slice(0, count).map((Section, i) => (
        <Section key={i} />
      ))}
    </>
  );
}
