import React, { useState, useRef, useEffect } from 'react';
import { Bot, X, Send, Sparkles, User } from 'lucide-react';

export default function ChatbotModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      sender: 'bot',
      text: 'Greetings! I am Zeno-Sky Mission Control Assistant. How can I assist you with astrodynamics software, mission design, or satellite tracking today?'
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    if (isOpen) {
      scrollToBottom();
    }
  }, [messages, isOpen]);

  const quickQuestions = [
    'FreeFlyer Software info',
    'ISRO Space Tutor Certified',
    'CubeSat & Orbit Workshops',
    'How to track satellites?'
  ];

  const handleSend = (textToSend) => {
    const text = textToSend || input;
    if (!text.trim()) return;

    // User message
    const newMessages = [...messages, { sender: 'user', text }];
    setMessages(newMessages);
    if (!textToSend) setInput('');
    setIsTyping(true);

    // Bot response logic
    setTimeout(() => {
      let botResponse = "Thank you for reaching out to Zeno-Sky Aerospace. Our team of astrodynamics engineers is ready to support your space mission. You can book a consultation on our Contact page or email us directly at contact@zenosky.in!";
      const query = text.toLowerCase();

      if (query.includes('freeflyer') || query.includes('software')) {
        botResponse = "FreeFlyer is our flagship astrodynamics software for orbit propagation, maneuver planning, collision avoidance, and 3D constellation simulation. Visit our Products page to request a demo!";
      } else if (query.includes('isro') || query.includes('certif')) {
        botResponse = "Zeno-Sky is proudly ISRO Space Tutor Certified, enabling us to deliver accredited space mechanics and spacecraft engineering education across India!";
      } else if (query.includes('workshop') || query.includes('cubesat') || query.includes('train')) {
        botResponse = "We offer 3-day immersive workshops on CubeSat Design & Orbital Mechanics with hands-on astrodynamics tools and official certificates!";
      } else if (query.includes('track') || query.includes('tle') || query.includes('satellit')) {
        botResponse = "Check out our Live Tracker tab! We compute real-time satellite trajectories from CelesTrak TLE feeds using SGP4 orbit propagation.";
      }

      setMessages((prev) => [...prev, { sender: 'bot', text: botResponse }]);
      setIsTyping(false);
    }, 800);
  };

  return (
    <>
      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center glow-cyan hover:scale-110 transition shadow-2xl"
        aria-label="Open chat assistant"
      >
        {isOpen ? <X className="w-6 h-6 text-slate-900" /> : <Bot className="w-6 h-6 text-slate-900" />}
      </button>

      {/* Chat Window Modal */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 glass-strong rounded-3xl border border-cyan-400/30 shadow-2xl flex flex-col overflow-hidden animate-in fade-in slide-in-from-bottom-5 duration-300 max-h-[550px]">
          {/* Header */}
          <div className="p-4 bg-slate-900/90 border-b border-cyan-400/20 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-md">
                <Bot className="w-5 h-5 text-slate-900" />
              </div>
              <div>
                <div className="font-orbitron font-semibold text-sm text-white flex items-center gap-1.5">
                  ZENO-SKY AI <Sparkles className="w-3 h-3 text-cyan-300" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono-space text-green-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-green-400 pulse-dot" /> SYSTEM ONLINE
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsOpen(false)}
              className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-white/5"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages Body */}
          <div className="p-4 flex-1 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex items-start gap-2.5 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
              >
                <div
                  className={`w-7 h-7 rounded-lg flex items-center justify-center flex-shrink-0 ${
                    msg.sender === 'user'
                      ? 'bg-cyan-500 text-slate-950 font-bold'
                      : 'bg-cyan-400/10 border border-cyan-400/30 text-cyan-300'
                  }`}
                >
                  {msg.sender === 'user' ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
                </div>
                <div
                  className={`p-3 rounded-2xl max-w-[80%] leading-relaxed ${
                    msg.sender === 'user'
                      ? 'bg-gradient-to-r from-cyan-500 to-blue-600 text-white rounded-tr-none'
                      : 'glass border border-white/10 text-slate-200 rounded-tl-none'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {isTyping && (
              <div className="flex items-center gap-2 text-slate-400 text-[11px] font-mono-space">
                <Bot className="w-4 h-4 text-cyan-400 animate-spin" /> Computing trajectory response...
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Quick Prompts */}
          <div className="px-3 py-2 bg-slate-950/40 border-t border-white/5 flex flex-wrap gap-1.5">
            {quickQuestions.map((q, i) => (
              <button
                key={i}
                onClick={() => handleSend(q)}
                className="text-[10px] px-2.5 py-1 rounded-full bg-cyan-400/10 border border-cyan-400/20 text-cyan-300 hover:bg-cyan-400/20 transition"
              >
                {q}
              </button>
            ))}
          </div>

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSend();
            }}
            className="p-3 bg-slate-900/90 border-t border-white/10 flex items-center gap-2"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask Zeno-Sky assistant..."
              className="flex-1 bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 outline-none focus:border-cyan-400/50"
            />
            <button
              type="submit"
              disabled={!input.trim()}
              className="p-2 rounded-xl bg-gradient-to-r from-cyan-400 to-purple-500 text-slate-900 hover:opacity-90 disabled:opacity-40 transition"
            >
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
