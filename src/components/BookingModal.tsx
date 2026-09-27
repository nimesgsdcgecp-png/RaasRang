import React, { useState } from 'react';
import { GarbaVenue } from '../data/ahmedabadGarbaData';
import { X, ExternalLink, ShieldCheck, Ticket, QrCode, MapPin, Calendar, Clock, Sparkles, Navigation, CheckCircle2, Car, Heart } from 'lucide-react';

interface BookingModalProps {
  venue: GarbaVenue | null;
  isOpen: boolean;
  onClose: () => void;
}

export const BookingModal: React.FC<BookingModalProps> = ({ venue, isOpen, onClose }) => {
  if (!isOpen || !venue) return null;

  const isFree = venue.entryType === 'free' || venue.perNightPrice === 0;

  const [passType, setPassType] = useState<'single' | 'season'>('season');
  const [ticketCount, setTicketCount] = useState<number>(2);

  const pricePerUnit = passType === 'single' ? venue.perNightPrice : venue.seasonPrice;
  const totalPrice = pricePerUnit * ticketCount;

  // Real BookMyShow & District URLs
  const bmsSearchUrl = venue.bmsLink || `https://in.bookmyshow.com/explore/events-ahmedabad?query=${encodeURIComponent(venue.name.split(' - ')[0])}`;
  const districtSearchUrl = venue.districtLink || `https://www.district.in/events`;
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${venue.name} ${venue.address}`)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/75 backdrop-blur-md animate-fade-in">
      <div 
        className="relative w-full max-w-xl rounded-2xl bg-white dark:bg-[#11141E] border border-amber-300/80 dark:border-amber-500/30 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-slate-800 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Top Header Banner */}
        <div className={`relative p-6 ${isFree ? 'bg-gradient-to-r from-emerald-700 via-teal-700 to-emerald-600' : 'bg-gradient-to-r from-red-700 via-orange-600 to-amber-600'} text-white`}>
          <button 
            type="button"
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-black/25 hover:bg-black/40 text-white transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-black/30 text-amber-200 text-xs font-bold mb-2">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>{isFree ? '100% Free Public Entry • No Tickets Required' : 'Official Ticketing & Partner Integration'}</span>
          </div>

          <h2 className="text-xl md:text-2xl font-bold font-headline leading-tight">
            {venue.name}
          </h2>
          <p className="text-xs text-white/90 flex items-center gap-1 mt-1">
            <MapPin className="w-3.5 h-3.5 text-amber-200" />
            <span>{venue.area} • Ahmedabad</span>
          </p>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-5">
          {/* FREE ENTRY CONTENT */}
          {isFree ? (
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/40 flex items-start gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <CheckCircle2 className="w-5 h-5" />
                </div>
                <div className="text-xs space-y-1">
                  <h3 className="font-bold text-sm text-emerald-900 dark:text-emerald-300">
                    Open to Everyone • ₹0 Entry Fee
                  </h3>
                  <p className="text-emerald-800 dark:text-emerald-200/90 leading-relaxed">
                    This authentic Ahmedabad cultural &amp; devotional Garba welcomes all dancers, families, and visitors without any entry ticket, pass, or payment.
                  </p>
                </div>
              </div>

              {/* Venue Highlights */}
              <div className="grid grid-cols-2 gap-3 text-xs">
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-[#181B26] border border-amber-200 dark:border-slate-700/60">
                  <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-orange-400 block">Performers</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{venue.artists}</span>
                </div>
                <div className="p-3 rounded-xl bg-amber-50/70 dark:bg-[#181B26] border border-amber-200 dark:border-slate-700/60">
                  <span className="text-[10px] font-bold uppercase text-amber-700 dark:text-orange-400 block">Floor Surface</span>
                  <span className="font-semibold text-slate-900 dark:text-slate-100">{venue.floorType}</span>
                </div>
              </div>

              {/* Parking details */}
              {venue.parking[0] && (
                <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#151824] border border-slate-200 dark:border-slate-800 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Car className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <div>
                      <div className="text-xs font-bold text-slate-900 dark:text-slate-100">{venue.parking[0].lotName}</div>
                      <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">{venue.parking[0].availableBays} spots available • {venue.parking[0].advice}</div>
                    </div>
                  </div>
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-600/40">
                    {venue.parking[0].status}
                  </span>
                </div>
              )}

              {/* Action Buttons for Free Venue */}
              <div className="flex flex-col sm:flex-row gap-3 pt-2">
                <a
                  href={googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 py-3 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Navigation className="w-4 h-4" />
                  <span>Open Directions on Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                </a>
                <button
                  type="button"
                  onClick={onClose}
                  className="py-3 px-5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1E2232] dark:hover:bg-[#252B3E] text-slate-700 dark:text-slate-200 text-xs font-bold transition-colors border border-slate-300 dark:border-slate-700"
                >
                  Close
                </button>
              </div>
            </div>
          ) : (
            /* TICKETED PASS CONTENT */
            <div className="space-y-5">
              {/* Pass Type Selector */}
              <div>
                <label className="text-xs font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400 block mb-2">
                  Select Pass Category
                </label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setPassType('single')}
                    className={`p-3.5 rounded-xl border text-left transition-all ${
                      passType === 'single'
                        ? 'bg-orange-500/10 dark:bg-orange-500/15 border-orange-500 text-slate-900 dark:text-white shadow-xs ring-2 ring-orange-500/40'
                        : 'bg-slate-50 dark:bg-[#181B26] border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:border-orange-300'
                    }`}
                  >
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs">Single Night Entry</span>
                      <Ticket className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-lg font-bold text-amber-600 dark:text-amber-300 mt-1">₹{venue.perNightPrice}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">Valid for tonight's garba round</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPassType('season')}
                    className={`p-3.5 rounded-xl border text-left transition-all relative ${
                      passType === 'season'
                        ? 'bg-orange-500/10 dark:bg-orange-500/15 border-orange-500 text-slate-900 dark:text-white shadow-xs ring-2 ring-orange-500/40'
                        : 'bg-slate-50 dark:bg-[#181B26] border-slate-200 dark:border-slate-700/60 text-slate-600 dark:text-slate-300 hover:border-orange-300'
                    }`}
                  >
                    <div className="absolute -top-2.5 right-3 bg-red-600 text-white text-[9px] font-extrabold uppercase px-2 py-0.5 rounded-full shadow-xs">
                      Best Value
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-xs">Full 9-Night Season Pass</span>
                      <QrCode className="w-4 h-4 text-orange-500" />
                    </div>
                    <div className="text-lg font-bold text-amber-600 dark:text-amber-300 mt-1">₹{venue.seasonPrice}</div>
                    <div className="text-[11px] text-slate-500 dark:text-slate-400">RFID wristband included</div>
                  </button>
                </div>
              </div>

              {/* Ticket Count & Total */}
              <div className="p-3.5 rounded-xl bg-orange-50/50 dark:bg-[#181B26] border border-orange-200 dark:border-slate-700/60 flex items-center justify-between">
                <div>
                  <div className="text-xs font-bold text-slate-900 dark:text-slate-100">Number of Passes</div>
                  <div className="text-[11px] text-slate-500 dark:text-slate-400">Max 6 per booking account</div>
                </div>
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => setTicketCount(Math.max(1, ticketCount - 1))}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-[#252B3E] hover:bg-orange-600 hover:text-white text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center transition-colors shadow-xs border border-slate-200 dark:border-slate-700"
                  >
                    -
                  </button>
                  <span className="text-sm font-bold text-slate-900 dark:text-white w-4 text-center">{ticketCount}</span>
                  <button
                    type="button"
                    onClick={() => setTicketCount(Math.min(6, ticketCount + 1))}
                    className="w-8 h-8 rounded-lg bg-white dark:bg-[#252B3E] hover:bg-orange-600 hover:text-white text-slate-700 dark:text-slate-300 font-bold flex items-center justify-center transition-colors shadow-xs border border-slate-200 dark:border-slate-700"
                  >
                    +
                  </button>
                </div>
              </div>

              {/* Estimated Total Calculation */}
              <div className="p-3.5 rounded-xl bg-amber-50 dark:bg-[#151824] border border-amber-300 dark:border-amber-500/20 flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-700 dark:text-slate-300">
                  Estimated Booking Total ({ticketCount} {ticketCount === 1 ? 'pass' : 'passes'}):
                </span>
                <span className="text-xl font-bold text-amber-700 dark:text-amber-300">₹{totalPrice.toLocaleString('en-IN')}</span>
              </div>

              {/* Direct Partner Booking Buttons */}
              <div className="space-y-3 pt-1">
                <div className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1.5">
                  <ShieldCheck className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                  <span>Official ticketing inventory with 100% genuine RFID barcode guarantee. Zero scalper markup.</span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {/* BookMyShow Button */}
                  <a
                    href={bmsSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-bold text-xs transition-all shadow-md group"
                  >
                    <Ticket className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Book on BookMyShow</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>

                  {/* District Button */}
                  <a
                    href={districtSearchUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs transition-all shadow-md group"
                  >
                    <QrCode className="w-4 h-4 group-hover:scale-110 transition-transform" />
                    <span>Reserve on District</span>
                    <ExternalLink className="w-3.5 h-3.5 opacity-80" />
                  </a>
                </div>
              </div>

              {/* Ahmedabad Pickup Instructions */}
              <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-[#0B0C10] border border-slate-200 dark:border-slate-800 text-[11px] text-slate-600 dark:text-slate-400 space-y-1">
                <div className="font-bold text-slate-900 dark:text-slate-200">Wristband Collection in Ahmedabad:</div>
                <div>• Physical RFID bands can be collected at partner mall counters in Vastrapur (Ahmedabad One), Palladium (SG Highway), and venue gates.</div>
                <div>• Carry Govt ID (Aadhaar / Voter ID) + Booking SMS confirmation at the turnstiles.</div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
