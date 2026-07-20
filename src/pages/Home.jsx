import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, Play, Orbit, Satellite, BookOpen, ChevronRight, 
  Target, GitBranch, ChartLine, Cpu, Shield, Radar, Sparkles 
} from 'lucide-react';
import WebGLEarth from '../components/WebGLEarth';

const ALL_GROUPS = [
  'navic',
  'stations',
  'starlink',
  'gps-ops',
  'iridium-NEXT',
  'oneweb',
  'galileo',
  'weather'
];

export default function Home() {
  const [heroSat, setHeroSat] = useState(null);

  const capabilities = [
    {
      title: 'Mission Design',
      desc: 'End-to-end mission planning and analysis for satellite missions — from concept exploration to launch readiness.',
      icon: Orbit,
      gradient: 'from-cyan-400 to-blue-500',
    },
    {
      title: 'Astrodynamics Solutions',
      desc: 'Orbit propagation, maneuver planning, constellation design, coverage analysis, and mission optimization.',
      icon: Satellite,
      gradient: 'from-purple-400 to-fuchsia-500',
    },
    {
      title: 'Space Education',
      desc: 'Workshops, university collaborations, laboratory setup, and professional training programs.',
      icon: BookOpen,
      gradient: 'from-blue-400 to-cyan-400',
    },
  ];

  const steps = [
    { num: '01', title: 'Mission Concept', desc: 'Define mission objectives, constraints and success criteria.', icon: Target },
    { num: '02', title: 'Design', desc: 'Trajectory design, spacecraft architecture and mission phases.', icon: GitBranch },
    { num: '03', title: 'Analysis', desc: 'Astrodynamics analysis, coverage, contact and delta-V budgets.', icon: ChartLine },
    { num: '04', title: 'Simulation', desc: 'High fidelity propagation, Monte Carlo and 3D visualization.', icon: Cpu },
    { num: '05', title: 'Validation', desc: 'Independent verification, safety, and collision avoidance checks.', icon: Shield },
    { num: '06', title: 'Operations', desc: 'Flight support, maneuver planning and mission automation.', icon: Radar },
  ];

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center overflow-hidden py-12">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-cyan-400/30 text-xs font-mono-space text-cyan-300 mb-6 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
                MISSION READY · ISRO SPACE TUTOR CERTIFIED
              </div>

              <h1 className="font-orbitron font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                Engineering the <br />
                <span className="text-gradient">Future of Space</span> <br />
                <span className="text-white">Missions</span>
              </h1>

              <div className="mt-6 flex flex-wrap gap-2.5 items-center text-xs md:text-sm font-mono-space text-cyan-200/90">
                <span>Mission Design</span>
                <span className="text-cyan-400">•</span>
                <span>Astrodynamics</span>
                <span className="text-cyan-400">•</span>
                <span>Space Operations</span>
                <span className="text-cyan-400">•</span>
                <span>Satellite Mission Planning</span>
              </div>

              <p className="mt-6 text-slate-300 text-base md:text-lg max-w-xl leading-relaxed">
                Zeno-Sky enables organizations, startups, universities, and government agencies to design, analyze, and operate successful space missions using industry-leading astrodynamics tools and expertise.
              </p>

              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  to="/products"
                  className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-semibold flex items-center gap-2 hover:scale-[1.02] transition glow-cyan"
                >
                  Explore Solutions <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3.5 rounded-xl glass border border-white/10 hover:border-cyan-400/50 text-white font-medium flex items-center gap-2 transition"
                >
                  <Play className="w-4 h-4 text-cyan-300 fill-cyan-300/30" /> Book a Consultation
                </Link>
              </div>
            </div>

            {/* Clean Un-boxed 3D WebGL Earth Showcase floating on landing page */}
            <div className="relative h-[600px] flex items-center justify-center">
              <div className="w-full h-full relative">
                <WebGLEarth
                  height={580}
                  groups={ALL_GROUPS}
                  maxSats={400}
                  onSelect={(sat) => setHeroSat(sat)}
                  onSelectSatellite={(sat) => setHeroSat(sat)}
                  showLegend={true}
                />

                {/* Target Lock Floating Hud Overlay */}
                {heroSat && (
                  <div className="absolute bottom-6 left-4 right-4 glass rounded-xl p-3 border border-cyan-400/30 text-xs font-mono-space flex items-center justify-between pointer-events-none shadow-2xl animate-in fade-in duration-200 z-10">
                    <div>
                      <div className="text-cyan-300 font-bold font-orbitron">{heroSat.name}</div>
                      <div className="text-slate-400 text-[10px]">
                        LAT: {(heroSat.latitude ?? heroSat.lat ?? 0).toFixed(2)}° · LON: {(heroSat.longitude ?? heroSat.lon ?? 0).toFixed(2)}°
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-purple-300 font-bold">{(heroSat.altitude ?? heroSat.alt ?? 0).toFixed(1)} KM</div>
                      <div className="text-slate-400 text-[10px]">VEL: {(heroSat.velocity ?? heroSat.vel ?? 0).toFixed(2)} KM/S</div>
                    </div>
                  </div>
                )}
              </div>

              {/* Ambient Glow Aura */}
              <div className="absolute -top-10 -right-10 w-64 h-64 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none -z-10" />
              <div className="absolute -bottom-10 -left-10 w-64 h-64 rounded-full bg-purple-500/15 blur-3xl pointer-events-none -z-10" />
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-mono-space text-cyan-300 tracking-[0.3em] mb-3">
              // CAPABILITIES
            </div>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold">What We Do</h2>
            <p className="mt-4 text-slate-400">
              End-to-end space mission capability — from concept to constellation operations.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {capabilities.map((cap, i) => {
              const Icon = cap.icon;
              return (
                <div
                  key={i}
                  className="group relative glass-strong rounded-2xl p-7 overflow-hidden hover:border-cyan-400/40 transition duration-300 flex flex-col justify-between"
                >
                  <div className={`absolute -top-16 -right-16 w-40 h-40 rounded-full bg-gradient-to-br ${cap.gradient} opacity-20 blur-3xl group-hover:opacity-40 transition`} />
                  <div>
                    <div className={`inline-flex w-14 h-14 rounded-xl bg-gradient-to-br ${cap.gradient} items-center justify-center mb-5 shadow-lg`}>
                      <Icon className="w-7 h-7 text-slate-950" />
                    </div>
                    <h3 className="font-orbitron text-2xl font-semibold mb-3">{cap.title}</h3>
                    <p className="text-slate-400 leading-relaxed text-sm">{cap.desc}</p>
                  </div>
                  <Link
                    to="/contact"
                    className="mt-6 inline-flex items-center gap-2 text-sm text-cyan-300 group-hover:gap-3 transition-all font-medium"
                  >
                    Learn more <ChevronRight className="w-4 h-4" />
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Lifecycle Section */}
      <section className="relative py-24 bg-slate-950/40 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono-space text-cyan-300 tracking-[0.3em] mb-3">
              // MISSION LIFECYCLE
            </div>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold">
              Why <span className="text-gradient">Zeno-Sky</span>
            </h2>
            <p className="mt-4 text-slate-400">
              A proven mission engineering flow, from first sketch to on-orbit success.
            </p>
          </div>

          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-cyan-400/40 to-transparent" />

            <div className="space-y-8">
              {steps.map((step, idx) => {
                const StepIcon = step.icon;
                const isEven = idx % 2 === 1;

                return (
                  <div
                    key={idx}
                    className={`relative grid md:grid-cols-2 gap-6 items-center ${
                      isEven ? 'md:[&>*:first-child]:order-2' : ''
                    }`}
                  >
                    <div className={`glass-strong rounded-2xl p-6 ml-12 md:ml-0 ${isEven ? 'md:ml-10' : 'md:mr-10'}`}>
                      <div className="flex items-center gap-3 mb-2">
                        <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/30 flex items-center justify-center">
                          <StepIcon className="w-5 h-5 text-cyan-300" />
                        </div>
                        <div className="font-orbitron text-lg font-semibold">{step.title}</div>
                      </div>
                      <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
                    </div>

                    <div className="hidden md:block" />

                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 top-6">
                      <div className="w-4 h-4 rounded-full bg-cyan-400 pulse-dot shadow-[0_0_12px_#38bdf8]" />
                    </div>

                    <div className="absolute left-10 md:hidden top-4 text-[10px] font-mono-space text-cyan-400">
                      STEP {step.num}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Launch CTA Banner */}
      <section className="relative py-28">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden glass-strong rounded-3xl p-10 md:p-16 text-center border border-cyan-400/20 shadow-2xl">
            <div className="absolute inset-0 opacity-40 pointer-events-none">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full bg-cyan-500/20 blur-3xl" />
              <div className="absolute bottom-0 right-0 w-[400px] h-[400px] rounded-full bg-purple-500/20 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-400/20 text-xs font-mono-space text-cyan-300 mb-6">
                <Sparkles className="w-3.5 h-3.5" /> T-MINUS ZERO
              </div>

              <h2 className="font-orbitron text-4xl md:text-6xl font-black leading-tight">
                Ready to <span className="text-gradient">Launch</span> Your Mission?
              </h2>

              <p className="mt-4 text-slate-300 text-base md:text-lg max-w-xl mx-auto leading-relaxed">
                From first orbit to constellation ops — we’ll help you get there. Let’s design a mission worth remembering.
              </p>

              <div className="mt-8 flex justify-center gap-4 flex-wrap">
                <Link
                  to="/contact"
                  className="px-7 py-4 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-semibold flex items-center gap-2 glow-cyan hover:scale-[1.02] transition"
                >
                  Contact Zeno-Sky <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products"
                  className="px-7 py-4 rounded-xl glass border border-white/10 hover:border-cyan-400/40 text-white font-medium transition"
                >
                  View Capabilities
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
