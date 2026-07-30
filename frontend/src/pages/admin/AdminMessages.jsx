import React, { useState, useEffect } from 'react';
import { MessageSquare, Mail, Phone, CheckCircle, Trash2, Calendar, User } from 'lucide-react';
import { fetchAdminContactRequests, markContactRequestRead, deleteContactRequest } from '../../services/api';
import { Toast } from '../../components/Toast';

export const AdminMessages = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  const loadRequests = () => {
    setLoading(true);
    fetchAdminContactRequests({ page: 0, size: 50 })
      .then((res) => {
        setRequests(res.data.content || []);
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to load visitor contact requests.' });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadRequests();
  }, []);

  const handleMarkRead = (id) => {
    markContactRequestRead(id)
      .then(() => {
        setToast({ type: 'success', message: 'Marked as read/handled.' });
        loadRequests();
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to update request status.' });
      });
  };

  const handleDelete = (id) => {
    if (window.confirm('Delete this visitor contact request?')) {
      deleteContactRequest(id)
        .then(() => {
          setToast({ type: 'success', message: 'Contact request deleted.' });
          loadRequests();
        })
        .catch(() => {
          setToast({ type: 'error', message: 'Failed to delete request.' });
        });
    }
  };

  return (
    <div className="space-y-8">
      <Toast toast={toast} onClose={() => setToast(null)} />

      <div>
        <h1 className="text-2xl font-extrabold text-white">Visitor Contact Requests</h1>
        <p className="text-xs text-gray-400 font-mono">Customer inquiries submitted through website contact form</p>
      </div>

      {loading ? (
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-28 glass-card rounded-2xl animate-pulse" />
          ))}
        </div>
      ) : requests.length === 0 ? (
        <div className="glass-card p-12 text-center rounded-3xl border border-white/10 text-xs text-gray-400">
          No customer inquiries received yet.
        </div>
      ) : (
        <div className="space-y-4">
          {requests.map((req) => (
            <div
              key={req.id}
              className={`glass-card p-6 rounded-3xl border transition-all space-y-3 ${
                req.isRead ? 'border-white/10 opacity-75' : 'border-amber-500/30 bg-amber-500/5'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/10 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl glass-panel flex items-center justify-center text-amber-400 font-bold">
                    <User className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-white flex items-center gap-2">
                      {req.name}
                      {!req.isRead && (
                        <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-amber-500/20 text-amber-400 border border-amber-500/40">
                          NEW
                        </span>
                      )}
                    </h3>
                    <p className="text-[11px] text-gray-400 font-mono">
                      {new Date(req.createdAt).toLocaleString()}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-xs">
                  <a
                    href={`tel:${req.phone}`}
                    className="flex items-center gap-1.5 text-amber-400 hover:underline"
                  >
                    <Phone className="w-3.5 h-3.5" />
                    <span>{req.phone}</span>
                  </a>
                  <a
                    href={`mailto:${req.email}`}
                    className="flex items-center gap-1.5 text-blue-400 hover:underline"
                  >
                    <Mail className="w-3.5 h-3.5" />
                    <span>{req.email}</span>
                  </a>
                </div>
              </div>

              {/* Message Content */}
              <p className="text-xs text-gray-200 leading-relaxed bg-slate-900/60 p-4 rounded-2xl border border-white/5">
                "{req.message}"
              </p>

              {/* Actions */}
              <div className="flex items-center justify-between pt-1">
                <div>
                  {!req.isRead ? (
                    <button
                      onClick={() => handleMarkRead(req.id)}
                      className="text-xs font-semibold text-emerald-400 hover:text-emerald-300 flex items-center gap-1.5"
                    >
                      <CheckCircle className="w-4 h-4" /> Mark as Handled
                    </button>
                  ) : (
                    <span className="text-xs text-gray-500 font-mono">✓ Request Handled</span>
                  )}
                </div>

                <button
                  onClick={() => handleDelete(req.id)}
                  className="text-xs font-semibold text-red-400 hover:text-red-300 flex items-center gap-1"
                >
                  <Trash2 className="w-3.5 h-3.5" /> Delete Message
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
