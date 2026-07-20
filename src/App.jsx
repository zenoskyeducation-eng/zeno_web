import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import StarfieldBg from './components/StarfieldBg';
import Header from './components/Header';
import Footer from './components/Footer';
import ChatbotModal from './components/ChatbotModal';

import Home from './pages/Home';
import Products from './pages/Products';
import Tracker from './pages/Tracker';
import About from './pages/About';
import Contact from './pages/Contact';

function ScrollToTop() {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="relative min-h-screen space-bg overflow-x-hidden text-slate-100 flex flex-col justify-between">
        <StarfieldBg />
        <Header />
        
        <div className="flex-1">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Products />} />
            <Route path="/tracker" element={<Tracker />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </div>

        <Footer />
        <ChatbotModal />
      </div>
    </Router>
  );
}
