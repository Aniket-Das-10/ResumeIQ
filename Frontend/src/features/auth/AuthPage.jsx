import { Link, useLocation } from 'react-router-dom';
import AuthToggle from './AuthToggle';
import LoginForm from './LoginForm';
import SignupForm from './SignupForm';

/* ─────────────────────────────────────────────
   Unified Auth Page with Sliding Toggle
   ───────────────────────────────────────────── */
const AuthPage = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <PageWrapper>
      <div style={{ position: 'relative', width: '100%', maxWidth: '420px', animation: 'fadeIn 0.6s ease' }}>
        {/* Glow behind card */}
        <div
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '20px',
            background: isLoginPage 
              ? 'linear-gradient(135deg, rgba(124,58,237,0.2), transparent 50%, rgba(99,102,241,0.2))'
              : 'linear-gradient(135deg, rgba(168,85,247,0.2), transparent 50%, rgba(236,72,153,0.2))',
            filter: 'blur(20px)',
            opacity: 0.7,
            transition: 'background 0.5s ease',
            pointerEvents: 'none',
          }}
        />

        {/* Card */}
        <div
          style={{
            position: 'relative',
            borderRadius: '16px',
            border: '1px solid rgba(255,255,255,0.08)',
            backgroundColor: 'rgba(255,255,255,0.04)',
            backdropFilter: 'blur(24px)',
            boxShadow: '0 25px 50px rgba(0,0,0,0.5)',
            padding: '40px 32px',
          }}
        >
          {/* Header */}
          <div style={{ textAlign: 'center', marginBottom: '32px' }}>
            <Link to="/" style={{ textDecoration: 'none', display: 'inline-block' }}>
              <div
                style={{
                  margin: '0 auto 16px',
                  width: '48px',
                  height: '48px',
                  borderRadius: '14px',
                  background: isLoginPage 
                    ? 'linear-gradient(135deg, #7c3aed, #6366f1)'
                    : 'linear-gradient(135deg, #a855f7, #ec4899)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: isLoginPage 
                    ? '0 0 24px rgba(124,58,237,0.35)'
                    : '0 0 24px rgba(168,85,247,0.3)',
                  transition: 'all 0.5s ease',
                }}
              >
                <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  {isLoginPage ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 11c0 3.517-1.009 6.799-2.753 9.571m-3.44-2.04l.054-.09A13.916 13.916 0 008 11a4 4 0 118 0c0 1.017-.07 2.019-.203 3m-2.118 6.844A21.88 21.88 0 0015.171 17m3.839 1.132c.645-2.266.99-4.659.99-7.132A8 8 0 008 4.07M3 15.364c.64-1.319 1-2.8 1-4.364 0-1.457.39-2.823 1.07-4" />
                  )}
                </svg>
              </div>
            </Link>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em', transition: 'all 0.3s ease' }}>
              {isLoginPage ? 'Welcome Back' : 'Create Account'}
            </h1>
            <p style={{ marginTop: '6px', fontSize: '14px', color: '#94a3b8' }}>
              {isLoginPage ? 'Log in to continue building your future' : 'Join ResumeIQ and land your dream job'}
            </p>
          </div>

          {/* Toggle */}
          <AuthToggle />

          {/* Forms with simple Fade transition */}
          <div key={location.pathname} style={{ animation: 'fadeIn 0.4s ease' }}>
            {isLoginPage ? <LoginForm /> : <SignupForm />}
          </div>

          {/* Bottom Link (Secondary) */}
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#94a3b8', marginTop: '24px' }}>
            {isLoginPage ? "Don't have an account? " : "Already have an account? "}
            <Link
              to={isLoginPage ? "/signup" : "/login"}
              style={{
                color: '#a78bfa',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
            >
              {isLoginPage ? 'Sign up' : 'Log in'}
            </Link>
          </p>
        </div>
      </div>
    </PageWrapper>
  );
};

/* ─────────────────────────────────────────────
   Internal Page Wrapper (same as original)
   ───────────────────────────────────────────── */
function PageWrapper({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'flex-start',
        justifyContent: 'center',

        overflow: 'hidden',
        backgroundColor: '#07070d',
        padding: '100px 16px 60px',
        fontFamily: 'Inter, sans-serif',

      }}
    >
      {/* Background decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at top right, rgba(124,58,237,0.1), transparent 50%), radial-gradient(ellipse at bottom left, rgba(99,102,241,0.08), transparent 50%)',
          }}
        />
        <div
          style={{
            position: 'absolute',
            top: '-160px',
            left: '-160px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            backgroundColor: 'rgba(124,58,237,0.06)',
            filter: 'blur(120px)',
            animation: 'drift 22s ease-in-out infinite',
          }}
        />
        <div
          style={{
            position: 'absolute',
            bottom: '-160px',
            right: '-160px',
            width: '500px',
            height: '500px',
            borderRadius: '50%',
            backgroundColor: 'rgba(99,102,241,0.05)',
            filter: 'blur(120px)',
            animation: 'drift 26s ease-in-out infinite reverse',
          }}
        />
        <div
          style={{
            position: 'absolute',
            inset: 0,
            backgroundImage:
              'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
            backgroundSize: '56px 56px',
          }}
        />
      </div>

      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}

export default AuthPage;
