import { useNavigate } from 'react-router-dom';
import { HiOutlineArrowRight, HiOutlineUpload } from 'react-icons/hi';

export default function Hero() {
  const navigate = useNavigate();

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-20">
      {/* ── Background ── */}
      <div className="absolute inset-0 pointer-events-none" aria-hidden="true">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(124,58,237,0.15),transparent_50%),radial-gradient(ellipse_at_bottom_left,rgba(236,72,153,0.1),transparent_50%)]" />
        <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-violet-600/10 blur-[120px]" style={{ animation: 'float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full bg-fuchsia-600/10 blur-[100px]" style={{ animation: 'float-reverse 10s ease-in-out infinite' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-indigo-600/5 blur-[150px]" style={{ animation: 'glow-pulse 6s ease-in-out infinite' }} />
        <div className="absolute inset-0" style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)', backgroundSize: '64px 64px' }} />
      </div>

      <div className="relative z-10 w-11/12 mx-auto flex flex-col items-center text-center gap-6">

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-sm" style={{ animation: 'fadeIn 0.6s ease' }}>
          <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
          <span className="text-xs text-slate-300 font-medium tracking-wide">AI-Powered Resume Intelligence</span>
        </div>

        {/* Headline */}
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight max-w-4xl" style={{ animation: 'fadeIn 0.8s ease' }}>
          <span className="bg-gradient-to-r from-white via-white to-slate-400 bg-clip-text text-transparent">
            Build Your Perfect
          </span>
          <br />
          <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">
            Resume with AI
          </span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-lg sm:text-xl text-slate-300 leading-relaxed" style={{ animation: 'fadeIn 1s ease' }}>
          Upload your resume, analyze job descriptions, detect skill gaps, and get AI&#8209;generated interview questions&nbsp;&mdash; all in one platform.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-4" style={{ animation: 'fadeIn 1.2s ease' }}>
          <button
            onClick={() => navigate('/signup')}
            id="hero-get-started"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-semibold text-lg shadow-xl shadow-violet-500/25 hover:shadow-violet-500/40 hover:scale-105 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            Get Started
            <HiOutlineArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
          </button>
          <button
            onClick={() => navigate('/login')}
            id="hero-upload-resume"
            className="group inline-flex items-center gap-2 px-10 py-4 rounded-xl border border-white/15 bg-white/5 backdrop-blur-sm text-slate-200 font-semibold text-lg hover:bg-white/10 hover:border-white/25 hover:scale-105 active:scale-[0.98] transition-all duration-200 cursor-pointer"
          >
            <HiOutlineUpload size={20} />
            Log In
          </button>
        </div>

        {/* Stats */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-10 sm:gap-16" style={{ animation: 'fadeIn 1.4s ease' }}>
          {[
            { value: '10K+', label: 'Resumes Analyzed' },
            { value: '95%', label: 'ATS Pass Rate' },
            { value: '3x', label: 'More Interviews' },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-2xl sm:text-3xl font-bold bg-gradient-to-r from-violet-300 to-fuchsia-300 bg-clip-text text-transparent">{stat.value}</p>
              <p className="text-sm text-slate-400 mt-1 tracking-wide">{stat.label}</p>
            </div>
          ))}
        </div>

      </div>

      {/* Floating dots */}
      <div className="absolute top-20 right-[10%] w-3 h-3 rounded-full bg-violet-400/30 hidden sm:block" style={{ animation: 'float 5s ease-in-out infinite' }} />
      <div className="absolute top-40 left-[8%] w-2 h-2 rounded-full bg-fuchsia-400/30 hidden sm:block" style={{ animation: 'float-reverse 7s ease-in-out infinite' }} />
      <div className="absolute bottom-32 right-[15%] w-4 h-4 rounded-sm bg-indigo-400/20 rotate-45 hidden sm:block" style={{ animation: 'float 9s ease-in-out infinite' }} />
      <div className="absolute bottom-40 left-1/4 w-2 h-2 rounded-full bg-pink-400/20 hidden sm:block" style={{ animation: 'float-reverse 6s ease-in-out infinite' }} />
    </section>
  );
}
