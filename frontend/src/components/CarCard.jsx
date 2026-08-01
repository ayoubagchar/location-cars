import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Fuel, Gauge, Users, Wind, ArrowUpRight, CheckCircle, XCircle } from 'lucide-react';

import { getFullImageUrl } from '../utils/imageUtils';

export const CarCard = ({ car }) => {
  const rawImage =
    car.images && car.images.length > 0
      ? car.images.find((img) => img.isPrimary)?.imageUrl || car.images[0].imageUrl
      : car.imageUrls && car.imageUrls.length > 0
      ? car.imageUrls[0]
      : '';

  const primaryImage = getFullImageUrl(rawImage);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="glass-card glass-card-hover rounded-3xl overflow-hidden group flex flex-col h-full border border-white/10"
    >
      {/* Image Container */}
      <div className="relative aspect-[16/10] overflow-hidden bg-slate-900">
        <img
          src={primaryImage}
          alt={`${car.brand} ${car.model}`}
          loading="lazy"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src =
              'https://images.unsplash.com/photo-1503376780353-7e6692767b70?q=80&w=800&auto=format&fit=crop';
          }}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent" />

        {/* Status Badge */}
        <div className="absolute top-4 left-4 z-10">
          {car.available ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 backdrop-blur-md">
              <CheckCircle className="w-3.5 h-3.5" /> Available
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-red-500/20 text-red-400 border border-red-500/40 backdrop-blur-md">
              <XCircle className="w-3.5 h-3.5" /> Rented
            </span>
          )}
        </div>

        {/* Year Badge */}
        <div className="absolute top-4 right-4 z-10">
          <span className="px-3 py-1 rounded-full text-xs font-mono font-medium text-gray-300 glass-panel border border-white/10">
            {car.year}
          </span>
        </div>

        {/* Price tag */}
        <div className="absolute bottom-4 right-4 z-10">
          <div className="glass-panel px-4 py-1.5 rounded-2xl border border-amber-500/30 text-right">
            <span className="text-xl font-extrabold gold-gradient-text">
              ${car.pricePerDay}
            </span>
            <span className="text-[10px] text-gray-400 uppercase tracking-widest block font-mono">
              / day
            </span>
          </div>
        </div>
      </div>

      {/* Content Body */}
      <div className="p-6 flex flex-col flex-grow justify-between space-y-4">
        <div>
          <div className="flex items-center justify-between text-xs text-amber-400/90 font-mono font-semibold uppercase tracking-wider mb-1">
            <span>{car.brand}</span>
          </div>
          <h3 className="text-xl font-bold text-white group-hover:text-amber-300 transition-colors line-clamp-1">
            {car.model}
          </h3>
        </div>

        {/* Specifications Chips */}
        <div className="grid grid-cols-3 gap-2 py-3 border-y border-white/5 text-xs text-gray-300">
          <div className="flex items-center gap-1.5 glass-panel p-2 rounded-xl border border-white/5">
            <Gauge className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 glass-panel p-2 rounded-xl border border-white/5">
            <Fuel className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span className="truncate">{car.fuel}</span>
          </div>
          <div className="flex items-center gap-1.5 glass-panel p-2 rounded-xl border border-white/5">
            <Users className="w-3.5 h-3.5 text-amber-400 shrink-0" />
            <span>{car.seats} Seats</span>
          </div>
        </div>

        {/* View Details Button */}
        <Link
          to={`/cars/${car.id}`}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-bold text-sm gold-button group/btn"
        >
          <span>View Details</span>
          <ArrowUpRight className="w-4 h-4 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </motion.div>
  );
};
