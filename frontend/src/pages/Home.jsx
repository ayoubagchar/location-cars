import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Search,
  Car as CarIcon,
  ShieldCheck,
  Award,
  Sparkles,
  Clock,
  ArrowRight,
  ChevronRight,
  PhoneCall,
  CheckCircle2,
  Star,
} from 'lucide-react';
import { fetchPublicCars, fetchDistinctBrands, fetchAgencyInfo } from '../services/api';
import { CarCard } from '../components/CarCard';

export const Home = () => {
  const navigate = useNavigate();
  const [featuredCars, setFeaturedCars] = useState([]);
  const [brands, setBrands] = useState([]);
  const [agency, setAgency] = useState({ heroTitle: '', heroSubtitle: '' });
  const [loading, setLoading] = useState(true);

  // Quick Search Form State
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBrand, setSelectedBrand] = useState('');
  const [selectedFuel, setSelectedFuel] = useState('');

  useEffect(() => {
    Promise.all([
      fetchPublicCars({ page: 0, size: 6, sortBy: 'pricePerDay', sortDir: 'desc' }),
      fetchDistinctBrands(),
      fetchAgencyInfo(),
    ])
      .then(([carsRes, brandsRes, agencyRes]) => {
        setFeaturedCars(carsRes.data.content || []);
        setBrands(brandsRes.data || []);
        setAgency(agencyRes.data || {});
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const handleQuickSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    if (searchQuery) params.append('search', searchQuery);
    if (selectedBrand) params.append('brand', selectedBrand);
    if (selectedFuel) params.append('fuel', selectedFuel);
    navigate(`/cars?${params.toString()}`);
  };

  const perks = [
    {
      icon: <Award className="w-8 h-8 text-amber-400" />,
      title: 'World-Class Fleet',
      description: 'Hand-picked luxury sedans, supercars & executive SUVs maintained to factory perfection.',
    },
    {
      icon: <ShieldCheck className="w-8 h-8 text-amber-400" />,
      title: 'Full Insurance Included',
      description: 'Comprehensive zero-deductible insurance coverage for your absolute peace of mind.',
    },
    {
      icon: <Sparkles className="w-8 h-8 text-amber-400" />,
      title: 'White-Glove Delivery',
      description: 'Bespoke doorstep delivery to your private residence, five-star hotel, or airport terminal.',
    },
    {
      icon: <Clock className="w-8 h-8 text-amber-400" />,
      title: '24/7 Personal Concierge',
      description: 'Dedicated multi-lingual concierge managers available round-the-clock for any request.',
    },
  ];

  const testimonials = [
    {
      name: 'Alexander Wright',
      role: 'Private Investor',
      comment: 'The Rolls-Royce Ghost Extended was delivered directly to my private jet terminal in immaculate condition. Service of the highest caliber.',
      rating: 5,
    },
    {
      name: 'Sophia Laurent',
      role: 'Creative Director',
      comment: 'Renting the Lamborghini Urus for our fashion week campaign was seamless. The team handled every detail with extreme professionalism.',
      rating: 5,
    },
    {
      name: 'Marcus Vance',
      role: 'Tech Founder',
      comment: 'Apex is my go-to luxury vehicle partner whenever I land in California. Always pristine cars and unmatched responsiveness.',
      rating: 5,
    },
  ];

  return (
    <div className="space-y-24 pb-20">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-28 pb-16 overflow-hidden">
        {/* Background Image & Gradient overlay */}
        <div className="absolute inset-0 z-0">
          <img
            src="https://images.unsplash.com/photo-1617814076367-b759c7d7e738?q=80&w=2000&auto=format&fit=crop"
            alt="Hero Luxury Supercar"
            className="w-full h-full object-cover object-center opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/80 to-slate-950/40" />
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-amber-500/10 via-transparent to-transparent pointer-events-none" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4 max-w-4xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass-panel border border-amber-500/30 text-amber-300 text-xs font-semibold uppercase tracking-widest">
              <Sparkles className="w-3.5 h-3.5" /> Bespoke Automotive Excellence
            </div>

            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-white leading-tight">
              {agency.heroTitle || 'Experience Pure Luxury & Performance'}
            </h1>

            <p className="text-base sm:text-xl text-gray-300 max-w-2xl mx-auto leading-relaxed">
              {agency.heroSubtitle ||
                "Drive the world's most prestigious luxury sedans, supercars & SUVs with white-glove delivery."}
            </p>
          </motion.div>

          {/* Floating Search Engine Bar */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="max-w-5xl mx-auto"
          >
            <form
              onSubmit={handleQuickSearch}
              className="glass-panel p-4 sm:p-6 rounded-3xl border border-amber-500/20 shadow-2xl backdrop-blur-2xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4"
            >
              {/* Keyword Search */}
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                  Search Vehicle
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="e.g. Ghost, Urus..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                  <Search className="w-4 h-4 text-gray-400 absolute right-3.5 top-3" />
                </div>
              </div>

              {/* Brand Selector */}
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                  Brand
                </label>
                <select
                  value={selectedBrand}
                  onChange={(e) => setSelectedBrand(e.target.value)}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">All Brands</option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
              </div>

              {/* Fuel Selector */}
              <div className="space-y-1 text-left">
                <label className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-semibold block">
                  Fuel Type
                </label>
                <select
                  value={selectedFuel}
                  onChange={(e) => setSelectedFuel(e.target.value)}
                  className="w-full bg-slate-900/80 border border-white/10 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                >
                  <option value="">Any Fuel</option>
                  <option value="PETROL">Petrol</option>
                  <option value="DIESEL">Diesel</option>
                  <option value="HYBRID">Hybrid</option>
                  <option value="ELECTRIC">Electric</option>
                </select>
              </div>

              {/* Search Submit Button */}
              <div className="flex items-end">
                <button
                  type="submit"
                  className="w-full gold-button py-3 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
                >
                  <Search className="w-4 h-4" />
                  <span>Search Fleet</span>
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      </section>

      {/* Featured Cars Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              Executive Selection
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">
              Featured Fleet Vehicles
            </h2>
          </div>
          <Link
            to="/cars"
            className="inline-flex items-center gap-2 text-sm font-semibold text-amber-400 hover:text-amber-300 transition-colors"
          >
            <span>Explore All Vehicles</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-96 glass-card rounded-3xl animate-pulse" />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        )}
      </section>

      {/* Why Choose Us */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
            Unrivaled Experience
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white">
            Why Discerning Clients Choose Us
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            We provide more than luxury rentals. We deliver unforgettable driving emotions backed by impeccable safety standards and white-glove service.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {perks.map((perk, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="glass-card p-8 rounded-3xl border border-white/10 hover:border-amber-500/30 transition-all space-y-4"
            >
              <div className="w-14 h-14 rounded-2xl glass-panel flex items-center justify-center border border-amber-500/20">
                {perk.icon}
              </div>
              <h3 className="text-lg font-bold text-white">{perk.title}</h3>
              <p className="text-xs text-gray-400 leading-relaxed">{perk.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Customer Testimonials */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="glass-panel p-8 sm:p-12 rounded-3xl border border-amber-500/20 relative overflow-hidden">
          <div className="text-center max-w-2xl mx-auto space-y-3 mb-12">
            <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
              Client Feedback
            </span>
            <h2 className="text-3xl font-extrabold text-white">Trusted by Leaders & Visionaries</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t, idx) => (
              <div key={idx} className="glass-card p-6 rounded-2xl border border-white/10 space-y-4">
                <div className="flex text-amber-400 gap-1">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-amber-400" />
                  ))}
                </div>
                <p className="text-xs italic text-gray-300 leading-relaxed">"{t.comment}"</p>
                <div className="pt-2 border-t border-white/10">
                  <h4 className="text-sm font-bold text-white">{t.name}</h4>
                  <p className="text-[11px] text-amber-400/80 font-mono">{t.role}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Direct Contact Preview CTA */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative rounded-3xl overflow-hidden glass-card p-8 sm:p-12 border border-amber-500/30 flex flex-col md:flex-row items-center justify-between gap-8">
          <div className="space-y-3 text-center md:text-left">
            <h2 className="text-2xl sm:text-4xl font-extrabold text-white">
              Ready to Experience The Extraordinary?
            </h2>
            <p className="text-sm text-gray-300 max-w-xl">
              Contact our concierge desk today to check vehicle availability or arrange custom fleet requests.
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto shrink-0">
            <Link
              to="/cars"
              className="gold-button px-6 py-3.5 rounded-2xl font-bold text-sm text-center flex items-center justify-center gap-2"
            >
              <CarIcon className="w-4 h-4" /> View Fleet Catalog
            </Link>
            <Link
              to="/contact"
              className="glass-panel px-6 py-3.5 rounded-2xl font-bold text-sm text-white hover:bg-white/10 transition-all border border-white/20 text-center flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4 text-amber-400" /> Contact Concierge
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
