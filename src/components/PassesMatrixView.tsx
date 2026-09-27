import React, { useState } from 'react';
import { GarbaVenue, AHMEDABAD_AREAS } from '../data/ahmedabadGarbaData';
import { Ticket, QrCode, ShieldCheck, MapPin, CheckCircle, ExternalLink, HelpCircle, Sparkles, Navigation, CheckCircle2 } from 'lucide-react';

interface PassesMatrixViewProps {
  venues: GarbaVenue[];
  onBookPass: (venue: GarbaVenue) => void;
}

export const PassesMatrixView: React.FC<PassesMatrixViewProps> = ({ venues, onBookPass }) => {
  const [selectedArea, setSelectedArea] = useState('All Ahmedabad');
  const [entryFilter, setEntryFilter] = useState<'all' | 'free' | 'pass'>('all');

  const filtered = venues.filter(v => {
    const matchesArea = selectedArea === 'All Ahmedabad' || v.area.toLowerCase().includes(selectedArea.toLowerCase());
    let matchesEntry = true;
    if (entryFilter === 'free') {
      matchesEntry = v.entryType === 'free' || v.perNightPrice === 0;
    } else if (entryFilter === 'pass') {
      matchesEntry = v.entryType === 'pass' && v.perNightPrice > 0;
    }
    return matchesArea && matchesEntry;
  });

  const freeCount = venues.filter(v => v.entryType === 'free' || v.perNightPrice === 0).length;
  const passCount = venues.filter(v => v.entryType === 'pass' && v.perNightPrice > 0).length;

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 text-slate-800 dark:text-slate-100">
      {/* Banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-orange-100/80 via-amber-50 to-orange-50 dark:from-[#181B26] dark:via-[#11141E] dark:to-[#1F1610] border border-amber-300/80 dark:border-amber-500/25 p-6 md:p-10 shadow-lg dark:shadow-2xl">
        <div className="relative z-10 max-w-3xl flex flex-col gap-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-orange-600/15 dark:bg-orange-600/20 text-orange-700 dark:text-orange-400 text-xs font-bold w-fit border border-orange-400/40">
            <Ticket className="w-3.5 h-3.5" />
            <span>Ahmedabad Garba Entry &amp; Ticketing Matrix</span>
          </div>
          <h1 className="text-2xl md:text-4xl font-headline font-bold text-slate-900 dark:text-white">
            Ahmedabad Navratri 2025: Free &amp; Pass Ground Comparison
          </h1>
          <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
            Compare official single-night &amp; 9-night season passes across Ahmedabad’s premier club plots, or discover centuries-old UNESCO heritage and sacred temple pols with 100% Free Entry. Zero scalpers, genuine partner ticketing via BookMyShow &amp; District.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-2">
            <div className="p-3 rounded-xl bg-white/90 dark:bg-[#11141E] border border-amber-200/80 dark:border-slate-700/60 flex items-center gap-3 shadow-xs">
              <ShieldCheck className="w-6 h-6 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">₹0 Markup Guarantee</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">Direct Partner Rates</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/90 dark:bg-[#11141E] border border-amber-200/80 dark:border-slate-700/60 flex items-center gap-3 shadow-xs">
              <QrCode className="w-6 h-6 text-orange-600 dark:text-orange-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Fast-Track Turnstiles</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">RFID Smart Scan</div>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-white/90 dark:bg-[#11141E] border border-amber-200/80 dark:border-slate-700/60 flex items-center gap-3 col-span-2 sm:col-span-1 shadow-xs">
              <Sparkles className="w-6 h-6 text-amber-600 dark:text-amber-400 shrink-0" />
              <div>
                <div className="text-xs font-bold text-slate-900 dark:text-white">Free Community Garba</div>
                <div className="text-[11px] text-slate-600 dark:text-slate-400">{freeCount} Heritage Arenas</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* FILTER SECTION: ENTRY TYPE & AREA */}
      <div className="flex flex-col gap-4 p-4 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-sm">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-3">
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-orange-600 dark:text-orange-400 block">
              Filter by Entry Type (Free vs Passes)
            </span>
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Showing {filtered.length} of {venues.length} Ahmedabad grounds
            </span>
          </div>

          {/* Free vs Pass Entry Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setEntryFilter('all')}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all border ${
                entryFilter === 'all'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-sm'
                  : 'bg-slate-50 dark:bg-[#181B26] text-slate-700 dark:text-slate-300 border-slate-200 dark:border-slate-700 hover:border-orange-400'
              }`}
            >
              All Arenas ({venues.length})
            </button>

            <button
              type="button"
              onClick={() => setEntryFilter('free')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                entryFilter === 'free'
                  ? 'bg-emerald-600 text-white border-emerald-500 shadow-sm'
                  : 'bg-emerald-50 dark:bg-[#181B26] text-emerald-800 dark:text-emerald-300 border-emerald-200 dark:border-slate-700 hover:border-emerald-400'
              }`}
            >
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 dark:text-emerald-400" />
              <span>Free Entry Only (₹0) ({freeCount})</span>
            </button>

            <button
              type="button"
              onClick={() => setEntryFilter('pass')}
              className={`px-4 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all border ${
                entryFilter === 'pass'
                  ? 'bg-orange-600 text-white border-orange-500 shadow-sm'
                  : 'bg-orange-50 dark:bg-[#181B26] text-orange-800 dark:text-orange-300 border-orange-200 dark:border-slate-700 hover:border-orange-400'
              }`}
            >
              <Ticket className="w-3.5 h-3.5 text-orange-500" />
              <span>Pass Required ({passCount})</span>
            </button>
          </div>
        </div>

        {/* Corridor / Area Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pt-2 border-t border-slate-100 dark:border-slate-800/80 no-scrollbar">
          {AHMEDABAD_AREAS.map(area => (
            <button
              key={area}
              onClick={() => setSelectedArea(area)}
              className={`px-3 py-1 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                selectedArea === area
                  ? 'bg-amber-600 text-white border-amber-500 shadow-xs'
                  : 'bg-slate-50 dark:bg-[#11141E] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700 hover:border-amber-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              {area}
            </button>
          ))}
        </div>
      </div>

      {/* Grid of Pass / Free Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map(venue => {
          const isFree = venue.entryType === 'free' || venue.perNightPrice === 0;

          return (
            <div
              key={venue.id}
              className="rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/15 hover:border-orange-400 dark:hover:border-amber-500/40 p-6 flex flex-col justify-between gap-5 transition-all shadow-md hover:shadow-xl group"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-600/20 text-orange-800 dark:text-orange-400 border border-orange-300 dark:border-orange-500/30 text-[10px] font-bold uppercase tracking-wider">
                    {venue.area}
                  </span>
                  
                  {isFree ? (
                    <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/40 text-[10px] font-extrabold uppercase tracking-wide">
                      Free Entry • ₹0
                    </span>
                  ) : (
                    <span className="text-xs font-bold text-amber-600 dark:text-amber-300">★ {venue.rating.toFixed(1)}</span>
                  )}
                </div>

                <div>
                  <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white group-hover:text-orange-600 dark:group-hover:text-orange-400 transition-colors">
                    {venue.name}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400 flex items-center gap-1 mt-1">
                    <MapPin className="w-3.5 h-3.5 text-orange-500 shrink-0" />
                    <span className="line-clamp-1">{venue.address}</span>
                  </p>
                </div>

                {/* Entry Price Box */}
                {isFree ? (
                  <div className="p-3.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-700/40 space-y-1">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-800 dark:text-emerald-300 font-semibold">Entry Ticket:</span>
                      <span className="font-extrabold text-emerald-700 dark:text-emerald-300 text-sm">100% Free Public</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-1 border-t border-emerald-200 dark:border-emerald-800/40">
                      <span className="text-slate-600 dark:text-slate-400">Pass Requirement:</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200 text-xs">No Pass Required</span>
                    </div>
                  </div>
                ) : (
                  <div className="p-3.5 rounded-xl bg-amber-50/60 dark:bg-[#11141E] border border-amber-200/80 dark:border-slate-800 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-slate-600 dark:text-slate-400">Single Night Entry:</span>
                      <span className="font-bold text-slate-900 dark:text-white text-sm">₹{venue.perNightPrice}</span>
                    </div>
                    <div className="flex justify-between items-center text-xs pt-1 border-t border-amber-200/60 dark:border-slate-800">
                      <span className="text-slate-600 dark:text-slate-400">9-Night Season Pass:</span>
                      <span className="font-bold text-amber-700 dark:text-amber-300 text-sm">₹{venue.seasonPrice}</span>
                    </div>
                  </div>
                )}

                <div className="text-xs text-slate-700 dark:text-slate-300 space-y-1">
                  <div className="text-[11px] text-slate-500 dark:text-slate-400 font-semibold">Performer &amp; Music:</div>
                  <div className="font-medium text-slate-800 dark:text-slate-200">{venue.artists}</div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                {isFree ? (
                  <div className="space-y-2">
                    <button
                      type="button"
                      onClick={() => onBookPass(venue)}
                      className="w-full py-2.5 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-1.5 shadow-sm transition-all"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Free Walk-In &amp; Parking Guide</span>
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="grid grid-cols-2 gap-2">
                      <a
                        href={venue.bmsLink || `https://in.bookmyshow.com/explore/events-ahmedabad?query=${encodeURIComponent(venue.name.split(' - ')[0])}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-all"
                      >
                        <span>Book on BMS</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                      <a
                        href={venue.districtLink || "https://www.district.in/events"}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="py-2 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold flex items-center justify-center gap-1 shadow-xs transition-all"
                      >
                        <span>District Pass</span>
                        <ExternalLink className="w-3 h-3" />
                      </a>
                    </div>
                    <button
                      type="button"
                      onClick={() => onBookPass(venue)}
                      className="w-full py-2 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1E2232] dark:hover:bg-[#282F45] text-slate-800 dark:text-slate-200 text-xs font-semibold transition-colors border border-slate-200 dark:border-slate-700"
                    >
                      Pass Details &amp; Parking Map
                    </button>
                  </>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Ticketing FAQs */}
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md dark:shadow-xl flex flex-col gap-4">
        <h3 className="text-lg font-bold font-headline text-slate-900 dark:text-white flex items-center gap-2">
          <HelpCircle className="w-5 h-5 text-orange-600 dark:text-orange-400" />
          <span>Frequently Asked Questions for Ahmedabad Festival-Goers</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
          <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-[#11141E] border border-orange-200/60 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white">Are Free Entry Garbas in Ahmedabad safe for families?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Yes, iconic community venues like Manek Chowk Pol, Bhadrakali Mandir Chowk, and Gujarat University have active volunteer security marshals, women-first inner circles, and police assistance booths with dedicated CCTV monitoring.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-orange-50/50 dark:bg-[#11141E] border border-orange-200/60 dark:border-slate-800 space-y-1">
            <h4 className="font-bold text-slate-900 dark:text-white">How do I collect physical RFID wristbands in Ahmedabad?</h4>
            <p className="text-slate-600 dark:text-slate-400 leading-relaxed">
              Box offices open 4 days prior to Day 1 across designated kiosks at Ahmedabad One Mall (Vastrapur), Palladium Mall (SG Highway), and venue gates from 4:00 PM to 11:30 PM.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
