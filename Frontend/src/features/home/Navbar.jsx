import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { HiOutlineMenu, HiOutlineX } from 'react-icons/hi';

const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'How It Works', href: '#how-it-works' },
  { label: 'Benefits', href: '#benefits' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-[#07070d]/80 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
          : 'bg-transparent'
      }`}
    >
      <div className="w-11/12 mx-auto">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group" id="navbar-logo">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-lg shadow-violet-500/25 group-hover:shadow-violet-500/40 transition-shadow">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <span className="text-xl font-bold bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              ResumeIQ
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="text-sm text-slate-400 hover:text-white transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-violet-500 to-fuchsia-500 group-hover:w-full transition-all duration-300" />
              </a>
            ))}
          </div>

          {/* Desktop CTAs */}
          <div className="hidden md:flex items-center gap-3">
            <Link to="/login" id="nav-login" className="text-sm text-slate-300 hover:text-white px-4 py-2 rounded-lg transition-colors duration-200">
              Log In
            </Link>
            <Link to="/signup" id="nav-signup" className="text-sm font-medium text-white px-5 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 shadow-lg shadow-violet-500/25 hover:shadow-violet-500/40 transition-all duration-200">
              Sign Up
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden text-slate-300 hover:text-white p-2" id="mobile-menu-btn">
            {mobileOpen ? <HiOutlineX size={24} /> : <HiOutlineMenu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ${
          mobileOpen ? 'max-h-80 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-[#0a0a14]/95 backdrop-blur-xl border-t border-white/5 px-4 py-4 space-y-3">
          {navLinks.map((link) => (
            <a key={link.label} href={link.href} className="block text-sm text-slate-400 hover:text-white py-2 transition-colors" onClick={() => setMobileOpen(false)}>
              {link.label}
            </a>
          ))}
          <div className="pt-3 border-t border-white/5 flex flex-col gap-2">
            <Link to="/login" className="text-sm text-center text-slate-300 hover:text-white px-4 py-2 rounded-lg border border-white/10" onClick={() => setMobileOpen(false)}>Log In</Link>
            <Link to="/signup" className="text-sm text-center font-medium text-white px-4 py-2 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600" onClick={() => setMobileOpen(false)}>Sign Up</Link>
          </div>
        </div>
      </div>
    </nav>
  );
}
