import { useState, useRef, useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { HiOutlineMailOpen, HiOutlineRefresh, HiOutlineCheckCircle } from 'react-icons/hi';

const OTPVerification = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your email';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resending, setResending] = useState(false);
  const [timer, setTimer] = useState(60);
  const [isVerified, setIsVerified] = useState(false);
  
  const inputRefs = useRef([]);

  // Auto-focus first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  // Countdown timer for resend
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    
    const newOtp = [...otp];
    newOtp[index] = value.substring(value.length - 1);
    setOtp(newOtp);
    setError('');

    // Advance to next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData('text').slice(0, 6).split('');
    if (pasteData.every(char => !isNaN(char))) {
      const newOtp = [...otp];
      pasteData.forEach((char, i) => {
        newOtp[i] = char;
      });
      setOtp(newOtp);
      if (inputRefs.current[pasteData.length - 1]) {
        inputRefs.current[pasteData.length - 1].focus();
      }
    }
  };

  const handleVerify = async (e) => {
    e.preventDefault();
    const fullOtp = otp.join('');
    if (fullOtp.length < 6) {
      setError('Please enter all 6 digits');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const response = await fetch('http://localhost:8080/api/auth/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp: fullOtp }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Verification failed');
      }

      setIsVerified(true);
      setTimeout(() => {
        navigate('/'); // Redirect to home or dashboard
      }, 2000);

    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (timer > 0 || resending) return;

    setResending(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:8080/api/auth/resend-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || 'Failed to resend OTP');

      setTimer(60);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0].focus();
    } catch (err) {
      setError(err.message);
    } finally {
      setResending(false);
    }
  };

  return (
    <div style={styles.pageContainer}>
      {/* Background patterns */}
      <div style={styles.backgroundPatterns} />

      <div style={styles.cardContainer}>
        {/* Glow effect */}
        <div style={styles.glow} />

        <div style={styles.card}>
          {isVerified ? (
            <div style={styles.successState}>
              <div style={styles.successIconContainer}>
                <HiOutlineCheckCircle style={styles.successIcon} />
              </div>
              <h1 style={styles.title}>Email Verified!</h1>
              <p style={styles.subtitle}>Welcome to ResumeIQ. Redirecting you to your dashboard...</p>
            </div>
          ) : (
            <>
              <div style={styles.iconContainer}>
                <div style={styles.iconWrapper}>
                  <HiOutlineMailOpen style={styles.icon} />
                </div>
              </div>

              <h1 style={styles.title}>Verify Your Email</h1>
              <p style={styles.subtitle}>
                We've sent a 6-digit verification code to<br />
                <span style={styles.emailText}>{email}</span>
              </p>

              <form onSubmit={handleVerify} style={styles.form}>
                <div style={styles.otpInputGroup} onPaste={handlePaste}>
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      type="text"
                      maxLength="1"
                      ref={(el) => (inputRefs.current[index] = el)}
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      style={{
                        ...styles.otpInput,
                        borderColor: error ? 'rgba(239, 68, 68, 0.5)' : digit ? 'rgba(167, 139, 250, 0.5)' : 'rgba(255, 255, 255, 0.1)',
                        boxShadow: digit ? '0 0 15px rgba(167, 139, 250, 0.1)' : 'none',
                      }}
                    />
                  ))}
                </div>

                {error && <p style={styles.errorMessage}>{error}</p>}

                <button
                  type="submit"
                  disabled={loading || otp.some(d => !d)}
                  style={{
                    ...styles.verifyButton,
                    opacity: loading || otp.some(d => !d) ? 0.6 : 1,
                    cursor: loading || otp.some(d => !d) ? 'not-allowed' : 'pointer'
                  }}
                >
                  {loading ? 'Verifying...' : 'Verify Email'}
                </button>

                <div style={styles.resendContainer}>
                  <p style={styles.resendText}>Didn't receive the code?</p>
                  <button
                    type="button"
                    onClick={handleResend}
                    disabled={timer > 0 || resending}
                    style={{
                      ...styles.resendButton,
                      color: timer > 0 ? '#64748b' : '#a78bfa',
                      cursor: timer > 0 ? 'not-allowed' : 'pointer'
                    }}
                  >
                    {resending ? (
                      'Resending...'
                    ) : (
                      <>
                        <HiOutlineRefresh style={{ marginRight: '4px' }} />
                        {timer > 0 ? `Resend in ${timer}s` : 'Resend Code'}
                      </>
                    )}
                  </button>
                </div>

                <Link to="/signup" style={styles.backLink}>
                  Back to Sign Up
                </Link>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

const styles = {
  pageContainer: {
    position: 'relative',
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#07070d',
    fontFamily: 'Inter, sans-serif',
    overflow: 'hidden',
    padding: '20px',
  },
  backgroundPatterns: {
    position: 'absolute',
    inset: 0,
    backgroundImage: 'linear-gradient(rgba(255,255,255,0.015) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.015) 1px, transparent 1px)',
    backgroundSize: '56px 56px',
    zIndex: 0,
  },
  cardContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: '460px',
    zIndex: 1,
    animation: 'fadeIn 0.6s ease',
  },
  glow: {
    position: 'absolute',
    inset: '-1px',
    borderRadius: '24px',
    background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), transparent 50%, rgba(236, 72, 153, 0.2))',
    filter: 'blur(20px)',
    opacity: 0.6,
  },
  card: {
    position: 'relative',
    borderRadius: '20px',
    border: '1px solid rgba(255, 255, 255, 0.08)',
    backgroundColor: 'rgba(255, 255, 255, 0.03)',
    backdropFilter: 'blur(32px)',
    boxShadow: '0 25px 50px rgba(0, 0, 0, 0.5)',
    padding: '48px 40px',
    textAlign: 'center',
  },
  iconContainer: {
    marginBottom: '24px',
    display: 'flex',
    justifyContent: 'center',
  },
  iconWrapper: {
    width: '64px',
    height: '64px',
    borderRadius: '18px',
    background: 'linear-gradient(135deg, #7c3aed, #ec4899)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    boxShadow: '0 0 32px rgba(124, 58, 237, 0.3)',
  },
  icon: {
    fontSize: '32px',
    color: 'white',
  },
  title: {
    fontSize: '28px',
    fontWeight: 700,
    color: 'white',
    letterSpacing: '-0.02em',
    marginBottom: '8px',
  },
  subtitle: {
    color: '#94a3b8',
    fontSize: '15px',
    lineHeight: '1.6',
    marginBottom: '32px',
  },
  emailText: {
    color: 'white',
    fontWeight: 600,
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  otpInputGroup: {
    display: 'flex',
    justifyContent: 'space-between',
    gap: '10px',
  },
  otpInput: {
    width: '56px',
    height: '64px',
    borderRadius: '12px',
    backgroundColor: 'rgba(255, 255, 255, 0.04)',
    border: '1px solid',
    color: 'white',
    fontSize: '24px',
    fontWeight: 700,
    textAlign: 'center',
    outline: 'none',
    transition: 'all 0.2s ease',
    fontFamily: 'inherit',
  },
  verifyButton: {
    padding: '14px',
    borderRadius: '12px',
    background: 'linear-gradient(135deg, #7c3aed, #8b5cf6, #ec4899)',
    color: 'white',
    fontSize: '15px',
    fontWeight: 600,
    border: 'none',
    boxShadow: '0 4px 24px rgba(124, 58, 237, 0.25)',
    transition: 'all 0.2s ease',
  },
  resendContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },
  resendText: {
    color: '#64748b',
    fontSize: '14px',
  },
  resendButton: {
    background: 'none',
    border: 'none',
    fontSize: '14px',
    fontWeight: 600,
    display: 'flex',
    alignItems: 'center',
    transition: 'color 0.2s',
  },
  backLink: {
    color: '#94a3b8',
    fontSize: '14px',
    textDecoration: 'none',
    marginTop: '8px',
    transition: 'color 0.2s',
  },
  errorMessage: {
    color: '#ef4444',
    fontSize: '13px',
    margin: '0',
  },
  successState: {
    animation: 'scaleIn 0.5s ease',
  },
  successIconContainer: {
    width: '80px',
    height: '80px',
    borderRadius: '50%',
    background: 'linear-gradient(135deg, #10b981, #059669)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 24px',
    boxShadow: '0 0 40px rgba(16, 185, 129, 0.3)',
  },
  successIcon: {
    fontSize: '48px',
    color: 'white',
  }
};

export default OTPVerification;
