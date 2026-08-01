import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  Fuel,
  Gauge,
  Users,
  Wind,
  Calendar,
  CheckCircle,
  XCircle,
  MessageSquare,
  PhoneCall,
  Mail,
  ArrowLeft,
  ShieldCheck,
  Sparkles,
  Send,
} from 'lucide-react';
import { fetchCarDetails, fetchAgencyInfo, submitContactRequest } from '../services/api';
import { Toast } from '../components/Toast';
import { getFullImageUrl } from '../utils/imageUtils';

export const CarDetails = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const [agency, setAgency] = useState({ phone: '+18005559000', whatsapp: '+18005559000' });
  const [selectedImage, setSelectedImage] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Inquiry Form State
  const [inquiryModal, setInquiryModal] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    Promise.all([fetchCarDetails(id), fetchAgencyInfo()])
      .then(([carRes, agencyRes]) => {
        setCar(carRes.data);
        setAgency(agencyRes.data);
        const images = carRes.data.images;
        if (images && images.length > 0) {
          const primary = images.find((i) => i.isPrimary) || images[0];
          setSelectedImage(primary.imageUrl);
        } else if (carRes.data.imageUrls && carRes.data.imageUrls.length > 0) {
          setSelectedImage(carRes.data.imageUrls[0]);
        }
      })
      .catch((err) => {
        setToast({ type: 'error', message: 'Failed to load vehicle details.' });
      })
      .finally(() => setLoading(false));
  }, [id]);

  const handleInquirySubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    const msg = `Vehicle Inquiry for [${car.brand} ${car.model} (${car.year})]: ${form.message}`;

    submitContactRequest({
      name: form.name,
      phone: form.phone,
      email: form.email,
      message: msg,
    })
      .then(() => {
        setToast({ type: 'success', message: 'Inquiry sent successfully! Our concierge will contact you shortly.' });
        setForm({ name: '', phone: '', email: '', message: '' });
        setInquiryModal(false);
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to send inquiry. Please try WhatsApp or direct call.' });
      })
      .finally(() => setSubmitting(false));
  };

  if (loading) {
    return (
      <div className="pt-32 pb-20 max-w-7xl mx-auto px-4 text-center">
        <div className="h-96 glass-card rounded-3xl animate-pulse" />
      </div>
    );
  }

  if (!car) {
    return (
      <div className="pt-32 pb-20 max-w-xl mx-auto px-4 text-center space-y-4">
        <h2 className="text-2xl font-bold text-white">Vehicle Not Found</h2>
        <Link to="/cars" className="gold-button px-6 py-2.5 rounded-xl font-bold text-xs inline-block">
          Return to Fleet
        </Link>
      </div>
    );
  }

  const whatsappClean = agency.whatsapp ? agency.whatsapp.replace(/[^0-9]/g, '') : '';
  const whatsappUrl = `https://wa.me/${whatsappClean}?text=${encodeURIComponent(
    `Hello, I would like to inquire about renting the ${car.brand} ${car.model} (${car.year}). Daily price: $${car.pricePerDay}.`
  )}`;

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Back button */}
      <div>
        <Link
          to="/cars"
          className="inline-flex items-center gap-2 text-xs font-semibold text-gray-400 hover:text-amber-400 transition-colors glass-panel px-4 py-2 rounded-xl border border-white/10"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Fleet Catalog
        </Link>
      </div>

      {/* Main Grid: Gallery Left, Specs & CTAs Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Image Gallery */}
        <div className="lg:col-span-7 space-y-4">
          {/* Main Large Image */}
          <div className="relative aspect-[16/10] rounded-3xl overflow-hidden glass-card border border-white/10 shadow-2xl bg-slate-900">
            <img
              src={getFullImageUrl(selectedImage)}
              alt={`${car.brand} ${car.model}`}
              className="w-full h-full object-cover object-center"
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=1200&auto=format&fit=crop';
              }}
            />
            <div className="absolute top-4 left-4">
              {car.available ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
                  <CheckCircle className="w-3.5 h-3.5" /> Available For Rent
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/40 backdrop-blur-md">
                  <XCircle className="w-3.5 h-3.5" /> Currently Rented
                </span>
              )}
            </div>
          </div>

          {/* Gallery Thumbnails */}
          {car.images && car.images.length > 1 && (
            <div className="flex items-center gap-4 overflow-x-auto pb-2">
              {car.images.map((img) => (
                <button
                  key={img.id}
                  onClick={() => setSelectedImage(img.imageUrl)}
                  className={`w-24 h-16 rounded-xl overflow-hidden shrink-0 border-2 transition-all ${
                    selectedImage === img.imageUrl
                      ? 'border-amber-400 scale-105 shadow-lg shadow-amber-500/20'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img src={getFullImageUrl(img.imageUrl)} alt="Thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Car Details & Action Card */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
            <div>
              <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest block mb-1">
                {car.brand}
              </span>
              <h1 className="text-3xl font-extrabold text-white">{car.model}</h1>
              <p className="text-xs text-gray-400 font-mono mt-1">Model Year: {car.year}</p>
            </div>

            {/* Price Box */}
            <div className="glass-panel p-4 rounded-2xl border border-amber-500/30 flex items-center justify-between">
              <div>
                <span className="text-xs text-gray-400 uppercase tracking-widest font-mono block">
                  Daily Showcase Rate
                </span>
                <span className="text-3xl font-extrabold gold-gradient-text">
                  ${car.pricePerDay}
                </span>
                <span className="text-xs text-gray-400 font-mono ml-1">/ 24 hours</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-emerald-400 font-semibold uppercase tracking-wider block">
                  ✓ Unlimited Miles
                </span>
                <span className="text-[10px] text-gray-400 block">✓ Zero Deductible</span>
              </div>
            </div>

            {/* Description */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-white font-mono">
                Overview & Craftsmanship
              </h3>
              <p className="text-xs text-gray-300 leading-relaxed">{car.description}</p>
            </div>

            {/* Specification Grid */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="glass-panel p-3.5 rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <Gauge className="w-4 h-4" />
                  <span className="font-semibold">Transmission</span>
                </div>
                <p className="text-xs font-bold text-white">{car.transmission}</p>
              </div>

              <div className="glass-panel p-3.5 rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <Fuel className="w-4 h-4" />
                  <span className="font-semibold">Fuel Engine</span>
                </div>
                <p className="text-xs font-bold text-white">{car.fuel}</p>
              </div>

              <div className="glass-panel p-3.5 rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <Users className="w-4 h-4" />
                  <span className="font-semibold">Seating</span>
                </div>
                <p className="text-xs font-bold text-white">{car.seats} Passengers</p>
              </div>

              <div className="glass-panel p-3.5 rounded-xl border border-white/5 space-y-1">
                <div className="flex items-center gap-1.5 text-xs text-amber-400">
                  <Wind className="w-4 h-4" />
                  <span className="font-semibold">Air Conditioning</span>
                </div>
                <p className="text-xs font-bold text-white">
                  {car.airConditioning ? 'Dual-Zone Climate' : 'Standard'}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="space-y-3 pt-4 border-t border-white/10">
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white py-3.5 rounded-2xl font-bold text-sm flex items-center justify-center gap-2.5 transition-all shadow-lg shadow-emerald-600/20"
              >
                <MessageSquare className="w-4 h-4 fill-white" />
                <span>Inquire via WhatsApp</span>
              </a>

              <div className="grid grid-cols-2 gap-3">
                <a
                  href={`tel:${agency.phone}`}
                  className="w-full glass-panel border border-amber-500/40 text-amber-300 hover:bg-amber-500/10 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2 transition-all"
                >
                  <PhoneCall className="w-3.5 h-3.5 text-amber-400" />
                  <span>Call Concierge</span>
                </a>

                <button
                  onClick={() => setInquiryModal(true)}
                  className="w-full gold-button py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2"
                >
                  <Mail className="w-3.5 h-3.5" />
                  <span>Send Request</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Inquiry Form Modal */}
      {inquiryModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-8 rounded-3xl max-w-lg w-full border border-amber-500/30 space-y-6 relative"
          >
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div>
                <h3 className="text-lg font-bold text-white">Concierge Vehicle Request</h3>
                <p className="text-xs text-amber-400 font-mono">
                  {car.brand} {car.model} ({car.year})
                </p>
              </div>
              <button
                onClick={() => setInquiryModal(false)}
                className="text-gray-400 hover:text-white"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleInquirySubmit} className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Your Full Name</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Jonathan Vance"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Phone Number</label>
                  <input
                    type="tel"
                    required
                    placeholder="+1 (555) 000-0000"
                    value={form.phone}
                    onChange={(e) => setForm({ ...form, phone: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Email Address</label>
                  <input
                    type="email"
                    required
                    placeholder="jonathan@domain.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Message / Dates Requested</label>
                <textarea
                  rows={3}
                  required
                  placeholder="Mention requested dates or specific delivery locations..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full gold-button py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
              >
                {submitting ? 'Submitting...' : 'Submit Inquiry'}
              </button>
            </form>
          </motion.div>
        </div>
      )}
    </div>
  );
};
