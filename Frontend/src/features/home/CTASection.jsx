import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowRight } from 'react-icons/hi';
import { useAuth } from '../auth.contex';
import ScrollReveal from '../../components/ScrollReveal';

export default function CTASection() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  return (
    <section id="cta" className="relative py-20 sm:py-24">
      <div className="w-11/12 mx-auto">
        <ScrollReveal className="w-full">
          <div className="relative overflow-hidden rounded-3xl">
            {/* Gradient background */}
            <div className="absolute inset-0 bg-gradient-to-br from-violet-600/20 via-fuchsia-600/20 to-pink-600/20" />
            <div className="absolute inset-0 bg-[#0a0a14]/60 backdrop-blur-xl" />

            {/* Decorative orbs */}
            <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-violet-500/10 blur-[80px]" />
            <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-fuchsia-500/10 blur-[80px]" />

            {/* Border */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 pointer-events-none" />

            {/* Content — fully centered */}
            <div className="relative flex flex-col items-center text-center px-8 sm:px-16 py-16 md:py-20 gap-6">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white max-w-2xl">
                Start Building Your Future{' '}
                <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                  Today
                </span>
              </h2>
              <p className="text-slate-300 text-lg max-w-xl">
                Join thousands of professionals who&#39;ve leveled up their job search with ResumeIQ.
              </p>
              <button
                onClick={() => navigate(isAuthenticated ? '/interview' : '/signup')}
                id="cta-try-now"
                className="group inline-flex items-center gap-3 px-12 py-5 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg shadow-2xl shadow-violet-500/30 hover:shadow-violet-500/50 hover:scale-105 active:scale-[0.98] transition-all duration-200 cursor-pointer mt-2"
              >
                {isAuthenticated ? 'Go to Interview' : "Try Now — It's Free"}
                <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
              </button>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}
