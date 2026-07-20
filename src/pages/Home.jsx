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
    <main className="pt-20">
      {/* Hero Section - Prominent 3D Earth & Responsive Scaling */}
      <section className="relative min-h-[85vh] lg:min-h-[88vh] flex items-center overflow-hidden py-6 md:py-8">
        <div className="absolute inset-0 grid-bg pointer-events-none opacity-40" />
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full glass border border-cyan-400/30 text-xs font-mono-space text-cyan-300 mb-4 shadow-lg">
                <span className="w-2 h-2 rounded-full bg-cyan-400 pulse-dot" />
                MISSION READY · ISRO SPACE TUTOR CERTIFIED
              </div>

              {/* Exact Tagline from Provided Image */}
              <h1 className="font-orbitron font-black text-4xl sm:text-5xl lg:text-6xl leading-[1.08] tracking-tight">
                <span className="text-white block">DESIGN.</span>
                <span className="bg-gradient-to-r from-purple-400 via-fuchsia-400 to-indigo-400 bg-clip-text text-transparent block">ANALYZE.</span>
                <span className="text-white block">ACHIEVE.</span>
              </h1>

              {/* Subtitle with Accent Bar */}
              <div className="mt-4 flex items-center gap-3">
                <div className="w-1.5 h-10 rounded-full bg-gradient-to-b from-purple-500 to-cyan-400 flex-shrink-0" />
                <p className="text-slate-200 text-base sm:text-lg lg:text-xl font-medium tracking-wide">
                  Advanced Mission Analysis for a Smarter Tomorrow.
                </p>
              </div>

              <div className="mt-4 flex flex-wrap gap-2.5 items-center text-xs font-mono-space text-cyan-200/90">
                <span>Mission Design</span>
                <span className="text-cyan-400">•</span>
                <span>Astrodynamics</span>
                <span className="text-cyan-400">•</span>
                <span>Space Operations</span>
                <span className="text-cyan-400">•</span>
                <span>Satellite Mission Planning</span>
              </div>

              <p className="mt-4 text-slate-300 text-xs sm:text-sm md:text-base max-w-xl leading-relaxed">
                Zeno-Sky enables organizations, startups, universities, and government agencies to design, analyze, and operate successful space missions using industry-leading astrodynamics tools and expertise.
              </p>

              {/* CTA Buttons - Directly Visible Above the Fold */}
              <div className="mt-6 flex flex-wrap gap-3.5">
                <Link
                  to="/products"
                  className="group relative px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-bold text-xs sm:text-sm flex items-center gap-2 hover:scale-[1.02] transition glow-cyan"
                >
                  Explore Capabilities <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition" />
                </Link>
                
                <Link
                  to="/tracker"
                  className="px-6 py-3.5 rounded-xl glass border border-white/10 hover:border-cyan-400/40 text-slate-200 font-bold text-xs sm:text-sm flex items-center gap-2 transition"
                >
                  <Orbit className="w-4 h-4 text-cyan-300" /> Live Satellite Tracking
                </Link>
              </div>
            </div>

            {/* Interactive 3D WebGL Earth Showcase - Increased Size for Prominent Visibility */}
            <div className="relative">
              <div className="w-full aspect-square max-w-sm sm:max-w-md lg:max-w-xl mx-auto relative h-[380px] sm:h-[460px] lg:h-[520px]">
                <div className="absolute inset-0 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
                <WebGLEarth autoRotate={true} height="100%" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Highlights Grid */}
      <section className="py-16 relative border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono-space text-cyan-300 tracking-widest uppercase mb-2">// CORE CAPABILITIES</div>
            <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold">End-to-End Space Engineering</h2>
            <p className="mt-3 text-slate-400 text-xs sm:text-sm">Empowering aerospace missions with certified tools, education, and flight dynamics support.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {highlights.map((item, idx) => {
              const Icon = item.icon;
              return (
                <div 
                  key={idx}
                  className="glass-strong rounded-2xl p-6 md:p-8 border border-white/10 hover:border-cyan-400/40 transition group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 rounded-full blur-2xl group-hover:bg-cyan-500/15 transition" />
                  <div className="w-12 h-12 rounded-xl bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center mb-5 group-hover:scale-110 transition">
                    <Icon className="w-6 h-6 text-cyan-300" />
                  </div>
                  <h3 className="font-orbitron font-bold text-lg sm:text-xl mb-2 text-slate-100">{item.title}</h3>
                  <p className="text-slate-400 text-xs sm:text-sm leading-relaxed">{item.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission Workflow */}
      <section className="py-16 relative bg-slate-950/40 border-t border-white/5">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div>
              <div className="text-xs font-mono-space text-purple-300 tracking-widest uppercase mb-2">// MISSION LIFE CYCLE</div>
              <h2 className="font-orbitron text-2xl sm:text-3xl md:text-4xl font-bold">How We Engineer Space Missions</h2>
            </div>
            <p className="text-slate-400 text-xs sm:text-sm max-w-md">
              A proven mission engineering flow, from first sketch to on-orbit success.
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {workflowSteps.map((step) => {
              const Icon = step.icon;
              return (
                <div key={step.num} className="glass rounded-xl p-5 border border-white/5 hover:border-purple-400/30 transition">
                  <div className="flex items-center justify-between mb-3">
                    <span className="font-mono-space text-xs text-purple-300 font-bold px-2 py-0.5 rounded bg-purple-400/10">
                      STEP {step.num}
                    </span>
                    <Icon className="w-4 h-4 text-slate-400" />
                  </div>
                  <h4 className="font-orbitron font-bold text-base text-slate-100 mb-1.5">{step.title}</h4>
                  <p className="text-slate-400 text-xs leading-relaxed">{step.desc}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ISRO Space Tutor Banner */}
      <section className="py-12 relative border-t border-white/5 overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="glass-strong rounded-3xl p-6 sm:p-10 border border-cyan-400/30 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl pointer-events-none" />
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <div className="inline-flex items-center gap-2 text-xs font-mono-space text-cyan-300 mb-2">
                  <ShieldCheck className="w-4 h-4 text-cyan-400" /> OFFICIAL PARTNERSHIP & CERTIFICATION
                </div>
                <h3 className="font-orbitron text-xl sm:text-2xl md:text-3xl font-extrabold text-slate-100">
                  Certified ISRO Space Tutor & Aerospace Educator
                </h3>
                <p className="mt-2 text-slate-300 text-xs sm:text-sm max-w-xl">
                  Official partner conducting space education, astrodynamics workshops, and satellite engineering training for students and professionals across India.
                </p>
              </div>
              <Link
                to="/about"
                className="px-5 py-3 rounded-xl bg-white text-slate-950 font-bold text-xs sm:text-sm hover:bg-slate-200 transition flex-shrink-0"
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
