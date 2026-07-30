import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Car, Phone, ShieldCheck, Menu, X, Lock } from 'lucide-react';
import { fetchAgencyInfo } from '../services/api';

export const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [agency, setAgency] = useState({ name: 'Apex Luxury', phone: '+1 (800) 555-9000' });
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    fetchAgencyInfo()
      .then((res) => setAgency(res.data))
      .catch(() => {});
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Fleet', path: '/cars' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${
        isScrolled
          ? 'glass-panel border-b border-white/10 py-3 shadow-2xl backdrop-blur-xl'
          : 'bg-gradient-to-b from-black/80 via-black/40 to-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20 group-hover:scale-105 transition-transform">
              <Car className="w-6 h-6 stroke-[2.5]" />
            </div>
            <div>
              <span className="text-xl font-extrabold tracking-wider text-white uppercase font-sans">
                {agency.name ? agency.name.split(' ')[0] : 'APEX'}
                <span className="gold-gradient-text ml-1.5">
                  {agency.name ? agency.name.split(' ').slice(1).join(' ') : 'LUXURY'}
                </span>
              </span>
              <p className="text-[10px] text-amber-400/80 uppercase tracking-widest font-mono">
                Bespoke Drive Fleet
              </p>
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8 glass-panel px-6 py-2 rounded-full border border-white/10">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-all duration-200 relative ${
                  isActive(link.path)
                    ? 'text-amber-400 font-semibold'
                    : 'text-gray-300 hover:text-white'
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <span className="absolute -bottom-1 left-0 right-0 h-0.5 bg-amber-400 rounded-full shadow-sm shadow-amber-400" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center gap-4">
            <a
              href={`tel:${agency.phone}`}
              className="flex items-center gap-2 text-xs font-semibold text-gray-300 hover:text-amber-400 transition-colors px-3 py-2 rounded-lg hover:bg-white/5"
            >
              <Phone className="w-4 h-4 text-amber-400" />
              <span>{agency.phone}</span>
            </a>

            <Link
              to="/admin/login"
              className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-semibold border border-amber-500/30 text-amber-300 hover:bg-amber-500/10 transition-all"
            >
              <Lock className="w-3.5 h-3.5 text-amber-400" />
              <span>Portal</span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-gray-300 hover:text-white p-2 rounded-xl glass-panel"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden glass-panel border-b border-amber-500/20 px-6 py-6 mt-3 space-y-4">
          <div className="flex flex-col space-y-3">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 border-b border-white/5 ${
                  isActive(link.path) ? 'text-amber-400 font-bold' : 'text-gray-300'
                }`}
              >
                {link.name}
              </Link>
            ))}
            <a
              href={`tel:${agency.phone}`}
              className="flex items-center gap-3 text-sm text-amber-400 pt-2"
            >
              <Phone className="w-4 h-4" />
              <span>{agency.phone}</span>
            </a>
            <Link
              to="/admin/login"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 text-center w-full py-2.5 rounded-xl text-xs font-bold border border-amber-500/40 text-amber-400"
            >
              Admin Dashboard Login
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
