import React from 'react';
import { Link } from 'react-router-dom';
import { Award, CircleCheck, GraduationCap, Wrench, BookOpen, ArrowRight } from 'lucide-react';

export default function Products() {
  const freeFlyerFeatures = [
    'Orbit Design', 'Orbit Determination', 'Mission Analysis', 'Constellation Design',
    'Maneuver Planning', 'Contact Analysis', 'Coverage Analysis', 'Collision Avoidance',
    'Interplanetary Mission Design', 'Ground Station Analysis', 'Satellite Operations', 'Mission Automation',
    'High Fidelity Orbit Propagation', '2D and 3D Visualization', 'Scripting and Automation', 'Python Integration'
  ];

  return (
    <main className="pt-24">
      {/* Hero Header */}
      <section className="relative pt-8 pb-4">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-400/20 text-xs font-mono-space text-cyan-300 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot" /> PRODUCTS & SERVICES
            </div>
            <h1 className="font-orbitron text-5xl md:text-6xl font-black">
              Mission-Grade <span className="text-gradient">Capabilities</span>
            </h1>
            <p className="mt-4 text-slate-400 text-lg">
              Flight-proven software, world-class services, and space education — all in one place.
            </p>
          </div>
        </div>
      </section>

      {/* FreeFlyer Section */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            {/* Video Iframe Container */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden glass-strong aspect-video max-w-2xl mx-auto bg-black border border-cyan-400/30 shadow-2xl">
                <iframe
                  src="https://www.youtube.com/embed/Cwau4GrxuUU?rel=0&modestbranding=1&playsinline=1"
                  title="FreeFlyer Astrodynamics Software"
                  className="absolute inset-0 w-full h-full"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
                <div className="pointer-events-none absolute top-4 left-4 z-10 glass rounded-lg px-3 py-1.5 text-[10px] font-mono-space text-cyan-300 border border-cyan-400/20">
                  FREEFLYER
                </div>
              </div>
              <div className="absolute -top-6 -right-6 w-32 h-32 rounded-full bg-purple-500/20 blur-3xl -z-10" />
              <div className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-cyan-500/20 blur-3xl -z-10" />
            </div>

            {/* Details */}
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-xs font-mono-space text-cyan-300 mb-4">
                <Award className="w-3.5 h-3.5" /> OFFICIAL PARTNER & SOLUTIONS PROVIDER
              </div>
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold">
                FreeFlyer <span className="text-gradient">Astrodynamics</span> Software
              </h2>
              <p className="mt-4 text-slate-300 leading-relaxed text-base">
                FreeFlyer is a professional astrodynamics software platform used worldwide for space mission design, analysis, and operations.
              </p>

              <div className="mt-6 grid grid-cols-2 gap-2.5">
                {freeFlyerFeatures.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
                    <CircleCheck className="w-4 h-4 text-cyan-300 flex-shrink-0" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-4">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-semibold flex items-center gap-2 glow-cyan hover:scale-[1.02] transition"
                >
                  Request Demo <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl glass border border-white/10 hover:border-cyan-400/40 text-white font-medium transition"
                >
                  Get Quote
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="relative py-20 bg-slate-950/40">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-mono-space text-cyan-300 tracking-[0.3em] mb-3">
              // SERVICES
            </div>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold">
              Space <span className="text-gradient">Engineering & Education</span>
            </h2>
          </div>

          <div className="grid lg:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="glass-strong rounded-2xl p-7 relative overflow-hidden group border border-white/10 hover:border-cyan-400/40 transition">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-5 shadow-lg">
                <GraduationCap className="w-7 h-7 text-slate-950" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold mb-2">University Collaborations</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Partnering with universities and academic institutions to bring professional space mission design capabilities into classrooms and research laboratories.
              </p>
              <ul className="space-y-2">
                {['Academic partnerships', 'Student satellite programs', 'Research mission support', 'Faculty enablement', 'Educational licensing support'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 2 */}
            <div className="glass-strong rounded-2xl p-7 relative overflow-hidden group border border-white/10 hover:border-cyan-400/40 transition">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-5 shadow-lg">
                <Wrench className="w-7 h-7 text-slate-950" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold mb-2">Astrodynamics Laboratory Setup</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Complete setup of professional astrodynamics and mission design laboratories.
              </p>
              <ul className="space-y-2">
                {['Lab planning', 'Software deployment', 'Infrastructure setup', 'Curriculum integration', 'Faculty training'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>

            {/* Card 3 */}
            <div className="glass-strong rounded-2xl p-7 relative overflow-hidden group border border-white/10 hover:border-cyan-400/40 transition">
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-5 shadow-lg">
                <BookOpen className="w-7 h-7 text-slate-950" />
              </div>
              <h3 className="font-orbitron text-xl font-semibold mb-2">Astrodynamics & Orbital Mechanics Training</h3>
              <p className="text-slate-400 text-sm leading-relaxed mb-4">
                Industry-grade training programs designed for students, researchers, engineers, and space professionals.
              </p>
              <ul className="space-y-2">
                {['Orbital Mechanics', 'Mission Design', 'Orbit Determination', 'Spacecraft Operations', 'Constellation Analysis', 'Mission Planning'].map((item, i) => (
                  <li key={i} className="flex items-center gap-2 text-xs md:text-sm text-slate-300">
                    <div className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ISRO Space Tutor Certification Banner */}
      <section className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="relative overflow-hidden rounded-3xl glass-strong p-8 md:p-14 border border-cyan-400/30">
            <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
            <div className="relative grid md:grid-cols-[240px_1fr] gap-10 items-center">
              <div className="relative mx-auto">
                <div className="w-56 h-56 rounded-full glass-strong border-2 border-cyan-400/40 flex items-center justify-center relative overflow-hidden shadow-2xl">
                  <div className="absolute inset-0 orbit-ring-slow">
                    <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#38bdf8]" />
                  </div>
                  <div className="absolute inset-4 rounded-full border border-purple-400/30 orbit-ring-rev" />
                  <div className="text-center p-4">
                    <Award className="w-10 h-10 mx-auto text-cyan-300 mb-2" />
                    <div className="font-orbitron text-[11px] tracking-widest text-white font-bold">ISRO</div>
                    <div className="font-orbitron text-xs tracking-widest text-cyan-300 font-bold">SPACE TUTOR</div>
                    <div className="font-mono-space text-[9px] text-slate-400 mt-1">CERTIFIED</div>
                  </div>
                </div>
              </div>

              <div>
                <div className="text-xs font-mono-space text-cyan-300 tracking-[0.3em] mb-3">
                  // OFFICIAL CERTIFICATION
                </div>
                <h3 className="font-orbitron text-3xl md:text-4xl font-bold">
                  ISRO Space Tutor <span class="text-gradient">Certified</span>
                </h3>
                <p className="mt-4 text-slate-300 leading-relaxed max-w-2xl text-base">
                  Zeno-Sky is proud to be recognized as an ISRO Space Tutor Certified organization, supporting the development of future space professionals through structured education and training initiatives.
                </p>
                <div className="mt-6 flex flex-wrap gap-2.5">
                  {['Structured Curriculum', 'Verified Faculty', 'Approved Modules', 'Nationwide Reach'].map((badge, i) => (
                    <span key={i} className="px-3.5 py-1.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-xs font-mono-space text-cyan-200">
                      {badge}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Flagship Workshops */}
      <section id="workshops" className="relative py-20">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <div className="text-xs font-mono-space text-cyan-300 tracking-[0.3em] mb-3">
              // WORKSHOPS
            </div>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold">
              Flagship <span className="text-gradient">Programs</span>
            </h2>
            <p className="mt-4 text-slate-400">
              Immersive, mission-grade training led by industry veterans.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {/* Workshop 1 */}
            <div className="relative glass-strong rounded-3xl overflow-hidden group border border-white/10 hover:border-cyan-400/40 transition">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  alt="CubeSat Design Workshop"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80"
                  src="https://images.pexels.com/photos/30596313/pexels-photo-30596313.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full glass border border-cyan-400/30 text-[10px] font-mono-space text-cyan-300">
                    3 Days Online / Offline
                  </span>
                  <span className="px-3 py-1 rounded-full glass border border-purple-400/30 text-[10px] font-mono-space text-purple-300">
                    CERTIFICATE INCLUDED
                  </span>
                </div>
                <h3 className="absolute bottom-4 left-6 right-6 font-orbitron text-2xl md:text-3xl font-bold text-white">
                  CubeSat Design Workshop
                </h3>
              </div>
              <div className="p-6">
                <div className="text-[10px] font-mono-space text-slate-500 tracking-widest mb-3">
                  // CURRICULUM
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['CubeSat Fundamentals', 'Mission Planning', 'Subsystems', 'Payload Design', 'Orbit Selection', 'Launch Considerations', 'Operations'].map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-semibold text-sm hover:opacity-90 transition"
                >
                  Explore More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>

            {/* Workshop 2 */}
            <div className="relative glass-strong rounded-3xl overflow-hidden group border border-white/10 hover:border-cyan-400/40 transition">
              <div className="relative aspect-[16/9] overflow-hidden bg-slate-900">
                <img
                  alt="Orbital Mechanics Workshop"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-700 opacity-80"
                  src="https://images.pexels.com/photos/32961166/pexels-photo-32961166.png"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />
                <div className="absolute top-4 left-4 flex gap-2">
                  <span className="px-3 py-1 rounded-full glass border border-cyan-400/30 text-[10px] font-mono-space text-cyan-300">
                    3 Days Online / Offline
                  </span>
                  <span className="px-3 py-1 rounded-full glass border border-purple-400/30 text-[10px] font-mono-space text-purple-300">
                    CERTIFICATE INCLUDED
                  </span>
                </div>
                <h3 className="absolute bottom-4 left-6 right-6 font-orbitron text-2xl md:text-3xl font-bold text-white">
                  Orbital Mechanics Workshop
                </h3>
              </div>
              <div className="p-6">
                <div className="text-[10px] font-mono-space text-slate-500 tracking-widest mb-3">
                  // CURRICULUM
                </div>
                <div className="flex flex-wrap gap-2 mb-6">
                  {['Keplerian Orbits', 'Orbital Maneuvers', 'Mission Analysis', 'Constellation Design', 'Ground Station Access', 'Orbit Propagation'].map((item, idx) => (
                    <span key={idx} className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-xs text-slate-300">
                      {item}
                    </span>
                  ))}
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-semibold text-sm hover:opacity-90 transition"
                >
                  Explore More <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
