import React from 'react';
import { Link } from 'react-router-dom';
import { Mail, Phone, Globe, MapPin } from 'lucide-react';
import Logo from './Logo';

export default function Footer() {
  return (
    <footer className="relative mt-24 border-t border-white/5">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="container mx-auto px-4 py-16 relative">
        <div className="grid md:grid-cols-4 gap-10">
          {/* Brand Info */}
          <div className="md:col-span-2">
            <Logo className="h-12 w-auto mb-5" />
            <p className="text-slate-300 text-sm font-medium max-w-md leading-relaxed">
              Design. Analyze. Achieve. <br />
              <span className="text-slate-400 font-normal">Advanced Mission Analysis for a Smarter Tomorrow.</span>
            </p>
            <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs text-cyan-300 font-mono-space">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot" /> ISRO SPACE TUTOR CERTIFIED
            </div>
          </div>

          {/* Navigation */}
          <div>
            <div className="font-orbitron text-sm text-white mb-4 tracking-wider">NAVIGATION</div>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><Link className="hover:text-cyan-300 transition" to="/">Home</Link></li>
              <li><Link className="hover:text-cyan-300 transition" to="/products">Products & Services</Link></li>
              <li><Link className="hover:text-cyan-300 transition" to="/tracker">Live Tracker</Link></li>
              <li><Link className="hover:text-cyan-300 transition" to="/about">About</Link></li>
              <li><Link className="hover:text-cyan-300 transition" to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Connect */}
          <div>
            <div className="font-orbitron text-sm text-white mb-4 tracking-wider">CONNECT</div>
            <ul className="space-y-3 text-sm text-slate-400">
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                <a href="mailto:contact@zenosky.in" className="hover:text-cyan-300 transition">contact@zenosky.in</a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                <a href="tel:+918660260911" className="hover:text-cyan-300 transition">+91-8660260911</a>
              </li>
              <li className="flex items-center gap-2">
                <Globe className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                <a href="https://zenosky.in" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-300 transition">zenosky.in</a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                <span>Delhi & Bangalore, India</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <div>© {new Date().getFullYear()} Zeno-Sky Aerospace & Defence. All rights reserved.</div>
          <div className="font-mono-space text-[10px] text-cyan-400/70">
            DESIGN. ANALYZE. ACHIEVE. · ISRO SPACE TUTOR
          </div>
        </div>
      </div>
    </footer>
  );
}
