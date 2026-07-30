import React, { useState, useEffect } from 'react';
import { Phone, Mail, MapPin, MessageSquare, Clock, Send, CheckCircle2 } from 'lucide-react';
import { fetchAgencyInfo, submitContactRequest } from '../services/api';
import { Toast } from '../components/Toast';

export const Contact = () => {
  const [agency, setAgency] = useState({
    name: 'Apex Luxury Drive',
    phone: '+1 (800) 555-9000',
    whatsapp: '+18005559000',
    email: 'vip@apexluxury.com',
    address: '777 Grand Boulevard, Beverly Hills, CA 90210',
  });

  const [form, setForm] = useState({ name: '', phone: '', email: '', message: '' });
  const [submitting, setSubmitting] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchAgencyInfo()
      .then((res) => setAgency(res.data))
      .catch(() => {});
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);

    submitContactRequest(form)
      .then(() => {
        setToast({
          type: 'success',
          message: 'Thank you! Your message has been sent to our concierge team.',
        });
        setForm({ name: '', phone: '', email: '', message: '' });
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to send message. Please try again.' });
      })
      .finally(() => setSubmitting(false));
  };

  const whatsappClean = agency.whatsapp ? agency.whatsapp.replace(/[^0-9]/g, '') : '';

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Header */}
      <div className="text-center space-y-3 max-w-2xl mx-auto">
        <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
          Concierge Support
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Contact Our Team</h1>
        <p className="text-gray-300 text-sm">
          Reach out directly to arrange private viewings, custom vehicle requests, or doorstep delivery logistics.
        </p>
      </div>

      {/* Main Grid: Form Left, Info & Map Right */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Form */}
        <div className="lg:col-span-7 glass-card p-8 rounded-3xl border border-white/10 space-y-6">
          <div className="space-y-1">
            <h2 className="text-xl font-bold text-white">Send Us a Direct Message</h2>
            <p className="text-xs text-gray-400">Our concierge team will respond within 30 minutes.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Full Name</label>
              <input
                type="text"
                required
                placeholder="e.g. Jonathan Vance"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Phone Number</label>
                <input
                  type="tel"
                  required
                  placeholder="+1 (555) 000-0000"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
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
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
                />
              </div>
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Message / Inquiry Details</label>
              <textarea
                rows={4}
                required
                placeholder="How can our concierge assist you today?"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400 resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full gold-button py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{submitting ? 'Sending Message...' : 'Submit Message'}</span>
            </button>
          </form>
        </div>

        {/* Right Contact Info & Google Map */}
        <div className="lg:col-span-5 space-y-6">
          <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono">
              Concierge Information
            </h3>

            <div className="space-y-4 text-xs">
              <a
                href={`tel:${agency.phone}`}
                className="flex items-start gap-3 p-3 rounded-xl glass-panel hover:bg-white/5 transition-all"
              >
                <Phone className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Direct Phone</span>
                  <span className="text-gray-300">{agency.phone}</span>
                </div>
              </a>

              <a
                href={`https://wa.me/${whatsappClean}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 p-3 rounded-xl glass-panel hover:bg-white/5 transition-all"
              >
                <MessageSquare className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">WhatsApp Instant</span>
                  <span className="text-gray-300">{agency.whatsapp}</span>
                </div>
              </a>

              <a
                href={`mailto:${agency.email}`}
                className="flex items-start gap-3 p-3 rounded-xl glass-panel hover:bg-white/5 transition-all"
              >
                <Mail className="w-4 h-4 text-blue-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">VIP Email</span>
                  <span className="text-gray-300">{agency.email}</span>
                </div>
              </a>

              <div className="flex items-start gap-3 p-3 rounded-xl glass-panel">
                <MapPin className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block">Showroom Address</span>
                  <span className="text-gray-300">{agency.address}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Embedded Google Maps Display */}
          <div className="glass-card rounded-3xl overflow-hidden border border-white/10 h-64 relative">
            <iframe
              title="Agency Location Map"
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d26430.39324021209!2d-118.4117!3d34.0736!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bc04d6d147ab%3A0xd6c7c379fd081ed1!2sBeverly%20Hills%2C%20CA!5e0!3m2!1sen!2sus!4v1700000000000!5m2!1sen!2sus"
              className="w-full h-full filter grayscale invert contrast-125 opacity-80"
              style={{ border: 0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
