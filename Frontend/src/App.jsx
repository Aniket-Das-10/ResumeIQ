import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import AuthPage from './features/auth/AuthPage';
import OTPVerification from './features/auth/OTPVerification';
import Navbar from './features/home/Navbar';
import { AuthProvider, useAuth } from './features/auth.contex';

function AppContent() {
  const { loading } = useAuth();

  if (loading) {
    return (
      <div style={{ 
        height: '100vh', 
        display: 'flex', 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#07070d',
        color: 'white',
        fontSize: '18px',
        fontFamily: 'Inter, sans-serif'
      }}>
        Loading ResumeIQ...
      </div>
    );
  }

  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
        <Route path="/verify-email" element={<OTPVerification />} />
      </Routes>
    </Router>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;

