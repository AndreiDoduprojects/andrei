import Background from '@/components/Background';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Contact from '@/components/Contact';

export default function Home() {
  return (
    <>
      <Background />
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <Projects />
        <Skills />
        <Contact />
      </div>
    </>
  );
}
