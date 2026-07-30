import React, { useState, useEffect } from 'react';
import { Settings, Save, Check } from 'lucide-react';
import { fetchAgencyInfo, updateAgencySettings } from '../../services/api';
import { Toast } from '../../components/Toast';

export const AdminSettings = () => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    whatsapp: '',
    email: '',
    address: '',
    heroTitle: '',
    heroSubtitle: '',
  });
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState(null);

  useEffect(() => {
    fetchAgencyInfo()
      .then((res) => {
        setForm(res.data);
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to load agency settings.' });
      })
      .finally(() => setLoading(false));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSaving(true);

    updateAgencySettings(form)
      .then((res) => {
        setForm(res.data);
        setToast({ type: 'success', message: 'Agency settings updated successfully!' });
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to update agency settings.' });
      })
      .finally(() => setSaving(false));
  };

  if (loading) {
    return <div className="h-64 glass-card rounded-3xl animate-pulse" />;
  }

  return (
    <div className="space-y-8 max-w-4xl">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div>
        <h1 className="text-2xl font-extrabold text-white">Agency Information Settings</h1>
        <p className="text-xs text-gray-400 font-mono">Manage phone numbers, WhatsApp link, email, address & hero copy</p>
      </div>

      <div className="glass-card p-8 rounded-3xl border border-white/10 space-y-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Agency Name</label>
              <input
                type="text"
                required
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">VIP Email</label>
              <input
                type="email"
                required
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">Direct Phone Number</label>
              <input
                type="text"
                required
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
              />
            </div>

            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-300">WhatsApp Number (with country code)</label>
              <input
                type="text"
                required
                placeholder="+18005559000"
                value={form.whatsapp}
                onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Showroom Physical Address</label>
            <input
              type="text"
              required
              value={form.address}
              onChange={(e) => setForm({ ...form, address: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1 pt-4 border-t border-white/10">
            <label className="text-xs font-semibold text-gray-300">Homepage Hero Headline</label>
            <input
              type="text"
              value={form.heroTitle || ''}
              onChange={(e) => setForm({ ...form, heroTitle: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            />
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Homepage Hero Subtitle</label>
            <textarea
              rows={2}
              value={form.heroSubtitle || ''}
              onChange={(e) => setForm({ ...form, heroSubtitle: e.target.value })}
              className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={saving}
            className="gold-button px-6 py-3.5 rounded-xl font-bold text-xs flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            <span>{saving ? 'Saving Changes...' : 'Save Agency Settings'}</span>
          </button>
        </form>
      </div>
    </div>
  );
};
