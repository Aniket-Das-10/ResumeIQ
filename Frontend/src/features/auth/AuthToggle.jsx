import { Link, useLocation } from 'react-router-dom';

const AuthToggle = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === '/login';

  return (
    <div
      style={{
        position: 'relative',
        display: 'flex',
        alignItems: 'center',
        background: 'rgba(255, 255, 255, 0.03)',
        border: '1px solid rgba(255, 255, 255, 0.08)',
        borderRadius: '12px',
        padding: '4px',
        marginBottom: '32px',
        width: '100%',
        height: '48px',
        zIndex: 5,
        overflow: 'hidden',
      }}
    >
      {/* Sliding Indicator */}
      <div
        style={{
          position: 'absolute',
          top: '4px',
          bottom: '4px',
          left: '4px',
          width: 'calc(50% - 4px)',
          background: 'linear-gradient(135deg, rgba(124, 58, 237, 0.2), rgba(139, 92, 246, 0.3))',
          border: '1px solid rgba(139, 92, 246, 0.5)',
          borderRadius: '9px',
          transition: 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          transform: isLoginPage ? 'translateX(0)' : 'translateX(100%)',
          boxShadow: '0 4px 12px rgba(124, 58, 237, 0.2)',
          zIndex: 0,
        }}
      />

      {/* Tabs */}
      <Link
        to="/login"
        style={{
          flex: 1,
          textAlign: 'center',
          textDecoration: 'none',
          color: isLoginPage ? 'white' : '#94a3b8',
          fontSize: '14px',
          fontWeight: isLoginPage ? 600 : 500,
          zIndex: 1,
          transition: 'color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        Log In
      </Link>
      <Link
        to="/signup"
        style={{
          flex: 1,
          textAlign: 'center',
          textDecoration: 'none',
          color: !isLoginPage ? 'white' : '#94a3b8',
          fontSize: '14px',
          fontWeight: !isLoginPage ? 600 : 500,
          zIndex: 1,
          transition: 'color 0.3s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          height: '100%',
        }}
      >
        Sign Up
      </Link>
    </div>
  );
};

export default AuthToggle;
