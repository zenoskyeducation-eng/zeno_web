import React from 'react';
import SatelliteTracker from '../components/SatelliteTracker';
import { Radar, Satellite as SatIcon, Globe2 } from 'lucide-react';

export default function Tracker() {
  return (
    <main className="pt-24 pb-16">
      <section className="relative py-10">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-400/20 text-xs font-mono-space text-cyan-300 mb-5">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot" /> LIVE · REAL TLE · SGP4 PROPAGATOR
            </div>
            <h1 className="font-orbitron text-4xl md:text-6xl font-black">
              Live <span className="text-gradient">Satellite Tracker</span>
            </h1>
            <p className="mt-3 text-slate-400 max-w-2xl mx-auto">
              Real-time orbital positions computed from CelesTrak TLE feeds. Click any satellite to lock target. Filter by constellation.
            </p>
          </div>

          {/* Interactive Satellite Tracker */}
          <SatelliteTracker />

          {/* Bottom Info Grid */}
          <div className="mt-8 grid md:grid-cols-3 gap-4">
            <Info
              icon={SatIcon}
              title="SGP4/SDP4 Propagation"
              desc="Industry-standard orbital propagator computes real-time positions from Two-Line Elements."
            />
            <Info
              icon={Globe2}
              title="CelesTrak Data Source"
              desc="Live TLE feeds refreshed every 6 hours — the same source used by aerospace agencies worldwide."
            />
            <Info
              icon={Radar}
              title="Interactive Globe"
              desc="WebGL Earth with real day/night textures. Drag to rotate, scroll to zoom, click satellites to inspect."
            />
          </div>
        </div>
      </section>
    </main>
  );
}

function Info({ icon: Icon, title, desc }) {
  return (
    <div className="glass-strong rounded-2xl p-5 border border-white/10 shadow-xl hover:border-cyan-400/30 transition">
      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-3">
        <Icon className="w-5 h-5 text-slate-900" />
      </div>
      <div className="font-orbitron text-lg font-semibold text-white">{title}</div>
      <p className="text-sm text-slate-400 mt-1">{desc}</p>
    </div>
  );
}
