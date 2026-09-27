import React, { useState } from 'react';
import { GarbaVenue } from '../data/ahmedabadVenues';

interface GroundBlueprintProps {
  venue: GarbaVenue;
}

export const GroundBlueprint: React.FC<GroundBlueprintProps> = ({ venue }) => {
  const [activeZone, setActiveZone] = useState<string>(
    'Sanctum Dance Circle: 7 Concentric Rings (Barefoot Soil & Wooden Ring)'
  );

  return (
    <div className="flex flex-col gap-3 w-full">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="material-symbols-outlined text-orange-500 text-xl">map</span>
          <h3 className="font-headline text-lg font-bold text-slate-100">
            {venue.name.split(' 2025')[0]} Master Blueprint
          </h3>
        </div>
        <span className="text-xs text-amber-400 font-semibold flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          Interactive Layout
        </span>
      </div>

      <div className="relative bg-[#08090D] border border-amber-500/20 rounded-2xl p-4 overflow-hidden shadow-2xl flex flex-col items-center">
        {/* SVG Blueprint */}
        <svg
          viewBox="0 0 800 480"
          className="w-full h-auto max-h-[420px] select-none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Ground Base */}
          <rect
            x="20"
            y="20"
            width="760"
            height="440"
            rx="16"
            fill="#11141E"
            stroke="#343B4F"
            strokeWidth="2"
          />

          {/* Parking Lot A (VIP & Valet) */}
          <g
            className="cursor-pointer group"
            onClick={() =>
              setActiveZone(
                `Lot A (VIP / Valet): ${venue.parkingLots[0]?.availableSlots || 340} slots vacant now. Gate 1 fast-track entry.`
              )
            }
          >
            <rect
              x="40"
              y="40"
              width="180"
              height="85"
              rx="8"
              fill="#FF6B18"
              fillOpacity="0.18"
              stroke="#FF6B18"
              strokeWidth="1.5"
            />
            <text x="130" y="70" fill="#FF6B18" fontSize="12" fontWeight="bold" textAnchor="middle">
              LOT A (VIP &amp; VALET)
            </text>
            <text x="130" y="90" fill="#F8FAFC" fontSize="10" textAnchor="middle">
              {venue.parkingLots[0]?.availableSlots || 410} Slots Vacant
            </text>
            <text x="130" y="108" fill="#F59E0B" fontSize="9" textAnchor="middle">
              Direct to Gate 1 (VIP)
            </text>
          </g>

          {/* Parking Lot C (Two-Wheelers) */}
          <g
            className="cursor-pointer group"
            onClick={() =>
              setActiveZone(
                `Lot C (Two-Wheelers): Free entry for scooters and bikes. Direct turnstiles to Gate 3 & 4.`
              )
            }
          >
            <rect
              x="580"
              y="40"
              width="180"
              height="85"
              rx="8"
              fill="#10B981"
              fillOpacity="0.16"
              stroke="#10B981"
              strokeWidth="1.5"
            />
            <text x="670" y="70" fill="#34D399" fontSize="12" fontWeight="bold" textAnchor="middle">
              LOT C (TWO-WHEELERS)
            </text>
            <text x="670" y="90" fill="#F8FAFC" fontSize="10" textAnchor="middle">
              1,200+ Free Bays
            </text>
            <text x="670" y="108" fill="#A7F3D0" fontSize="9" textAnchor="middle">
              100% Free Entry
            </text>
          </g>

          {/* Parking Lot B (General 4-Wheelers) */}
          <g
            className="cursor-pointer group"
            onClick={() =>
              setActiveZone(
                `Lot B (General 4-Wheelers): 1,200 capacity. Free continuous E-Rickshaw shuttles to Gate 2.`
              )
            }
          >
            <rect
              x="40"
              y="370"
              width="720"
              height="75"
              rx="8"
              fill="#3B82F6"
              fillOpacity="0.15"
              stroke="#3B82F6"
              strokeWidth="1.5"
            />
            <text x="400" y="400" fill="#60A5FA" fontSize="12" fontWeight="bold" textAnchor="middle">
              LOT B: GENERAL 4-WHEELER PARKING (CAPACITY 1,500+)
            </text>
            <text x="400" y="420" fill="#E2E8F0" fontSize="10" textAnchor="middle">
              Continuous Electric Shuttle Buggies running every 90s to Gate 2 Plaza
            </text>
          </g>

          {/* Valet Artery Road */}
          <path d="M 230 82 L 570 82" stroke="#475569" strokeWidth="4" strokeDasharray="8 6" />
          <text x="400" y="75" fill="#94A3B8" fontSize="10" fontWeight="bold" textAnchor="middle">
            INTERNAL VALET ACCESS ARTERY ROAD
          </text>

          {/* Central Garba Circles */}
          <g
            className="cursor-pointer"
            onClick={() =>
              setActiveZone(
                `Central Raas Circle: Capacity ${venue.capacity}. Concentric circles moving to live dhol.`
              )
            }
          >
            <circle cx="400" cy="230" r="135" fill="#FF6B18" fillOpacity="0.08" stroke="#FF6B18" strokeWidth="2.5" />
            <circle cx="400" cy="230" r="105" fill="#F59E0B" fillOpacity="0.09" stroke="#F59E0B" strokeWidth="1.5" strokeDasharray="6 4" />
            <circle cx="400" cy="230" r="75" fill="#DC2626" fillOpacity="0.12" stroke="#DC2626" strokeWidth="1.5" />
            <circle cx="400" cy="230" r="45" fill="#EA580C" fillOpacity="0.2" stroke="#EA580C" strokeWidth="1.5" />
            
            {/* Center Aarti Mandap */}
            <circle cx="400" cy="230" r="22" fill="#DC2626" stroke="#FEF08A" strokeWidth="2" />
            <polygon points="400,216 412,238 388,238" fill="#FEF08A" />
            <text x="400" y="234" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
              AARTI
            </text>
            <text x="400" y="270" fill="#FFB598" fontSize="10" fontWeight="bold" textAnchor="middle">
              {venue.capacity} DANCERS CIRCLE
            </text>
          </g>

          {/* Main Stage */}
          <g
            className="cursor-pointer"
            onClick={() =>
              setActiveZone(
                `Main Stage: ${venue.featuredArtists}. Verified 65dB sound limit with line-array towers.`
              )
            }
          >
            <rect x="320" y="105" width="160" height="34" rx="6" fill="#DC2626" stroke="#FCA5A5" strokeWidth="1.5" />
            <text x="400" y="126" fill="#FFFFFF" fontSize="11" fontWeight="bold" textAnchor="middle">
              ORCHESTRA STAGE
            </text>
          </g>

          {/* Sound Towers */}
          <circle cx="270" cy="170" r="7" fill="#F59E0B" />
          <text x="270" y="160" fill="#F59E0B" fontSize="8" textAnchor="middle">Tower 1</text>
          <circle cx="530" cy="170" r="7" fill="#F59E0B" />
          <text x="530" y="160" fill="#F59E0B" fontSize="8" textAnchor="middle">Tower 2</text>
          <circle cx="270" cy="290" r="7" fill="#F59E0B" />
          <text x="270" y="310" fill="#F59E0B" fontSize="8" textAnchor="middle">Tower 3</text>
          <circle cx="530" cy="290" r="7" fill="#F59E0B" />
          <text x="530" y="310" fill="#F59E0B" fontSize="8" textAnchor="middle">Tower 4</text>

          {/* Gates */}
          <g
            className="cursor-pointer"
            onClick={() => setActiveZone('Gate 1 (VIP & Valet): Direct access to VIP lounge and elevated gallery.')}
          >
            <rect x="180" y="115" width="70" height="24" rx="4" fill="#EA580C" />
            <text x="215" y="131" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
              GATE 1 (VIP)
            </text>
          </g>

          <g
            className="cursor-pointer"
            onClick={() => setActiveZone('Gate 2 (General): High throughput RFID turnstiles. Average transit 45s.')}
          >
            <rect x="180" y="325" width="75" height="24" rx="4" fill="#1E293B" stroke="#64748B" />
            <text x="217" y="341" fill="#FFFFFF" fontSize="9" fontWeight="bold" textAnchor="middle">
              GATE 2 (GEN)
            </text>
          </g>

          <g
            className="cursor-pointer"
            onClick={() =>
              setActiveZone('Gate 3 (Ladies & Senior Fast Track): SHE-Team assisted priority gate.')
            }
          >
            <rect x="540" y="325" width="90" height="24" rx="4" fill="#DC2626" />
            <text x="585" y="341" fill="#FFFFFF" fontSize="8" fontWeight="bold" textAnchor="middle">
              GATE 3 (WOMEN)
            </text>
          </g>

          {/* Food Court */}
          <g
            className="cursor-pointer"
            onClick={() =>
              setActiveZone(
                'Food Court: 40+ stalls including Fafda, Jalebi, Kathiyawadi Snacks, and FSSAI approved counters.'
              )
            }
          >
            <rect x="585" y="150" width="140" height="48" rx="6" fill="#F59E0B" fillOpacity="0.2" stroke="#F59E0B" />
            <text x="655" y="172" fill="#FBBF24" fontSize="10" fontWeight="bold" textAnchor="middle">
              FOOD &amp; WATER PLAZA
            </text>
            <text x="655" y="188" fill="#FDE68A" fontSize="8" textAnchor="middle">
              FSSAI Certified Stalls
            </text>
          </g>

          {/* Medical Tent */}
          <g
            className="cursor-pointer"
            onClick={() =>
              setActiveZone(
                'Emergency Medical Tent: On-ground ambulance, oxygen concentrators, and orthopedic doctors.'
              )
            }
          >
            <rect x="585" y="215" width="140" height="42" rx="6" fill="#DC2626" fillOpacity="0.2" stroke="#DC2626" />
            <text x="655" y="235" fill="#F87171" fontSize="9" fontWeight="bold" textAnchor="middle">
              MEDICAL &amp; TRIAGE
            </text>
            <text x="655" y="248" fill="#FCA5A5" fontSize="8" textAnchor="middle">
              2 ICU Ambulances On Site
            </text>
          </g>

          {/* Shoe Cloakroom & Dandiya Rental */}
          <g
            className="cursor-pointer"
            onClick={() =>
              setActiveZone(
                'Free Shoe Cloakroom & Dandiya Rental: Tokens given at entry. Rounded wooden dandiya sticks available.'
              )
            }
          >
            <rect x="70" y="150" width="130" height="45" rx="6" fill="#334155" stroke="#64748B" />
            <text x="135" y="170" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
              FREE SHOE CLOAKROOM
            </text>
            <text x="135" y="185" fill="#94A3B8" fontSize="8" textAnchor="middle">
              Tokens at Gate 1 &amp; 2
            </text>
          </g>

          <g
            className="cursor-pointer"
            onClick={() =>
              setActiveZone(
                'Dandiya Counter: Handcrafted Kutchi and wooden dandiya pairs available for rental or purchase.'
              )
            }
          >
            <rect x="70" y="215" width="130" height="45" rx="6" fill="#334155" stroke="#64748B" />
            <text x="135" y="235" fill="#E2E8F0" fontSize="9" fontWeight="bold" textAnchor="middle">
              DANDIYA RENTAL / BUY
            </text>
            <text x="135" y="250" fill="#94A3B8" fontSize="8" textAnchor="middle">
              Wooden &amp; Brass Bandhan
            </text>
          </g>
        </svg>

        {/* Selected Zone Info Display */}
        <div className="w-full mt-3 p-3 rounded-xl bg-[#11141E] border border-amber-500/30 flex items-center justify-between text-xs gap-3">
          <div className="flex items-center gap-2">
            <span className="material-symbols-outlined text-orange-400 text-lg">info</span>
            <span className="text-slate-200 font-medium">{activeZone}</span>
          </div>
          <span className="text-[10px] text-amber-400 font-bold uppercase tracking-wider shrink-0 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
            Interactive Zone
          </span>
        </div>

        {/* Legend */}
        <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-center mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-300">
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-red-600 inline-block"></span> Aarti Sanctum (Center)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-orange-500 inline-block"></span> VIP / Orchestra Stage
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-amber-500 inline-block"></span> Food &amp; Water Plaza
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-emerald-500 inline-block"></span> Parking Lots (Free 2-W)
          </span>
          <span className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded bg-blue-500 inline-block"></span> General Car Parking
          </span>
        </div>
      </div>
    </div>
  );
};
