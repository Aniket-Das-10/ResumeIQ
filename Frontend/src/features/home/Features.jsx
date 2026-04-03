import {
  HiOutlineDocumentText,
  HiOutlineSearch,
  HiOutlineLightningBolt,
  HiOutlineChatAlt2,
  HiOutlineShieldCheck,
} from 'react-icons/hi';
import ScrollReveal from '../../components/ScrollReveal';

const features = [
  {
    icon: HiOutlineDocumentText,
    title: 'Resume Upload & Parsing',
    description: 'Upload your resume in any format. Our AI instantly parses and structures your experience, skills, and achievements.',
    gradient: 'from-violet-500 to-indigo-500',
    shadow: 'shadow-violet-500/20',
  },
  {
    icon: HiOutlineSearch,
    title: 'Job Description Analysis',
    description: 'Paste any job description and our AI breaks down the required skills, qualifications, and keywords you need.',
    gradient: 'from-blue-500 to-cyan-500',
    shadow: 'shadow-blue-500/20',
  },
  {
    icon: HiOutlineLightningBolt,
    title: 'Skill Gap Detection',
    description: 'Instantly identify missing skills between your resume and target job. Get actionable suggestions to bridge the gap.',
    gradient: 'from-amber-500 to-orange-500',
    shadow: 'shadow-amber-500/20',
  },
  {
    icon: HiOutlineChatAlt2,
    title: 'AI Interview Questions',
    description: 'Generate tailored interview questions based on the job role. Practice with AI-powered mock interviews.',
    gradient: 'from-emerald-500 to-teal-500',
    shadow: 'shadow-emerald-500/20',
  },
  {
    icon: HiOutlineShieldCheck,
    title: 'ATS Resume Optimization',
    description: 'Ensure your resume passes Applicant Tracking Systems. Get a compatibility score and optimization tips.',
    gradient: 'from-fuchsia-500 to-pink-500',
    shadow: 'shadow-fuchsia-500/20',
  },
];

export default function Features() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <div className="w-11/12 mx-auto">
        {/* Section Header */}
        <ScrollReveal>
          <div className="text-center mb-16">
            <span className="inline-block px-3 py-1 rounded-full text-xs font-medium bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-4">
              Features
            </span>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Everything You Need to{' '}
              <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
                Land Your Dream Job
              </span>
            </h2>
            <p className="text-slate-400 text-lg max-w-2xl mx-auto">
              Powerful AI tools designed to give you an unfair advantage in your job search.
            </p>
          </div>
        </ScrollReveal>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100}>
              <FeatureCard feature={feature} />
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature }) {
  const { icon: Icon, title, description, gradient, shadow } = feature;

  return (
    <div className="group relative p-6 rounded-2xl border border-white/5 bg-white/[0.02] backdrop-blur-sm hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300 cursor-default h-full">
      {/* Hover glow */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-300 pointer-events-none`} />

      <div className="relative">
        <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} ${shadow} shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
        <p className="text-sm text-slate-400 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
