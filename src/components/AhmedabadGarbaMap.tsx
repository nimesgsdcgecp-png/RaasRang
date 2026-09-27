import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, InfoWindow, Pin } from '@vis.gl/react-google-maps';
import { GarbaVenue, ParkingTelemetry } from '../data/ahmedabadGarbaData';
import { MapPin, Navigation, Car, ExternalLink, Ticket, CheckCircle2, Sparkles } from 'lucide-react';

interface AhmedabadGarbaMapProps {
  venues: GarbaVenue[];
  selectedVenue: GarbaVenue | null;
  onSelectVenue: (venue: GarbaVenue) => void;
  onBookPass: (venue: GarbaVenue) => void;
}

export const AhmedabadGarbaMap: React.FC<AhmedabadGarbaMapProps> = ({
  venues,
  selectedVenue,
  onSelectVenue,
  onBookPass,
}) => {
  const apiKey = (import.meta as unknown as { env: Record<string, string> }).env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyC8c1DW8bQtGvAqBQaxt9cFNcH32fNDg68';

  const [activeMarker, setActiveMarker] = useState<GarbaVenue | null>(selectedVenue || venues[0]);
  const [activeParking, setActiveParking] = useState<ParkingTelemetry | null>(null);
  const [showParkingLots, setShowParkingLots] = useState(true);
  const [filterArea, setFilterArea] = useState<string>('all');
  const [entryTypeFilter, setEntryTypeFilter] = useState<'all' | 'free' | 'pass'>('all');

  // Default Ahmedabad center (focused around Ahmedabad garba hub)
  const defaultCenter = selectedVenue
    ? { lat: selectedVenue.lat, lng: selectedVenue.lng }
    : { lat: 23.0385, lng: 72.5110 };

  const filteredVenues = venues.filter(v => {
    const matchesArea = filterArea === 'all' || v.area.toLowerCase().includes(filterArea.toLowerCase());
    let matchesEntry = true;
    if (entryTypeFilter === 'free') {
      matchesEntry = v.entryType === 'free' || v.perNightPrice === 0;
    } else if (entryTypeFilter === 'pass') {
      matchesEntry = v.entryType === 'pass' && v.perNightPrice > 0;
    }
    return matchesArea && matchesEntry;
  });

  // Collect all parking lots from filtered venues
  const allParkingLots = filteredVenues.flatMap(v => v.parking.map(p => ({ ...p, venueName: v.name, venueId: v.id })));

  const freeCount = venues.filter(v => v.entryType === 'free' || v.perNightPrice === 0).length;
  const passCount = venues.filter(v => v.entryType === 'pass' && v.perNightPrice > 0).length;

  return (
    <div className="w-full flex flex-col gap-4 text-slate-800 dark:text-slate-100">
      {/* Map Control Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-4 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-orange-600/15 dark:bg-orange-600/20 border border-orange-500/30 flex items-center justify-center text-orange-600 dark:text-orange-400">
            <MapPin className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
              Ahmedabad Garba &amp; Parking Radar
              <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-500/30">
                Live Radar
              </span>
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400">
              Free Community Pols &amp; Pass Club Arenas with Live Parking Telemetry
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Free vs Pass Filter */}
          <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#11141E] border border-slate-200 dark:border-slate-800">
            <button
              type="button"
              onClick={() => setEntryTypeFilter('all')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                entryTypeFilter === 'all'
                  ? 'bg-white dark:bg-orange-600 text-slate-900 dark:text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
              }`}
            >
              All ({venues.length})
            </button>
            <button
              type="button"
              onClick={() => setEntryTypeFilter('free')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                entryTypeFilter === 'free'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-800'
              }`}
            >
              Free ({freeCount})
            </button>
            <button
              type="button"
              onClick={() => setEntryTypeFilter('pass')}
              className={`px-2.5 py-1 rounded-lg text-xs font-bold transition-all ${
                entryTypeFilter === 'pass'
                  ? 'bg-orange-600 text-white shadow-xs'
                  : 'text-orange-700 dark:text-orange-400 hover:text-orange-800'
              }`}
            >
              Passes ({passCount})
            </button>
          </div>

          {/* Parking Toggle */}
          <button
            type="button"
            onClick={() => setShowParkingLots(!showParkingLots)}
            className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
              showParkingLots
                ? 'bg-amber-100 dark:bg-amber-500/20 text-amber-900 dark:text-amber-300 border-amber-300 dark:border-amber-500/40 shadow-xs'
                : 'bg-slate-100 dark:bg-[#1E2232] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60'
            }`}
          >
            <Car className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span>{showParkingLots ? 'Hide Parking Bays' : 'Show Parking Bays'}</span>
          </button>

          {/* Area Filter */}
          <select
            value={filterArea}
            onChange={(e) => setFilterArea(e.target.value)}
            className="bg-slate-50 dark:bg-[#11141E] border border-amber-200 dark:border-amber-500/20 text-slate-800 dark:text-slate-200 text-xs rounded-xl px-3 py-1.5 focus:outline-none focus:border-orange-500 cursor-pointer shadow-xs"
          >
            <option value="all">All Corridors</option>
            <option value="Old City">Old City &amp; Manek Chowk</option>
            <option value="Lal Darwaja">Lal Darwaja &amp; Bhadra</option>
            <option value="Navrangpura">Navrangpura &amp; University</option>
            <option value="Vastrapur">Vastrapur / Memnagar</option>
            <option value="SG Highway">SG Highway (Karnavati / Rajpath)</option>
            <option value="Sindhu Bhavan">Sindhu Bhavan Road (SBR)</option>
            <option value="Bopal">South Bopal / Ambli</option>
          </select>
        </div>
      </div>

      {/* Map Canvas Container */}
      <div className="relative w-full h-[540px] rounded-2xl overflow-hidden border border-amber-300/80 dark:border-amber-500/20 shadow-xl bg-slate-100 dark:bg-[#0B0C10]">
        <APIProvider apiKey={apiKey} libraries={['places', 'geometry']}>
          <Map
            defaultCenter={defaultCenter}
            defaultZoom={12}
            mapId="raasrang-ahmedabad-garba-map"
            className="w-full h-full"
            gestureHandling="greedy"
            disableDefaultUI={false}
          >
            {/* Markers for Ahmedabad Garba Grounds */}
            {filteredVenues.map((venue) => {
              const isFree = venue.entryType === 'free' || venue.perNightPrice === 0;

              return (
                <AdvancedMarker
                  key={venue.id}
                  position={{ lat: venue.lat, lng: venue.lng }}
                  onClick={() => {
                    setActiveMarker(venue);
                    setActiveParking(null);
                    onSelectVenue(venue);
                  }}
                  title={venue.name}
                >
                  <Pin
                    background={isFree ? '#059669' : '#DC2626'}
                    borderColor={isFree ? '#10B981' : '#F59E0B'}
                    glyphColor="#FFFFFF"
                    scale={activeMarker?.id === venue.id ? 1.25 : 1.05}
                  />
                </AdvancedMarker>
              );
            })}

            {/* Markers for Nearby Parking Telemetry Bays */}
            {showParkingLots &&
              allParkingLots.map((lot, idx) => (
                <AdvancedMarker
                  key={`park-${lot.lat}-${lot.lng}-${idx}`}
                  position={{ lat: lot.lat, lng: lot.lng }}
                  onClick={() => {
                    setActiveParking(lot);
                    setActiveMarker(null);
                  }}
                  title={`Parking: ${lot.lotName}`}
                >
                  <div className="p-1 rounded-full bg-slate-900 border-2 border-emerald-400 text-emerald-300 shadow-md cursor-pointer hover:scale-125 transition-transform flex items-center justify-center">
                    <Car className="w-3.5 h-3.5" />
                  </div>
                </AdvancedMarker>
              ))}

            {/* Venue InfoWindow */}
            {activeMarker && (
              <InfoWindow
                position={{ lat: activeMarker.lat, lng: activeMarker.lng }}
                onCloseClick={() => setActiveMarker(null)}
                headerContent={
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1.5">
                    <span className="material-symbols-outlined text-orange-600 text-sm">celebration</span>
                    <span>{activeMarker.name.split(' - ')[0]}</span>
                  </div>
                }
              >
                <div className="p-1 text-slate-800 text-xs max-w-xs space-y-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="text-[10px] font-bold text-orange-700 uppercase">{activeMarker.area}</span>
                    {activeMarker.entryType === 'free' || activeMarker.perNightPrice === 0 ? (
                      <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-extrabold border border-emerald-300">
                        FREE ENTRY • ₹0
                      </span>
                    ) : (
                      <span className="text-xs font-bold text-amber-700">₹{activeMarker.perNightPrice} / night</span>
                    )}
                  </div>

                  <p className="text-[11px] text-slate-600 line-clamp-2">
                    {activeMarker.artists} • {activeMarker.floorType}
                  </p>

                  {/* Primary Parking Snapshot */}
                  {activeMarker.parking[0] && (
                    <div className="p-2 rounded-lg bg-slate-50 border border-slate-200 text-[11px] space-y-0.5">
                      <div className="font-bold text-slate-800 flex items-center gap-1">
                        <Car className="w-3 h-3 text-orange-600" />
                        <span>{activeMarker.parking[0].lotName}</span>
                      </div>
                      <div className="text-emerald-700 font-semibold">
                        {activeMarker.parking[0].availableBays} bays free ({activeMarker.parking[0].status})
                      </div>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => onBookPass(activeMarker)}
                      className={`flex-1 py-1.5 px-3 rounded-lg text-white font-bold text-xs flex items-center justify-center gap-1 shadow-xs ${
                        activeMarker.entryType === 'free' || activeMarker.perNightPrice === 0
                          ? 'bg-emerald-600 hover:bg-emerald-700'
                          : 'bg-orange-600 hover:bg-orange-700'
                      }`}
                    >
                      {activeMarker.entryType === 'free' || activeMarker.perNightPrice === 0 ? (
                        <>
                          <Navigation className="w-3 h-3" />
                          <span>Free Guide</span>
                        </>
                      ) : (
                        <>
                          <Ticket className="w-3 h-3" />
                          <span>Book Pass</span>
                        </>
                      )}
                    </button>
                    <a
                      href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(`${activeMarker.name} ${activeMarker.address}`)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300"
                      title="Google Maps Navigation"
                    >
                      <Navigation className="w-3.5 h-3.5 text-blue-600" />
                    </a>
                  </div>
                </div>
              </InfoWindow>
            )}

            {/* Parking InfoWindow */}
            {activeParking && (
              <InfoWindow
                position={{ lat: activeParking.lat, lng: activeParking.lng }}
                onCloseClick={() => setActiveParking(null)}
                headerContent={
                  <div className="font-bold text-xs text-slate-900 flex items-center gap-1">
                    <Car className="w-3.5 h-3.5 text-emerald-600" />
                    <span>{activeParking.lotName}</span>
                  </div>
                }
              >
                <div className="p-1 text-slate-800 text-xs max-w-xs space-y-1.5">
                  <div className="flex justify-between items-center">
                    <span className="text-[10px] text-slate-500 font-semibold">{activeParking.type}</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 text-[10px] font-bold border border-emerald-300">
                      {activeParking.status}
                    </span>
                  </div>
                  <div className="text-emerald-700 font-bold text-sm">
                    {activeParking.availableBays} / {activeParking.totalBays} Bays Available
                  </div>
                  <p className="text-[11px] text-slate-600">{activeParking.advice}</p>
                  <div className="text-[10px] text-orange-700 font-semibold">
                    ~{activeParking.transitTimeMins} mins walk to gate turnstile
                  </div>
                </div>
              </InfoWindow>
            )}
          </Map>
        </APIProvider>

        {/* Legend Overlay on Map */}
        <div className="absolute bottom-4 left-4 z-10 bg-white/95 dark:bg-[#11141E]/95 backdrop-blur-md p-3 rounded-xl border border-amber-300/80 dark:border-amber-500/20 text-xs space-y-1.5 shadow-lg">
          <div className="font-bold text-[11px] text-slate-900 dark:text-slate-200 uppercase tracking-wider">
            Ahmedabad Map Legend
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-emerald-600 border border-white"></span>
            <span className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold">100% Free Entry Garba (₹0)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-red-600 border border-white"></span>
            <span className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold">Ticketed / Pass Arena</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-3 h-3 rounded-full bg-slate-900 border border-emerald-400"></span>
            <span className="text-[11px] text-slate-700 dark:text-slate-300 font-semibold">Live Parking Telemetry Bay</span>
          </div>
        </div>
      </div>

      {/* Quick Ground Select Cards Below Map */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
        {filteredVenues.map((v) => {
          const isFree = v.entryType === 'free' || v.perNightPrice === 0;

          return (
            <div
              key={v.id}
              onClick={() => {
                setActiveMarker(v);
                setActiveParking(null);
                onSelectVenue(v);
              }}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all flex flex-col justify-between gap-2 shadow-xs ${
                activeMarker?.id === v.id
                  ? 'bg-orange-50 dark:bg-[#1E2232] border-orange-500 ring-2 ring-orange-500/30'
                  : 'bg-white dark:bg-[#151824] border-amber-200/70 dark:border-amber-500/15 hover:border-orange-400'
              }`}
            >
              <div className="flex items-start justify-between gap-2">
                <span className="font-bold text-xs text-slate-900 dark:text-white line-clamp-1">{v.name}</span>
                {isFree ? (
                  <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold shrink-0 border border-emerald-300 dark:border-emerald-600/40">
                    FREE • ₹0
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 text-[10px] font-bold shrink-0 border border-amber-300 dark:border-amber-600/40">
                    ₹{v.perNightPrice}
                  </span>
                )}
              </div>
              <div className="flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                <span>{v.area}</span>
                <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{v.parking[0]?.availableBays || 0} spots open</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
