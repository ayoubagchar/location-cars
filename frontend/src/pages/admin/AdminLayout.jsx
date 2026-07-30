import React, { useEffect } from 'react';
import { Link, useNavigate, useLocation, Outlet } from 'react-router-dom';
import {
  LayoutDashboard,
  Car,
  MessageSquare,
  Settings,
  LogOut,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';

export const AdminLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('admin_token');
  const user = JSON.parse(localStorage.getItem('admin_user') || '{}');

  useEffect(() => {
    if (!token) {
      navigate('/admin/login');
    }
  }, [token, navigate]);

  if (!token) return null;

  const handleLogout = () => {
    localStorage.removeItem('admin_token');
    localStorage.removeItem('admin_user');
    navigate('/admin/login');
  };

  const navItems = [
    { label: 'Overview Stats', path: '/admin/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
    { label: 'Fleet Cars (CRUD)', path: '/admin/cars', icon: <Car className="w-4 h-4" /> },
    { label: 'Contact Messages', path: '/admin/messages', icon: <MessageSquare className="w-4 h-4" /> },
    { label: 'Agency Settings', path: '/admin/settings', icon: <Settings className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen bg-slate-950 text-gray-200 flex flex-col md:flex-row">
      {/* Admin Sidebar */}
      <aside className="w-full md:w-64 glass-panel border-r border-white/10 p-6 flex flex-col justify-between shrink-0">
        <div className="space-y-8">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl gold-gradient-bg flex items-center justify-center text-slate-950 font-bold">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm font-extrabold text-white tracking-wider uppercase font-mono">
                Admin Panel
              </h2>
              <span className="text-[10px] text-amber-400 font-mono">Control Center</span>
            </div>
          </div>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const active = location.pathname === item.path;
              return (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold transition-all ${
                    active
                      ? 'gold-gradient-bg text-slate-950 shadow-md font-bold'
                      : 'text-gray-400 hover:text-white hover:bg-white/5'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="pt-6 border-t border-white/10 space-y-3">
          <div className="text-xs space-y-0.5 px-2">
            <p className="font-bold text-white truncate">{user.name || 'Executive Admin'}</p>
            <p className="text-[10px] text-gray-400 truncate">{user.email || 'admin@luxurycars.com'}</p>
          </div>

          <Link
            to="/"
            target="_blank"
            className="flex items-center gap-2 text-xs text-amber-400 hover:text-amber-300 px-2 py-1.5"
          >
            <ExternalLink className="w-3.5 h-3.5" /> View Live Public Site
          </Link>

          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-semibold text-red-400 hover:bg-red-500/10 transition-colors border border-red-500/20"
          >
            <LogOut className="w-4 h-4" />
            <span>Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-grow p-6 sm:p-10 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};
