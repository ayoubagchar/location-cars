import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, Phone, Mail, MapPin, Clock, MessageSquare, ShieldCheck, ArrowRight } from 'lucide-react';
import { fetchAgencyInfo } from '../services/api';

export const Footer = () => {
  const [agency, setAgency] = useState({
    name: 'Apex Luxury Drive',
    phone: '+1 (800) 555-9000',
    whatsapp: '+18005559000',
    email: 'vip@apexluxury.com',
    address: '777 Grand Boulevard, Beverly Hills, CA 90210',
  });

  useEffect(() => {
    fetchAgencyInfo()
      .then((res) => setAgency(res.data))
      .catch(() => {});
  }, []);

  return (
    <footer className="bg-slate-950 border-t border-white/10 text-gray-400 pt-16 pb-12 relative overflow-hidden">
      {/* Glow effect */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-32 bg-amber-500/5 blur-3xl rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-12">
          {/* Brand Col */}
          <div className="space-y-4">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-bold">
                <Car className="w-5 h-5" />
              </div>
              <span className="text-lg font-extrabold tracking-wider text-white uppercase">
                {agency.name}
              </span>
            </Link>
            <p className="text-xs leading-relaxed text-gray-400">
              The premier destination for luxury automotive showcases. Experience supreme comfort, engineering brilliance, and bespoke customer service.
            </p>
            <div className="flex items-center gap-3 pt-2">
              <a
                href={`https://wa.me/${agency.whatsapp.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-emerald-400 hover:border-emerald-500/50 hover:bg-emerald-500/10 transition-all"
                title="WhatsApp Direct"
              >
                <MessageSquare className="w-4 h-4" />
              </a>
              <a
                href={`tel:${agency.phone}`}
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10 transition-all"
                title="Direct Phone"
              >
                <Phone className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${agency.email}`}
                className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-blue-400 hover:border-blue-500/50 hover:bg-blue-500/10 transition-all"
                title="Email Inquiry"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              Quick Navigation
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link to="/" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Home Showcase
                </Link>
              </li>
              <li>
                <Link to="/cars" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Executive Fleet
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> About Our Heritage
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-amber-400 transition-colors flex items-center gap-1.5">
                  <ArrowRight className="w-3 h-3 text-amber-500" /> Concierge & Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Details */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              Concierge Desk
            </h3>
            <ul className="space-y-3 text-xs">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <span>{agency.address}</span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`tel:${agency.phone}`} className="hover:text-white transition-colors">
                  {agency.phone}
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-400 shrink-0" />
                <a href={`mailto:${agency.email}`} className="hover:text-white transition-colors">
                  {agency.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Operating Hours */}
          <div className="space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              Concierge Hours
            </h3>
            <div className="glass-panel p-4 rounded-xl space-y-2 text-xs border border-white/5">
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Monday - Friday
                </span>
                <span className="font-semibold text-white">08:00 - 20:00</span>
              </div>
              <div className="flex items-center justify-between text-gray-300">
                <span className="flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5 text-amber-400" /> Saturday - Sunday
                </span>
                <span className="font-semibold text-amber-400">09:00 - 18:00</span>
              </div>
              <p className="text-[11px] text-emerald-400 pt-1 font-medium">
                * 24/7 VIP Concierge Phone Support
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <p>© {new Date().getFullYear()} {agency.name}. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link to="/admin/login" className="hover:text-amber-400 transition-colors flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-500" /> Admin Authentication
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
