import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';
import CTASection from './CTASection';
import Footer from './Footer';

export default function Home() {
  const { hash } = useLocation();

  useEffect(() => {
    if (hash === '#') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (hash) {
      const element = document.getElementById(hash.replace('#', ''));
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [hash]);


  return (
    <div className="min-h-screen bg-[#07070d] text-slate-100 overflow-x-hidden">
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <Benefits />
        <CTASection />
      </main>
      <Footer />
    </div>
  );
}
