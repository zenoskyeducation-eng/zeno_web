import React from 'react';
import { Link } from 'react-router-dom';
import { Lightbulb, Ruler, GraduationCap, Users, ShieldCheck, ArrowRight } from 'lucide-react';

export default function About() {
  const values = [
    {
      title: 'Innovation',
      desc: 'Pushing frontiers with modern astrodynamics and open engineering.',
      icon: Lightbulb,
    },
    {
      title: 'Precision',
      desc: 'Every orbit, maneuver, and decision — engineered to millimeter accuracy.',
      icon: Ruler,
    },
    {
      title: 'Education',
      desc: 'Empowering the next generation of space professionals across India.',
      icon: GraduationCap,
    },
    {
      title: 'Collaboration',
      desc: 'Deep partnerships with universities, startups, and government.',
      icon: Users,
    },
    {
      title: 'Reliability',
      desc: 'Flight-proven tools, verified processes, mission-ready outcomes.',
      icon: ShieldCheck,
    },
  ];

  return (
    <main className="pt-24">
      {/* Hero Section */}
      <section className="relative py-14">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-10 items-center">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-400/20 text-xs font-mono-space text-cyan-300 mb-6">
                <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot" /> ABOUT ZENOSKY
              </div>
              <h1 className="font-orbitron text-4xl md:text-6xl font-black leading-[1.05]">
                Building India’s Next Generation <span className="text-gradient">Space Mission</span> Capability
              </h1>
              <p className="mt-6 text-slate-300 text-lg leading-relaxed">
                Zeno-Sky is a space technology company focused on mission design, astrodynamics solutions, space education, and satellite mission support.
              </p>

              <div className="mt-6 flex flex-wrap gap-2">
                {[
                  'Universities', 'Space Startups', 'Commercial Space Companies',
                  'Research Institutions', 'Government Organizations'
                ].map((item, i) => (
                  <span key={i} className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-xs text-slate-200 font-mono-space">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Deep Space Hero Image */}
            <div className="relative">
              <div className="relative rounded-3xl overflow-hidden aspect-[4/3] border border-cyan-400/30 shadow-2xl">
                <img
                  alt="Nebula"
                  className="w-full h-full object-cover"
                  src="https://images.pexels.com/photos/3180831/pexels-photo-3180831.jpeg"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6">
                  <div className="text-[10px] font-mono-space text-cyan-300 tracking-[0.3em] mb-2">// DEEP SPACE</div>
                  <div className="font-orbitron text-2xl text-white font-bold">Where curiosity becomes capability</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Statement */}
      <section className="relative py-16">
        <div className="container mx-auto px-4">
          <div className="glass-strong rounded-3xl p-10 md:p-16 relative overflow-hidden border border-cyan-400/20 text-center max-w-4xl mx-auto shadow-2xl">
            <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-cyan-500/15 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-72 h-72 rounded-full bg-purple-500/15 blur-3xl" />
            <div className="relative z-10">
              <div className="text-xs font-mono-space text-cyan-300 tracking-[0.3em] mb-4">// MISSION STATEMENT</div>
              <p className="font-orbitron text-2xl md:text-4xl leading-snug font-bold">
                To <span className="text-gradient">democratize access</span> to advanced space mission design tools and astrodynamics expertise across India and the global space ecosystem.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="relative py-20 bg-slate-950/40 border-y border-white/5">
        <div className="container mx-auto px-4">
          <div className="text-center max-w-2xl mx-auto mb-14">
            <div className="text-xs font-mono-space text-cyan-300 tracking-[0.3em] mb-3">// PRINCIPLES</div>
            <h2 className="font-orbitron text-4xl md:text-5xl font-bold">Core Values</h2>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <div
                  key={i}
                  className="glass-strong rounded-2xl p-6 relative overflow-hidden group hover:border-cyan-400/40 transition duration-300 flex flex-col justify-between"
                >
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center mb-4 shadow-lg">
                    <Icon className="w-6 h-6 text-slate-950" />
                  </div>
                  <div>
                    <h3 className="font-orbitron text-lg font-semibold mb-2 text-white">{v.title}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{v.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="relative py-24">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-14 items-center">
            <div>
              <div className="text-xs font-mono-space text-cyan-300 tracking-[0.3em] mb-3">// VISION</div>
              <h2 className="font-orbitron text-4xl md:text-5xl font-bold leading-tight">
                A future where <span className="text-gradient">every mission</span> reaches its orbit
              </h2>
              <p className="mt-5 text-slate-300 text-lg leading-relaxed">
                To become a leading provider of mission design, astrodynamics, and space education solutions worldwide.
              </p>

              <div className="mt-8 flex gap-4 flex-wrap">
                <Link
                  to="/contact"
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-semibold flex items-center gap-2 glow-cyan hover:scale-[1.02] transition"
                >
                  Join the Mission <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/products"
                  className="px-6 py-3 rounded-xl glass border border-white/10 hover:border-cyan-400/40 text-white font-medium transition"
                >
                  Our Capabilities
                </Link>
              </div>
            </div>

            {/* Orbiting Earth Visual */}
            <div className="relative flex justify-center">
              <div className="relative w-72 h-72 mx-auto">
                <div className="absolute inset-0 rounded-full blur-3xl bg-cyan-500/20" />
                <div className="absolute inset-0 rounded-full border border-cyan-400/20 orbit-ring-slow" style={{ transform: 'rotateX(70deg)' }} />
                <div className="absolute inset-[-8%] rounded-full border border-purple-400/15 orbit-ring-rev" style={{ transform: 'rotateX(70deg) rotateZ(30deg)' }} />
                <div className="absolute inset-[8%] earth" />
                
                {/* Satellites */}
                <div className="absolute inset-0 orbit-ring" style={{ transform: 'rotateX(70deg)' }}>
                  <div className="absolute top-1/2 -translate-y-1/2 -left-2">
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-300 shadow-[0_0_12px_#38bdf8]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
