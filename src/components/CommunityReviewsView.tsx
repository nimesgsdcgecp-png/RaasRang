import React, { useState } from 'react';
import { GarbaVenue, Review } from '../data/ahmedabadGarbaData';
import { Star, ThumbsUp, MessageSquare, CheckCircle, ShieldAlert, Camera, Send, Sparkles, MapPin, CheckCircle2 } from 'lucide-react';

interface CommunityReviewsViewProps {
  venues: GarbaVenue[];
  selectedVenue: GarbaVenue;
  onSelectVenue: (venue: GarbaVenue) => void;
  onAddReview: (venueId: string, review: Review) => void;
}

export const CommunityReviewsView: React.FC<CommunityReviewsViewProps> = ({
  venues,
  selectedVenue,
  onSelectVenue,
  onAddReview,
}) => {
  // Review form state
  const [rating, setRating] = useState<number>(5);
  const [reviewText, setReviewText] = useState('');
  const [authorName, setAuthorName] = useState('Pooja Shah');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Superb Music', 'Safe for Women']);
  const [reviewPhoto, setReviewPhoto] = useState<string | null>(null);
  const [isRfidVerified, setIsRfidVerified] = useState(true);
  const [submittedFeedback, setSubmittedFeedback] = useState(false);

  const availableTags = [
    'Superb Music',
    'Quick Parking',
    'Dust Free',
    'Safe for Women',
    'Fast Food Stall Queue',
    'Barefoot Friendly',
    'Clean Washrooms',
    'Divine Midnight Aarti'
  ];

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter(t => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReviewPhoto(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewText.trim()) return;

    const newRev: Review = {
      id: `rev-user-${Date.now()}`,
      author: authorName,
      role: isRfidVerified ? 'Verified RFID Passholder' : 'Ahmedabad Attendee',
      rating,
      date: 'Just Now • Navratri 2025',
      text: reviewText,
      parkingUsed: `${selectedVenue.parking[0]?.lotName || 'Main Bay'}`,
      dropTime: 'Immediate Turnaround',
      likes: 1,
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
      photoUrl: reviewPhoto || undefined,
      photoCaption: reviewPhoto ? `Live capture at ${selectedVenue.name.split(' - ')[0]}` : undefined,
    };

    onAddReview(selectedVenue.id, newRev);
    setReviewText('');
    setReviewPhoto(null);
    setSubmittedFeedback(true);
    setTimeout(() => setSubmittedFeedback(false), 4000);
  };

  const isFree = selectedVenue.entryType === 'free' || selectedVenue.perNightPrice === 0;

  return (
    <div className="w-full flex flex-col gap-8 max-w-7xl mx-auto text-slate-800 dark:text-slate-100">
      {/* Venue Context Header & Selector */}
      <div className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md dark:shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-600/30 text-orange-800 dark:text-orange-400 text-xs font-bold border border-orange-300 dark:border-orange-500/30">
              Community Ground Reviews
            </span>
            {isFree ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold border border-emerald-300 dark:border-emerald-600/40">
                100% Free Entry Venue
              </span>
            ) : (
              <span className="text-xs text-slate-500 dark:text-slate-400">Night 4 of 9 Active Tonight</span>
            )}
          </div>
          <h2 className="text-2xl md:text-3xl font-bold font-headline text-slate-900 dark:text-white">
            {selectedVenue.name}
          </h2>
          <p className="text-xs text-slate-600 dark:text-slate-300 flex items-center gap-1">
            <MapPin className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
            <span>{selectedVenue.address}</span>
          </p>
        </div>

        {/* Change Venue Dropdown */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-3">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300">Select Ground:</label>
          <select
            value={selectedVenue.id}
            onChange={(e) => {
              const found = venues.find(v => v.id === e.target.value);
              if (found) onSelectVenue(found);
            }}
            className="bg-slate-50 dark:bg-[#11141E] border border-amber-300 dark:border-amber-500/30 text-slate-900 dark:text-slate-100 rounded-xl px-4 py-2 text-xs font-semibold focus:outline-none focus:border-orange-500 cursor-pointer shadow-xs max-w-xs"
          >
            {venues.map(v => (
              <option key={v.id} value={v.id}>
                {v.name.split(' - ')[0]} ({v.entryType === 'free' ? 'Free Entry' : `₹${v.perNightPrice}`})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Radar Quality Scorecard Bars */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Vibe &amp; Music</span>
            <span className="text-orange-600 dark:text-amber-400 font-bold">4.9</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden my-2">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: '98%' }}></div>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Live Orchestra Resonance</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Dance Floor Space</span>
            <span className="text-orange-600 dark:text-amber-400 font-bold">4.8</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden my-2">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '95%' }}></div>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">Barefoot Conducive</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Parking &amp; Entry</span>
            <span className="text-emerald-600 dark:text-emerald-400 font-bold">4.6</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden my-2">
            <div className="h-full bg-emerald-500 rounded-full" style={{ width: '92%' }}></div>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">RFID &amp; Open Gates</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/15 shadow-xs flex flex-col justify-between">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Hygiene &amp; Water</span>
            <span className="text-orange-600 dark:text-amber-400 font-bold">4.7</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden my-2">
            <div className="h-full bg-amber-500 rounded-full" style={{ width: '94%' }}></div>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">RO Drinking Taps</span>
        </div>

        <div className="p-3.5 rounded-xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/15 shadow-xs flex flex-col justify-between col-span-2 sm:col-span-1">
          <div className="flex justify-between items-center text-xs">
            <span className="text-slate-600 dark:text-slate-400 font-bold">Midnight Aarti Aura</span>
            <span className="text-orange-600 dark:text-orange-400 font-bold">5.0</span>
          </div>
          <div className="w-full h-1.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden my-2">
            <div className="h-full bg-orange-500 rounded-full" style={{ width: '100%' }}></div>
          </div>
          <span className="text-[10px] text-slate-500 dark:text-slate-400">12:00 AM Maha Aarti Peak</span>
        </div>
      </div>

      {/* Two Column Layout: Write Review Form & Verified Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Form: Rate Ground Experience */}
        <div className="lg:col-span-5 flex flex-col gap-6">
          <div className="p-6 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md dark:shadow-xl space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Rate Your Experience</span>
              </h3>
              <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold border border-emerald-300 dark:border-emerald-600/40">
                Verified Attendee
              </span>
            </div>

            {submittedFeedback && (
              <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-600/50 text-emerald-800 dark:text-emerald-300 text-xs font-semibold flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                <span>Your review and photo were successfully submitted to the community feed!</span>
              </div>
            )}

            <form onSubmit={handleReviewSubmit} className="space-y-4 text-xs">
              {/* Star Rating Selector */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Overall Ground &amp; Sound Rating
                </label>
                <div className="flex items-center gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform focus:outline-none"
                    >
                      <Star
                        className={`w-6 h-6 ${
                          star <= rating
                            ? 'fill-amber-400 text-amber-400'
                            : 'text-slate-300 dark:text-slate-600'
                        }`}
                      />
                    </button>
                  ))}
                  <span className="ml-2 font-bold text-sm text-slate-800 dark:text-amber-300">
                    {rating}.0 / 5.0
                  </span>
                </div>
              </div>

              {/* Author Name */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">Your Name</label>
                <input
                  type="text"
                  value={authorName}
                  onChange={(e) => setAuthorName(e.target.value)}
                  className="w-full bg-slate-50 dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl px-3.5 py-2.5 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500"
                  placeholder="e.g. Priyank Patel"
                  required
                />
              </div>

              {/* Tag Chips */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1.5">
                  Tag Ground Amenities &amp; Vibe
                </label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => (
                    <button
                      key={tag}
                      type="button"
                      onClick={() => handleTagToggle(tag)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all border ${
                        selectedTags.includes(tag)
                          ? 'bg-orange-600 text-white border-orange-500 shadow-xs'
                          : 'bg-slate-50 dark:bg-[#11141E] text-slate-600 dark:text-slate-400 border-slate-200 dark:border-slate-700/60 hover:border-orange-400'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              {/* Review Text Area */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Your Review &amp; Parking Tips
                </label>
                <textarea
                  rows={3}
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  placeholder="Tell fellow Ahmedabad dancers about the dust level, sound clarity, parking arrival time, and aarti atmosphere..."
                  className="w-full bg-slate-50 dark:bg-[#11141E] border border-slate-200 dark:border-slate-700/60 rounded-xl p-3 text-slate-900 dark:text-white focus:outline-none focus:border-orange-500 placeholder:text-slate-400"
                  required
                />
              </div>

              {/* Photo Upload with Live Preview */}
              <div>
                <label className="font-bold text-slate-700 dark:text-slate-300 block mb-1">
                  Add Ground Photo (Optional)
                </label>
                <div className="flex items-center gap-3">
                  <label className="cursor-pointer inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-orange-50 dark:bg-[#11141E] border border-orange-200 dark:border-slate-700 text-orange-700 dark:text-slate-300 hover:border-orange-400 transition-colors font-semibold">
                    <Camera className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span>Upload Photo</span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handlePhotoUpload}
                      className="hidden"
                    />
                  </label>
                  {reviewPhoto && (
                    <div className="relative w-12 h-12 rounded-lg overflow-hidden border border-orange-400">
                      <img src={reviewPhoto} alt="Upload preview" className="w-full h-full object-cover" />
                      <button
                        type="button"
                        onClick={() => setReviewPhoto(null)}
                        className="absolute top-0 right-0 bg-red-600 text-white text-[9px] w-4 h-4 flex items-center justify-center"
                      >
                        ×
                      </button>
                    </div>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full py-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white font-bold text-xs flex items-center justify-center gap-2 shadow-md transition-all"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Post Verified Ground Review</span>
              </button>
            </form>
          </div>
        </div>

        {/* Right Feed: Verified Community Reviews */}
        <div className="lg:col-span-7 flex flex-col gap-4">
          <div className="flex items-center justify-between">
            <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white">
              Recent Ahmedabad Dancer Reviews ({selectedVenue.reviews.length})
            </h3>
            <span className="text-xs text-slate-500 dark:text-slate-400">Sorted by most helpful</span>
          </div>

          <div className="space-y-4">
            {selectedVenue.reviews.map((rev) => (
              <div
                key={rev.id}
                className="p-5 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/15 shadow-sm space-y-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.author}
                      className="w-10 h-10 rounded-full object-cover border border-amber-300 dark:border-amber-500/40"
                    />
                    <div>
                      <div className="font-bold text-xs text-slate-900 dark:text-white flex items-center gap-1.5">
                        <span>{rev.author}</span>
                        <CheckCircle className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
                      </div>
                      <div className="text-[11px] text-orange-700 dark:text-orange-400 font-semibold">{rev.role}</div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-amber-50 dark:bg-[#11141E] px-2.5 py-1 rounded-lg border border-amber-200 dark:border-slate-800">
                    <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                    <span className="font-bold text-xs text-amber-800 dark:text-amber-300">{rev.rating.toFixed(1)}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed">{rev.text}</p>

                {/* Photo attached if available */}
                {rev.photoUrl && (
                  <div className="rounded-xl overflow-hidden border border-amber-200 dark:border-amber-500/20 max-h-56 w-full relative">
                    <img src={rev.photoUrl} alt="Review capture" className="w-full h-full object-cover" />
                    {rev.photoCaption && (
                      <div className="absolute bottom-0 inset-x-0 bg-black/70 backdrop-blur-xs p-2 text-[10px] text-amber-100">
                        {rev.photoCaption}
                      </div>
                    )}
                  </div>
                )}

                <div className="pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400">
                  <div className="flex items-center gap-2">
                    <span className="text-slate-600 dark:text-slate-400">Parking: {rev.parkingUsed}</span>
                    <span>•</span>
                    <span className="text-emerald-700 dark:text-emerald-400 font-semibold">{rev.dropTime}</span>
                  </div>
                  <div className="flex items-center gap-1 text-slate-600 dark:text-slate-400 font-semibold">
                    <ThumbsUp className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400" />
                    <span>{rev.likes} found helpful</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
