import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Car, CheckCircle2, XCircle, MessageSquare, ArrowUpRight, Plus, RefreshCw } from 'lucide-react';
import { fetchAdminStats, fetchAdminContactRequests } from '../../services/api';

export const AdminDashboard = () => {
  const [stats, setStats] = useState({
    totalCars: 0,
    availableCars: 0,
    rentedCars: 0,
    unreadContactRequests: 0,
    totalContactRequests: 0,
  });
  const [recentRequests, setRecentRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    Promise.all([fetchAdminStats(), fetchAdminContactRequests({ page: 0, size: 5 })])
      .then(([statsRes, reqsRes]) => {
        if (statsRes && statsRes.data) {
          setStats((prev) => ({ ...prev, ...statsRes.data }));
        }
        const reqData = reqsRes?.data;
        const list = Array.isArray(reqData)
          ? reqData
          : reqData && Array.isArray(reqData.content)
          ? reqData.content
          : [];
        setRecentRequests(list);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const cards = [
    {
      title: 'Total Fleet Cars',
      value: stats.totalCars,
      icon: <Car className="w-6 h-6 text-amber-400" />,
      desc: 'All registered luxury vehicles',
    },
    {
      title: 'Available Cars',
      value: stats.availableCars,
      icon: <CheckCircle2 className="w-6 h-6 text-emerald-400" />,
      desc: 'Ready for showcase deployment',
    },
    {
      title: 'Rented / Reserved',
      value: stats.rentedCars,
      icon: <XCircle className="w-6 h-6 text-red-400" />,
      desc: 'Currently occupied on showcase contract',
    },
    {
      title: 'Visitor Messages',
      value: `${stats.unreadContactRequests} unread`,
      icon: <MessageSquare className="w-6 h-6 text-blue-400" />,
      desc: `Total ${stats.totalContactRequests} inquiries received`,
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Executive Dashboard Overview</h1>
          <p className="text-xs text-gray-400 font-mono">Live fleet metrics & client inquiries summary</p>
        </div>
        <div className="flex items-center gap-3">
          <button
            onClick={loadData}
            className="p-2.5 rounded-xl glass-panel text-gray-400 hover:text-white border border-white/10"
            title="Refresh Data"
          >
            <RefreshCw className="w-4 h-4" />
          </button>
          <Link
            to="/admin/cars"
            className="gold-button px-4 py-2.5 rounded-xl text-xs font-bold flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            <span>Add New Vehicle</span>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c, idx) => (
          <div
            key={idx}
            className="glass-card p-6 rounded-3xl border border-white/10 space-y-3 relative overflow-hidden"
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">{c.title}</span>
              <div className="p-2 rounded-xl glass-panel">{c.icon}</div>
            </div>
            <p className="text-3xl font-extrabold text-white font-mono">{c.value}</p>
            <p className="text-[11px] text-gray-400">{c.desc}</p>
          </div>
        ))}
      </div>

      {/* Recent Contact Requests Table Preview */}
      <div className="glass-card p-6 rounded-3xl border border-white/10 space-y-4">
        <div className="flex items-center justify-between border-b border-white/10 pb-4">
          <div>
            <h3 className="text-base font-bold text-white">Recent Visitor Contact Inquiries</h3>
            <p className="text-xs text-gray-400">Latest messages submitted through website</p>
          </div>
          <Link
            to="/admin/messages"
            className="text-xs font-semibold text-amber-400 hover:text-amber-300 flex items-center gap-1"
          >
            <span>View All Messages</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {loading ? (
          <div className="h-40 glass-panel rounded-2xl animate-pulse" />
        ) : recentRequests.length === 0 ? (
          <p className="text-xs text-gray-400 py-6 text-center">No contact inquiries received yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 font-mono uppercase">
                  <th className="pb-3">Client Name</th>
                  <th className="pb-3">Phone</th>
                  <th className="pb-3">Email</th>
                  <th className="pb-3">Date</th>
                  <th className="pb-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {recentRequests.map((req) => (
                  <tr key={req.id} className="hover:bg-white/5 transition-colors">
                    <td className="py-3 font-semibold text-white">{req.name}</td>
                    <td className="py-3 text-gray-300">{req.phone}</td>
                    <td className="py-3 text-gray-300">{req.email}</td>
                    <td className="py-3 text-gray-400 font-mono text-[11px]">
                      {new Date(req.createdAt).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-right">
                      {req.isRead ? (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-gray-500/20 text-gray-300 border border-gray-500/30">
                          Handled
                        </span>
                      ) : (
                        <span className="px-2.5 py-0.5 rounded-full text-[10px] bg-amber-500/20 text-amber-400 border border-amber-500/40 font-bold">
                          New Inquiry
                        </span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};
