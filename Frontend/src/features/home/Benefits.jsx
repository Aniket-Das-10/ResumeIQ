import { HiOutlineCheck } from 'react-icons/hi';
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
    <section id="benefits" className="relative py-24 sm:py-32">
      <div className="w-11/12 mx-auto">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <ScrollReveal>
            <div>
              <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 mb-4">
                Benefits
              </span>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
                Why Choose{' '}
                <span className="bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  ResumeIQ?
                </span>
              </h2>
              <p className="text-slate-400 text-lg mb-8">
                Join thousands of job seekers who&#39;ve transformed their job search with AI-powered resume intelligence.
              </p>
              <button
                onClick={() => console.log('Start free clicked')}
                id="benefits-cta"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 text-white font-semibold text-sm shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              >
                Start Free Today
              </button>
            </div>
          </ScrollReveal>

          {/* Right */}
          <div className="grid sm:grid-cols-2 gap-4">
            {benefits.map((benefit, index) => (
              <ScrollReveal key={benefit.title} delay={index * 80}>
                <div className="group flex gap-3 p-4 rounded-xl border border-white/5 bg-white/[0.02] hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 h-full">
                  <div className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-500/10 flex items-center justify-center mt-0.5">
                    <HiOutlineCheck className="w-3.5 h-3.5 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-sm font-semibold text-white mb-1">{benefit.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{benefit.description}</p>
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
