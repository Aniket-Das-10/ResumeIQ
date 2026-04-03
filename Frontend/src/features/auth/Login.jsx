import { useState } from 'react';
import {
  HiOutlineMail,
  HiOutlineLockClosed,
  HiOutlineEye,
  HiOutlineEyeOff,
} from 'react-icons/hi';

/* ─────────────────────────────────────────────
   Reusable Input Field
   ───────────────────────────────────────────── */
function InputField({
  id,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  togglePassword,
  showPassword,
}) {
  const isPassword = type === 'password' && togglePassword;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      <div style={{ position: 'relative' }}>
        {/* Left icon */}
        <span
          style={{
            position: 'absolute',
            left: '14px',
            top: '50%',
            transform: 'translateY(-50%)',
            color: '#64748b',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            zIndex: 2,
          }}
        >
          <Icon size={18} />
        </span>

        {/* Input */}
        <input
          id={id}
          type={isPassword && showPassword ? 'text' : type}
          placeholder={placeholder}
          value={value}
          onChange={onChange}
          autoComplete={
            type === 'password'
              ? 'current-password'
              : type === 'email'
              ? 'email'
              : 'off'
          }
          style={{
            display: 'block',
            width: '100%',
            paddingLeft: '44px',
            paddingRight: isPassword ? '44px' : '16px',
            paddingTop: '13px',
            paddingBottom: '13px',
            fontSize: '15px',
            color: '#ffffff',
            backgroundColor: 'rgba(255, 255, 255, 0.04)',
            border: error ? '1px solid rgba(239, 68, 68, 0.5)' : '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '12px',
            outline: 'none',
            transition: 'all 0.2s ease',
            backdropFilter: 'blur(4px)',
            fontFamily: 'Inter, sans-serif',
          }}
          onFocus={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.07)';
            e.target.style.borderColor = 'rgba(139, 92, 246, 0.5)';
            e.target.style.boxShadow = '0 0 0 3px rgba(139, 92, 246, 0.2), 0 0 16px rgba(139, 92, 246, 0.1)';
          }}
          onBlur={(e) => {
            e.target.style.backgroundColor = 'rgba(255, 255, 255, 0.04)';
            e.target.style.borderColor = error ? 'rgba(239, 68, 68, 0.5)' : 'rgba(255, 255, 255, 0.1)';
            e.target.style.boxShadow = 'none';
          }}
        />

        {/* Password visibility toggle */}
        {isPassword && (
          <button
            type="button"
            onClick={togglePassword}
            style={{
              position: 'absolute',
              right: '14px',
              top: '50%',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              color: '#64748b',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              padding: '2px',
              zIndex: 2,
              transition: 'color 0.2s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#a78bfa')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#64748b')}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <HiOutlineEyeOff size={18} /> : <HiOutlineEye size={18} />}
          </button>
        )}
      </div>

      {/* Error */}
      {error && (
        <p style={{ color: '#f87171', fontSize: '12px', paddingLeft: '4px', margin: 0 }}>
          {error}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────
   Main Login Component
   ───────────────────────────────────────────── */
export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  function validate() {
    const e = {};
    if (!form.email.trim()) e.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = 'Enter a valid email address';

    if (!form.password) e.password = 'Password is required';
    else if (form.password.length < 6) e.password = 'Must be at least 6 characters';

    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleChange(evt) {
    const { id, value } = evt.target;
    setForm((p) => ({ ...p, [id]: value }));
    if (errors[id]) setErrors((p) => ({ ...p, [id]: '' }));
  }

  async function handleSubmit(evt) {
    evt.preventDefault();
    if (!validate()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1400));
    setLoading(false);
    // TODO: Integrate with backend API
  }

  /* ── form ── */
  return (
    <Page>
      <div style={{ position: 'relative', width: '100%', maxWidth: '420px', animation: 'fadeIn 0.6s ease' }}>
        {/* Glow behind card */}
        <div
          style={{
            position: 'absolute',
            inset: '-1px',
            borderRadius: '20px',
            background: 'linear-gradient(135deg, rgba(124,58,237,0.2), transparent 50%, rgba(236,72,153,0.2))',
            filter: 'blur(20px)',
            opacity: 0.7,
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
            <div
              style={{
                margin: '0 auto 16px',
                width: '48px',
                height: '48px',
                borderRadius: '14px',
                background: 'linear-gradient(135deg, #7c3aed, #6366f1)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 0 24px rgba(124,58,237,0.35)',
              }}
            >
              <svg style={{ width: '24px', height: '24px', color: 'white' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H4a1 1 0 01-1-1v-2.586a1 1 0 01.293-.707l5.964-5.964A6 6 0 1121 9z" />
              </svg>
            </div>
            <h1 style={{ fontSize: '26px', fontWeight: 700, color: 'white', letterSpacing: '-0.02em' }}>
              Welcome Back
            </h1>
            <p style={{ marginTop: '6px', fontSize: '14px', color: '#94a3b8' }}>
              Log in to continue building your future
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} noValidate style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <InputField
              id="email"
              icon={HiOutlineMail}
              type="email"
              placeholder="Email address"
              value={form.email}
              onChange={handleChange}
              error={errors.email}
            />
            <InputField
              id="password"
              icon={HiOutlineLockClosed}
              type="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              error={errors.password}
              showPassword={showPwd}
              togglePassword={() => setShowPwd((p) => !p)}
            />

            {/* Remember me + Forgot password row */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '-4px' }}>
              <label
                htmlFor="remember-me"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  cursor: 'pointer',
                  fontSize: '13px',
                  color: '#94a3b8',
                  userSelect: 'none',
                }}
              >
                <div
                  onClick={() => setRememberMe((p) => !p)}
                  style={{
                    width: '16px',
                    height: '16px',
                    borderRadius: '4px',
                    border: rememberMe ? '1px solid #7c3aed' : '1px solid rgba(255,255,255,0.15)',
                    backgroundColor: rememberMe ? 'rgba(124,58,237,0.25)' : 'rgba(255,255,255,0.04)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    transition: 'all 0.2s ease',
                    cursor: 'pointer',
                    flexShrink: 0,
                  }}
                >
                  {rememberMe && (
                    <svg style={{ width: '10px', height: '10px', color: '#a78bfa' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  )}
                </div>
                Remember me
              </label>
              <a
                href="#"
                id="forgot-password-link"
                style={{
                  fontSize: '13px',
                  color: '#a78bfa',
                  fontWeight: 500,
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = '#c4b5fd';
                  e.currentTarget.style.textDecoration = 'underline';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = '#a78bfa';
                  e.currentTarget.style.textDecoration = 'none';
                }}
              >
                Forgot password?
              </a>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              id="login-submit-btn"
              style={{
                marginTop: '8px',
                width: '100%',
                padding: '13px 0',
                borderRadius: '12px',
                background: 'linear-gradient(135deg, #7c3aed, #8b5cf6, #6366f1)',
                color: 'white',
                fontWeight: 600,
                fontSize: '14px',
                border: 'none',
                cursor: loading ? 'not-allowed' : 'pointer',
                opacity: loading ? 0.6 : 1,
                boxShadow: '0 4px 24px rgba(139, 92, 246, 0.25)',
                transition: 'all 0.2s ease',
                fontFamily: 'Inter, sans-serif',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.currentTarget.style.transform = 'scale(1.02)';
                  e.currentTarget.style.boxShadow = '0 4px 32px rgba(139, 92, 246, 0.4)';
                }
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'scale(1)';
                e.currentTarget.style.boxShadow = '0 4px 24px rgba(139, 92, 246, 0.25)';
              }}
              onMouseDown={(e) => { if (!loading) e.currentTarget.style.transform = 'scale(0.98)'; }}
              onMouseUp={(e) => { if (!loading) e.currentTarget.style.transform = 'scale(1.02)'; }}
            >
              {loading ? (
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                  <svg style={{ width: '16px', height: '16px', animation: 'spin 1s linear infinite' }} fill="none" viewBox="0 0 24 24">
                    <circle style={{ opacity: 0.25 }} cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path style={{ opacity: 0.75 }} fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Signing in…
                </span>
              ) : (
                'Log In'
              )}
            </button>
          </form>

          {/* Divider */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', margin: '24px 0' }}>
            <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
            <span style={{ fontSize: '11px', textTransform: 'uppercase', letterSpacing: '0.15em', color: '#64748b' }}>or</span>
            <span style={{ flex: 1, height: '1px', background: 'rgba(255,255,255,0.08)' }} />
          </div>

          {/* Social */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              {
                label: 'Google',
                icon: (
                  <svg style={{ width: '16px', height: '16px' }} viewBox="0 0 24 24">
                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                  </svg>
                ),
              },
              {
                label: 'GitHub',
                icon: (
                  <svg style={{ width: '16px', height: '16px' }} fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                ),
              },
            ].map(({ label, icon }) => (
              <button
                key={label}
                type="button"
                id={`login-social-${label.toLowerCase()}`}
                style={{
                  flex: 1,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '10px 0',
                  borderRadius: '12px',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backgroundColor: 'rgba(255,255,255,0.03)',
                  color: '#cbd5e1',
                  fontSize: '13px',
                  fontWeight: 500,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  fontFamily: 'Inter, sans-serif',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.07)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.18)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.03)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)';
                }}
              >
                {icon}
                {label}
              </button>
            ))}
          </div>

          {/* Sign up link */}
          <p style={{ textAlign: 'center', fontSize: '14px', color: '#94a3b8', marginTop: '24px' }}>
            Don&apos;t have an account?{' '}
            <a
              href="#"
              id="signup-link"
              style={{
                color: '#a78bfa',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = '#c4b5fd';
                e.currentTarget.style.textDecoration = 'underline';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = '#a78bfa';
                e.currentTarget.style.textDecoration = 'none';
              }}
            >
              Sign up
            </a>
          </p>
        </div>
      </div>
    </Page>
  );
}

/* ─────────────────────────────────────────────
   Page wrapper (background + centering)
   ───────────────────────────────────────────── */
function Page({ children }) {
  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        minHeight: '100vh',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
        backgroundColor: '#07070d',
        padding: '40px 16px',
        fontFamily: 'Inter, sans-serif',
      }}
    >
      {/* Background decorations */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }} aria-hidden="true">
        {/* Gradient mesh */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background:
              'radial-gradient(ellipse at top right, rgba(124,58,237,0.1), transparent 50%), radial-gradient(ellipse at bottom left, rgba(99,102,241,0.08), transparent 50%)',
          }}
        />
        {/* Blobs */}
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
        {/* Grid */}
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

      {/* Content */}
      <div style={{ position: 'relative', zIndex: 10, width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    </div>
  );
}
