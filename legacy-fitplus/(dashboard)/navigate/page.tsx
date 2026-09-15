'use client';

import React, { useState } from 'react';
import { Compass, MapPin, Search, Bus, Train, AlertTriangle, ArrowRight } from 'lucide-react';
import { SEED_TRANSIT_ROUTE } from '@/lib/data/nexus-seed';

export default function NavigatePage() {
  const [search, setSearch] = useState('');

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-600 dark:text-cyan-400 mb-1">
          <Compass className="w-4 h-4" />
          <span>Navigate Hub</span>
          <span className="text-gray-400 font-normal">• Phase 7 Architecture Ready</span>
        </div>
        <h1 className="text-2xl md:text-3xl font-heading font-extrabold text-gray-900 dark:text-white">
          Campus & Student Transit
        </h1>
        <p className="text-xs md:text-sm text-gray-500">
          Intelligent commute optimization accounting for campus shuttles, city metro, and class schedules.
        </p>
      </div>

      {/* Mandatory Honesty / Demo Mode Notice */}
      <div className="p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 text-xs text-amber-800 dark:text-amber-300">
        <AlertTriangle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold">Development Mode Active:</span> Live Google Maps Platform / Transit API is currently unconfigured.
          Displaying calibrated demo campus transit routes for development and UI verification.
        </div>
      </div>

      {/* Search Input */}
      <div className="p-4 rounded-card bg-white dark:bg-nexus-dark-card border border-nexus-light-border dark:border-nexus-dark-border shadow-card dark:shadow-card-dark">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            placeholder="Search campus destinations, labs, hostels, or metro stations..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 rounded-btn border border-nexus-light-border dark:border-nexus-dark-border bg-transparent text-sm focus:outline-none focus:border-cyan-500"
          />
        </div>
      </div>

      {/* Recommended Demo Route Card */}
      <div className="p-6 rounded-card bg-white dark:bg-nexus-dark-card border border-cyan-200/80 dark:border-cyan-800/40 shadow-card dark:shadow-card-dark">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <span className="px-2 py-0.5 rounded text-[10px] font-bold uppercase bg-cyan-100 dark:bg-cyan-900/40 text-cyan-700 dark:text-cyan-300">
              Optimal Campus Commute
            </span>
            <span className="text-xs text-gray-400">Fastest Public Transit</span>
          </div>
          <span className="text-xs font-bold text-cyan-600 dark:text-cyan-400 font-mono">
            {SEED_TRANSIT_ROUTE.durationMinutes} mins
          </span>
        </div>

        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-emerald-500" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Origin: {SEED_TRANSIT_ROUTE.originName}
            </span>
          </div>

          <div className="pl-6 border-l-2 border-dashed border-gray-300 dark:border-gray-700 py-2 space-y-2 text-xs text-gray-600 dark:text-gray-400">
            <div className="flex items-center gap-2">
              <Bus className="w-3.5 h-3.5 text-blue-500" />
              <span>Campus Shuttle S1 (Board at {SEED_TRANSIT_ROUTE.boardingPoint})</span>
            </div>
            <div className="flex items-center gap-2">
              <Train className="w-3.5 h-3.5 text-purple-500" />
              <span>Purple Line Metro (Alight at {SEED_TRANSIT_ROUTE.dropOffPoint})</span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <MapPin className="w-4 h-4 text-red-500" />
            <span className="text-sm font-semibold text-gray-900 dark:text-gray-100">
              Destination: {SEED_TRANSIT_ROUTE.destinationName}
            </span>
          </div>
        </div>

        <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-800 flex items-center justify-between text-xs text-gray-500">
          <span>Estimated Fare: ₹{SEED_TRANSIT_ROUTE.estimatedFare}</span>
          <span className="text-cyan-600 dark:text-cyan-400 font-semibold">{SEED_TRANSIT_ROUTE.departureTimeText}</span>
        </div>
      </div>
    </div>
  );
}

