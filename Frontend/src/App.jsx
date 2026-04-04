import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './features/home/Home';
import AuthPage from './features/auth/AuthPage';
import Navbar from './features/home/Navbar';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<AuthPage />} />
        <Route path="/signup" element={<AuthPage />} />
      </Routes>
    </Router>
  );
}

export default App;

