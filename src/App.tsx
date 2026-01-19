import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Landing from './pages/Landing';
import FeaturesPage from './pages/Features';
import Pricing from './pages/Pricing';
import Methodology from './pages/Methodology';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Dashboard from './pages/Dashboard';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-black text-white flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/features" element={<FeaturesPage />} />
            <Route path="/pricing" element={<Pricing />} />
            <Route path="/methodology" element={<Methodology />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/dashboard" element={<Dashboard />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
