import React, { useState } from 'react';
import { GarbaVenue, AHMEDABAD_AREAS } from '../data/ahmedabadGarbaData';
import { Building2, MapPin, Layers, Users, Car, Link as LinkIcon, Image as ImageIcon, Send, CheckCircle2, Upload, Sparkles } from 'lucide-react';

interface AddVenueFormProps {
  onAddVenue: (venue: GarbaVenue) => void;
  onCancel?: () => void;
}

export const AddVenueForm: React.FC<AddVenueFormProps> = ({ onAddVenue, onCancel }) => {
  const [entryType, setEntryType] = useState<'free' | 'pass'>('pass');
  const [formData, setFormData] = useState({
    name: '',
    subtitle: '',
    area: AHMEDABAD_AREAS[1],
    address: '',
    artists: '',
    capacity: '10,000 Dancers',
    perNightPrice: 500,
    seasonPrice: 2200,
    floorType: 'Compressed Heavy Turf with Anti-Dust Matting',
    bmsLink: 'https://in.bookmyshow.com/explore/events-ahmedabad',
    districtLink: 'https://www.district.in/events',
    carParkingBays: 400,
    bikeParkingBays: 1000,
    trafficAdvisory: 'Approachable via main road with dedicated event marshals.',
    description: '',
  });

  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([
    'https://lh3.googleusercontent.com/aida/AEtjO1UKxKVtOgUaWKP3JnV5vAQipfLDeiu_1GNqS6upsF_L7DVd76IgkDhxriYAk0hiXnZYE2wiluGbbk6NjzF2FN6YxpsHWbDq0YHFp51kvjEgiYzgqzex3yaYSNJGbzhkfAfgPkhoBM3zspwG2VG1tUMKvb__xl1r1bFS_BgLv3BkQ_oZEaa6T_VahnI814RX-G7niyGdCtNSsQ8gWAB3xBJ-4-dmTUe48kipCupdNAx9m5LOdX7p3Elhh1Q'
  ]);

  const [submitted, setSubmitted] = useState(false);

  // File upload simulation (read as data URL for instant live rendering)
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setUploadedPhotos(prev => [event.target!.result as string, ...prev]);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Default coordinates near selected Ahmedabad area
    let lat = 23.0450;
    let lng = 72.5200;
    if (formData.area.includes('Bopal')) {
      lat = 23.0290;
      lng = 72.4650;
    } else if (formData.area.includes('Sindhu Bhavan')) {
      lat = 23.0440;
      lng = 72.5010;
    } else if (formData.area.includes('Vastrapur') || formData.area.includes('Memnagar')) {
      lat = 23.0480;
      lng = 72.5340;
    } else if (formData.area.includes('Old City') || formData.area.includes('Manek Chowk')) {
      lat = 23.0245;
      lng = 72.5880;
    } else if (formData.area.includes('Lal Darwaja')) {
      lat = 23.0270;
      lng = 72.5800;
    }

    const isFree = entryType === 'free';

    const newVenue: GarbaVenue = {
      id: `venue-${Date.now()}`,
      name: formData.name,
      subtitle: formData.subtitle || `${formData.area} Ahmedabad Navratri Ground`,
      area: formData.area,
      address: formData.address || `${formData.name}, ${formData.area}, Ahmedabad, Gujarat`,
      lat,
      lng,
      artists: formData.artists || 'Live Folk Mandli & Traditional Dhol Tasha',
      capacity: formData.capacity,
      rating: 4.8,
      reviewCount: 1,
      entryType: isFree ? 'free' : 'pass',
      perNightPrice: isFree ? 0 : Number(formData.perNightPrice),
      seasonPrice: isFree ? 0 : Number(formData.seasonPrice),
      bmsLink: isFree ? '' : formData.bmsLink,
      districtLink: isFree ? '' : formData.districtLink,
      bannerImage: uploadedPhotos[0],
      badge: isFree ? 'Community Free Entry' : 'Organizer Registered Arena',
      floorType: formData.floorType,
      perks: [
        isFree ? '100% Free Public Entry' : 'Verified RFID Wristbands',
        'Traditional Dhol Beats',
        `${formData.carParkingBays} Car Bays Available`,
        'Safe Family Enclosure',
        'RO Drinking Water Points'
      ],
      description: formData.description || `Registered festival arena in ${formData.area} featuring vibrant folk music and spacious dance rings.`,
      trafficAdvisory: formData.trafficAdvisory,
      parking: [
        {
          lotName: `${formData.name.split(' ')[0]} Main Parking Bay`,
          totalBays: Number(formData.carParkingBays),
          availableBays: Math.floor(Number(formData.carParkingBays) * 0.75),
          status: 'Green Flow',
          transitTimeMins: 3,
          type: 'Guarded Event Car Park',
          advice: 'Approach following local marshal directions.',
          lat: lat + 0.001,
          lng: lng + 0.001,
        }
      ],
      reviews: [
        {
          id: `rev-initial-${Date.now()}`,
          author: 'Ahmedabad Event Marshal',
          role: 'Ground Coordinator',
          rating: 5.0,
          date: 'Navratri 2025 Approved',
          text: `Verified ground entry and parking slots recorded for ${formData.name}. Ready for festive celebration.`,
          parkingUsed: 'Main Bay',
          dropTime: 'Immediate Access',
          likes: 5,
          avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80',
        }
      ]
    };

    onAddVenue(newVenue);
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      if (onCancel) onCancel();
    }, 2000);
  };

  return (
    <div className="w-full max-w-4xl mx-auto flex flex-col gap-6 text-slate-800 dark:text-slate-100">
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md dark:shadow-xl space-y-6">
        <div>
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-orange-100 dark:bg-orange-600/20 text-orange-800 dark:text-orange-400 text-xs font-bold border border-orange-300 dark:border-orange-500/30 mb-2">
            <Building2 className="w-3.5 h-3.5" />
            <span>Organizer Ground Registration</span>
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-slate-900 dark:text-white">
            List an Ahmedabad Garba Ground or Society Event
          </h2>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
            Add your party plot, society ground, or heritage temple garba to the live Ahmedabad Garba Radar.
          </p>
        </div>

        {submitted ? (
          <div className="p-6 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600 text-center space-y-2">
            <CheckCircle2 className="w-12 h-12 text-emerald-600 dark:text-emerald-400 mx-auto" />
            <h3 className="text-lg font-bold text-emerald-900 dark:text-emerald-200">Venue Successfully Added!</h3>
            <p className="text-xs text-emerald-800 dark:text-emerald-300">
              Your venue is now live on the interactive Google Map and passes matrix.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6 text-xs">
            {/* ENTRY TYPE SELECTION (FREE VS PASS) */}
            <div className="p-4 rounded-xl bg-orange-50/70 dark:bg-[#181B26] border border-orange-200 dark:border-slate-700/60 space-y-3">
              <label className="font-bold text-sm text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Select Entry &amp; Ticketing Model</span>
              </label>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setEntryType('free')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    entryType === 'free'
                      ? 'bg-emerald-50 dark:bg-emerald-950/50 border-emerald-500 ring-2 ring-emerald-500/40'
                      : 'bg-white dark:bg-[#11141E] border-slate-200 dark:border-slate-700 hover:border-emerald-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-emerald-800 dark:text-emerald-300">
                      100% Free Entry Community Garba
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-extrabold border border-emerald-300 dark:border-emerald-600/40">
                      ₹0 Entry
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    For public pols, temple chowks, student festivals, and open society grounds. No tickets or passes needed.
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => setEntryType('pass')}
                  className={`p-4 rounded-xl border text-left transition-all ${
                    entryType === 'pass'
                      ? 'bg-orange-50 dark:bg-orange-950/40 border-orange-500 ring-2 ring-orange-500/40'
                      : 'bg-white dark:bg-[#11141E] border-slate-200 dark:border-slate-700 hover:border-orange-300'
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-xs text-orange-800 dark:text-orange-300">
                      Pass / Ticketed Arena
                    </span>
                    <span className="px-2 py-0.5 rounded-full bg-orange-100 dark:bg-orange-950 text-orange-800 dark:text-orange-300 text-[10px] font-bold border border-orange-300 dark:border-orange-600/40">
                      Paid Passes
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-600 dark:text-slate-400">
                    For club party plots and commercial grounds selling single night or season passes on BookMyShow or District.
                  </p>
                </button>
              </div>
            </div>

            {/* General Info */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Venue / Ground Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Shivalik Party Plot Garba 2025"
                  className="w-full bg-slate-50 dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Ahmedabad Corridor / Area</label>
                <select
                  value={formData.area}
                  onChange={(e) => setFormData({ ...formData, area: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                >
                  {AHMEDABAD_AREAS.filter(a => a !== 'All Ahmedabad').map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Address & Artists */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Detailed Street Address</label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="e.g. Near Iscon Cross Road, SG Highway, Ahmedabad"
                  className="w-full bg-slate-50 dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Performing Artists / Orchestra</label>
                <input
                  type="text"
                  value={formData.artists}
                  onChange={(e) => setFormData({ ...formData, artists: e.target.value })}
                  placeholder="e.g. Devang Patel, Live Traditional Dhol Troupe"
                  className="w-full bg-slate-50 dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            {/* Pricing (Conditional) */}
            {entryType === 'pass' && (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 p-4 rounded-xl bg-orange-50/50 dark:bg-[#181B26] border border-orange-200 dark:border-slate-700/60">
                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Single Night Pass Price (₹)</label>
                  <input
                    type="number"
                    value={formData.perNightPrice}
                    onChange={(e) => setFormData({ ...formData, perNightPrice: Number(e.target.value) })}
                    className="w-full bg-white dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">9-Night Season Pass (₹)</label>
                  <input
                    type="number"
                    value={formData.seasonPrice}
                    onChange={(e) => setFormData({ ...formData, seasonPrice: Number(e.target.value) })}
                    className="w-full bg-white dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                    required
                  />
                </div>
              </div>
            )}

            {/* Parking Capacity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Car Parking Capacity (Bays)</label>
                <input
                  type="number"
                  value={formData.carParkingBays}
                  onChange={(e) => setFormData({ ...formData, carParkingBays: Number(e.target.value) })}
                  className="w-full bg-slate-50 dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>

              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Floor Surface Type</label>
                <input
                  type="text"
                  value={formData.floorType}
                  onChange={(e) => setFormData({ ...formData, floorType: e.target.value })}
                  className="w-full bg-slate-50 dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  required
                />
              </div>
            </div>

            {/* Photo Upload */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                Upload Venue Banner / Ground Photo
              </label>
              <div className="flex items-center gap-4">
                <label className="cursor-pointer inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-orange-50 dark:bg-[#11141E] border border-orange-200 dark:border-slate-700 text-orange-700 dark:text-slate-200 hover:border-orange-400 font-semibold transition-colors">
                  <Upload className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                  <span>Choose Photo File</span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
                {uploadedPhotos[0] && (
                  <div className="w-16 h-12 rounded-lg overflow-hidden border border-orange-400 shadow-xs">
                    <img src={uploadedPhotos[0]} alt="Preview" className="w-full h-full object-cover" />
                  </div>
                )}
              </div>
            </div>

            {/* Description */}
            <div>
              <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Description &amp; Highlights</label>
              <textarea
                rows={3}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Mention stage layout, circle capacity, sound setup, water points, or any special rules..."
                className="w-full bg-slate-50 dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
              />
            </div>

            {/* Submit Actions */}
            <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-200 dark:border-slate-800">
              {onCancel && (
                <button
                  type="button"
                  onClick={onCancel}
                  className="px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-[#1E2232] text-slate-700 dark:text-slate-300 font-bold transition-colors"
                >
                  Cancel
                </button>
              )}
              <button
                type="submit"
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold transition-all shadow-md flex items-center gap-2"
              >
                <Send className="w-4 h-4" />
                <span>Register Venue on Ahmedabad Radar</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
