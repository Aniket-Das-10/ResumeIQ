import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import AuthPage from './features/auth/AuthPage';
import OTPVerification from './features/auth/OTPVerification';
import Navbar from './features/home/Navbar';

function App() {
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

export default App;

