import { HiOutlineArrowRight } from 'react-icons/hi';
import ScrollReveal from '../../components/ScrollReveal';

export default function CTASection() {
  return (
    <section id="cta" className="relative py-24 sm:py-32">
      <div className="w-11/12 mx-auto">
        <ScrollReveal>
          <div className="relative overflow-hidden rounded-3xl">
            {/* Background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-pink-600/20" />
            <div className="absolute inset-0 bg-[#0a0a14]/60 backdrop-blur-xl" />

            {/* Decorative orbs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-violet-500/10 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-[80px]" />

            {/* Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />

            <div className="relative px-8 sm:px-16 py-16 sm:py-20 text-center">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Start Building Your Future{' '}
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Today
                </span>
              </h2>
              <p className="text-slate-400 text-lg max-w-xl mx-auto mb-8">
                Join thousands of professionals who&#39;ve leveled up their job search with ResumeIQ.
              </p>
              <button
                onClick={() => console.log('Try Now clicked')}
                id="cta-try-now"
                className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold shadow-2xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-200 text-base cursor-pointer"
              >
                Try Now — It&#39;s Free
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
