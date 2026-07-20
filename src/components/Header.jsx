import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import Logo from './Logo';

export default function Header() {
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Products & Services', path: '/products' },
    { name: 'Live Tracker', path: '/tracker' },
    { name: 'About', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => {
    if (path === '/' && location.pathname === '/') return true;
    if (path !== '/' && location.pathname.startsWith(path)) return true;
    return false;
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 transition-all duration-500 py-4">
      <div className="container mx-auto px-4">
        <div className="glass-strong rounded-2xl px-5 py-3 flex items-center justify-between transition-all border border-cyan-500/20 shadow-xl">
          <Link to="/" className="group flex items-center gap-3">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-4 py-2 text-sm rounded-lg transition-all ${
                  isActive(item.path)
                    ? 'text-cyan-300 bg-cyan-400/10 font-medium border border-cyan-400/20'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 px-4 py-2 text-sm rounded-lg bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-semibold hover:opacity-90 transition glow-cyan"
            >
              Book Consultation
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white p-2 rounded-lg hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 glass-strong rounded-2xl p-5 border border-cyan-500/20 shadow-2xl animate-in fade-in slide-in-from-top-4 duration-300">
            <nav className="flex flex-col gap-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`px-4 py-3 text-base rounded-xl transition-all ${
                    isActive(item.path)
                      ? 'text-cyan-300 bg-cyan-400/10 font-semibold border border-cyan-400/30'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              <Link
                to="/contact"
                onClick={() => setMobileMenuOpen(false)}
                className="mt-2 text-center px-4 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-bold glow-cyan"
              >
                Book Consultation
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
