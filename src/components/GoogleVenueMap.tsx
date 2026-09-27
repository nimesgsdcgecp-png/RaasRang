// Source: Google Maps Platform Code Assist
import React, { useState } from 'react';
import { APIProvider, Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { GarbaVenue } from '../data/ahmedabadVenues';

interface GoogleVenueMapProps {
  venues: GarbaVenue[];
  selectedVenue: GarbaVenue;
  onSelectVenue: (venue: GarbaVenue) => void;
  onOpenBooking: (venue: GarbaVenue) => void;
}

export const GoogleVenueMap: React.FC<GoogleVenueMapProps> = ({
  venues,
  selectedVenue,
  onSelectVenue,
  onOpenBooking,
}) => {
  const apiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || '';
  const [mapCenter, setMapCenter] = useState<{ lat: number; lng: number }>({
    lat: selectedVenue.coordinates.lat,
    lng: selectedVenue.coordinates.lng,
  });
  const [showParkingLayer, setShowParkingLayer] = useState<boolean>(true);

  const handleVenueClick = (venue: GarbaVenue) => {
    onSelectVenue(venue);
    setMapCenter(venue.coordinates);
  };

  const getDirectionsUrl = (venue: GarbaVenue) => {
    return `https://www.google.com/maps/dir/?api=1&destination=${venue.coordinates.lat},${venue.coordinates.lng}&destination_place_id=${encodeURIComponent(
      venue.name
    )}`;
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      {/* Map Control Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#11141E] p-4 rounded-2xl border border-amber-500/20 shadow-md">
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 rounded-xl bg-orange-600/20 border border-orange-500/40 flex items-center justify-center text-orange-400">
            <span className="material-symbols-outlined text-2xl">location_on</span>
          </div>
          <div>
            <h2 className="font-headline text-lg md:text-xl font-bold text-white flex items-center gap-2">
              Ahmedabad Navratri &amp; Parking Map
            </h2>
            <p className="text-xs text-slate-400">
              {venues.length} Premier Garba Arenas mapped with real-time transit telemetry
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto">
          <button
            onClick={() => setShowParkingLayer(!showParkingLayer)}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 border ${
              showParkingLayer
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-sm'
                : 'bg-[#181B26] text-slate-400 border-slate-700 hover:text-slate-200'
            }`}
          >
            <span className="material-symbols-outlined text-sm">local_parking</span>
            {showParkingLayer ? 'Parking Pins: ON' : 'Parking Pins: OFF'}
          </button>

          <a
            href={getDirectionsUrl(selectedVenue)}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 rounded-xl text-xs font-bold bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white transition-all shadow-md flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">directions</span>
            Open in Google Maps
          </a>
        </div>
      </div>

      {/* Main Map & Interactive Sidecard Container */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 items-start">
        {/* Google Map Viewport */}
        <div className="lg:col-span-8 relative w-full h-[480px] md:h-[540px] rounded-2xl overflow-hidden border border-amber-500/30 shadow-2xl bg-[#08090D]">
          {apiKey ? (
            <APIProvider apiKey={apiKey}>
              <Map
                mapId="DEMO_MAP_ID"
                defaultCenter={mapCenter}
                center={mapCenter}
                defaultZoom={12}
                style={{ width: '100%', height: '100%' }}
                gestureHandling="greedy"
                disableDefaultUI={false}
                internalUsageAttributionIds={['gmp_mcp_codeassist_v1_aistudio']}
              >
                {/* Garba Venue Markers */}
                {venues.map((venue) => {
                  const isSelected = venue.id === selectedVenue.id;
                  return (
                    <AdvancedMarker
                      key={venue.id}
                      position={venue.coordinates}
                      onClick={() => handleVenueClick(venue)}
                      title={venue.name}
                    >
                      <div className="relative group cursor-pointer">
                        <Pin
                          background={isSelected ? '#EA580C' : '#DC2626'}
                          borderColor={isSelected ? '#FEF08A' : '#FFFFFF'}
                          glyphColor="#FFFFFF"
                          scale={isSelected ? 1.3 : 1.0}
                        />
                        <div
                          className={`absolute -top-7 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-md text-[10px] font-bold whitespace-nowrap shadow-lg transition-all ${
                            isSelected
                              ? 'bg-amber-400 text-slate-950 scale-105'
                              : 'bg-black/85 text-slate-200 border border-slate-700'
                          }`}
                        >
                          {venue.name.split(' ')[0]} ({venue.area.split('/')[0].trim()})
                        </div>
                      </div>
                    </AdvancedMarker>
                  );
                })}

                {/* Nearby Parking Lot Markers if toggled */}
                {showParkingLayer &&
                  selectedVenue.parkingLots.map((lot, idx) => {
                    // Offset parking markers slightly around selected ground
                    const offsetLat =
                      selectedVenue.coordinates.lat + (idx === 0 ? 0.003 : idx === 1 ? -0.003 : 0.002);
                    const offsetLng =
                      selectedVenue.coordinates.lng + (idx === 0 ? 0.004 : idx === 1 ? -0.004 : -0.003);

                    return (
                      <AdvancedMarker
                        key={`parking-${idx}`}
                        position={{ lat: offsetLat, lng: offsetLng }}
                        title={lot.lotName}
                      >
                        <div className="flex items-center gap-1 bg-black/90 text-white border border-amber-400/60 px-2 py-1 rounded-lg shadow-xl text-[10px] font-bold">
                          <span className="material-symbols-outlined text-xs text-orange-400 leading-none">
                            local_parking
                          </span>
                          <span>{lot.availableSlots} Left</span>
                        </div>
                      </AdvancedMarker>
                    );
                  })}
              </Map>
            </APIProvider>
          ) : (
            <div className="w-full h-full flex flex-col items-center justify-center p-6 text-center text-slate-300">
              <span className="material-symbols-outlined text-4xl text-amber-400 mb-2">map</span>
              <p className="font-headline text-lg font-bold text-white">Google Maps Initializing...</p>
              <p className="text-xs text-slate-400 max-w-sm mt-1">
                Loading official Google Maps Platform APIs for Ahmedabad Navratri arenas.
              </p>
            </div>
          )}

          {/* Quick Floating Map Helper Badge */}
          <div className="absolute bottom-4 left-4 right-4 md:right-auto md:max-w-md bg-[#11141E]/95 backdrop-blur-md border border-amber-500/30 p-3 rounded-xl shadow-xl flex items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <span className="material-symbols-outlined text-orange-400 text-lg">explore</span>
              <div className="flex flex-col">
                <span className="font-bold text-white">{selectedVenue.name}</span>
                <span className="text-[11px] text-slate-400">{selectedVenue.address}</span>
              </div>
            </div>
            <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 text-[10px] font-bold shrink-0">
              GPS Active
            </span>
          </div>
        </div>

        {/* Selected Ground Details & Real-Time Parking Telemetry Card */}
        <div className="lg:col-span-4 flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-[#151824] border border-amber-500/25 shadow-xl flex flex-col gap-4">
            {/* Header info */}
            <div className="flex items-start justify-between gap-2">
              <div className="flex flex-col">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange-400">
                  {selectedVenue.area} • Ground Details
                </span>
                <h3 className="font-headline text-lg font-bold text-white leading-tight">
                  {selectedVenue.name}
                </h3>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-red-600/20 text-red-300 border border-red-500/30 text-[10px] font-bold uppercase tracking-wider shrink-0">
                {selectedVenue.sellingStatus}
              </span>
            </div>

            {/* Artist & Rating */}
            <div className="p-3 rounded-xl bg-[#11141E] border border-slate-700/60 flex flex-col gap-1.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Headline Artists:</span>
                <span className="font-bold text-amber-300">{selectedVenue.featuredArtists}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Ground Capacity:</span>
                <span className="font-bold text-slate-200">{selectedVenue.capacity}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Floor System:</span>
                <span className="font-bold text-slate-200">{selectedVenue.floorType.split('(')[0]}</span>
              </div>
            </div>

            {/* Real-Time Parking Breakdown */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-slate-200 uppercase tracking-wider flex items-center gap-1">
                  <span className="material-symbols-outlined text-sm text-orange-400">local_parking</span>
                  Live Parking Availability
                </span>
                <span className="text-[10px] text-emerald-400 font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> Refreshed 30s
                </span>
              </div>

              <div className="space-y-2">
                {selectedVenue.parkingLots.map((lot, idx) => (
                  <div
                    key={idx}
                    className="p-3 rounded-xl bg-[#11141E] border border-slate-700/60 flex items-center justify-between text-xs"
                  >
                    <div className="flex flex-col">
                      <span className="font-bold text-white">{lot.lotName}</span>
                      <span className="text-[11px] text-slate-400">
                        {lot.type} • {lot.feeInfo}
                      </span>
                    </div>
                    <div className="flex flex-col items-end">
                      <span
                        className={`font-bold text-sm ${
                          lot.status === 'green'
                            ? 'text-emerald-400'
                            : lot.status === 'amber'
                            ? 'text-amber-400'
                            : 'text-red-400'
                        }`}
                      >
                        {lot.availableSlots} / {lot.totalSlots}
                      </span>
                      <span className="text-[10px] text-slate-400">vacant now</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Traffic Advisory */}
            <div className="p-3 rounded-xl bg-orange-950/40 border border-orange-500/30 flex items-start gap-2 text-xs">
              <span className="material-symbols-outlined text-orange-400 text-base shrink-0 mt-0.5">
                traffic
              </span>
              <p className="text-slate-300 leading-snug">{selectedVenue.trafficAdvisory}</p>
            </div>

            {/* Ticket & Booking Triggers */}
            <div className="pt-2 flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase font-bold text-slate-400">Passes From</span>
                  <div className="text-lg font-bold text-amber-300">
                    ₹{selectedVenue.singlePassPrice}
                    <span className="text-xs font-normal text-slate-400"> / night</span>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] uppercase font-bold text-slate-400">Full 9-Nights</span>
                  <div className="text-lg font-bold text-orange-400">
                    ₹{selectedVenue.seasonPassPrice}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-2 pt-1">
                <button
                  onClick={() => onOpenBooking(selectedVenue)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 border border-red-500/30"
                >
                  <span className="material-symbols-outlined text-sm">confirmation_number</span>
                  Book BMS
                </button>
                <button
                  onClick={() => onOpenBooking(selectedVenue)}
                  className="w-full py-2.5 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold transition-all shadow-md flex items-center justify-center gap-1.5 border border-orange-400/30"
                >
                  <span className="material-symbols-outlined text-sm">qr_code_2</span>
                  District Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
