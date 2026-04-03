import {
  HiOutlineUpload,
  HiOutlineClipboardCopy,
  HiOutlineChartBar,
  HiOutlineDownload,
} from 'react-icons/hi';
import ScrollReveal from '../../components/ScrollReveal';

const steps = [
  {
    number: '01',
    icon: HiOutlineUpload,
    title: 'Upload Resume',
    description: 'Upload your resume in PDF, DOCX, or plain text. Our AI parses it instantly.',
  },
  {
    number: '02',
    icon: HiOutlineClipboardCopy,
    title: 'Paste Job Description',
    description: 'Copy and paste the target job description. We analyze every requirement.',
  },
  {
    number: '03',
    icon: HiOutlineChartBar,
    title: 'Analyze & Get Insights',
    description: 'Receive detailed analysis with skill gaps, match scores, and improvement areas.',
  },
  {
    number: '04',
    icon: HiOutlineDownload,
    title: 'Improve & Download',
    description: 'Apply AI suggestions, optimize for ATS, and download your improved resume.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="relative py-20 sm:py-24">
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-violet-500/[0.02] to-transparent pointer-events-none" />

      <div className="relative w-11/12 mx-auto">

        {/* ── Section Header ── centred, no ScrollReveal wrapper */}
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-fuchsia-500/10 text-fuchsia-400 border border-fuchsia-500/20 mb-5">
            How It Works
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white mb-5 mx-auto max-w-3xl">
            Simple Steps to{' '}
            <span className="bg-gradient-to-r from-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
              Your Best Resume
            </span>
          </h2>
          <p className="text-slate-300 text-lg mx-auto max-w-2xl">
            From upload to download, our AI guides you through every step.
          </p>
        </div>

        {/* ── Steps ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-[2rem] left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-violet-500/20 via-fuchsia-500/30 to-pink-500/20 pointer-events-none" />

          {steps.map((step, index) => (
            <ScrollReveal key={step.number} delay={index * 150} className="w-full">
              <StepCard step={step} />
            </ScrollReveal>
          ))}
        </div>

      </div>
    </section>
  );
}

function StepCard({ step }) {
  const { number, icon: Icon, title, description } = step;

  return (
    <div className="flex flex-col items-center text-center group px-2">
      {/* Icon + Badge */}
      <div className="relative mb-6">
        <div className="flex items-center justify-center w-16 h-16 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm group-hover:border-violet-500/40 group-hover:bg-violet-500/10 transition-all duration-300">
          <Icon className="w-7 h-7 text-violet-400 group-hover:text-violet-300 transition-colors" />
        </div>
        <span className="absolute -top-2.5 -right-2.5 w-6 h-6 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 text-[10px] font-bold text-white flex items-center justify-center shadow-lg shadow-violet-500/40 ring-2 ring-[#07070d]">
          {number}
        </span>
      </div>

      <h3 className="text-lg font-semibold text-white mb-2">{title}</h3>
      <p className="text-base text-slate-300 leading-relaxed">{description}</p>
    </div>
  );
}
