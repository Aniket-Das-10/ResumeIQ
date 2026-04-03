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
    <section id="features" className="relative py-20 sm:py-24">
      <div className="w-11/12 mx-auto">

        {/* ── Section Header ── centred, no ScrollReveal wrapper */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-violet-500/10 text-violet-400 border border-violet-500/20 mb-5">
            Features
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 mx-auto max-w-3xl">
            Everything You Need to{' '}
            <span className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              Land Your Dream Job
            </span>
          </h2>
          <p className="text-slate-300 text-lg mx-auto max-w-2xl">
            Powerful AI tools designed to give you an unfair advantage in your job search.
          </p>
        </div>

        {/* ── Feature Cards ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <ScrollReveal key={feature.title} delay={index * 100} className="h-full">
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
    <div className="group relative bg-white/5 border border-white/10 backdrop-blur-md rounded-2xl p-7 md:p-8 hover:bg-white/[0.08] hover:border-violet-500/30 transition-all duration-300 cursor-default h-full flex flex-col gap-5">
      {/* Hover glow overlay */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-[0.06] transition-opacity duration-300 pointer-events-none`} />

      {/* Icon */}
      <div className={`relative inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${gradient} ${shadow} shadow-lg group-hover:scale-110 transition-transform duration-300 self-start`}>
        <Icon className="w-6 h-6 text-white" />
      </div>

      {/* Text */}
      <div className="relative flex flex-col gap-2 flex-1">
        <h3 className="text-lg font-semibold text-white">{title}</h3>
        <p className="text-base text-slate-300 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}
