import { HiOutlineEye, HiOutlineEyeOff } from 'react-icons/hi';

const AuthInputField = ({
  id,
  icon: Icon,
  type = 'text',
  placeholder,
  value,
  onChange,
  error,
  togglePassword,
  showPassword,
}) => {
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
};

export default AuthInputField;
