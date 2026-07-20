import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Rocket, 
  Orbit, 
  GraduationCap, 
  Cpu, 
  Layers, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  Satellite,
  Compass,
  Radar
} from 'lucide-react';
import WebGLEarth from '../components/WebGLEarth';

export default function Home() {
  const highlights = [
    { title: 'Astrodynamics Software', desc: 'Enterprise mission design using FreeFlyer® for orbit propagation, maneuver planning, and analysis.', icon: Rocket },
    { title: 'University Partnerships', desc: 'Empowering aerospace education with curriculum support, labs, and hands-on mission software.', icon: GraduationCap },
    { title: 'Mission Support', desc: 'Custom trajectory design, constellation design, ground contact analysis, and mission lifecycle support.', icon: Cpu },
  ];

  const workflowSteps = [
    { num: '01', title: 'Mission Concept', desc: 'Defining orbit requirements, payload objectives, and mission constraints.', icon: Compass },
    { num: '02', title: 'Trajectory Design', desc: 'High-fidelity orbit propagation, inclination changes, and transfer orbits.', icon: Orbit },
    { num: '03', title: 'Constellation & Coverage', desc: 'Ground station access, revisit rate, and inter-satellite linkage.', icon: Satellite },
    { num: '04', title: 'Space Environment', desc: 'Atmospheric drag, radiation modeling, and perturbation analysis.', icon: Layers },
    { num: '05', title: 'Education & Training', desc: 'Student workshops, hands-on lab setups, and certified aerospace modules.', icon: GraduationCap },
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

              {/* Exact Tagline from Provided Image */}
              <h1 className="font-orbitron font-black text-5xl md:text-6xl lg:text-7xl leading-[1.05] tracking-tight">
                <span className="text-white block">DESIGN.</span>
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent block">ANALYZE.</span>
                <span className="text-white block">ACHIEVE.</span>
              </h1>

              {/* Subtitle with Accent Bar */}
              <div className="mt-6 flex items-center gap-3">
                <div className="w-1.5 h-12 rounded-full bg-gradient-to-b from-purple-500 to-cyan-400 flex-shrink-0" />
                <p className="text-slate-200 text-lg md:text-xl font-medium tracking-wide">
                  Advanced Mission Analysis for a Smarter Tomorrow.
                </p>
              </div>

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
                  Explore Capabilities <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
                
                <Link
                  to="/tracker"
                  className="px-6 py-3.5 rounded-xl glass border border-white/10 hover:border-cyan-400/40 text-slate-200 font-semibold flex items-center gap-2 transition"
                >
                  <Orbit className="w-4 h-4 text-cyan-300" /> Live Satellite Tracking
                </Link>
              </div>
            </div>

            {/* Interactive 3D WebGL Earth Showcase */}
            <div className="relative">
              <div className="aspect-square max-w-lg mx-auto relative">
                <div className="absolute inset-0 rounded-full bg-cyan-500/10 blur-3xl" />
                <WebGLEarth autoRotate={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-20 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <div className="text-xs font-mono-space text-cyan-300 tracking-widest uppercase mb-2">// CORE CAPABILITIES</div>
            <h2 className="font-orbitron text-3xl md:text-4xl font-bold">End-to-End Space Engineering</h2>
            <p className="mt-3 text-slate-400 text-sm">Empowering aerospace missions with certified tools, education, and flight dynamics support.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="glass-strong rounded-2xl p-8 border border-white/10 hover:border-cyan-400/40 transition group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition" />
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-6 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="font-orbitron font-bold text-xl mb-3 text-slate-100">{item.title}</h3>
                  <p className="text-slate-400 text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Workflow */}
      <section className="py-20 relative bg-slate-950/40 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <div className="text-xs font-mono-space text-purple-300 tracking-widest uppercase mb-2">// MISSION LIFE CYCLE</div>
              <h2 className="font-orbitron text-3xl md:text-4xl font-bold">How We Engineer Space Missions</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md">
              A proven mission engineering flow, from first sketch to on-orbit success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="glass rounded-xl p-6 border border-white/5 hover:border-purple-400/30 transition">
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-mono-space text-xs text-purple-300 font-bold px-2.5 py-1 rounded bg-purple-400/10">
                      STEP {step.num}
                    </span>
                    <Icon className="w-5 h-5 text-slate-400" />
                  </div>
                  <h4 className="font-orbitron font-bold text-lg text-slate-100 mb-2">{step.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ISRO Space Tutor Banner */}
      <section className="py-16 relative border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="glass-strong rounded-3xl p-8 md:p-12 border border-cyan-400/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-8">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-space text-cyan-300 mb-3">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> OFFICIAL PARTNERSHIP & CERTIFICATION
                </div>
                <h3 className="font-orbitron text-2xl md:text-3xl font-extrabold text-slate-100">
                  Certified ISRO Space Tutor & Aerospace Educator
                </h3>
                <p className="mt-2 text-slate-300 text-sm max-w-xl">
                  Official partner conducting space education, astrodynamics workshops, and satellite engineering training for students and professionals across India.
                </p>
              </div>
              <Link
                to="/about"
                className="px-6 py-3.5 rounded-xl bg-white text-slate-950 font-bold text-sm hover:bg-slate-200 transition flex-shrink-0"
              >
                Learn More About Us
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
