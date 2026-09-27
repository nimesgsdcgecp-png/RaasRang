import React, { useState } from 'react';
import { GarbaVenue } from '../data/ahmedabadVenues';

interface PassesMatrixProps {
  venues: GarbaVenue[];
  onOpenBooking: (venue: GarbaVenue, passType?: string) => void;
}

export const PassesMatrix: React.FC<PassesMatrixProps> = ({ venues, onOpenBooking }) => {
  const [selectedArea, setSelectedArea] = useState<string>('all');

  const filteredVenues = venues.filter((v) => {
    if (selectedArea === 'all') return true;
    return v.area.toLowerCase().includes(selectedArea.toLowerCase());
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <span className="text-xs uppercase font-extrabold tracking-widest text-orange-400">
            Pass Pricing &amp; Comparison Engine
          </span>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-white">
            Official Ticketing &amp; Passes Comparison
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Compare verified nightly tickets and 9-night season passes across Ahmedabad premier arenas.
          </p>
        </div>

        {/* Locality Quick Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 bg-[#11141E] p-1.5 rounded-xl border border-amber-500/20">
          <button
            onClick={() => setSelectedArea('all')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedArea === 'all'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Ahmedabad
          </button>
          <button
            onClick={() => setSelectedArea('Vastrapur')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedArea === 'Vastrapur'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Vastrapur
          </button>
          <button
            onClick={() => setSelectedArea('SG Highway')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedArea === 'SG Highway'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            SG Highway
          </button>
          <button
            onClick={() => setSelectedArea('Bopal')}
            className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
              selectedArea === 'Bopal'
                ? 'bg-orange-600 text-white shadow-sm'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            Bopal / SP Ring
          </button>
        </div>
      </div>

      {/* Grid of Pass Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {filteredVenues.map((venue) => (
          <div
            key={venue.id}
            className="flex flex-col justify-between bg-[#151824] rounded-2xl p-5 border border-amber-500/20 hover:border-amber-500/40 shadow-xl transition-all"
          >
            <div className="flex flex-col gap-3">
              <div className="flex items-start justify-between">
                <span className="px-2.5 py-0.5 rounded-full bg-orange-950 text-orange-300 border border-orange-500/30 text-[10px] font-bold uppercase tracking-wider">
                  {venue.area.split('/')[0]}
                </span>
                <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-300 border border-red-500/30 text-[10px] font-bold">
                  {venue.sellingStatus}
                </span>
              </div>

              <div>
                <h3 className="font-headline text-lg font-bold text-white">{venue.name}</h3>
                <p className="text-xs text-slate-400 flex items-center gap-1 mt-0.5">
                  <span className="material-symbols-outlined text-sm text-orange-400">location_on</span>
                  {venue.address}
                </p>
              </div>

              {/* Price comparison box */}
              <div className="p-3 rounded-xl bg-[#11141E] border border-slate-700/60 flex flex-col gap-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Single Night Entry:</span>
                  <span className="font-bold text-amber-300 text-sm">₹{venue.singlePassPrice}</span>
                </div>
                <div className="flex items-center justify-between text-xs">
                  <span className="text-slate-400">Full 9-Night Season Pass:</span>
                  <span className="font-bold text-orange-400 text-base">₹{venue.seasonPassPrice}</span>
                </div>
              </div>

              {/* Inclusions */}
              <ul className="space-y-1.5 text-xs text-slate-300">
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                  <span>Home RFID wristband courier</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                  <span>Complimentary 2-Wheeler parking bay</span>
                </li>
                <li className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-sm text-emerald-400">check_circle</span>
                  <span>{venue.featuredArtists.split('&')[0]} Live Performance</span>
                </li>
              </ul>
            </div>

            {/* Direct Booking Partner CTA */}
            <div className="pt-4 flex flex-col gap-2">
              <button
                onClick={() => onOpenBooking(venue, 'Single Night Pass')}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5 border border-red-500/30"
              >
                <span className="material-symbols-outlined text-sm">confirmation_number</span>
                Book on BookMyShow (₹{venue.singlePassPrice})
              </button>

              <button
                onClick={() => onOpenBooking(venue, 'Full 9-Night Season Pass')}
                className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold transition-all shadow flex items-center justify-center gap-1.5 border border-orange-400/30"
              >
                <span className="material-symbols-outlined text-sm">qr_code_2</span>
                Book on District Live (₹{venue.seasonPassPrice})
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
