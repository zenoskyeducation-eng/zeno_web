import React, { useState } from 'react';
import { Send, Mail, Phone, Globe, MapPin, CheckCircle2 } from 'lucide-react';
import { sendTransmissionEmails } from '../services/resendService';

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    organization: '',
    email: '',
    phone: '',
    service: 'FreeFlyer Astrodynamics Software',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await sendTransmissionEmails(formData);
    } catch (err) {
      console.error('Transmission log:', err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
    }
  };

  return (
    <main className="pt-24 pb-16">
      {/* Header */}
      <section className="relative py-10">
        <div className="container mx-auto px-4 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full glass border border-cyan-400/20 text-xs font-mono-space text-cyan-300 mb-6">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 pulse-dot" /> MISSION CONTROL · CHANNEL OPEN
          </div>
          <h1 className="font-orbitron text-5xl md:text-6xl font-black">
            Contact <span className="text-gradient">Ground Station</span>
          </h1>
          <p className="mt-4 text-slate-400 max-w-2xl mx-auto text-base">
            Send a signal — our mission specialists respond within 24 hours (Earth time).
          </p>
        </div>
      </section>

      {/* Main Grid */}
      <section className="relative py-8">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-[1.4fr_1fr] gap-8 items-start">
            {/* Form Container */}
            <div className="glass-strong rounded-3xl p-8 relative overflow-hidden border border-cyan-400/30 shadow-2xl">
              <div className="absolute -top-16 -left-16 w-60 h-60 rounded-full bg-cyan-500/15 blur-3xl pointer-events-none" />
              <div className="absolute -bottom-16 -right-16 w-60 h-60 rounded-full bg-purple-500/15 blur-3xl pointer-events-none" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <div className="text-[10px] font-mono-space text-cyan-300 tracking-[0.3em]">// TRANSMISSION FORM</div>
                    <div className="font-orbitron text-2xl font-bold mt-1">Initiate Signal</div>
                  </div>
                  <div className="flex items-center gap-2 text-[10px] font-mono-space text-green-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" /> UPLINK STABLE
                  </div>
                </div>

                {submitted ? (
                  /* Success Card */
                  <div className="glass-strong rounded-2xl p-8 border-2 border-cyan-400 my-4 text-left shadow-2xl animate-in fade-in zoom-in-95 duration-300">
                    <div className="text-[10px] font-mono-space text-cyan-300 tracking-[0.25em] mb-2">// TRANSMISSION RECEIVED</div>
                    <h2 className="font-orbitron text-3xl font-extrabold text-white">Thank you, {formData.name || 'Explorer'}.</h2>
                    
                    <p className="mt-3 text-slate-300 text-sm leading-relaxed">
                      We've received your signal at Mission Control. A Zeno-Sky specialist will get back to you within 24 hours (Earth time).
                    </p>

                    <div className="mt-6 p-4 rounded-xl bg-white/5 border border-cyan-400/30">
                      <div className="text-[9px] font-mono-space text-cyan-300 tracking-widest mb-1.5">// YOUR MESSAGE</div>
                      <div className="text-sm text-slate-100 italic">{formData.message || 'Transmission submitted successfully.'}</div>
                    </div>

                    <p className="mt-6 text-xs text-slate-400">
                      Meanwhile, explore our capabilities at <a href="https://zenosky.in" target="_blank" rel="noopener noreferrer" className="text-cyan-300 hover:underline">zenosky.in</a> or reply directly to your confirmation email.
                    </p>

                    <div className="mt-8 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div>
                        <div className="font-orbitron font-bold text-xs text-white">ZENOSKY AEROSPACE & DEFENCE</div>
                        <div className="text-[10px] text-slate-400">Engineering the Future of Space Missions</div>
                      </div>
                      <button
                        onClick={() => {
                          setSubmitted(false);
                          setFormData({ name: '', organization: '', email: '', phone: '', service: 'FreeFlyer Astrodynamics Software', message: '' });
                        }}
                        className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-bold text-xs glow-cyan"
                      >
                        Send Another Signal
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-mono-space tracking-widest text-cyan-300/80 mb-1.5">// NAME *</label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-400/50 transition"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono-space tracking-widest text-cyan-300/80 mb-1.5">// ORGANIZATION</label>
                        <input
                          type="text"
                          value={formData.organization}
                          onChange={(e) => setFormData({ ...formData, organization: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-400/50 transition"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono-space tracking-widest text-cyan-300/80 mb-1.5">// EMAIL *</label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-400/50 transition"
                          placeholder=""
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-mono-space tracking-widest text-cyan-300/80 mb-1.5">// PHONE</label>
                        <input
                          type="text"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-400/50 transition"
                          placeholder=""
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono-space tracking-widest text-cyan-300/80 mb-1.5">// SERVICE INTERESTED IN</label>
                      <select
                        value={formData.service}
                        onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                        className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white outline-none focus:border-cyan-400/50 transition"
                      >
                        <option value="FreeFlyer Astrodynamics Software">FreeFlyer Astrodynamics Software</option>
                        <option value="University Collaboration">University Collaboration</option>
                        <option value="Astrodynamics Lab Setup">Astrodynamics Lab Setup</option>
                        <option value="Training Program">Training Program</option>
                        <option value="CubeSat Workshop">CubeSat Workshop</option>
                        <option value="Orbital Mechanics Workshop">Orbital Mechanics Workshop</option>
                        <option value="Custom Mission Support">Custom Mission Support</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-mono-space tracking-widest text-cyan-300/80 mb-1.5">// MESSAGE</label>
                      <textarea
                        rows={5}
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        placeholder=""
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-cyan-400/50 resize-none transition"
                      />
                    </div>

                    <div className="flex gap-3 pt-2">
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="flex-1 px-6 py-3.5 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 font-bold flex items-center justify-center gap-2 glow-cyan hover:opacity-90 disabled:opacity-60 transition"
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full border-2 border-slate-900 border-t-transparent animate-spin" /> Transmitting Signal...
                          </span>
                        ) : (
                          <>
                            <Send className="w-4 h-4" /> Send Inquiry
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>

            {/* Side Contact Info */}
            <div className="space-y-6">
              <div className="glass-strong rounded-3xl p-6 border border-white/10">
                <div className="text-[10px] font-mono-space text-cyan-300 tracking-[0.3em] mb-3">// GROUND CONTACT</div>
                <div className="font-orbitron text-xl font-bold mb-5 text-white">Reach Mission Control</div>

                <div className="space-y-3.5">
                  <a
                    href="mailto:contact@zenosky.in"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                      <Mail className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-mono-space text-slate-500 tracking-widest">EMAIL</div>
                      <div className="text-sm text-white font-medium truncate">contact@zenosky.in</div>
                    </div>
                  </a>

                  <a
                    href="tel:+918660260911"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                      <Phone className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-mono-space text-slate-500 tracking-widest">PHONE</div>
                      <div className="text-sm text-white font-medium truncate">+91-8660260911</div>
                    </div>
                  </a>

                  <a
                    href="https://zenosky.in"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                      <Globe className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-mono-space text-slate-500 tracking-widest">WEBSITE</div>
                      <div className="text-sm text-white font-medium truncate">zenosky.in</div>
                    </div>
                  </a>

                  <a
                    href="https://in.linkedin.com/company/zeno-sky-aerospace-and-defense"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5 hover:border-cyan-400/30 transition group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0 group-hover:scale-105 transition">
                      <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 text-cyan-300">
                        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                        <rect width="4" height="12" x="2" y="9" />
                        <circle cx="4" cy="4" r="2" />
                      </svg>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-mono-space text-slate-500 tracking-widest">LINKEDIN</div>
                      <div className="text-sm text-white font-medium truncate">Zeno-Sky Aerospace & Defence</div>
                    </div>
                  </a>

                  <div className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5">
                    <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-4 h-4 text-cyan-300" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="text-[9px] font-mono-space text-slate-500 tracking-widest">OFFICES</div>
                      <div className="text-sm text-white font-medium truncate">Delhi & Bangalore, India</div>
                    </div>
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
