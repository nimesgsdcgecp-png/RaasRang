import React, { useState } from 'react';
import { GarbaVenue } from '../data/ahmedabadGarbaData';
import {
  MapPin,
  Navigation,
  Car,
  ShieldCheck,
  Ticket,
  QrCode,
  Star,
  Clock,
  AlertTriangle,
  CheckCircle,
  Info,
  ExternalLink,
  ArrowLeft,
  Sparkles,
  CheckCircle2,
  Share2,
  Check,
  Copy
} from 'lucide-react';

interface GroundDetailViewProps {
  venue: GarbaVenue;
  onBack: () => void;
  onBookPass: (venue: GarbaVenue) => void;
  onReviewClick: () => void;
}

export const GroundDetailView: React.FC<GroundDetailViewProps> = ({
  venue,
  onBack,
  onBookPass,
  onReviewClick,
}) => {
  const isFree = venue.entryType === 'free' || venue.perNightPrice === 0;

  const [copied, setCopied] = useState(false);
  const [shareFeedback, setShareFeedback] = useState<string | null>(null);

  const handleShare = async () => {
    // Generate deep link with ?venue=<venueId>
    const url = new URL(window.location.href);
    url.searchParams.set('venue', venue.id);
    const deepLinkUrl = url.toString();

    const isFreeVenue = venue.entryType === 'free' || venue.perNightPrice === 0;
    const shareData = {
      title: `${venue.name} - Ahmedabad Navratri Garba 2025`,
      text: `Check out ${venue.name} in ${venue.area}, Ahmedabad! Live parking availability, artist lineup, and ${isFreeVenue ? '100% Free Public Entry' : `official passes (₹${venue.perNightPrice})`} on RaasRang.`,
      url: deepLinkUrl,
    };

    // Use Web Share API if available
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        setShareFeedback('Shared successfully!');
        setTimeout(() => setShareFeedback(null), 3000);
        return;
      } catch (err: unknown) {
        // If user cancelled, don't show error; if permission denied or unsupported payload, fallback to clipboard
        if ((err as Error)?.name === 'AbortError') {
          return;
        }
      }
    }

    // Fallback: Copy deep link to clipboard
    try {
      await navigator.clipboard.writeText(deepLinkUrl);
      setCopied(true);
      setShareFeedback('Deep link copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setShareFeedback(null);
      }, 3500);
    } catch {
      // Manual fallback if clipboard API is restricted
      const textArea = document.createElement('textarea');
      textArea.value = deepLinkUrl;
      textArea.style.position = 'fixed';
      textArea.style.opacity = '0';
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);

      setCopied(true);
      setShareFeedback('Deep link copied to clipboard!');
      setTimeout(() => {
        setCopied(false);
        setShareFeedback(null);
      }, 3500);
    }
  };

  return (
    <div className="w-full max-w-7xl mx-auto flex flex-col gap-8 pb-16 text-slate-800 dark:text-slate-100">
      {/* Top Breadcrumb & Action bar */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-white dark:bg-[#151824] hover:bg-slate-100 dark:hover:bg-[#1E2232] text-slate-700 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white text-xs font-bold transition-colors border border-amber-200/80 dark:border-amber-500/20 shadow-xs"
        >
          <ArrowLeft className="w-4 h-4 text-orange-600 dark:text-orange-400" />
          <span>Back to All Grounds</span>
        </button>

        <div className="flex items-center gap-2 flex-wrap">
          {/* Share Button (Web Share API + Clipboard Fallback) */}
          <button
            type="button"
            onClick={handleShare}
            title="Share this venue deep link"
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 border ${
              copied
                ? 'bg-emerald-600 text-white border-emerald-500'
                : 'bg-white dark:bg-[#151824] hover:bg-orange-50 dark:hover:bg-[#1E2232] text-orange-700 dark:text-orange-400 border-orange-300 dark:border-amber-500/30'
            }`}
          >
            {copied ? (
              <>
                <Check className="w-4 h-4 text-white" />
                <span>Link Copied!</span>
              </>
            ) : (
              <>
                <Share2 className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                <span>Share Ground</span>
              </>
            )}
          </button>

          <button
            type="button"
            onClick={onReviewClick}
            className="px-4 py-2 rounded-xl bg-white dark:bg-[#151824] hover:bg-slate-100 dark:hover:bg-[#1E2232] text-amber-700 dark:text-amber-300 text-xs font-bold border border-amber-300 dark:border-amber-500/30 transition-colors shadow-xs"
          >
            ★ Read Reviews ({venue.reviewCount})
          </button>

          <button
            type="button"
            onClick={() => onBookPass(venue)}
            className={`px-5 py-2 rounded-xl text-white text-xs font-bold transition-all shadow-md flex items-center gap-1.5 ${
              isFree
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500'
                : 'bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500'
            }`}
          >
            {isFree ? (
              <>
                <CheckCircle2 className="w-4 h-4" />
                <span>Free Entry &amp; Directions</span>
              </>
            ) : (
              <>
                <Ticket className="w-4 h-4" />
                <span>Book Official Pass</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Floating Share Feedback Toast */}
      {shareFeedback && (
        <div className="fixed top-24 right-6 z-50 bg-gradient-to-r from-emerald-600 to-teal-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-emerald-400/40 text-xs font-bold flex items-center gap-2 animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-emerald-200" />
          <span>{shareFeedback}</span>
        </div>
      )}

      {/* Venue Header Summary */}
      <section className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md dark:shadow-xl flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div className="flex flex-col gap-2 max-w-3xl">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="px-2.5 py-0.5 rounded-full bg-orange-100 dark:bg-orange-600/20 text-orange-800 dark:text-orange-400 font-bold text-xs border border-orange-300 dark:border-orange-500/30">
              Verified Landmark Ground • {venue.area}
            </span>
            {isFree ? (
              <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-800 dark:text-emerald-300 text-xs font-extrabold border border-emerald-300 dark:border-emerald-600/40">
                100% Free Public Entry (₹0)
              </span>
            ) : (
              <span className="flex items-center gap-1 text-amber-700 dark:text-amber-300 text-xs font-bold">
                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                <span>{venue.rating.toFixed(1)} ({venue.reviewCount} verified dancer reviews)</span>
              </span>
            )}
          </div>

          <h1 className="font-headline text-2xl md:text-4xl font-bold text-slate-900 dark:text-white">
            {venue.name}
          </h1>
          <p className="text-xs md:text-sm text-slate-600 dark:text-slate-300 flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-orange-600 dark:text-orange-400 shrink-0" />
            <span>{venue.address}</span>
          </p>
          <p className="text-xs text-slate-600 dark:text-slate-400 pt-1 leading-relaxed">
            {venue.description}
          </p>
        </div>

        {/* Quick Pricing Box */}
        <div className="p-4 rounded-xl bg-orange-50/70 dark:bg-[#11141E] border border-orange-200 dark:border-slate-800 flex flex-col gap-2 w-full lg:w-72">
          <div className="flex items-center justify-between text-xs">
            <span className="text-slate-600 dark:text-slate-400">Entry Type:</span>
            {isFree ? (
              <span className="font-extrabold text-emerald-700 dark:text-emerald-400">100% Free Public</span>
            ) : (
              <span className="font-bold text-slate-900 dark:text-white">Ticketed Pass</span>
            )}
          </div>
          <div className="flex items-center justify-between text-xs pt-2 border-t border-orange-200/60 dark:border-slate-800">
            <span className="text-slate-600 dark:text-slate-400">Per Night Rate:</span>
            <span className="font-bold text-amber-700 dark:text-amber-300 text-base">
              {isFree ? '₹0 Free' : `₹${venue.perNightPrice}`}
            </span>
          </div>
          {!isFree && (
            <div className="flex items-center justify-between text-xs pt-1 border-t border-orange-200/60 dark:border-slate-800">
              <span className="text-slate-600 dark:text-slate-400">9-Night Season Pass:</span>
              <span className="font-bold text-orange-700 dark:text-orange-400 text-sm">₹{venue.seasonPrice}</span>
            </div>
          )}

          <div className="pt-2 flex flex-col gap-2">
            <button
              type="button"
              onClick={() => onBookPass(venue)}
              className={`w-full py-2.5 rounded-lg text-white font-bold text-xs transition-all shadow-xs ${
                isFree
                  ? 'bg-emerald-600 hover:bg-emerald-700'
                  : 'bg-orange-600 hover:bg-orange-700'
              }`}
            >
              {isFree ? 'View Free Access & Parking Guide' : 'Reserve Official Pass'}
            </button>

            {/* Quick Share Deep Link Button */}
            <button
              type="button"
              onClick={handleShare}
              className="w-full py-2 rounded-lg bg-white dark:bg-[#181B26] hover:bg-orange-50 dark:hover:bg-[#252B3E] text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors border border-slate-200 dark:border-slate-700 flex items-center justify-center gap-1.5"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5 text-orange-500" />}
              <span>{copied ? 'Link Copied!' : 'Copy Venue Deep Link'}</span>
            </button>
          </div>
        </div>
      </section>

      {/* Photo Bento Grid */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="md:col-span-2 h-80 rounded-2xl overflow-hidden relative shadow-lg group border border-amber-200/70 dark:border-amber-500/15">
          <img
            src={venue.bannerImage}
            alt={venue.name}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
          <div className="absolute bottom-4 left-4 text-white">
            <span className="text-[10px] uppercase font-bold tracking-widest text-amber-300 block">
              Arena Atmosphere
            </span>
            <h3 className="font-headline text-lg font-bold">14 Concentric Circles &amp; Grand Aarti Aura</h3>
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div className="p-5 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Ground Specifications
              </span>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Floor Surface Quality</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{venue.floorType}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800">
              <span className="text-xs font-semibold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <CheckCircle className="w-3.5 h-3.5" />
                <span>100% Barefoot Step Certified</span>
              </span>
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md flex-1 flex flex-col justify-between">
            <div className="space-y-1">
              <span className="text-[10px] font-bold uppercase tracking-wider text-orange-600 dark:text-orange-400">
                Live Artists &amp; Troupes
              </span>
              <div className="text-xs font-bold text-slate-900 dark:text-white">Folk Headliners</div>
              <p className="text-xs text-slate-600 dark:text-slate-400">{venue.artists}</p>
            </div>
            <div className="pt-2 border-t border-slate-100 dark:border-slate-800 text-[11px] text-slate-500 dark:text-slate-400">
              Capacity: {venue.capacity}
            </div>
          </div>
        </div>
      </section>

      {/* Parking Bays Telemetry Section */}
      <section className="p-6 md:p-8 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md dark:shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
          <div>
            <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
              Smart Parking Telemetry
            </span>
            <h2 className="font-headline text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
              Nearby Parking Lots &amp; Transit Times for {venue.name.split(' - ')[0]}
            </h2>
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold border border-emerald-300 dark:border-emerald-600/40">
            Real-Time Slot Sensor
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {venue.parking.map((park, index) => (
            <div
              key={index}
              className="p-4 rounded-xl bg-orange-50/40 dark:bg-[#11141E] border border-orange-200/70 dark:border-slate-800 space-y-2 shadow-xs"
            >
              <div className="flex items-start justify-between gap-2">
                <span className="text-xs font-bold text-slate-900 dark:text-white">{park.lotName}</span>
                <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-[10px] font-bold border border-emerald-300 dark:border-emerald-600/40">
                  {park.status}
                </span>
              </div>
              <div className="text-emerald-700 dark:text-emerald-400 font-bold text-sm">
                {park.availableBays} / {park.totalBays} Free Bays
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-400">{park.advice}</p>
              <div className="flex items-center justify-between pt-2 border-t border-slate-200 dark:border-slate-800 text-[10px] text-slate-500 dark:text-slate-400">
                <span>{park.type}</span>
                <span className="font-bold text-orange-600 dark:text-orange-400">~{park.transitTimeMins} mins walk</span>
              </div>
            </div>
          ))}
        </div>

        {/* Traffic Advisory */}
        <div className="p-4 rounded-xl bg-amber-50 dark:bg-amber-950/30 border border-amber-300 dark:border-amber-700/40 flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-700 dark:text-amber-400 shrink-0 mt-0.5" />
          <div className="text-xs space-y-1">
            <span className="font-bold text-amber-900 dark:text-amber-200">Ahmedabad Traffic Police Advisory</span>
            <p className="text-amber-800 dark:text-amber-300/90 leading-relaxed">{venue.trafficAdvisory}</p>
          </div>
        </div>
      </section>

      {/* Ground Perks & Guidelines */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="p-6 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md space-y-3">
          <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Key Ground Amenities &amp; Services</span>
          </h3>
          <ul className="space-y-2 text-xs">
            {venue.perks.map((perk, i) => (
              <li key={i} className="flex items-center gap-2 text-slate-700 dark:text-slate-300">
                <CheckCircle className="w-4 h-4 text-emerald-600 dark:text-emerald-400 shrink-0" />
                <span>{perk}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 rounded-2xl bg-white dark:bg-[#151824] border border-amber-200/80 dark:border-amber-500/20 shadow-md space-y-3">
          <h3 className="font-headline text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <ShieldCheck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
            <span>Dress Code &amp; Festival Etiquette</span>
          </h3>
          <ul className="space-y-2 text-xs text-slate-700 dark:text-slate-300">
            <li className="flex items-start gap-2">
              <span className="font-bold text-orange-600 dark:text-orange-400">•</span>
              <span>Traditional Chaniya Choli (women) and Kediyu / Kurta Dhoti (men) mandatory inside dancing rings.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-orange-600 dark:text-orange-400">•</span>
              <span>Footwear must be deposited at designated free shoe cloakrooms before stepping onto the turf or stone floor.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="font-bold text-orange-600 dark:text-orange-400">•</span>
              <span>Midnight 12:00 AM Maha Aarti requires silence and respectful participation with illuminated diyas.</span>
            </li>
          </ul>
        </div>
      </section>
    </div>
  );
};
