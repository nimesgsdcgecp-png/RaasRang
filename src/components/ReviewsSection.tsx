import React, { useState } from 'react';
import { GarbaVenue, ReviewItem } from '../data/ahmedabadVenues';

interface ReviewsSectionProps {
  venue: GarbaVenue;
  onAddReview: (venueId: string, review: ReviewItem) => void;
  onOpenBooking: (venue: GarbaVenue) => void;
}

export const ReviewsSection: React.FC<ReviewsSectionProps> = ({
  venue,
  onAddReview,
  onOpenBooking,
}) => {
  const [filterTag, setFilterTag] = useState<string>('all');
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);

  // New Review Form State
  const [userName, setUserName] = useState('');
  const [userBadge, setUserBadge] = useState('Ahmedabad Garba Enthusiast');
  const [rating, setRating] = useState(5);
  const [content, setContent] = useState('');
  const [attendeeTip, setAttendeeTip] = useState('');
  const [parkingUsed, setParkingUsed] = useState('Lot A Valet');
  const [selectedTags, setSelectedTags] = useState<string[]>(['Superb Acoustics', 'Safe For Women']);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const availableTags = [
    'Superb Acoustics',
    'Dust-Free Turf',
    'Smooth Valet',
    'Safe For Women',
    'Clean Washrooms',
    'Farsan Stalls',
    'Barefoot Wooden Floor',
    'Aarti Divinity',
  ];

  const handleTagToggle = (tag: string) => {
    if (selectedTags.includes(tag)) {
      setSelectedTags(selectedTags.filter((t) => t !== tag));
    } else {
      setSelectedTags([...selectedTags, tag]);
    }
  };

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      Array.from(e.target.files).forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          if (typeof reader.result === 'string') {
            setUploadedPhotos((prev) => [...prev, reader.result as string]);
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!content.trim() || !userName.trim()) return;

    setIsSubmitting(true);
    const newRev: ReviewItem = {
      id: `rev-${Date.now()}`,
      userName: userName.trim(),
      userBadge: userBadge,
      avatar:
        uploadedPhotos[0] ||
        'https://lh3.googleusercontent.com/aida-public/AB6AXuBgv2jVNAVzHkhGZkJKt9UXf9Wa0xBGmLqOFOm3wx05yX4l8996VGQNSHXb3P2S9rtgeURvjvzSjQvTa6M8xxhrPYKa03tavOQNJbRGZrKaq-m0bM-AqY8pc0b6kWAtVYZ0X8lvgtDHl92RAK8jUpL6whtVePTBJUz8LcFkpU_5wvKRmiU0VezhmcOnF7o55kB8NfQjxo3Chy-khpEiQ4Q-lPLd08TaCnCKwvuGCCLii4UKuPdwcrBp',
      rating,
      date: 'Just Now • Navratri 2025',
      nightsAttended: 'Day 3 & 4',
      rfidVerified: true,
      content: content.trim(),
      attendeeTip: attendeeTip.trim() || undefined,
      parkingUsed: parkingUsed,
      transitTime: 'Turnstile verified',
      tags: selectedTags,
      photos: uploadedPhotos.length > 0 ? uploadedPhotos : undefined,
      likes: 1,
    };

    onAddReview(venue.id, newRev);
    setIsSubmitting(false);
    setShowSubmitModal(false);
    setContent('');
    setAttendeeTip('');
    setUploadedPhotos([]);
  };

  const filteredReviews = venue.reviews.filter((r) => {
    if (filterTag === 'all') return true;
    if (filterTag === 'photos') return r.photos && r.photos.length > 0;
    if (filterTag === 'parking') return r.tags.some((t) => t.toLowerCase().includes('valet') || t.toLowerCase().includes('parking'));
    if (filterTag === 'music') return r.tags.some((t) => t.toLowerCase().includes('acoustics') || t.toLowerCase().includes('sound'));
    return true;
  });

  return (
    <div className="flex flex-col gap-6 w-full">
      {/* Top Banner and Scorecard */}
      <div className="p-6 md:p-8 rounded-2xl bg-[#151824] border border-amber-500/20 shadow-xl flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-2xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-600/30 text-orange-300 border border-orange-500/40 text-[10px] font-bold uppercase tracking-wider">
              Verified Attendee Community
            </span>
            <span className="text-xs text-slate-400">• Day 3 &amp; 4 Crowd Telemetry</span>
          </div>
          <h2 className="font-headline text-2xl md:text-3xl font-bold text-white">
            {venue.name} Reviews &amp; Dancer Insights
          </h2>
          <p className="text-xs md:text-sm text-slate-300 leading-relaxed">
            Real feedback from passholders covering sound acoustics, dust suppression, parking turnarounds, and midnight Aarti devotion.
          </p>
        </div>

        {/* Rating Score Box */}
        <div className="flex items-center gap-4 bg-[#11141E] p-4 rounded-xl border border-amber-500/30 self-stretch sm:self-auto justify-between sm:justify-start">
          <div className="flex flex-col items-center">
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-bold text-amber-300">{venue.rating}</span>
              <span className="text-xs text-slate-400">/ 5.0</span>
            </div>
            <div className="flex text-amber-400 my-0.5">
              {[...Array(5)].map((_, i) => (
                <span key={i} className="material-symbols-outlined text-sm leading-none">
                  star
                </span>
              ))}
            </div>
            <span className="text-[10px] text-slate-400">{venue.reviewsCount} Verified Dancers</span>
          </div>

          <div className="h-12 w-px bg-slate-700"></div>

          <button
            onClick={() => setShowSubmitModal(true)}
            className="px-4 py-2.5 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold text-xs transition-all shadow-md flex items-center gap-1.5"
          >
            <span className="material-symbols-outlined text-sm">rate_review</span>
            <span>Write Review</span>
          </button>
        </div>
      </div>

      {/* Ratings Breakdown Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-3.5 rounded-xl bg-[#11141E] border border-amber-500/15 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Music &amp; Sound</span>
            <span className="font-bold text-amber-400">4.9 / 5</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-amber-400 h-full w-[98%]"></div>
          </div>
          <span className="text-[10px] text-slate-400">16 Line-Array Towers</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#11141E] border border-amber-500/15 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Dance Floor Turf</span>
            <span className="font-bold text-orange-400">4.8 / 5</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-orange-400 h-full w-[94%]"></div>
          </div>
          <span className="text-[10px] text-slate-400">Barefoot Anti-Dust Turf</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#11141E] border border-amber-500/15 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Parking &amp; Transit</span>
            <span className="font-bold text-emerald-400">4.7 / 5</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-emerald-400 h-full w-[92%]"></div>
          </div>
          <span className="text-[10px] text-slate-400">Avg 3 min Gate Transit</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#11141E] border border-amber-500/15 flex flex-col gap-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Food &amp; Washrooms</span>
            <span className="font-bold text-amber-300">4.6 / 5</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-amber-300 h-full w-[88%]"></div>
          </div>
          <span className="text-[10px] text-slate-400">RO Water &amp; AC Blocks</span>
        </div>

        <div className="p-3.5 rounded-xl bg-[#11141E] border border-amber-500/15 flex flex-col gap-1 col-span-2 sm:col-span-1">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-400">Midnight Aarti Aura</span>
            <span className="font-bold text-red-400">5.0 / 5</span>
          </div>
          <div className="w-full bg-slate-800 h-1.5 rounded-full overflow-hidden mt-1">
            <div className="bg-red-500 h-full w-[100%]"></div>
          </div>
          <span className="text-[10px] text-slate-400">12:00 AM Maha Aarti</span>
        </div>
      </div>

      {/* Review Filters & Feed */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center justify-between flex-wrap gap-2">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            <button
              onClick={() => setFilterTag('all')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterTag === 'all'
                  ? 'bg-orange-600 text-white'
                  : 'bg-[#151824] text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              All Reviews ({venue.reviews.length})
            </button>
            <button
              onClick={() => setFilterTag('photos')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterTag === 'photos'
                  ? 'bg-orange-600 text-white'
                  : 'bg-[#151824] text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              With Photos
            </button>
            <button
              onClick={() => setFilterTag('parking')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterTag === 'parking'
                  ? 'bg-orange-600 text-white'
                  : 'bg-[#151824] text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              Parking &amp; Logistics
            </button>
            <button
              onClick={() => setFilterTag('music')}
              className={`px-3 py-1.5 rounded-full text-xs font-bold transition-all ${
                filterTag === 'music'
                  ? 'bg-orange-600 text-white'
                  : 'bg-[#151824] text-slate-400 hover:text-slate-200 border border-slate-700'
              }`}
            >
              Music &amp; Acoustic Rig
            </button>
          </div>

          <button
            onClick={() => onOpenBooking(venue)}
            className="text-xs font-bold text-amber-400 hover:underline flex items-center gap-1"
          >
            <span className="material-symbols-outlined text-sm">confirmation_number</span>
            Book Verified Pass For This Ground &rarr;
          </button>
        </div>

        {/* Reviews Cards List */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredReviews.map((rev) => (
            <div
              key={rev.id}
              className="p-5 rounded-2xl bg-[#151824] border border-amber-500/15 hover:border-amber-500/35 transition-all shadow-md flex flex-col justify-between gap-4"
            >
              <div className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <img
                      src={rev.avatar}
                      alt={rev.userName}
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-orange-500/60 shadow"
                    />
                    <div className="flex flex-col">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-sm text-white">{rev.userName}</span>
                        {rev.rfidVerified && (
                          <span className="px-2 py-0.5 rounded-full bg-orange-950 text-orange-300 text-[10px] font-bold border border-orange-500/30 flex items-center gap-0.5">
                            <span className="material-symbols-outlined text-[11px] leading-none">verified</span>
                            {rev.userBadge}
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] text-slate-400">
                        {rev.date} • {rev.nightsAttended}
                      </span>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 px-2.5 py-1 rounded-lg bg-[#11141E] border border-amber-500/20 text-amber-300 text-xs font-bold">
                    <span className="material-symbols-outlined text-xs leading-none">star</span>
                    <span>{rev.rating}</span>
                  </div>
                </div>

                <p className="text-xs text-slate-200 leading-relaxed">{rev.content}</p>

                {rev.attendeeTip && (
                  <div className="p-3 rounded-xl bg-[#11141E] border border-amber-500/20 flex flex-col gap-1 text-xs">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1">
                      <span className="material-symbols-outlined text-sm leading-none">lightbulb</span>
                      Local Attendee Tip
                    </span>
                    <p className="text-slate-300 text-[11px]">{rev.attendeeTip}</p>
                  </div>
                )}

                {rev.photos && rev.photos.length > 0 && (
                  <div className="grid grid-cols-2 gap-2 pt-1">
                    {rev.photos.map((img, i) => (
                      <div key={i} className="h-36 rounded-xl overflow-hidden bg-black border border-slate-700">
                        <img src={img} alt="Attendee snap" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <div className="pt-2 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
                <span className="text-[11px]">
                  Parking: <strong className="text-slate-200">{rev.parkingUsed || 'Lot A'}</strong>
                </span>
                <button
                  onClick={() => alert('Thanks for marking this review helpful!')}
                  className="hover:text-amber-400 flex items-center gap-1 text-xs transition-colors"
                >
                  <span className="material-symbols-outlined text-sm">thumb_up</span>
                  <span>Helpful ({rev.likes})</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Review Submission Modal */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 overflow-y-auto">
          <div className="w-full max-w-lg rounded-2xl bg-[#151824] border border-amber-500/30 p-6 shadow-2xl flex flex-col gap-4 my-8">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <span className="material-symbols-outlined text-orange-400 text-xl">rate_review</span>
                <h3 className="font-headline text-lg font-bold text-white">
                  Add Review: {venue.name}
                </h3>
              </div>
              <button
                onClick={() => setShowSubmitModal(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <form onSubmit={handleReviewSubmit} className="flex flex-col gap-4 text-xs">
              <div>
                <label className="block text-slate-300 font-bold mb-1">Your Name *</label>
                <input
                  type="text"
                  required
                  value={userName}
                  onChange={(e) => setUserName(e.target.value)}
                  placeholder="e.g. Nirav Patel"
                  className="w-full px-3 py-2 rounded-xl bg-[#11141E] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Attendee Badge</label>
                <select
                  value={userBadge}
                  onChange={(e) => setUserBadge(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-[#11141E] border border-slate-700 text-white focus:outline-none focus:border-orange-500"
                >
                  <option value="Ahmedabad Garba Enthusiast">Ahmedabad Garba Enthusiast</option>
                  <option value="Verified Season Passholder">Verified Season Passholder</option>
                  <option value="BMS Verified Passholder">BMS Verified Passholder</option>
                  <option value="District App Pass">District App Pass</option>
                  <option value="Circle Lead Dancer">Circle Lead Dancer</option>
                </select>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Star Rating (1 - 5)</label>
                <div className="flex items-center gap-2">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      type="button"
                      key={star}
                      onClick={() => setRating(star)}
                      className="p-1 text-amber-400 hover:scale-110 transition-transform"
                    >
                      <span
                        className="material-symbols-outlined text-2xl"
                        style={{ fontVariationSettings: `'FILL' ${star <= rating ? 1 : 0}` }}
                      >
                        star
                      </span>
                    </button>
                  ))}
                  <span className="font-bold text-amber-300 ml-2">{rating}.0 / 5.0</span>
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Select Highlights</label>
                <div className="flex flex-wrap gap-1.5">
                  {availableTags.map((tag) => (
                    <button
                      type="button"
                      key={tag}
                      onClick={() => handleTagToggle(tag)}
                      className={`px-2.5 py-1 rounded-full text-[11px] font-semibold transition-all ${
                        selectedTags.includes(tag)
                          ? 'bg-orange-600 text-white shadow-sm'
                          : 'bg-[#11141E] text-slate-400 border border-slate-700'
                      }`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">Your Ground Experience *</label>
                <textarea
                  rows={3}
                  required
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="Share details on sound acoustics, dance rhythm, crowd behavior, food stalls..."
                  className="w-full px-3 py-2 rounded-xl bg-[#11141E] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                ></textarea>
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Local Pro-Tip for other Dancers (Optional)
                </label>
                <input
                  type="text"
                  value={attendeeTip}
                  onChange={(e) => setAttendeeTip(e.target.value)}
                  placeholder="e.g. Park at Lot C to exit in 2 minutes after midnight"
                  className="w-full px-3 py-2 rounded-xl bg-[#11141E] border border-slate-700 text-white placeholder:text-slate-500 focus:outline-none focus:border-orange-500"
                />
              </div>

              <div>
                <label className="block text-slate-300 font-bold mb-1">
                  Add Photos of the Ground / Your Outfit (Optional)
                </label>
                <div className="p-4 rounded-xl border-2 border-dashed border-slate-700 bg-[#11141E] flex flex-col items-center justify-center text-center cursor-pointer hover:border-orange-500 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handlePhotoUpload}
                    className="hidden"
                    id="review-photo-input"
                  />
                  <label htmlFor="review-photo-input" className="cursor-pointer flex flex-col items-center">
                    <span className="material-symbols-outlined text-2xl text-orange-400 mb-1">
                      add_photo_alternate
                    </span>
                    <span className="font-bold text-slate-200">Click to upload photos</span>
                    <span className="text-[10px] text-slate-400">JPG, PNG supported</span>
                  </label>
                </div>
                {uploadedPhotos.length > 0 && (
                  <div className="flex items-center gap-2 mt-2 overflow-x-auto py-1">
                    {uploadedPhotos.map((src, idx) => (
                      <img
                        key={idx}
                        src={src}
                        alt="Upload preview"
                        className="w-14 h-14 rounded-lg object-cover border border-amber-500/40 shrink-0"
                      />
                    ))}
                  </div>
                )}
              </div>

              <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-800">
                <button
                  type="button"
                  onClick={() => setShowSubmitModal(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 text-slate-300 hover:text-white"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 rounded-xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-600 hover:to-amber-600 text-white font-bold transition-all shadow-md"
                >
                  Publish Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
