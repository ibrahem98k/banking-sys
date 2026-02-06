import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Dashboard } from './pages/Dashboard';
import { Landing } from './pages/Landing';
import { Cards } from './pages/Cards';
import { Analytics } from './pages/Analytics';
import { Settings } from './pages/Settings';
import { Features } from './pages/landing/Features';
import { Benefits } from './pages/landing/Benefits';
import { Company } from './pages/landing/Company';
import { Personal } from './pages/landing/Personal';
import { Business } from './pages/landing/Business';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { AdminDashboard } from './pages/AdminDashboard';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/cards" element={<Cards />} />
        <Route path="/analytics" element={<Analytics />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/admin" element={<AdminDashboard />} />

        {/* Landing Pages */}
        <Route path="/features" element={<Features />} />
        <Route path="/benefits" element={<Benefits />} />
        <Route path="/company" element={<Company />} />
        <Route path="/personal" element={<Personal />} />
        <Route path="/business" element={<Business />} />

        {/* Auth Routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
