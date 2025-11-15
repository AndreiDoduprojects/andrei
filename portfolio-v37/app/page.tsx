import Background from '@/components/Background';
import Navigation from '@/components/Navigation';
import Hero from '@/components/Hero';
import FeatureCards from '@/components/FeatureCards';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <>
      {/* Background Effects */}
      <Background />

      {/* Main Content */}
      <div className="relative z-10">
        <Navigation />
        <Hero />
        <FeatureCards />
        <Contact />
        <Footer />
      </div>
    </>
  );
}
