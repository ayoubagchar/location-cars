import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Lock, Mail, ArrowRight, KeyRound } from 'lucide-react';
import { loginAdmin } from '../../services/api';
import { Toast } from '../../components/Toast';

export const AdminLogin = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(null);

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);

    loginAdmin({ email, password })
      .then((res) => {
        localStorage.setItem('admin_token', res.data.token);
        localStorage.setItem('admin_user', JSON.stringify(res.data));
        setToast({ type: 'success', message: 'Authentication successful! Redirecting...' });
        setTimeout(() => {
          navigate('/admin/dashboard');
        }, 800);
      })
      .catch((err) => {
        const errorMsg =
          err.response?.data?.message ||
          (err.code === 'ERR_NETWORK' || !err.response || err.response?.status === 504
            ? 'Unable to connect to backend server. Please verify Spring Boot API is running on http://localhost:8080'
            : 'Invalid administrator credentials.');
        setToast({
          type: 'error',
          message: errorMsg,
        });
      })
      .finally(() => setLoading(false));
  };

  const fillDemoAdmin = () => {
    setEmail('admin@luxurycars.com');
    setPassword('admin123');
  };

  return (
    <div className="min-h-screen flex items-center justify-center pt-20 pb-16 px-4 relative overflow-hidden bg-slate-950">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Glow background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 sm:p-10 rounded-3xl max-w-md w-full border border-amber-500/30 space-y-8 relative z-10 shadow-2xl"
      >
        <div className="text-center space-y-2">
          <div className="w-12 h-12 rounded-2xl gold-gradient-bg mx-auto flex items-center justify-center text-slate-950 font-bold shadow-lg shadow-amber-500/20">
            <Lock className="w-6 h-6 stroke-[2.5]" />
          </div>
          <h1 className="text-2xl font-extrabold text-white">Administrator Portal</h1>
          <p className="text-xs text-gray-400 font-mono">Secure Access Control Panel</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Admin Email</label>
            <div className="relative">
              <input
                type="email"
                required
                placeholder="admin@luxurycars.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
              <Mail className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-semibold text-gray-300">Password</label>
            <div className="relative">
              <input
                type="password"
                required
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-900 border border-white/10 rounded-xl pl-10 pr-4 py-3 text-sm text-white focus:outline-none focus:border-amber-400"
              />
              <KeyRound className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full gold-button py-3.5 rounded-xl font-bold text-sm flex items-center justify-center gap-2"
          >
            <span>{loading ? 'Authenticating...' : 'Sign In to Dashboard'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Demo Fill Quick Button */}
        <div className="pt-4 border-t border-white/10 text-center space-y-3">
          <button
            onClick={fillDemoAdmin}
            type="button"
            className="text-xs text-amber-400 hover:text-amber-300 font-mono underline cursor-pointer"
          >
            Auto-fill default admin credentials
          </button>
          <div className="text-[11px] text-gray-500">
            <Link to="/" className="hover:text-gray-300">
              ← Return to Public Website
            </Link>
          </div>
        </div>
      </motion.div>
    </div>
  );
};
