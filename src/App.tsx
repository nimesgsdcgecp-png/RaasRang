/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AHMEDABAD_VENUES, GarbaVenue, Review, AHMEDABAD_AREAS } from './data/ahmedabadGarbaData';
import { AhmedabadGarbaMap } from './components/AhmedabadGarbaMap';
import { BookingModal } from './components/BookingModal';
import { AddVenueForm } from './components/AddVenueForm';
import { CommunityReviewsView } from './components/CommunityReviewsView';
import { PassesMatrixView } from './components/PassesMatrixView';
import { GroundDetailView } from './components/GroundDetailView';
import {
  Compass,
  MapPin,
  Ticket,
  Users,
  PlusCircle,
  Search,
  Moon,
  Sun,
  Bell,
  Star,
  Car,
  ExternalLink,
  Shield,
  Sparkles,
  QrCode,
  Music,
  CheckCircle2,
  Menu,
  X,
  Navigation
} from 'lucide-react';

export default function App() {
  // Theme state: dark (Midnight Navratri) vs light (Warm Festive Ivory)
  const [isDark, setIsDark] = useState(true);

  // Tab navigation state
  const [activeTab, setActiveTab] = useState<
    'explore-events' | 'venue-and-parking-map' | 'passes-tickets' | 'community-gallery-reviews' | 'add-a-venue' | 'ground-detail'
  >('explore-events');

  // Stored Ahmedabad venues
  const [venues, setVenues] = useState<GarbaVenue[]>(() => {
    const saved = localStorage.getItem('raasrang_ahmedabad_venues');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Ensure free entry venues are included if saved data was from older session
        if (parsed.length >= AHMEDABAD_VENUES.length) {
          return parsed;
        }
      } catch {
        return AHMEDABAD_VENUES;
      }
    }
    return AHMEDABAD_VENUES;
  });

  // Selected ground for detail view
  const [selectedVenue, setSelectedVenue] = useState<GarbaVenue>(venues[0]);

  // Booking modal state
  const [bookingVenue, setBookingVenue] = useState<GarbaVenue | null>(null);
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  // Filters: Search query, Area filter, Entry filter (All vs Free vs Pass), Vibe filter
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedAreaFilter, setSelectedAreaFilter] = useState('All');
  const [entryTypeFilter, setEntryTypeFilter] = useState<'all' | 'free' | 'pass'>('all');
  const [vibeFilter, setVibeFilter] = useState('all');

  // Mobile navigation drawer
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Quota defense state
  const [quotaExceeded, setQuotaExceeded] = useState(false);

  // Notification toast
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  useEffect(() => {
    const handleQuotaExceeded = () => setQuotaExceeded(true);
    window.addEventListener('gmp-quota-exceeded', handleQuotaExceeded);
    return () => window.removeEventListener('gmp-quota-exceeded', handleQuotaExceeded);
  }, []);

  // Sync venues to localStorage
  useEffect(() => {
    localStorage.setItem('raasrang_ahmedabad_venues', JSON.stringify(venues));
  }, [venues]);

  // Deep Link handler: Load specific venue if ?venue=<id> is in URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const venueId = params.get('venue');
    if (venueId) {
      const found = venues.find(v => v.id === venueId);
      if (found) {
        setSelectedVenue(found);
        setActiveTab('ground-detail');
      }
    }
  }, [venues]);

  // Sync dark class on documentElement
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('light');
    } else {
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.add('light');
    }
  }, [isDark]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  const handleOpenBooking = (venue: GarbaVenue) => {
    setBookingVenue(venue);
    setIsBookingOpen(true);
  };

  const handleSelectGroundDetail = (venue: GarbaVenue) => {
    setSelectedVenue(venue);
    setActiveTab('ground-detail');
    // Update URL query string with ?venue=<id>
    const url = new URL(window.location.href);
    url.searchParams.set('venue', venue.id);
    window.history.replaceState(null, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToExplore = () => {
    setActiveTab('explore-events');
    const url = new URL(window.location.href);
    url.searchParams.delete('venue');
    window.history.replaceState(null, '', url.toString());
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleAddNewVenue = (newVenue: GarbaVenue) => {
    setVenues(prev => [newVenue, ...prev]);
    setSelectedVenue(newVenue);
    showToast(`"${newVenue.name}" successfully added to Ahmedabad Garba Radar!`);
  };

  const handleAddReview = (venueId: string, newReview: Review) => {
    setVenues(prev =>
      prev.map(v => {
        if (v.id === venueId) {
          const updatedReviews = [newReview, ...v.reviews];
          const newAvg = (
            updatedReviews.reduce((acc, r) => acc + r.rating, 0) / updatedReviews.length
          ).toFixed(1);
          return {
            ...v,
            rating: Number(newAvg),
            reviewCount: v.reviewCount + 1,
            reviews: updatedReviews,
          };
        }
        return v;
      })
    );
    showToast('Your verified review was published to the community feed!');
  };

  // Filtered venues for Explore
  const filteredVenues = venues.filter(v => {
    const isFree = v.entryType === 'free' || v.perNightPrice === 0;

    // Search query matches name, area, artist, or keywords like "free", "free entry", "pass"
    const query = searchQuery.toLowerCase().trim();
    let matchesSearch = true;
    if (query) {
      if (query === 'free' || query === 'free entry') {
        matchesSearch = isFree;
      } else if (query === 'pass' || query === 'ticket' || query === 'paid') {
        matchesSearch = !isFree;
      } else {
        matchesSearch =
          v.name.toLowerCase().includes(query) ||
          v.area.toLowerCase().includes(query) ||
          v.artists.toLowerCase().includes(query) ||
          v.badge.toLowerCase().includes(query);
      }
    }

    const matchesArea =
      selectedAreaFilter === 'All' || v.area.toLowerCase().includes(selectedAreaFilter.toLowerCase());

    let matchesEntry = true;
    if (entryTypeFilter === 'free') {
      matchesEntry = isFree;
    } else if (entryTypeFilter === 'pass') {
      matchesEntry = !isFree;
    }

    let matchesVibe = true;
    if (vibeFilter === 'parking') {
      matchesVibe = v.parking.some(p => p.status === 'Green Flow');
    } else if (vibeFilter === 'barefoot') {
      matchesVibe = v.floorType.toLowerCase().includes('barefoot') || v.floorType.toLowerCase().includes('grass');
    } else if (vibeFilter === 'dhol') {
      matchesVibe = v.artists.toLowerCase().includes('dhol') || v.artists.toLowerCase().includes('mandli') || v.artists.toLowerCase().includes('troup');
    }

    return matchesSearch && matchesArea && matchesEntry && matchesVibe;
  });

  const totalFreeVenues = venues.filter(v => v.entryType === 'free' || v.perNightPrice === 0).length;
  const totalPassVenues = venues.filter(v => v.entryType === 'pass' && v.perNightPrice > 0).length;

  return (
    <div className={`min-h-screen ${isDark ? 'bg-[#0B0C10] text-slate-100' : 'bg-[#FFFDF9] text-slate-900'} font-body transition-colors duration-200`}>
      {/* Client-Side Quota Defense Banner (required by skill) */}
      {quotaExceeded && (
        <div className="bg-amber-500 text-slate-950 px-4 py-2 text-xs md:text-sm text-center sticky top-0 z-50 shadow-md font-semibold border-b border-amber-600">
          <span>
            Google Maps Platform quota reached. If you are the app owner, visit{' '}
            <a
              href="https://developers.google.com/maps/ai/ai-studio?utm_campaign=gmp_mcp_codeassist_v1_aistudio#quota_exceeded_errors"
              target="_blank"
              rel="noopener noreferrer"
              className="underline font-bold text-slate-950 hover:text-black"
            >
              maps developer site
            </a>{' '}
            for instructions to update your account.
          </span>
        </div>
      )}

      {/* Toast Alert */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-gradient-to-r from-orange-600 to-amber-600 text-white px-5 py-3 rounded-2xl shadow-2xl border border-orange-400/40 text-xs font-bold flex items-center gap-2 animate-bounce">
          <Sparkles className="w-4 h-4 text-amber-200" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* HEADER */}
      <header className="fixed top-0 left-0 right-0 z-40">
        {/* Navratri Live Ticker */}
        <div className="bg-gradient-to-r from-red-700 via-orange-600 to-amber-600 text-white px-4 py-1 text-center flex items-center justify-center gap-2 shadow-xs">
          <Sparkles className="w-3.5 h-3.5 text-amber-200 animate-pulse shrink-0" />
          <p className="text-[11px] uppercase font-bold tracking-wider text-amber-100 truncate">
            AHMEDABAD NAVRATRI 2025: DISCOVER 100% FREE HERITAGE POL GARBA &amp; OFFICIAL BOOKMYSHOW / DISTRICT PASSES!
          </p>
        </div>

        {/* Navigation Bar */}
        <div className={`h-16 md:h-20 ${isDark ? 'bg-[#11141E]/95 border-amber-500/15' : 'bg-white/95 border-amber-200/80'} backdrop-blur-xl border-b shadow-sm transition-colors`}>
          <div className="w-full h-full px-4 md:px-8 flex items-center justify-between gap-4 max-w-7xl mx-auto">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="lg:hidden p-2 rounded-xl bg-orange-500/10 text-orange-600 dark:text-orange-400"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setActiveTab('explore-events');
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
                className="flex items-center gap-2.5 text-left group"
              >
                <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-red-600 to-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-950/30">
                  <span className="material-symbols-outlined text-xl">celebration</span>
                </div>
                <div className="flex flex-col">
                  <span className="font-headline text-lg md:text-xl font-bold bg-gradient-to-r from-orange-600 via-amber-600 to-orange-500 dark:from-orange-400 dark:via-amber-400 dark:to-amber-200 bg-clip-text text-transparent">
                    RaasRang
                  </span>
                  <span className="text-[10px] uppercase tracking-widest text-orange-600 dark:text-orange-400 font-bold -mt-1">
                    Ahmedabad Garba Portal
                  </span>
                </div>
              </button>
            </div>

            {/* Center Ahmedabad Search Bar */}
            <div className="hidden md:flex items-center flex-1 max-w-md mx-4">
              <div className={`flex items-center w-full ${isDark ? 'bg-[#181B26] border-slate-700/60' : 'bg-orange-50/70 border-orange-200'} border rounded-full px-3 py-1.5 shadow-inner focus-within:border-orange-500 transition-all`}>
                <div className="flex items-center gap-1 text-orange-600 dark:text-orange-500 mr-2 shrink-0">
                  <MapPin className="w-4 h-4" />
                  <span className="text-xs font-bold">Ahmedabad</span>
                </div>
                <div className={`h-4 w-px ${isDark ? 'bg-slate-700/60' : 'bg-orange-300'} mr-2`}></div>
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search GMDC, Manek Chowk, 'free', Kinjal Dave..."
                  className={`w-full bg-transparent text-xs ${isDark ? 'text-white' : 'text-slate-900'} placeholder:text-slate-400 focus:outline-none`}
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                    <X className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            </div>

            {/* Right Controls */}
            <div className="flex items-center gap-2 md:gap-3">
              {/* Quick Book Pass */}
              <button
                type="button"
                onClick={() => {
                  setSelectedVenue(venues[0]);
                  handleOpenBooking(venues[0]);
                }}
                className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-500 hover:to-orange-500 text-white text-xs font-bold transition-all shadow-md shadow-orange-950/20"
              >
                <Ticket className="w-3.5 h-3.5" />
                <span>Book Pass / Entry</span>
              </button>

              {/* Theme Toggle Button */}
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                title={isDark ? "Switch to Festive Ivory Light Mode" : "Switch to Midnight Navratri Dark Mode"}
                className={`p-2 rounded-xl border flex items-center gap-1.5 text-xs font-semibold transition-all ${
                  isDark
                    ? 'bg-[#181B26] border-slate-700 text-amber-300 hover:bg-[#252B3E]'
                    : 'bg-orange-50 border-orange-200 text-orange-700 hover:bg-orange-100 shadow-xs'
                }`}
              >
                {isDark ? <Sun className="w-4 h-4 text-amber-300" /> : <Moon className="w-4 h-4 text-orange-600" />}
                <span className="hidden xl:inline text-[11px]">{isDark ? 'Light Mode' : 'Dark Mode'}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* SIDEBAR NAVIGATION (Desktop) */}
      <aside className={`fixed top-24 md:top-28 left-0 bottom-0 w-64 ${isDark ? 'bg-[#11141E] border-amber-500/15' : 'bg-white border-amber-200/80 shadow-xs'} border-r p-5 flex flex-col justify-between hidden lg:flex z-30 transition-colors`}>
        <div className="flex flex-col gap-6">
          <div className="space-y-1">
            <span className="text-[10px] uppercase font-extrabold tracking-widest text-orange-600 dark:text-orange-400">
              Ahmedabad Hub
            </span>
            <div className="text-xs text-slate-600 dark:text-slate-400">Navratri Festival 2025</div>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col gap-1.5">
            <button
              type="button"
              onClick={() => setActiveTab('explore-events')}
              className={`flex items-center px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all ${
                activeTab === 'explore-events'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950/20'
                  : isDark
                  ? 'text-slate-400 hover:bg-[#181B26] hover:text-white'
                  : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              <Compass className="w-4 h-4 mr-2.5 text-amber-300" />
              <span>Explore Events</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('venue-and-parking-map')}
              className={`flex items-center px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all ${
                activeTab === 'venue-and-parking-map'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950/20'
                  : isDark
                  ? 'text-slate-400 hover:bg-[#181B26] hover:text-white'
                  : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              <Car className="w-4 h-4 mr-2.5 text-orange-500" />
              <span>Venue &amp; Parking Map</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('passes-tickets')}
              className={`flex items-center px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all ${
                activeTab === 'passes-tickets'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950/20'
                  : isDark
                  ? 'text-slate-400 hover:bg-[#181B26] hover:text-white'
                  : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              <Ticket className="w-4 h-4 mr-2.5 text-red-500" />
              <span>Passes &amp; Tickets</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('community-gallery-reviews')}
              className={`flex items-center px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all ${
                activeTab === 'community-gallery-reviews'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950/20'
                  : isDark
                  ? 'text-slate-400 hover:bg-[#181B26] hover:text-white'
                  : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              <Users className="w-4 h-4 mr-2.5 text-amber-500" />
              <span>Community &amp; Reviews</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('add-a-venue')}
              className={`flex items-center px-3.5 py-2.5 rounded-xl font-bold text-xs tracking-wide transition-all ${
                activeTab === 'add-a-venue'
                  ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white shadow-md shadow-orange-950/20'
                  : isDark
                  ? 'text-slate-400 hover:bg-[#181B26] hover:text-white'
                  : 'text-slate-600 hover:bg-orange-50 hover:text-orange-700'
              }`}
            >
              <PlusCircle className="w-4 h-4 mr-2.5 text-emerald-500" />
              <span>Add a Venue</span>
            </button>
          </nav>
        </div>

        {/* Ahmedabad Corridor Filter in Sidebar */}
        <div className={`flex flex-col gap-3 pt-3 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-200'}`}>
          <div className={`p-3 rounded-xl ${isDark ? 'bg-orange-950/40 border-orange-500/20' : 'bg-orange-50/70 border-orange-200/80'} border`}>
            <span className="text-[10px] uppercase font-bold tracking-wider text-orange-600 dark:text-orange-400 block mb-2">
              Corridor Filter
            </span>
            <div className="flex flex-wrap gap-1.5">
              {['All', 'Old City', 'Vastrapur', 'SG Highway', 'SBR', 'Bopal'].map(area => (
                <button
                  key={area}
                  type="button"
                  onClick={() => setSelectedAreaFilter(area)}
                  className={`px-2 py-0.5 rounded-full text-[11px] font-bold transition-all ${
                    selectedAreaFilter === area
                      ? 'bg-orange-600 text-white shadow-xs'
                      : isDark
                      ? 'bg-black/30 text-slate-300 hover:text-orange-300 border border-slate-700/60'
                      : 'bg-white text-slate-700 hover:text-orange-700 border border-orange-200'
                  }`}
                >
                  {area}
                </button>
              ))}
            </div>
          </div>

          <div className={`p-3 rounded-xl ${isDark ? 'bg-[#181B26] border-amber-500/20' : 'bg-amber-50/60 border-amber-200'} border flex items-center justify-between text-xs`}>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <span className="font-bold text-amber-800 dark:text-amber-300">Live Radar</span>
            </div>
            <span className="text-[10px] text-slate-600 dark:text-slate-400 font-semibold">{venues.length} Arenas Active</span>
          </div>
        </div>
      </aside>

      {/* MOBILE DRAWER */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/75 lg:hidden flex" onClick={() => setMobileMenuOpen(false)}>
          <div
            className={`w-72 ${isDark ? 'bg-[#11141E] text-white' : 'bg-white text-slate-900'} h-full p-6 flex flex-col justify-between shadow-2xl`}
            onClick={(e) => e.stopPropagation()}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-slate-200 dark:border-slate-800">
                <span className="font-headline font-bold text-lg">RaasRang Menu</span>
                <button type="button" onClick={() => setMobileMenuOpen(false)} className="text-slate-400">
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="flex flex-col gap-2">
                {[
                  { id: 'explore-events', label: 'Explore Events', icon: Compass },
                  { id: 'venue-and-parking-map', label: 'Venue & Parking Map', icon: Car },
                  { id: 'passes-tickets', label: 'Passes & Tickets', icon: Ticket },
                  { id: 'community-gallery-reviews', label: 'Community & Reviews', icon: Users },
                  { id: 'add-a-venue', label: 'Add a Venue', icon: PlusCircle },
                ].map((item) => {
                  const Icon = item.icon;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => {
                        setActiveTab(item.id as typeof activeTab);
                        setMobileMenuOpen(false);
                      }}
                      className={`flex items-center gap-3 p-3 rounded-xl text-xs font-bold text-left transition-all ${
                        activeTab === item.id
                          ? 'bg-orange-600 text-white'
                          : isDark
                          ? 'text-slate-300 hover:bg-[#181B26]'
                          : 'text-slate-700 hover:bg-orange-50'
                      }`}
                    >
                      <Icon className="w-4 h-4 text-orange-500" />
                      <span>{item.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="text-xs text-slate-500 pt-4 border-t border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <span>Ahmedabad Navratri 2025</span>
              <button
                type="button"
                onClick={() => setIsDark(!isDark)}
                className="text-orange-600 dark:text-orange-400 font-bold"
              >
                {isDark ? '☀️ Light' : '🌙 Dark'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MAIN VIEW CONTENT CONTAINER */}
      <main className="w-full pt-28 md:pt-32 lg:pl-64 min-h-screen px-4 md:px-8 pb-16">
        
        {/* VIEW 1: EXPLORE EVENTS */}
        {activeTab === 'explore-events' && (
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-8">
            
            {/* Hero Banner */}
            <div className={`relative w-full rounded-3xl overflow-hidden ${isDark ? 'bg-[#11141E] border-amber-500/20' : 'bg-gradient-to-r from-orange-100/90 via-amber-50 to-orange-50 border-amber-300/80'} border shadow-xl`}>
              <div
                className="absolute inset-0 z-0 opacity-20 mix-blend-luminosity bg-cover bg-center"
                style={{
                  backgroundImage:
                    "url('https://lh3.googleusercontent.com/aida/AEtjO1U5UOm5SbkTrWI9BhxDLmci5tmLKmVjCB3UG8cYL1xljVaOzxBSHwUzoScYEsujkAGJaeLBGiNyn4Ihx66OaWbJ1dQ7LF_V9arj5VueHbkXQ6Ucz8QMsGMe9HQ3HHNKvlq7gUIcfoqXghEa5L3cjRdc8FZxI6CZ_b57ubYJ83JHP_4RF31uaNJ1PTnoOw88b26LPKoBanMavSTsuozlI2qkA0WpaiTUtHveeC62YjT38u78VNqIQbSxSXQ')",
                }}
              ></div>
              <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-r from-[#0B0C10] via-[#0B0C10]/85 to-transparent' : 'bg-gradient-to-r from-white/95 via-white/80 to-transparent'} z-10`}></div>
              
              <div className="relative z-20 p-6 md:p-12 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                <div className="flex flex-col gap-3 max-w-2xl">
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-orange-600 to-amber-600 text-white text-xs font-bold w-fit shadow-md">
                    <Sparkles className="w-3.5 h-3.5 text-amber-200" />
                    <span className="tracking-wider uppercase">Ahmedabad Official 2025 Garba Portal</span>
                  </div>
                  <h1 className="font-headline text-3xl md:text-5xl font-bold leading-tight text-slate-900 dark:text-white">
                    Experience the Divine Beats of Ahmedabad Navratri 2025
                  </h1>
                  <p className="text-xs md:text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                    Find authentic Garba grounds across Old City, SG Highway, Drive-In, SBR &amp; Bopal. Search by <strong className="text-emerald-700 dark:text-emerald-400 font-bold">100% Free Public Entry</strong> or <strong className="text-orange-700 dark:text-orange-400 font-bold">Ticketed Club Passes</strong> with live parking telemetry and direct booking links!
                  </p>
                  <div className="flex flex-wrap items-center gap-3 pt-2">
                    <a
                      href="#featured-grounds"
                      className="inline-flex items-center gap-2 bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all shadow-md"
                    >
                      <Compass className="w-4 h-4" />
                      <span>Explore Ahmedabad Grounds</span>
                    </a>
                    <button
                      type="button"
                      onClick={() => setActiveTab('venue-and-parking-map')}
                      className={`inline-flex items-center gap-2 ${isDark ? 'bg-[#1E2232]/80 hover:bg-[#252B3E] text-amber-200 border-amber-500/30' : 'bg-white hover:bg-orange-50 text-slate-800 border-amber-300'} backdrop-blur-md px-5 py-2.5 rounded-xl font-bold text-xs transition-all border shadow-xs`}
                    >
                      <Car className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                      <span>Live Parking Radar</span>
                    </button>
                  </div>
                </div>

                {/* Live Ground Pulse Widget */}
                <div className={`p-5 rounded-2xl ${isDark ? 'bg-[#151824]/95 border-amber-500/25' : 'bg-white/95 border-amber-200/80'} backdrop-blur-xl border shadow-lg flex flex-col gap-3 w-full lg:w-80`}>
                  <div className="flex items-center justify-between">
                    <span className="text-xs uppercase tracking-wider text-orange-600 dark:text-orange-400 font-bold">
                      Ahmedabad Arena Pulse
                    </span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-red-600 text-white text-[10px] font-bold shadow-xs">
                      <span className="w-1.5 h-1.5 rounded-full bg-white animate-ping"></span> Live
                    </span>
                  </div>
                  <div className="space-y-2">
                    {/* Free Venue Item */}
                    <div
                      onClick={() => handleSelectGroundDetail(venues[1])}
                      className={`cursor-pointer flex items-center justify-between p-2.5 rounded-xl ${isDark ? 'bg-[#1E2232] border-slate-700/60' : 'bg-emerald-50/70 border-emerald-200'} border hover:border-orange-500 transition-colors`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Manek Chowk Pol</span>
                        <span className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">100% Free Public</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 text-xs font-bold">
                        ₹0 Free
                      </span>
                    </div>

                    <div
                      onClick={() => handleSelectGroundDetail(venues[0])}
                      className={`cursor-pointer flex items-center justify-between p-2.5 rounded-xl ${isDark ? 'bg-[#1E2232] border-slate-700/60' : 'bg-slate-50 border-slate-200'} border hover:border-orange-500 transition-colors`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">GMDC Ground</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">Gate 3 Fast Track</span>
                      </div>
                      <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-500/20 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-500/30 text-xs font-bold">
                        Open
                      </span>
                    </div>

                    <div
                      onClick={() => handleSelectGroundDetail(venues[2])}
                      className={`cursor-pointer flex items-center justify-between p-2.5 rounded-xl ${isDark ? 'bg-[#1E2232] border-slate-700/60' : 'bg-slate-50 border-slate-200'} border hover:border-orange-500 transition-colors`}
                    >
                      <div className="flex flex-col">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">Karnavati Club</span>
                        <span className="text-[11px] text-slate-500 dark:text-slate-400">North Basement</span>
                      </div>
                      <span className="px-2 py-1 rounded bg-amber-100 dark:bg-amber-500/20 text-amber-800 dark:text-amber-300 border border-amber-300 dark:border-amber-500/30 text-xs font-bold">
                        82% Full
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* DEDICATED SEARCH & ENTRY FILTER BAR (FREE VS PASS ENTRY) */}
            <div className={`p-4 md:p-5 rounded-2xl ${isDark ? 'bg-[#151824] border-amber-500/20' : 'bg-white border-amber-200/90'} border shadow-md flex flex-col gap-4`}>
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                    <Ticket className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                    <span>Search by Entry Type: Free Public Garba vs Ticketed Passes</span>
                  </h3>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    Find 100% free community pols or compare BookMyShow &amp; District club passes
                  </p>
                </div>

                {/* Entry Type Toggle Tabs */}
                <div className="flex items-center p-1 rounded-xl bg-slate-100 dark:bg-[#11141E] border border-slate-200 dark:border-slate-800 self-start md:self-auto">
                  <button
                    type="button"
                    onClick={() => setEntryTypeFilter('all')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      entryTypeFilter === 'all'
                        ? 'bg-white dark:bg-orange-600 text-slate-900 dark:text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    All Grounds ({venues.length})
                  </button>

                  <button
                    type="button"
                    onClick={() => setEntryTypeFilter('free')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      entryTypeFilter === 'free'
                        ? 'bg-emerald-600 text-white shadow-xs'
                        : 'text-emerald-700 dark:text-emerald-400 hover:text-emerald-800'
                    }`}
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>Free Entry Only (₹0) ({totalFreeVenues})</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setEntryTypeFilter('pass')}
                    className={`px-3.5 py-1.5 rounded-lg text-xs font-bold flex items-center gap-1.5 transition-all ${
                      entryTypeFilter === 'pass'
                        ? 'bg-orange-600 text-white shadow-xs'
                        : 'text-orange-700 dark:text-orange-400 hover:text-orange-800'
                    }`}
                  >
                    <Ticket className="w-3.5 h-3.5" />
                    <span>Pass Required ({totalPassVenues})</span>
                  </button>
                </div>
              </div>

              {/* Quick Vibe Filter Chips */}
              <div className="flex flex-col gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center justify-between">
                  <span className="text-[11px] uppercase font-bold tracking-widest text-slate-600 dark:text-slate-400">
                    Additional Vibe Filters
                  </span>
                  <button
                    type="button"
                    onClick={() => {
                      setVibeFilter('all');
                      setEntryTypeFilter('all');
                      setSelectedAreaFilter('All');
                      setSearchQuery('');
                    }}
                    className="text-xs text-orange-600 dark:text-amber-400 font-bold hover:underline"
                  >
                    Reset All Filters
                  </button>
                </div>

                <div className="flex items-center gap-2 overflow-x-auto pb-1 no-scrollbar">
                  <button
                    type="button"
                    onClick={() => setVibeFilter('all')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      vibeFilter === 'all'
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-xs'
                        : isDark
                        ? 'bg-[#151824] text-slate-400 border-amber-500/15 hover:text-white'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>All Vibes</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVibeFilter('parking')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      vibeFilter === 'parking'
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-xs'
                        : isDark
                        ? 'bg-[#151824] text-slate-400 border-amber-500/15 hover:text-white'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <Car className="w-3.5 h-3.5 text-orange-500" />
                    <span>Live Parking Open</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVibeFilter('barefoot')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      vibeFilter === 'barefoot'
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-xs'
                        : isDark
                        ? 'bg-[#151824] text-slate-400 border-amber-500/15 hover:text-white'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <span className="material-symbols-outlined text-sm text-amber-500">grass</span>
                    <span>100% Barefoot Lawn</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setVibeFilter('dhol')}
                    className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all border ${
                      vibeFilter === 'dhol'
                        ? 'bg-gradient-to-r from-orange-600 to-amber-600 text-white border-orange-500 shadow-xs'
                        : isDark
                        ? 'bg-[#151824] text-slate-400 border-amber-500/15 hover:text-white'
                        : 'bg-slate-50 text-slate-700 border-slate-200 hover:text-slate-900'
                    }`}
                  >
                    <Music className="w-3.5 h-3.5 text-red-500" />
                    <span>Live Traditional Folk Dhol</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Featured Ahmedabad Grounds Grid */}
            <section className="flex flex-col gap-4" id="featured-grounds">
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-1">
                <div>
                  <span className="text-xs font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400">
                    Ahmedabad Cultural Centers
                  </span>
                  <h2 className="font-headline text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
                    Ahmedabad Navratri 2025 Garba Grounds
                  </h2>
                </div>
                <p className="text-xs text-slate-600 dark:text-slate-400 max-w-md">
                  Showing {filteredVenues.length} grounds matching your filter. Verified parking telemetry and direct booking.
                </p>
              </div>

              {filteredVenues.length === 0 ? (
                <div className={`p-10 rounded-2xl ${isDark ? 'bg-[#151824]' : 'bg-white'} border border-amber-200 text-center space-y-3`}>
                  <Compass className="w-10 h-10 text-orange-500 mx-auto" />
                  <h3 className="font-bold text-base text-slate-900 dark:text-white">No Garba Grounds Match Your Filter</h3>
                  <p className="text-xs text-slate-500 max-w-md mx-auto">
                    Try switching between "All Grounds", "Free Entry Only (₹0)", and "Pass Required", or reset your search query.
                  </p>
                  <button
                    type="button"
                    onClick={() => {
                      setEntryTypeFilter('all');
                      setSelectedAreaFilter('All');
                      setSearchQuery('');
                      setVibeFilter('all');
                    }}
                    className="px-4 py-2 rounded-xl bg-orange-600 text-white font-bold text-xs"
                  >
                    Reset Filters
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {filteredVenues.map((venue) => {
                    const isFree = venue.entryType === 'free' || venue.perNightPrice === 0;

                    return (
                      <article
                        key={venue.id}
                        className={`rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all flex flex-col group border ${
                          isDark
                            ? 'bg-[#151824] border-amber-500/15 hover:border-amber-500/40'
                            : 'bg-white border-amber-200/80 hover:border-orange-400'
                        }`}
                      >
                        <div className="relative h-60 w-full overflow-hidden bg-slate-100 dark:bg-[#1E2232]">
                          <img
                            src={venue.bannerImage}
                            alt={venue.name}
                            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 opacity-95"
                          />
                          <div className={`absolute inset-0 bg-gradient-to-t ${isDark ? 'from-[#151824]' : 'from-black/60'} via-transparent to-black/30`}></div>
                          
                          <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                            {isFree ? (
                              <span className="px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-extrabold tracking-wide uppercase shadow-sm flex items-center gap-1">
                                <CheckCircle2 className="w-3 h-3" />
                                <span>100% Free Entry • ₹0</span>
                              </span>
                            ) : (
                              <span className="px-2.5 py-1 rounded-full bg-red-600 text-white text-[10px] font-bold tracking-wide uppercase shadow-sm">
                                {venue.badge}
                              </span>
                            )}
                            <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-sm text-amber-200 border border-amber-400/40 text-[10px] font-bold">
                              {venue.area}
                            </span>
                          </div>

                          <div className="absolute bottom-3 right-3 bg-black/70 text-amber-200 px-2.5 py-1 rounded-lg backdrop-blur-md text-[11px] flex items-center gap-1 border border-amber-400/30">
                            <CheckCircle2 className="w-3.5 h-3.5 text-amber-400" />
                            <span>Verified Sound Limit</span>
                          </div>
                        </div>

                        <div className="p-6 flex flex-col flex-1 justify-between gap-4">
                          <div className="flex flex-col gap-2">
                            <div className="flex items-center justify-between text-xs">
                              <span className="flex items-center gap-1 text-orange-600 dark:text-orange-400 font-bold">
                                <Music className="w-3.5 h-3.5" />
                                <span>{venue.artists.split(',')[0]}</span>
                              </span>
                              <span className="flex items-center gap-1 text-amber-700 dark:text-amber-300 font-bold">
                                <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                                <span>{venue.rating.toFixed(1)} ({venue.reviewCount} reviews)</span>
                              </span>
                            </div>

                            <h3
                              onClick={() => handleSelectGroundDetail(venue)}
                              className="font-headline text-xl font-bold text-slate-900 dark:text-white hover:text-orange-600 dark:hover:text-orange-400 cursor-pointer transition-colors"
                            >
                              {venue.name}
                            </h3>

                            <p className="text-xs text-slate-600 dark:text-slate-400 flex items-center gap-1">
                              <MapPin className="w-3.5 h-3.5 text-orange-600 dark:text-orange-400 shrink-0" />
                              <span className="line-clamp-1">{venue.address}</span>
                            </p>
                          </div>

                          {/* Perks */}
                          <div className="flex flex-wrap gap-1.5">
                            {venue.perks.slice(0, 3).map((perk, i) => (
                              <span
                                key={i}
                                className={`px-2 py-0.5 rounded-full text-[11px] border ${
                                  isDark
                                    ? 'bg-[#1E2232] text-slate-300 border-slate-700/60'
                                    : 'bg-amber-50/70 text-slate-700 border-amber-200'
                                }`}
                              >
                                {perk}
                              </span>
                            ))}
                          </div>

                          {/* Parking Snapshot */}
                          {venue.parking[0] && (
                            <div
                              onClick={() => {
                                setSelectedVenue(venue);
                                setActiveTab('venue-and-parking-map');
                              }}
                              className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer transition-colors ${
                                isDark
                                  ? 'bg-[#11141E] border-slate-800 hover:border-orange-500/50'
                                  : 'bg-orange-50/50 border-orange-200/80 hover:border-orange-400'
                              }`}
                            >
                              <div className="flex items-center gap-2">
                                <Car className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                <div>
                                  <div className="text-xs font-bold text-slate-900 dark:text-slate-200">{venue.parking[0].lotName}</div>
                                  <div className="text-[11px] text-emerald-700 dark:text-emerald-400 font-semibold">
                                    {venue.parking[0].availableBays} spots vacant now
                                  </div>
                                </div>
                              </div>
                              <span className="px-2 py-0.5 rounded bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-600/40 text-[10px] font-bold">
                                {venue.parking[0].status}
                              </span>
                            </div>
                          )}

                          {/* Pricing & Direct Booking Buttons */}
                          <div className={`pt-2 border-t ${isDark ? 'border-slate-800/80' : 'border-slate-100'} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
                            <div className="flex flex-col">
                              <span className="text-[10px] uppercase font-bold tracking-wider text-slate-500 dark:text-slate-400">
                                {isFree ? 'Entry Fee' : 'Per Night Entry'}
                              </span>
                              {isFree ? (
                                <span className="text-lg font-extrabold text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                                  <span>₹0 Free Entry</span>
                                </span>
                              ) : (
                                <span className="text-xl font-bold text-amber-700 dark:text-amber-300">
                                  ₹{venue.perNightPrice}
                                  <span className="text-xs font-normal text-slate-500 dark:text-slate-400"> / person</span>
                                </span>
                              )}
                            </div>

                            <div className="flex items-center gap-2">
                              {isFree ? (
                                <button
                                  type="button"
                                  onClick={() => handleOpenBooking(venue)}
                                  className="py-2 px-4 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
                                >
                                  <Navigation className="w-3.5 h-3.5" />
                                  <span>Free Entry Guide</span>
                                </button>
                              ) : (
                                <>
                                  <a
                                    href={venue.bmsLink || `https://in.bookmyshow.com/explore/events-ahmedabad?query=${encodeURIComponent(venue.name.split(' - ')[0])}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all"
                                  >
                                    <span>BMS</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>

                                  <a
                                    href={venue.districtLink || "https://www.district.in/events"}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="py-2 px-3 rounded-xl bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-500 hover:to-amber-500 text-white text-xs font-bold flex items-center gap-1 shadow-xs transition-all"
                                  >
                                    <span>District</span>
                                    <ExternalLink className="w-3 h-3" />
                                  </a>
                                </>
                              )}

                              <button
                                type="button"
                                onClick={() => handleSelectGroundDetail(venue)}
                                className={`py-2 px-3 rounded-xl text-xs font-semibold transition-colors border ${
                                  isDark
                                    ? 'bg-[#1E2232] hover:bg-[#282F45] text-slate-200 border-slate-700'
                                    : 'bg-slate-100 hover:bg-slate-200 text-slate-800 border-slate-200'
                                }`}
                              >
                                Details
                              </button>
                            </div>
                          </div>
                        </div>
                      </article>
                    );
                  })}
                </div>
              )}
            </section>
          </div>
        )}

        {/* VIEW 2: VENUE & PARKING MAP */}
        {activeTab === 'venue-and-parking-map' && (
          <div className="w-full max-w-7xl mx-auto flex flex-col gap-6">
            <AhmedabadGarbaMap
              venues={venues}
              selectedVenue={selectedVenue}
              onSelectVenue={(v) => setSelectedVenue(v)}
              onBookPass={(v) => handleOpenBooking(v)}
            />
          </div>
        )}

        {/* VIEW 3: PASSES & TICKETS */}
        {activeTab === 'passes-tickets' && (
          <PassesMatrixView
            venues={venues}
            onBookPass={(v) => handleOpenBooking(v)}
          />
        )}

        {/* VIEW 4: COMMUNITY & REVIEWS */}
        {activeTab === 'community-gallery-reviews' && (
          <CommunityReviewsView
            venues={venues}
            selectedVenue={selectedVenue}
            onSelectVenue={(v) => setSelectedVenue(v)}
            onAddReview={handleAddReview}
          />
        )}

        {/* VIEW 5: ADD A VENUE */}
        {activeTab === 'add-a-venue' && (
          <AddVenueForm
            onAddVenue={handleAddNewVenue}
            onCancel={() => setActiveTab('explore-events')}
          />
        )}

        {/* VIEW 6: GROUND DETAIL VIEW */}
        {activeTab === 'ground-detail' && (
          <GroundDetailView
            venue={selectedVenue}
            onBack={handleBackToExplore}
            onBookPass={(v) => handleOpenBooking(v)}
            onReviewClick={() => setActiveTab('community-gallery-reviews')}
          />
        )}
      </main>

      {/* BOOKING MODAL */}
      <BookingModal
        venue={bookingVenue}
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
      />
    </div>
  );
}
