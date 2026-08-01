import React, { useState, useEffect } from 'react';
import {
  Car as CarIcon,
  Plus,
  Edit2,
  Trash2,
  CheckCircle,
  XCircle,
  Upload,
  X,
  Search,
  Check,
  Image as ImageIcon,
} from 'lucide-react';
import {
  fetchAdminCars,
  createCar,
  updateCar,
  deleteCar,
  toggleCarAvailability,
  uploadCarImage,
} from '../../services/api';
import { Toast } from '../../components/Toast';

export const AdminCars = () => {
  const [cars, setCars] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [toast, setToast] = useState(null);

  // Modal State
  const [modalOpen, setModalOpen] = useState(false);
  const [editingCarId, setEditingCarId] = useState(null);
  const [uploadingImage, setUploadingImage] = useState(false);

  // Form State
  const [form, setForm] = useState({
    brand: '',
    model: '',
    year: 2024,
    pricePerDay: '',
    description: '',
    transmission: 'AUTOMATIC',
    fuel: 'PETROL',
    seats: 5,
    airConditioning: true,
    available: true,
    imageUrls: [''],
  });

  const loadCars = () => {
    setLoading(true);
    fetchAdminCars({ search, size: 50 })
      .then((res) => {
        setCars(res.data.content || []);
      })
      .catch((err) => {
        setToast({ type: 'error', message: 'Failed to load fleet cars.' });
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCars();
  }, [search]);

  const handleOpenAdd = () => {
    setEditingCarId(null);
    setForm({
      brand: '',
      model: '',
      year: 2024,
      pricePerDay: '',
      description: '',
      transmission: 'AUTOMATIC',
      fuel: 'PETROL',
      seats: 5,
      airConditioning: true,
      available: true,
      imageUrls: [''],
    });
    setModalOpen(true);
  };

  const handleOpenEdit = (car) => {
    setEditingCarId(car.id);
    setForm({
      brand: car.brand,
      model: car.model,
      year: car.year,
      pricePerDay: car.pricePerDay,
      description: car.description || '',
      transmission: car.transmission,
      fuel: car.fuel,
      seats: car.seats,
      airConditioning: car.airConditioning,
      available: car.available,
      imageUrls:
        car.images && car.images.length > 0
          ? car.images.map((i) => i.imageUrl)
          : car.imageUrls && car.imageUrls.length > 0
          ? car.imageUrls
          : [''],
    });
    setModalOpen(true);
  };

  const handleToggleAvailability = (carId, currentStatus) => {
    toggleCarAvailability(carId, !currentStatus)
      .then(() => {
        setToast({ type: 'success', message: 'Vehicle availability updated!' });
        loadCars();
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to update availability.' });
      });
  };

  const handleDelete = (carId) => {
    if (window.confirm('Are you sure you want to delete this vehicle from fleet?')) {
      deleteCar(carId)
        .then(() => {
          setToast({ type: 'success', message: 'Vehicle deleted successfully.' });
          loadCars();
        })
        .catch(() => {
          setToast({ type: 'error', message: 'Failed to delete vehicle.' });
        });
    }
  };

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setUploadingImage(true);
    uploadCarImage(file)
      .then((res) => {
        const uploadedUrl = res.data.url;
        const currentUrls = form.imageUrls.filter((u) => u.trim() !== '');
        setForm({ ...form, imageUrls: [...currentUrls, uploadedUrl] });
        setToast({ type: 'success', message: 'Image uploaded successfully!' });
      })
      .catch(() => {
        setToast({ type: 'error', message: 'Failed to upload image file.' });
      })
      .finally(() => setUploadingImage(false));
  };

  const handleAddImageUrlInput = () => {
    setForm({ ...form, imageUrls: [...form.imageUrls, ''] });
  };

  const handleImageUrlChange = (index, value) => {
    const updated = [...form.imageUrls];
    updated[index] = value;
    setForm({ ...form, imageUrls: updated });
  };

  const handleRemoveImageUrl = (index) => {
    const updated = form.imageUrls.filter((_, i) => i !== index);
    setForm({ ...form, imageUrls: updated.length ? updated : [''] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanUrls = form.imageUrls.filter((u) => u && u.trim() !== '');

    const payload = {
      ...form,
      imageUrls: cleanUrls,
    };

    if (editingCarId) {
      updateCar(editingCarId, payload)
        .then(() => {
          setToast({ type: 'success', message: 'Vehicle updated successfully!' });
          setModalOpen(false);
          loadCars();
        })
        .catch((err) => {
          setToast({ type: 'error', message: 'Failed to update vehicle details.' });
        });
    } else {
      createCar(payload)
        .then(() => {
          setToast({ type: 'success', message: 'New vehicle added to fleet!' });
          setModalOpen(false);
          loadCars();
        })
        .catch((err) => {
          setToast({ type: 'error', message: 'Failed to create vehicle.' });
        });
    }
  };

  return (
    <div className="space-y-8">
      <Toast toast={toast} onClose={() => setToast(null)} />

      {/* Control Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-extrabold text-white">Fleet Inventory Management</h1>
          <p className="text-xs text-gray-400 font-mono">Create, edit, toggle status & manage photos</p>
        </div>

        <button
          onClick={handleOpenAdd}
          className="gold-button px-5 py-3 rounded-2xl font-bold text-xs flex items-center justify-center gap-2"
        >
          <Plus className="w-4 h-4" />
          <span>Add New Vehicle</span>
        </button>
      </div>

      {/* Search Filter */}
      <div className="relative max-w-md">
        <input
          type="text"
          placeholder="Filter table by brand or model..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-slate-900 border border-white/10 rounded-2xl pl-10 pr-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
        />
        <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3" />
      </div>

      {/* Vehicles Table */}
      <div className="glass-card rounded-3xl border border-white/10 overflow-hidden">
        {loading ? (
          <div className="h-64 glass-panel animate-pulse" />
        ) : cars.length === 0 ? (
          <div className="p-12 text-center text-xs text-gray-400">No vehicles found in fleet.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-white/10 text-gray-400 font-mono uppercase bg-slate-900/60">
                  <th className="p-4">Vehicle</th>
                  <th className="p-4">Year</th>
                  <th className="p-4">Specs</th>
                  <th className="p-4">Daily Price</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {cars.map((car) => {
                  const imgUrl =
                    car.images && car.images.length > 0
                      ? car.images[0].imageUrl
                      : car.imageUrls && car.imageUrls.length > 0
                      ? car.imageUrls[0]
                      : 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=200&auto=format&fit=crop';

                  return (
                    <tr key={car.id} className="hover:bg-white/5 transition-colors">
                      {/* Vehicle Cell */}
                      <td className="p-4">
                        <div className="flex items-center gap-3">
                          <img
                            src={imgUrl}
                            alt={car.model}
                            className="w-12 h-9 object-cover rounded-lg border border-white/10 bg-slate-950"
                          />
                          <div>
                            <span className="font-mono text-[10px] text-amber-400 block font-bold uppercase">
                              {car.brand}
                            </span>
                            <span className="font-bold text-white text-sm">{car.model}</span>
                          </div>
                        </div>
                      </td>

                      {/* Year Cell */}
                      <td className="p-4 text-gray-300 font-mono">{car.year}</td>

                      {/* Specs Cell */}
                      <td className="p-4 text-gray-300 text-[11px]">
                        <span>{car.transmission}</span> • <span>{car.fuel}</span> •{' '}
                        <span>{car.seats} Seats</span>
                      </td>

                      {/* Daily Price */}
                      <td className="p-4 font-bold text-amber-400 font-mono text-sm">
                        ${car.pricePerDay}
                      </td>

                      {/* Availability Cell */}
                      <td className="p-4">
                        <button
                          onClick={() => handleToggleAvailability(car.id, car.available)}
                          className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                            car.available
                              ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 hover:bg-emerald-500/30'
                              : 'bg-red-500/20 text-red-400 border-red-500/40 hover:bg-red-500/30'
                          }`}
                        >
                          {car.available ? (
                            <>
                              <CheckCircle className="w-3.5 h-3.5" /> Available
                            </>
                          ) : (
                            <>
                              <XCircle className="w-3.5 h-3.5" /> Rented
                            </>
                          )}
                        </button>
                      </td>

                      {/* Actions Cell */}
                      <td className="p-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => handleOpenEdit(car)}
                            className="p-2 rounded-xl glass-panel text-amber-300 hover:bg-amber-500/10 border border-white/10"
                            title="Edit Vehicle"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDelete(car.id)}
                            className="p-2 rounded-xl glass-panel text-red-400 hover:bg-red-500/10 border border-white/10"
                            title="Delete Vehicle"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Add / Edit Vehicle Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto">
          <div className="glass-card p-8 rounded-3xl max-w-2xl w-full border border-amber-500/30 space-y-6 my-8">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-lg font-bold text-white">
                {editingCarId ? 'Edit Fleet Vehicle' : 'Add New Luxury Vehicle'}
              </h3>
              <button onClick={() => setModalOpen(false)} className="text-gray-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Brand</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rolls-Royce"
                    value={form.brand}
                    onChange={(e) => setForm({ ...form, brand: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Model</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Ghost Extended"
                    value={form.model}
                    onChange={(e) => setForm({ ...form, model: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Year</label>
                  <input
                    type="number"
                    required
                    min={1990}
                    max={2030}
                    value={form.year}
                    onChange={(e) => setForm({ ...form, year: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Daily Price ($)</label>
                  <input
                    type="number"
                    step="0.01"
                    required
                    placeholder="e.g. 1450.00"
                    value={form.pricePerDay}
                    onChange={(e) => setForm({ ...form, pricePerDay: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Seats Count</label>
                  <input
                    type="number"
                    required
                    min={1}
                    max={12}
                    value={form.seats}
                    onChange={(e) => setForm({ ...form, seats: parseInt(e.target.value) })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Transmission</label>
                  <select
                    value={form.transmission}
                    onChange={(e) => setForm({ ...form, transmission: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="AUTOMATIC">Automatic</option>
                    <option value="MANUAL">Manual</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-semibold text-gray-300">Fuel Type</label>
                  <select
                    value={form.fuel}
                    onChange={(e) => setForm({ ...form, fuel: e.target.value })}
                    className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
                  >
                    <option value="PETROL">Petrol</option>
                    <option value="DIESEL">Diesel</option>
                    <option value="HYBRID">Hybrid</option>
                    <option value="ELECTRIC">Electric</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Description</label>
                <textarea
                  rows={3}
                  placeholder="Describe luxury features, engine specs..."
                  value={form.description}
                  onChange={(e) => setForm({ ...form, description: e.target.value })}
                  className="w-full bg-slate-900 border border-white/10 rounded-xl px-4 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400 resize-none"
                />
              </div>

              {/* Checkboxes */}
              <div className="flex items-center gap-6 pt-2">
                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.airConditioning}
                    onChange={(e) => setForm({ ...form, airConditioning: e.target.checked })}
                    className="accent-amber-400"
                  />
                  <span>Air Conditioning</span>
                </label>

                <label className="flex items-center gap-2 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={form.available}
                    onChange={(e) => setForm({ ...form, available: e.target.checked })}
                    className="accent-amber-400"
                  />
                  <span>Available For Showcase</span>
                </label>
              </div>

              {/* Image Manager Section (Upload or URLs) */}
              <div className="space-y-3 pt-3 border-t border-white/10">
                <div className="flex items-center justify-between">
                  <label className="text-xs font-bold text-white uppercase tracking-wider font-mono">
                    Image Gallery Management
                  </label>

                  {/* File Upload Trigger */}
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40 hover:bg-amber-500/30 transition-all">
                    <Upload className="w-3.5 h-3.5" />
                    <span>{uploadingImage ? 'Uploading...' : 'Upload Image File'}</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileUpload}
                      className="hidden"
                      disabled={uploadingImage}
                    />
                  </label>
                </div>

                {/* Image URL Inputs */}
                <div className="space-y-2 max-h-44 overflow-y-auto pr-1">
                  {form.imageUrls.map((url, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <input
                        type="text"
                        placeholder="Ex: https://images.unsplash.com/... ou URL d'image"
                        value={url}
                        onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                        className="flex-grow bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
                      />
                      {url && url.trim() !== '' && (
                        <img
                          src={url}
                          alt="preview"
                          className="w-8 h-8 rounded-lg object-cover border border-white/10 shrink-0 bg-slate-950"
                          onError={(e) => {
                            e.target.style.display = 'none';
                          }}
                        />
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveImageUrl(idx)}
                        className="text-red-400 p-1.5 hover:text-white"
                        title="Supprimer l'URL"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={handleAddImageUrlInput}
                  className="text-xs text-amber-400 hover:text-amber-300 font-mono flex items-center gap-1"
                >
                  + Ajouter une autre URL d'image
                </button>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full gold-button py-3.5 rounded-xl font-bold text-xs flex items-center justify-center gap-2"
              >
                <Check className="w-4 h-4" />
                <span>{editingCarId ? 'Save Vehicle Changes' : 'Add Vehicle to Fleet'}</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
