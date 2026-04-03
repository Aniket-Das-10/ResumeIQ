import Navbar from './Navbar';
import Hero from './Hero';
import Features from './Features';
import HowItWorks from './HowItWorks';
import Benefits from './Benefits';
import CTASection from './CTASection';
import Footer from './Footer';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#07070d] text-slate-100 overflow-x-hidden">
      <Navbar />
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
