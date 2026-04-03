import { Link } from 'react-router-dom';
import { FiGithub, FiTwitter, FiLinkedin } from 'react-icons/fi';

const footerLinks = {
  Product: ['Features', 'How It Works', 'Pricing', 'FAQ'],
  Company: ['About', 'Blog', 'Careers', 'Contact'],
  Legal: ['Privacy Policy', 'Terms of Service', 'Cookie Policy'],
};

const socialLinks = [
  { icon: FiGithub, href: '#', label: 'GitHub' },
  { icon: FiTwitter, href: '#', label: 'Twitter' },
  { icon: FiLinkedin, href: '#', label: 'LinkedIn' },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#050508]">
      <div className="w-11/12 mx-auto">
        {/* Main footer */}
        <div className="py-12 sm:py-16 grid grid-cols-2 md:grid-cols-5 gap-8">
          {/* Brand */}
          <div className="col-span-2">
            <Link to="/" className="flex items-center gap-2 mb-4" id="footer-logo">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-lg font-bold text-white">ResumeIQ</span>
            </Link>
            <p className="text-sm text-slate-500 max-w-xs leading-relaxed mb-6">
              AI-powered resume intelligence platform. Build, analyze, and optimize your resume for any job.
            </p>
            <div className="flex gap-3">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 rounded-lg border border-white/10 bg-white/5 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 hover:border-white/20 transition-all duration-200"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {Object.entries(footerLinks).map(([heading, links]) => (
            <div key={heading}>
              <h3 className="text-sm font-semibold text-white mb-4">{heading}</h3>
              <ul className="space-y-2.5">
                {links.map((link) => (
                  <li key={link}>
                    <a href="#" className="text-sm text-slate-500 hover:text-slate-300 transition-colors duration-200">
                      {link}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom bar */}
        <div className="py-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-slate-600">
            &copy; {new Date().getFullYear()} ResumeIQ. All rights reserved.
          </p>
          <p className="text-xs text-slate-600">
            Built with ❤️ for job seekers everywhere.
          </p>
        </div>
      </div>
    </footer>
  );
}
