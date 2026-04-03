import { HiOutlineCheck, HiOutlineArrowRight } from 'react-icons/hi';
import ScrollReveal from '../../components/ScrollReveal';

const benefits = [
  { title: 'Increase Interview Chances', description: 'Tailor your resume precisely to each job description, dramatically increasing your callback rate.' },
  { title: 'Beat ATS Filters', description: 'Optimize keyword placement and formatting to ensure your resume passes automated screening systems.' },
  { title: 'Identify Missing Skills', description: 'Get clear visibility into skill gaps and actionable steps to make your profile more competitive.' },
  { title: 'Practice Smarter', description: 'Prepare with role-specific interview questions generated from actual job requirements.' },
  { title: 'Save Hours of Work', description: 'Let AI handle resume optimization in minutes, not hours. Focus on what matters — your career.' },
  { title: 'Data-Driven Insights', description: 'Get match scores, keyword analysis, and competitive positioning backed by real data.' },
];

export default function Benefits() {
  return (
    <section id="benefits" className="relative py-20 sm:py-24">
      <div className="w-11/12 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-16 items-start">

          {/* ── Left: heading + intro + CTA ── */}
          <div className="flex flex-col gap-5 lg:col-span-1">
            <span className="inline-block w-fit px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              Benefits
            </span>
            <h2 className="text-3xl sm:text-4xl font-bold text-white leading-tight">
              Why Choose{' '}
              <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                ResumeIQ?
              </span>
            </h2>
            <p className="text-slate-300 text-lg leading-relaxed">
              Join thousands of job seekers who&#39;ve transformed their job search with AI-powered resume intelligence.
            </p>
            <button
              onClick={() => console.log('Start free clicked')}
              id="benefits-cta"
              className="group inline-flex items-center gap-2 w-fit px-8 py-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-base shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-200 cursor-pointer"
            >
              Start Free Today
              <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" size={18} />
            </button>
          </div>

          {/* ── Right: 2-col benefit cards ── */}
          <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 80} className="h-full">
                <div className="flex gap-4 p-5 rounded-2xl border border-white/5 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/10 transition-all duration-300 h-full">
                  <div className="flex-shrink-0 w-8 h-8 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center mt-0.5">
                    <HiOutlineCheck className="w-4 h-4 text-emerald-400" />
                  </div>
                  <div className="flex flex-col gap-1">
                    <h3 className="text-base font-semibold text-white">{benefit.title}</h3>
                    <p className="text-sm text-slate-300 leading-relaxed">{benefit.description}</p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
