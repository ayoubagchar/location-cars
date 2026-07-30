import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Filter,
  X,
  SlidersHorizontal,
  RotateCcw,
  ChevronLeft,
  ChevronRight,
  Car as CarIcon,
} from 'lucide-react';
import { fetchPublicCars, fetchDistinctBrands } from '../services/api';
import { CarCard } from '../components/CarCard';

export const Cars = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  // Filter States
  const [search, setSearch] = useState(searchParams.get('search') || '');
  const [brand, setBrand] = useState(searchParams.get('brand') || '');
  const [fuel, setFuel] = useState(searchParams.get('fuel') || '');
  const [transmission, setTransmission] = useState(searchParams.get('transmission') || '');
  const [seats, setSeats] = useState(searchParams.get('seats') || '');
  const [maxPrice, setMaxPrice] = useState(searchParams.get('maxPrice') || '');

  // Pagination & Sorting States
  const [sortBy, setSortBy] = useState('pricePerDay');
  const [sortDir, setSortDir] = useState('asc');
  const [page, setPage] = useState(0);
  const [pageSize] = useState(9);

  // Data States
  const [carsPage, setCarsPage] = useState({ content: [], totalPages: 0, totalElements: 0 });
  const [availableBrands, setAvailableBrands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState(false);

  useEffect(() => {
    fetchDistinctBrands()
      .then((res) => setAvailableBrands(res.data || []))
      .catch(() => {});
  }, []);

  const loadCars = () => {
    setLoading(true);
    const params = {
      page,
      size: pageSize,
      sortBy,
      sortDir,
    };
    if (search) params.search = search;
    if (brand) params.brand = brand;
    if (fuel) params.fuel = fuel;
    if (transmission) params.transmission = transmission;
    if (seats) params.seats = seats;
    if (maxPrice) params.maxPrice = maxPrice;

    fetchPublicCars(params)
      .then((res) => {
        setCarsPage(res.data);
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadCars();
  }, [page, sortBy, sortDir, search, brand, fuel, transmission, seats, maxPrice]);

  const handleResetFilters = () => {
    setSearch('');
    setBrand('');
    setFuel('');
    setTransmission('');
    setSeats('');
    setMaxPrice('');
    setPage(0);
    setSearchParams({});
  };

  return (
    <div className="pt-28 pb-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
      {/* Header Banner */}
      <div className="text-center space-y-3 max-w-3xl mx-auto">
        <span className="text-amber-400 font-mono text-xs font-bold uppercase tracking-widest">
          Comprehensive Fleet Catalog
        </span>
        <h1 className="text-4xl sm:text-5xl font-extrabold text-white">Explore Luxury Vehicles</h1>
        <p className="text-gray-400 text-sm">
          Filter our curated collection by performance specs, brand, fuel type, or daily price.
        </p>
      </div>

      {/* Control Bar: Search Input, Sorting, Mobile Filter Toggle */}
      <div className="glass-panel p-4 rounded-3xl border border-white/10 flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Search Bar */}
        <div className="relative w-full md:w-96">
          <input
            type="text"
            placeholder="Search by brand or model name..."
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setPage(0);
            }}
            className="w-full bg-slate-900/90 border border-white/10 rounded-2xl pl-11 pr-4 py-2.5 text-sm text-white focus:outline-none focus:border-amber-400"
          />
          <Search className="w-4 h-4 text-gray-400 absolute left-4 top-3.5" />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-3 text-gray-400 hover:text-white"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        {/* Right Action Tools */}
        <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-end">
          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="lg:hidden flex items-center gap-2 px-4 py-2.5 rounded-2xl glass-panel text-xs font-semibold text-amber-300 border border-amber-500/30"
          >
            <SlidersHorizontal className="w-4 h-4" />
            <span>Filters</span>
          </button>

          {/* Sorting Dropdown */}
          <div className="flex items-center gap-2 text-xs text-gray-400">
            <span className="hidden sm:inline font-mono">Sort:</span>
            <select
              value={`${sortBy}-${sortDir}`}
              onChange={(e) => {
                const [sb, sd] = e.target.value.split('-');
                setSortBy(sb);
                setSortDir(sd);
                setPage(0);
              }}
              className="bg-slate-900 border border-white/10 rounded-2xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-amber-400"
            >
              <option value="pricePerDay-asc">Price: Low to High</option>
              <option value="pricePerDay-desc">Price: High to Low</option>
              <option value="year-desc">Year: Newest</option>
              <option value="brand-asc">Brand: A-Z</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content Layout (Sidebar Filters + Grid) */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Sidebar Filters (Desktop & Mobile Drawer) */}
        <aside
          className={`lg:block ${
            filterDrawerOpen ? 'block fixed inset-0 z-50 p-6 bg-slate-950/95 overflow-y-auto' : 'hidden'
          }`}
        >
          <div className="glass-panel p-6 rounded-3xl border border-white/10 space-y-6 sticky top-28">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <h3 className="text-sm font-bold uppercase tracking-wider text-white font-mono flex items-center gap-2">
                <Filter className="w-4 h-4 text-amber-400" /> Filter Fleet
              </h3>
              {filterDrawerOpen && (
                <button
                  onClick={() => setFilterDrawerOpen(false)}
                  className="text-gray-400 hover:text-white p-1"
                >
                  <X className="w-5 h-5" />
                </button>
              )}
            </div>

            {/* Brand Filter */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300">Brand</label>
              <select
                value={brand}
                onChange={(e) => {
                  setBrand(e.target.value);
                  setPage(0);
                }}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="">All Brands</option>
                {availableBrands.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            {/* Max Price Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="font-semibold text-gray-300">Max Daily Rate</span>
                <span className="font-mono text-amber-400">{maxPrice ? `$${maxPrice}` : 'Any'}</span>
              </div>
              <input
                type="range"
                min="200"
                max="3000"
                step="50"
                value={maxPrice || 3000}
                onChange={(e) => {
                  setMaxPrice(e.target.value);
                  setPage(0);
                }}
                className="w-full accent-amber-400 cursor-pointer"
              />
            </div>

            {/* Fuel Type */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300">Fuel Engine</label>
              <select
                value={fuel}
                onChange={(e) => {
                  setFuel(e.target.value);
                  setPage(0);
                }}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="">All Fuel Types</option>
                <option value="PETROL">Petrol</option>
                <option value="DIESEL">Diesel</option>
                <option value="HYBRID">Hybrid</option>
                <option value="ELECTRIC">Electric</option>
              </select>
            </div>

            {/* Transmission */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300">Transmission</label>
              <select
                value={transmission}
                onChange={(e) => {
                  setTransmission(e.target.value);
                  setPage(0);
                }}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="">All Transmissions</option>
                <option value="AUTOMATIC">Automatic</option>
                <option value="MANUAL">Manual</option>
              </select>
            </div>

            {/* Min Seats */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-gray-300">Minimum Seats</label>
              <select
                value={seats}
                onChange={(e) => {
                  setSeats(e.target.value);
                  setPage(0);
                }}
                className="w-full bg-slate-900 border border-white/10 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-400"
              >
                <option value="">Any Seats</option>
                <option value="2">2+ Seats</option>
                <option value="4">4+ Seats</option>
                <option value="5">5+ Seats</option>
              </select>
            </div>

            {/* Reset Filters Button */}
            <button
              onClick={handleResetFilters}
              className="w-full py-2.5 rounded-xl text-xs font-semibold text-gray-300 glass-panel hover:bg-white/10 transition-all flex items-center justify-center gap-2 border border-white/10"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Reset Filters</span>
            </button>
          </div>
        </aside>

        {/* Cars Grid & Pagination */}
        <main className="lg:col-span-3 space-y-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="h-96 glass-card rounded-3xl animate-pulse" />
              ))}
            </div>
          ) : carsPage.content.length === 0 ? (
            <div className="glass-card p-12 rounded-3xl text-center space-y-4 border border-white/10">
              <div className="w-16 h-16 rounded-full glass-panel mx-auto flex items-center justify-center text-amber-400">
                <CarIcon className="w-8 h-8" />
              </div>
              <h3 className="text-xl font-bold text-white">No Vehicles Match Your Search</h3>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Try loosening your filter parameters or resetting search parameters to see all available vehicles.
              </p>
              <button
                onClick={handleResetFilters}
                className="gold-button px-6 py-2.5 rounded-xl font-bold text-xs"
              >
                Reset All Filters
              </button>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {carsPage.content.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>

              {/* Pagination Controls */}
              {carsPage.totalPages > 1 && (
                <div className="flex items-center justify-center gap-3 pt-6">
                  <button
                    disabled={page === 0}
                    onClick={() => setPage(page - 1)}
                    className="p-2.5 rounded-xl glass-panel text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>

                  <span className="text-xs font-mono text-gray-400">
                    Page <span className="text-amber-400 font-bold">{page + 1}</span> of{' '}
                    {carsPage.totalPages}
                  </span>

                  <button
                    disabled={page >= carsPage.totalPages - 1}
                    onClick={() => setPage(page + 1)}
                    className="p-2.5 rounded-xl glass-panel text-gray-300 hover:text-white disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    </div>
  );
};
