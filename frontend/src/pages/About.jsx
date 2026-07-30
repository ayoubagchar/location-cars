import React from 'react';
import { motion } from 'framer-motion';
import { ShieldCheck, Award, Users, Car, CheckCircle2, Sparkles } from 'lucide-react';

export const About = () => {
  const stats = [
    { label: 'Exotic Vehicles', value: '50+' },
    { label: 'VIP Clients Served', value: '1,200+' },
    { label: 'Satisfaction Rate', value: '99.8%' },
    { label: 'Concierge Cities', value: '12' },
  ];

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
      {/* Header */}
      <div className="text-center space-y-4 max-w-3xl mx-auto">
        <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
          Heritage & Distinction
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">About Apex Luxury Drive</h1>
        <p className="text-gray-300 text-sm leading-relaxed">
          Founded on the uncompromising pursuit of automotive engineering excellence, Apex provides a world-class showcase of top-tier luxury sedans, supercars, and executive SUVs.
        </p>
      </div>

      {/* Stats counter grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s, idx) => (
          <div key={idx} className="glass-card p-6 rounded-3xl text-center space-y-2 border border-amber-500/20">
            <span className="text-3xl sm:text-4xl font-extrabold gold-gradient-text font-mono">
              {s.value}
            </span>
            <p className="text-xs font-semibold text-gray-300 uppercase tracking-wider">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Story Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-panel text-amber-400 text-xs font-mono font-bold">
            <Sparkles className="w-3.5 h-3.5" /> Our Vision
          </div>
          <h2 className="text-3xl font-extrabold text-white">
            Redefining Luxury Transport & Automotive Aesthetics
          </h2>
          <p className="text-xs text-gray-300 leading-relaxed">
            Every vehicle in our collection represents the pinnacle of craftsmanship, performance, and technological sophistication. Whether you require a Rolls-Royce Ghost for a state summit or a Ferrari F8 Spider for a weekend retreat along the coastline, our dedicated concierge team guarantees an effortless experience.
          </p>
          <ul className="space-y-3 text-xs text-gray-300">
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Strict 150-point factory safety inspection before every deployment</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>White-glove climate-controlled enclosed carrier delivery</span>
            </li>
            <li className="flex items-center gap-2.5">
              <CheckCircle2 className="w-4 h-4 text-amber-400 shrink-0" />
              <span>Discreet privacy protection for high-profile executive clients</span>
            </li>
          </ul>
        </div>

        <div className="relative rounded-3xl overflow-hidden glass-card border border-white/10 aspect-[4/3]">
          <img
            src="https://images.unsplash.com/photo-1563720223185-11003d516935?q=80&w=1200&auto=format&fit=crop"
            alt="Luxury Car Showcase Heritage"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />
        </div>
      </div>
    </div>
  );
};
