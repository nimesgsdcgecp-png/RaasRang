export interface ParkingBay {
  lotName: string;
  type: 'VIP / Valet' | 'General 4-Wheeler' | '2-Wheeler Free Bay' | 'EV Charging Hub';
  totalSlots: number;
  availableSlots: number;
  status: 'green' | 'amber' | 'red';
  avgTransitMins: number;
  approachRoad: string;
  feeInfo: string;
}

export interface ReviewItem {
  id: string;
  userName: string;
  userBadge: string;
  avatar: string;
  rating: number;
  date: string;
  nightsAttended: string;
  rfidVerified: boolean;
  content: string;
  attendeeTip?: string;
  parkingUsed?: string;
  transitTime?: string;
  tags: string[];
  photos?: string[];
  likes: number;
}

export interface GarbaVenue {
  id: string;
  name: string;
  subtitle: string;
  tagline: string;
  area: string; // Ahmedabad locality (e.g. Vastrapur, SG Highway, Bodakdev)
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  featuredArtists: string;
  rating: number;
  reviewsCount: number;
  capacity: string;
  floorType: string;
  soundEngineering: string;
  singlePassPrice: number;
  seasonPassPrice: number;
  sellingStatus: 'Selling Fast' | 'Limited Slots' | 'Early Bird Active' | 'Registration Open';
  coverImage: string;
  galleryImages: string[];
  perks: string[];
  parkingLots: ParkingBay[];
  bookMyShowUrl: string;
  districtUrl: string;
  trafficAdvisory: string;
  reviews: ReviewItem[];
}

export const AHMEDABAD_VENUES: GarbaVenue[] = [
  {
    id: 'gmdc-ground',
    name: 'Vibrant Gujarat Garba Extravaganza 2025',
    subtitle: 'Government of Gujarat Official Navratri Arena',
    tagline: 'Massive traditional circle with live dhol-tasha and multi-level parking',
    area: 'Vastrapur / Memnagar',
    address: 'GMDC Ground, 132 Feet Ring Road, Near Helmet Cross Road, Vastrapur, Ahmedabad 380052',
    coordinates: {
      lat: 23.0448,
      lng: 72.5358,
    },
    featuredArtists: 'Kinjal Dave & Kirtidan Gadhvi with 40-Piece Folk Troupe',
    rating: 4.9,
    reviewsCount: 3820,
    capacity: '60,000+ Dancers',
    floorType: 'Compressed Heavy Lawn with Herbal Anti-Dust Binding Spray',
    soundEngineering: '16 Line-Array Towers (Verified 65dB Sound Limit)',
    singlePassPrice: 600,
    seasonPassPrice: 2900,
    sellingStatus: 'Selling Fast',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC5HhexfXzADllvmwJidxC_MU6Kjf_Z6G_se12Eqr6wwe3YfW-k8Bd1Qlb20Dg1HBOO3kIzQIjX07_puVG74qt8Fqbk2CqxPGXSetslLCUktpgmRGL5Rkan4S5a45U0F2cF7RUZEKWgpU7fCrRLt-z9Ui-zrL2Om5duuv6JyXWVZ6IghgTlqcFz9J4fg2WYO43CNT0f1rNxgpAeC35xjSE5ZClA6uUHsJbb1o_-cpgzlL6giCKfhnEC',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida/AEtjO1UKxKVtOgUaWKP3JnV5vAQipfLDeiu_1GNqS6upsF_L7DVd76IgkDhxriYAk0hiXnZYE2wiluGbbk6NjzF2FN6YxpsHWbDq0YHFp51kvjEgiYzgqzex3yaYSNJGbzhkfAfgPkhoBM3zspwG2VG1tUMKvb__xl1r1bFS_BgLv3BkQ_oZEaa6T_VahnI814RX-G7niyGdCtNSsQ8gWAB3xBJ-4-dmTUe48kipCupdNAx9m5LOdX7p3Elhh1Q',
      'https://lh3.googleusercontent.com/aida/AEtjO1VeuQYfwMWya1nDvK16yIwS1HvGED00ugCNgvU14px-QfUuDtqJXBB7JIMTtaOw4ucxPIbAVL5KthhyG1RjAn7zZLtlkY-_s5JzjdKmNRLFcZdn3fEPpB-4jIflanKYISNi5d6IDfDJd2CWNDJoLsT1QWdOtMTkjCOBRCUdb5j_hQffayQruck3fiAND-QOEO0Ya8m_o6s0H2vAPpLOAACyG57r5jOVWo6uAH0Iu66U9TY52YLI32zUSDc',
      'https://lh3.googleusercontent.com/aida/AEtjO1UE4CJX2y8Rc3Q26XTY01QFKaewfgaTp3Qwll1haaNcQ_YpbqYSv1rN8ZCqQxSrDncoCu4VdzhlZzYv1_kDkfQFxsWEjBbJhc5By9gHVABx1pkhksUfigrmYnInfbPMdGUmeNS1qVRmk8RUFKYgL15KXAcp_eEwJVFYCYJ6qzVf1mul7pj3e6N9P-TOL_GMd9wPGFoeO2pqup6-wdGEtwDErv963YVcG20wUb_q8moTAK1UKg_h3UQ_7O0',
    ],
    perks: [
      'Helmet Cross Multi-level Parking (1,200 Cars)',
      'Direct BRTS & Ahmedabad Metro Connect',
      'Handicap & Senior Citizen Shuttles',
      'Free RO Drinking Water Points (24 Taps)',
      'SHE-Team Women Safety Booth on site',
    ],
    parkingLots: [
      {
        lotName: 'Helmet Cross Multi-Level (Lot A)',
        type: 'VIP / Valet',
        totalSlots: 600,
        availableSlots: 410,
        status: 'green',
        avgTransitMins: 2,
        approachRoad: 'Via 132 Feet Ring Road service lane',
        feeInfo: 'Free for Passholders',
      },
      {
        lotName: 'University Ground Bay (Lot B)',
        type: 'General 4-Wheeler',
        totalSlots: 800,
        availableSlots: 540,
        status: 'green',
        avgTransitMins: 4,
        approachRoad: 'Via LD Engineering campus road',
        feeInfo: '₹50 flat',
      },
      {
        lotName: 'Memnagar East Bay (Lot C)',
        type: '2-Wheeler Free Bay',
        totalSlots: 1500,
        availableSlots: 1120,
        status: 'green',
        avgTransitMins: 1,
        approachRoad: 'Direct Gate 4 access',
        feeInfo: '100% Free Entry',
      },
    ],
    bookMyShowUrl: 'https://in.bookmyshow.com/explore/navratri-ahmedabad',
    districtUrl: 'https://district.in',
    trafficAdvisory: 'Heavy vehicular movement expected on Drive-In Road between 8:45 PM and 10:15 PM. Use Helmet Circle flyover or Metro Line 1 (Gurukul Road station) for fastest arrival.',
    reviews: [
      {
        id: 'rev-gmdc-1',
        userName: 'Tanvi Adani',
        userBadge: 'Verified Season Passholder',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgv2jVNAVzHkhGZkJKt9UXf9Wa0xBGmLqOFOm3wx05yX4l8996VGQNSHXb3P2S9rtgeURvjvzSjQvTa6M8xxhrPYKa03tavOQNJbRGZrKaq-m0bM-AqY8pc0b6kWAtVYZ0X8lvgtDHl92RAK8jUpL6whtVePTBJUz8LcFkpU_5wvKRmiU0VezhmcOnF7o55kB8NfQjxo3Chy-khpEiQ4Q-lPLd08TaCnCKwvuGCCLii4UKuPdwcrBp',
        rating: 5,
        date: 'Day 3 Navratri 2025',
        nightsAttended: 'Nights 1, 2 & 3',
        rfidVerified: true,
        content: 'GMDC Ground is unmatched for energy in Ahmedabad! When Kinjal Dave sang "Char Char Bangdi" and traditional prathana, 50,000 people were in perfect synchronization. The new dust-binding spray worked wonders—no red dust settled on my mirror-work chaniya choli!',
        attendeeTip: 'Enter through Gate 3 before 9:00 PM to skip the main Drive-in Road line.',
        parkingUsed: 'Helmet Cross Multi-Level Lot A',
        transitTime: '3 mins gate turnaround',
        tags: ['Superb Acoustics', 'Dust-Free Turf', 'Clean Washrooms'],
        likes: 184,
      },
      {
        id: 'rev-gmdc-2',
        userName: 'Hardik Shah',
        userBadge: 'BMS Verified Passholder',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkidTdB8F-3ZVUy3DZM8o2kT2sEkuvSWmeHe300T2VH4kc49V8hyMKQs5bYsv16K-mLcyHUFNp0XmgSUqSJhyKdsT1Cf2e4fCYP0o6v4tUQ6mBbAGVX3V2U02XcklZrFqNPiQTrVuKHpxs6AnbacQmpRc7MiBkg4-cfv7DYPi7_F5oszYGk0Y3-aYwh0vOeKXjvmafacN5wTpgpuXrMDCDg6Y2ayiSP6LF_ewtrN0rXWQ0_vke6Htj',
        rating: 4.8,
        date: 'Day 2 Navratri 2025',
        nightsAttended: 'Night 2',
        rfidVerified: true,
        content: 'Parking in the multi-level structure was extremely smooth thanks to the Ahmedabad traffic police marshals with laser scanners. Midnight Fafda-Jalebi counters near Gate 2 are freshly made and pure ghee!',
        attendeeTip: 'Two-wheelers get free dedicated bays right next to Gate 4.',
        parkingUsed: 'University Ground Bay (Lot B)',
        transitTime: '4 mins shuttle bus',
        tags: ['Smooth Valet', 'Farsan Stalls', 'Safe For Women'],
        likes: 142,
      },
    ],
  },
  {
    id: 'karnavati-club',
    name: 'Karnavati Club Royal Raas 2025',
    subtitle: 'Ahmedabad Premier Heritage Club Garba',
    tagline: 'Elite club ambiance, authentic Gujarati sur-taal, and dedicated SG Highway valet lanes',
    area: 'SG Highway',
    address: 'Karnavati Club Ltd, Gandhinagar - Ahmedabad Road, Mumatpura, SG Highway, Ahmedabad 380058',
    coordinates: {
      lat: 23.0182,
      lng: 72.5028,
    },
    featuredArtists: 'Sanjay Oza & Falguni Oza with Classical Symphony Ensemble',
    rating: 4.9,
    reviewsCount: 2450,
    capacity: '28,000 Dancers',
    floorType: 'Export-Grade High Density Interlocking Teak Wood Floor (Barefoot Certified)',
    soundEngineering: 'Acoustic Sound Mesh Array with zero digital delay',
    singlePassPrice: 1100,
    seasonPassPrice: 5200,
    sellingStatus: 'Limited Slots',
    coverImage: 'https://lh3.googleusercontent.com/aida/AEtjO1U5UOm5SbkTrWI9BhxDLmci5tmLKmVjCB3UG8cYL1xljVaOzxBSHwUzoScYEsujkAGJaeLBGiNyn4Ihx66OaWbJ1dQ7LF_V9arj5VueHbkXQ6Ucz8QMsGMe9HQ3HHNKvlq7gUIcfoqXghEa5L3cjRdc8FZxI6CZ_b57ubYJ83JHP_4RF31uaNJ1PTnoOw88b26LPKoBanMavSTsuozlI2qkA0WpaiTUtHveeC62YjT38u78VNqIQbSxSXQ',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida/AEtjO1VeuQYfwMWya1nDvK16yIwS1HvGED00ugCNgvU14px-QfUuDtqJXBB7JIMTtaOw4ucxPIbAVL5KthhyG1RjAn7zZLtlkY-_s5JzjdKmNRLFcZdn3fEPpB-4jIflanKYISNi5d6IDfDJd2CWNDJoLsT1QWdOtMTkjCOBRCUdb5j_hQffayQruck3fiAND-QOEO0Ya8m_o6s0H2vAPpLOAACyG57r5jOVWo6uAH0Iu66U9TY52YLI32zUSDc',
      'https://lh3.googleusercontent.com/aida-public/AB6AXuCvnIXybNPGyI2s1UrtLFrtvlF5GtdsSgvbhamLKfA0W8usz9gtkYMPpverNO1SNwuRVv0AA40ahe1JmdZ8dE4OxIxfgFtd3WMLw0a7IR4mwPsR_FIAFK6fEV_J5UJ0s6tfstUh9u5og2S094Ce2vSheT7moJZ_-bYtWHep6LHCZ1FMVcKOrz3zPY_x0sjAuIFrkIsb3hHssEWpqlegPpPp7vasDypBrT8ChLFXoGVRZ_6k1AVwJ2su',
    ],
    perks: [
      'Dedicated Valet Drop on SG Highway Service Lane',
      'Strict Traditional Attire (Only Kediyu & Chaniya Choli)',
      'Free Carved Wooden Dandiya Pairs Provided',
      'Air-Cooled VIP Lounge & Family Seating Enclosure',
      'Mineral Water Hydration Bars at every 50 meters',
    ],
    parkingLots: [
      {
        lotName: 'Karnavati Club Basement & Deck',
        type: 'VIP / Valet',
        totalSlots: 450,
        availableSlots: 165,
        status: 'amber',
        avgTransitMins: 3,
        approachRoad: 'Via Club Main Gate entrance',
        feeInfo: 'Members & VIP Passes',
      },
      {
        lotName: 'SG Highway Service Road Bay 1 & 2',
        type: 'General 4-Wheeler',
        totalSlots: 700,
        availableSlots: 320,
        status: 'green',
        avgTransitMins: 5,
        approachRoad: 'Near Iscon Cross Road southward lane',
        feeInfo: '₹70 flat',
      },
    ],
    bookMyShowUrl: 'https://in.bookmyshow.com/explore/navratri-ahmedabad',
    districtUrl: 'https://district.in',
    trafficAdvisory: 'Heavy traffic between ISCON crossroad and Prahlad Nagar junction after 9:30 PM. Use the interior Bopal-Ambli link road to reach the club entrance seamlessly.',
    reviews: [
      {
        id: 'rev-kc-1',
        userName: 'Meera & Harshil Parikh',
        userBadge: 'Verified Couple Passholder',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCV781hdo_zpwAVC4bpO943zZjEreRBNzJdrIHMJKZZF4x4uapAmB_E6TJhYpKTQCWvk7iCssxYQKbOXJwJl3AL4d7EOa29TqdJVEiFGA7oUso5t3SYjthNFQBDQWigih7TGmPaepSfJdG6O8AMDHzdHZmfYvObfarwcYd5PmjGEGqvPukd6ZI-Ue1oNy1P8arjMkDa-00c2Uck6kf2ErY9eXtcmWM0ui3qeckXtR406SmZcvlOsLcs',
        rating: 5,
        date: 'Day 3 Navratri 2025',
        nightsAttended: 'Nights 1 to 3',
        rfidVerified: true,
        content: 'The wooden flooring at Karnavati is extraordinary. You can dance barefoot for 4 hours without any heel ache or blisters! Sanjay Oza’s prathana at 11:45 PM gave us goosebumps. Pure royal grace.',
        attendeeTip: 'Use valet parking via the rear service gate to bypass SG Highway snarls.',
        parkingUsed: 'Karnavati Club Basement & Deck',
        transitTime: '2 mins valet retrieval',
        tags: ['Barefoot Wooden Floor', 'Royal Ambiance', 'Superb Acoustics'],
        likes: 215,
      },
    ],
  },
  {
    id: 'rajpath-club',
    name: 'Rajpath Club Grand Heritage Navratri',
    subtitle: 'Iconic Bodakdev Royal Lawns',
    tagline: 'Soulful traditional folk beats, illuminated floral mandap, and premium family security',
    area: 'Bodakdev / SG Highway',
    address: 'Rajpath Club, S.G. Highway, Bodakdev, Ahmedabad 380054',
    coordinates: {
      lat: 23.0378,
      lng: 72.5112,
    },
    featuredArtists: 'Arvind Vegda & The Traditional Folk Orchestra of Saurashtra',
    rating: 4.8,
    reviewsCount: 1980,
    capacity: '24,000 Dancers',
    floorType: 'Natural Treated Soft Sand Lawn with Double Felt Underlay',
    soundEngineering: 'Bose Professional Arena Line Arrays',
    singlePassPrice: 950,
    seasonPassPrice: 4600,
    sellingStatus: 'Selling Fast',
    coverImage: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCvnIXybNPGyI2s1UrtLFrtvlF5GtdsSgvbhamLKfA0W8usz9gtkYMPpverNO1SNwuRVv0AA40ahe1JmdZ8dE4OxIxfgFtd3WMLw0a7IR4mwPsR_FIAFK6fEV_J5UJ0s6tfstUh9u5og2S094Ce2vSheT7moJZ_-bYtWHep6LHCZ1FMVcKOrz3zPY_x0sjAuIFrkIsb3hHssEWpqlegPpPp7vasDypBrT8ChLFXoGVRZ_6k1AVwJ2su',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida/AEtjO1UE4CJX2y8Rc3Q26XTY01QFKaewfgaTp3Qwll1haaNcQ_YpbqYSv1rN8ZCqQxSrDncoCu4VdzhlZzYv1_kDkfQFxsWEjBbJhc5By9gHVABx1pkhksUfigrmYnInfbPMdGUmeNS1qVRmk8RUFKYgL15KXAcp_eEwJVFYCYJ6qzVf1mul7pj3e6N9P-TOL_GMd9wPGFoeO2pqup6-wdGEtwDErv963YVcG20wUb_q8moTAK1UKg_h3UQ_7O0',
    ],
    perks: [
      'Basement 3-Level Parking with RFID Guidance',
      'Free Entry for Senior Citizens in Viewing Gallery',
      'Live Traditional Shehnai & Dholak during Aarti',
      'Clean Sanitized Restrooms cleaned every 30 minutes',
    ],
    parkingLots: [
      {
        lotName: 'Rajpath Multilevel Car Deck',
        type: 'VIP / Valet',
        totalSlots: 500,
        availableSlots: 240,
        status: 'green',
        avgTransitMins: 3,
        approachRoad: 'Via Rajpath Bodakdev service lane',
        feeInfo: 'Complimentary with Pass',
      },
      {
        lotName: 'Bodakdev Public Ground Bay',
        type: 'General 4-Wheeler',
        totalSlots: 600,
        availableSlots: 310,
        status: 'green',
        avgTransitMins: 5,
        approachRoad: 'Near Judges Bungalow road connect',
        feeInfo: '₹60 flat',
      },
    ],
    bookMyShowUrl: 'https://in.bookmyshow.com/explore/navratri-ahmedabad',
    districtUrl: 'https://district.in',
    trafficAdvisory: 'Pakwan Cross Road to Rajpath can see heavy bottleneck around 9:45 PM. Prefer approaching via Judges Bungalow Road from Vastrapur side.',
    reviews: [
      {
        id: 'rev-rc-1',
        userName: 'Rhea Patel',
        userBadge: 'District App Verified',
        avatar: 'https://lh3.googleusercontent.com/aida/AEtjO1XSSAo9EwrWR5z8KvDQQs3O-yBHeNK8u2w24JGeXA5fFws1UWIFsY-saDOX_CisiTDTDpI-waAFCgC8UzxTX1_NOPgta5JNszdoIDooOIslfLQojSwIKYDK9agCjz0qncvqoBbPUxzyxXT2Fad2iRxQcHjiUsvjdSiNEDxuLFLOlFuhvacNCXyre4f2gqodDivwFHdcPn1hXmlSvOqHuApkhzMDHvIj3FdFWkj6zM07Lpnh4utpdthYLCo',
        rating: 4.8,
        date: 'Day 2 Navratri 2025',
        nightsAttended: 'Nights 1 & 2',
        rfidVerified: true,
        content: 'Rajpath’s hospitality is top notch. The crowd is so disciplined, full traditional dress code enforced, and the floral mandap in the center was breathtaking with 10,000 marigold garlands!',
        attendeeTip: 'Bring your District QR on phone; they exchange it for RFID wristband in 30 seconds at Counter 5.',
        parkingUsed: 'Rajpath Multilevel Car Deck',
        transitTime: 'Gate transit 2 mins',
        tags: ['Clean Washrooms', 'Floral Mandap', 'Family Security'],
        likes: 97,
      },
    ],
  },
  {
    id: 'mirchi-rock-n-dhol',
    name: 'Mirchi Rock N Dhol Ahmedabad 2025',
    subtitle: 'Aman Akash Party Plot Arena',
    tagline: 'High-octane fusion Garba, youth speed steps, and grand celebrity appearances',
    area: 'Paldi / Shreyas Crossing',
    address: 'Aman Akash Party Plot, Beside Trustnagar Society, Shreyas Crossing, Paldi, Ahmedabad 380007',
    coordinates: {
      lat: 23.0076,
      lng: 72.5518,
    },
    featuredArtists: 'Devang Patel & Bhoomi Trivedi with Radio Mirchi DJ Band',
    rating: 4.7,
    reviewsCount: 3120,
    capacity: '22,000 Dancers',
    floorType: 'Compressed Heavy Lawn with Anti-Skid Rubberised Matting',
    soundEngineering: 'L-Acoustics Stadium Rig with Subwoofer Array',
    singlePassPrice: 750,
    seasonPassPrice: 3400,
    sellingStatus: 'Selling Fast',
    coverImage: 'https://lh3.googleusercontent.com/aida/AEtjO1UKxKVtOgUaWKP3JnV5vAQipfLDeiu_1GNqS6upsF_L7DVd76IgkDhxriYAk0hiXnZYE2wiluGbbk6NjzF2FN6YxpsHWbDq0YHFp51kvjEgiYzgqzex3yaYSNJGbzhkfAfgPkhoBM3zspwG2VG1tUMKvb__xl1r1bFS_BgLv3BkQ_oZEaa6T_VahnI814RX-G7niyGdCtNSsQ8gWAB3xBJ-4-dmTUe48kipCupdNAx9m5LOdX7p3Elhh1Q',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida/AEtjO1VeuQYfwMWya1nDvK16yIwS1HvGED00ugCNgvU14px-QfUuDtqJXBB7JIMTtaOw4ucxPIbAVL5KthhyG1RjAn7zZLtlkY-_s5JzjdKmNRLFcZdn3fEPpB-4jIflanKYISNi5d6IDfDJd2CWNDJoLsT1QWdOtMTkjCOBRCUdb5j_hQffayQruck3fiAND-QOEO0Ya8m_o6s0H2vAPpLOAACyG57r5jOVWo6uAH0Iu66U9TY52YLI32zUSDc',
    ],
    perks: [
      'Fast Valet Drop via Shreyas Overbridge approach',
      'College Student Special Season Discounts',
      'Food Plaza featuring 40 Ahmedabad street food stalls',
      'Special dodhiyu and heench steps speed zone',
    ],
    parkingLots: [
      {
        lotName: 'Aman Akash Valet Bay',
        type: 'VIP / Valet',
        totalSlots: 350,
        availableSlots: 110,
        status: 'amber',
        avgTransitMins: 4,
        approachRoad: 'Via Shreyas Crossing service road',
        feeInfo: 'Valet Service Included',
      },
      {
        lotName: 'Paldi Railway Overbridge Open Lot',
        type: 'General 4-Wheeler',
        totalSlots: 550,
        availableSlots: 260,
        status: 'green',
        avgTransitMins: 5,
        approachRoad: 'Beside Shreyas School approach',
        feeInfo: '₹50 flat',
      },
    ],
    bookMyShowUrl: 'https://in.bookmyshow.com/explore/navratri-ahmedabad',
    districtUrl: 'https://district.in',
    trafficAdvisory: 'Heavy slow-moving traffic on Shreyas Railway Crossing underpass. Recommended to take Anjali Cross Road or Metro from Paldi Station (1.2 km away).',
    reviews: [
      {
        id: 'rev-mrd-1',
        userName: 'Aakash Dave',
        userBadge: 'Youth Group Captain',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuByz_ErQsVZ2RDMTCwRD20mhx0v1R99EQPDYc60ZOLKno_cePJsOfR5gsqIC7CapMqQeTppbUx3lYcaPqoRY6ir1BVeOgJlWgC6a4tIaFv7iCcxWiIh6VRI2uy6X2Rzxy1i7U3sFzyp9hagX2ue6Fd1kppgKQFtvJBFbybz-PYGW0in7VtlVTJZnQMANGWMHwJ4sXTQzlRQk0ORX0OEjfkHjHOlJtyE3lc40VInJ2dKmilYCVORoyT8',
        rating: 4.9,
        date: 'Day 3 Navratri 2025',
        nightsAttended: 'Nights 2 & 3',
        rfidVerified: true,
        content: 'Bhoomi Trivedi’s "Ram Chahe Leela" and traditional Gujarati dohas had the whole crowd roaring! If you love fast dodhiyu and spinning non-stop, Mirchi Rock N Dhol is the place in Ahmedabad.',
        attendeeTip: 'Come wearing rubberized mojaris; the turf grip is excellent.',
        parkingUsed: 'Aman Akash Valet Bay',
        transitTime: '4 mins valet retrieval',
        tags: ['Fast Dodhiyu Steps', 'Live DJ Fusion', 'Street Food Stalls'],
        likes: 128,
      },
    ],
  },
  {
    id: 'ymca-club',
    name: 'YMCA International Club Navratri Arena',
    subtitle: 'Makarba SG Highway Celebration',
    tagline: 'Lavish stadium lighting, air-conditioned pavilions, and premium couple passes',
    area: 'SG Highway / Makarba',
    address: 'YMCA International Club, S.G. Highway, Makarba, Ahmedabad 380015',
    coordinates: {
      lat: 22.9984,
      lng: 72.4986,
    },
    featuredArtists: 'Parthiv Gohil & Classical Troupe with Live Sitar & Shehnai',
    rating: 4.8,
    reviewsCount: 1640,
    capacity: '20,000 Dancers',
    floorType: 'Natural Treated Soft Lawn with Cedar Wood Perimeter Decks',
    soundEngineering: 'Acoustic Surround 360 Sound Architecture',
    singlePassPrice: 850,
    seasonPassPrice: 3900,
    sellingStatus: 'Limited Slots',
    coverImage: 'https://lh3.googleusercontent.com/aida/AEtjO1UE4CJX2y8Rc3Q26XTY01QFKaewfgaTp3Qwll1haaNcQ_YpbqYSv1rN8ZCqQxSrDncoCu4VdzhlZzYv1_kDkfQFxsWEjBbJhc5By9gHVABx1pkhksUfigrmYnInfbPMdGUmeNS1qVRmk8RUFKYgL15KXAcp_eEwJVFYCYJ6qzVf1mul7pj3e6N9P-TOL_GMd9wPGFoeO2pqup6-wdGEtwDErv963YVcG20wUb_q8moTAK1UKg_h3UQ_7O0',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida-public/AB6AXuC5HhexfXzADllvmwJidxC_MU6Kjf_Z6G_se12Eqr6wwe3YfW-k8Bd1Qlb20Dg1HBOO3kIzQIjX07_puVG74qt8Fqbk2CqxPGXSetslLCUktpgmRGL5Rkan4S5a45U0F2cF7RUZEKWgpU7fCrRLt-z9Ui-zrL2Om5duuv6JyXWVZ6IghgTlqcFz9J4fg2WYO43CNT0f1rNxgpAeC35xjSE5ZClA6uUHsJbb1o_-cpgzlL6giCKfhnEC',
    ],
    perks: [
      'Double Entry Lanes with FASTag style RFID gate scanners',
      'Air-Conditioned Banquet Lounge for elders and toddlers',
      'Complimentary Dandiya stick rental with pass',
      'Full She-Team and Medical Ambulance station on premises',
    ],
    parkingLots: [
      {
        lotName: 'YMCA Club Dedicated North Lot',
        type: 'VIP / Valet',
        totalSlots: 400,
        availableSlots: 210,
        status: 'green',
        avgTransitMins: 2,
        approachRoad: 'Direct SG Highway service road',
        feeInfo: 'Free for Passholders',
      },
      {
        lotName: 'Makarba South Ground Lot',
        type: 'General 4-Wheeler',
        totalSlots: 600,
        availableSlots: 380,
        status: 'green',
        avgTransitMins: 4,
        approachRoad: 'Via Makarba railway crossing road',
        feeInfo: '₹50 flat',
      },
    ],
    bookMyShowUrl: 'https://in.bookmyshow.com/explore/navratri-ahmedabad',
    districtUrl: 'https://district.in',
    trafficAdvisory: 'Smooth traffic along South SG Highway towards Sanand circle. Avoid taking U-turns on the main SG Highway flyover after 10 PM.',
    reviews: [
      {
        id: 'rev-ymca-1',
        userName: 'Pooja & Keyur Shah',
        userBadge: 'VIP Member Pass',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhsnC8pmSNQc4HbcH0XapaWyDLmsuEs3rsQolEmJxb1b-RWNyzJNv9JTHCq3uDlZye_2n-Dvedp-m-zroWPcP6bCw5ZzwIzTlZPxVDkGOmemy_i4ebiFrzDeYiBvYY01yQQiLdJEUBxvIjTrvL6v68xl_V5KeCqVYDMLtQN6_HB9d8iaF-Rcg6bNOby3nvb0AZ6AIjQJzvHhFGdV7PhRjFsu8DNFsHqQQYko-JuViiMC_kWNs_nzLo',
        rating: 5,
        date: 'Day 2 Navratri 2025',
        nightsAttended: 'Nights 1 & 2',
        rfidVerified: true,
        content: 'YMCA offers the cleanest and most organized Garba in Ahmedabad. The air-conditioned lounge made it super easy to bring my mother-in-law, and the parking marshal guided our car directly to Lot A without waiting.',
        attendeeTip: 'Try the live handvo and masala chai stall at midnight—absolute perfection.',
        parkingUsed: 'YMCA Club Dedicated North Lot',
        transitTime: '1 min gate walk',
        tags: ['Clean Washrooms', 'Senior AC Lounge', 'Fast RFID Scan'],
        likes: 112,
      },
    ],
  },
  {
    id: 'shankus-dandiya',
    name: 'Shankus Dandiya Mahotsav Bopal',
    subtitle: 'SP Ring Road Mega Amphitheatre',
    tagline: 'Ahmedabad biggest youth dance festival with celebrity DJ nights & heritage ras',
    area: 'Bopal / SP Ring Road',
    address: 'Shankus Water World Grounds, Near Ambali-Bopal Junction, S.P. Ring Road, Ahmedabad 380058',
    coordinates: {
      lat: 23.0331,
      lng: 72.4642,
    },
    featuredArtists: 'Aditya Gadhvi & Traditional Dhol Tasha Troupe',
    rating: 4.8,
    reviewsCount: 2280,
    capacity: '35,000 Dancers',
    floorType: 'Compressed Fine Grass Turf with Dust Proof Coir Matting',
    soundEngineering: 'JBL VTX Stadium Rig with 360-degree Delay Towers',
    singlePassPrice: 700,
    seasonPassPrice: 3200,
    sellingStatus: 'Selling Fast',
    coverImage: 'https://lh3.googleusercontent.com/aida/AEtjO1VeuQYfwMWya1nDvK16yIwS1HvGED00ugCNgvU14px-QfUuDtqJXBB7JIMTtaOw4ucxPIbAVL5KthhyG1RjAn7zZLtlkY-_s5JzjdKmNRLFcZdn3fEPpB-4jIflanKYISNi5d6IDfDJd2CWNDJoLsT1QWdOtMTkjCOBRCUdb5j_hQffayQruck3fiAND-QOEO0Ya8m_o6s0H2vAPpLOAACyG57r5jOVWo6uAH0Iu66U9TY52YLI32zUSDc',
    galleryImages: [
      'https://lh3.googleusercontent.com/aida/AEtjO1UKxKVtOgUaWKP3JnV5vAQipfLDeiu_1GNqS6upsF_L7DVd76IgkDhxriYAk0hiXnZYE2wiluGbbk6NjzF2FN6YxpsHWbDq0YHFp51kvjEgiYzgqzex3yaYSNJGbzhkfAfgPkhoBM3zspwG2VG1tUMKvb__xl1r1bFS_BgLv3BkQ_oZEaa6T_VahnI814RX-G7niyGdCtNSsQ8gWAB3xBJ-4-dmTUe48kipCupdNAx9m5LOdX7p3Elhh1Q',
    ],
    perks: [
      'Over 2,000 Open Field Parking Spots with Police Security',
      'Free E-Rickshaw shuttle from parking lot to Main Gate',
      'Food trucks & authentic Kathiyawadi Khichdi & Fafda stalls',
      'Aditya Gadhvi "Khalasi" special round at midnight',
    ],
    parkingLots: [
      {
        lotName: 'Shankus Open Ground Lot A & B',
        type: 'General 4-Wheeler',
        totalSlots: 1200,
        availableSlots: 680,
        status: 'green',
        avgTransitMins: 3,
        approachRoad: 'Via SP Ring Road South entrance',
        feeInfo: '₹50 flat',
      },
      {
        lotName: 'Bopal Two-Wheeler Arena',
        type: '2-Wheeler Free Bay',
        totalSlots: 1800,
        availableSlots: 1250,
        status: 'green',
        avgTransitMins: 2,
        approachRoad: 'Adjacent Gate 3',
        feeInfo: 'Free Entry',
      },
    ],
    bookMyShowUrl: 'https://in.bookmyshow.com/explore/navratri-ahmedabad',
    districtUrl: 'https://district.in',
    trafficAdvisory: 'Bopal roundabout experiences heavy influx between 9:00 PM and 10:00 PM. Take the SP Ring Road from Sanand circle for smooth ingress.',
    reviews: [
      {
        id: 'rev-shankus-1',
        userName: 'Dhruv Joshi',
        userBadge: 'Season Passholder',
        avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDkidTdB8F-3ZVUy3DZM8o2kT2sEkuvSWmeHe300T2VH4kc49V8hyMKQs5bYsv16K-mLcyHUFNp0XmgSUqSJhyKdsT1Cf2e4fCYP0o6v4tUQ6mBbAGVX3V2U02XcklZrFqNPiQTrVuKHpxs6AnbacQmpRc7MiBkg4-cfv7DYPi7_F5oszYGk0Y3-aYwh0vOeKXjvmafacN5wTpgpuXrMDCDg6Y2ayiSP6LF_ewtrN0rXWQ0_vke6Htj',
        rating: 4.8,
        date: 'Day 3 Navratri 2025',
        nightsAttended: 'Nights 1 to 3',
        rfidVerified: true,
        content: 'When Aditya Gadhvi sang "Khalasi" and Saurashtra ras, the atmosphere was electrifying! Parking was huge and easy to find on the SP Ring Road grounds.',
        attendeeTip: 'Park near Gate B for the fastest post-midnight exit towards Bopal.',
        parkingUsed: 'Shankus Open Ground Lot A',
        transitTime: '3 mins gate shuttle',
        tags: ['Aditya Gadhvi Live', 'Big Parking', 'Free Shuttle'],
        likes: 167,
      },
    ],
  },
];

export const AHMEDABAD_COMMUNITY_GALLERY = [
  {
    id: 'gal-1',
    title: 'Vintage Handcrafted Dandiya & Kutch Embroidery',
    author: 'Meera & Ronak Parekh',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuC8O8DUlybTQSBD784Yvk7j3D4htqvH3Z1h6HAYcAGtsloeJaL8mXcCOpspsWtaOUP2JUvg-6xbvszxt6z6M5M5dQFzGezUsRKTJvuwiETR1IIvJ5-Nu2YlQdn3XdpMSWa0dn_bA0gVGmJQbYJxVKqxdxFKE2TLcYwCa5ob37cO-_8NHKByyiWgzc-oRW2Ng6U6C5cacZxCZDpASLwbxhIZFAdLdXbLsN-Q2EbEp2YbY3zB3pb3Q0of',
    venue: 'GMDC Ground Vastrapur, Ahmedabad',
    night: 'Night 3',
    likes: 312,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VeuQYfwMWya1nDvK16yIwS1HvGED00ugCNgvU14px-QfUuDtqJXBB7JIMTtaOw4ucxPIbAVL5KthhyG1RjAn7zZLtlkY-_s5JzjdKmNRLFcZdn3fEPpB-4jIflanKYISNi5d6IDfDJd2CWNDJoLsT1QWdOtMTkjCOBRCUdb5j_hQffayQruck3fiAND-QOEO0Ya8m_o6s0H2vAPpLOAACyG57r5jOVWo6uAH0Iu66U9TY52YLI32zUSDc',
    tag: 'Costume & Dandiya',
  },
  {
    id: 'gal-2',
    title: '50,000 Dancers Swirling: Concentric Drone View',
    author: 'Ahmedabad Traffic & Police Command',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDJ5qChwCqKHtdYG3u1xafHXMbTKEBaAsYGAUwh4UvD_f3huy9gsC_cAghPrCnuPmbYUy1YmzJto2sIA7uzPSkpMmbozTb8YcLy84b-TQ1FCaVNzJJGGzlgmNR4XBCwbRdGAv6x231novOwoZgsfMAQ12vQfUVCx-9XHJL-OtdRUiiXWCOJij09c3vTwc9YmGlHvJ4BSwbWxMxECxDcRKxH3Lp-rxtxEFHEQgcRZfx2szVcVsZCTWJw',
    venue: 'Vibrant Gujarat GMDC Grounds',
    night: 'Night 2',
    likes: 890,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UKxKVtOgUaWKP3JnV5vAQipfLDeiu_1GNqS6upsF_L7DVd76IgkDhxriYAk0hiXnZYE2wiluGbbk6NjzF2FN6YxpsHWbDq0YHFp51kvjEgiYzgqzex3yaYSNJGbzhkfAfgPkhoBM3zspwG2VG1tUMKvb__xl1r1bFS_BgLv3BkQ_oZEaa6T_VahnI814RX-G7niyGdCtNSsQ8gWAB3xBJ-4-dmTUe48kipCupdNAx9m5LOdX7p3Elhh1Q',
    tag: 'Concentric Rings',
  },
  {
    id: 'gal-3',
    title: 'Illuminated LED Valet Gates & Smart Parking Flow',
    author: 'SG Highway Marshal Unit',
    authorAvatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuDhsnC8pmSNQc4HbcH0XapaWyDLmsuEs3rsQolEmJxb1b-RWNyzJNv9JTHCq3uDlZye_2n-Dvedp-m-zroWPcP6bCw5ZzwIzTlZPxVDkGOmemy_i4ebiFrzDeYiBvYY01yQQiLdJEUBxvIjTrvL6v68xl_V5KeCqVYDMLtQN6_HB9d8iaF-Rcg6bNOby3nvb0AZ6AIjQJzvHhFGdV7PhRjFsu8DNFsHqQQYko-JuViiMC_kWNs_nzLo',
    venue: 'Karnavati Club SG Highway',
    night: 'Night 3',
    likes: 420,
    imageUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UE4CJX2y8Rc3Q26XTY01QFKaewfgaTp3Qwll1haaNcQ_YpbqYSv1rN8ZCqQxSrDncoCu4VdzhlZzYv1_kDkfQFxsWEjBbJhc5By9gHVABx1pkhksUfigrmYnInfbPMdGUmeNS1qVRmk8RUFKYgL15KXAcp_eEwJVFYCYJ6qzVf1mul7pj3e6N9P-TOL_GMd9wPGFoeO2pqup6-wdGEtwDErv963YVcG20wUb_q8moTAK1UKg_h3UQ_7O0',
    tag: 'Smart Parking',
  },
  {
    id: 'gal-4',
    title: 'Smiling Gujarati Dancers in Traditional Kediyu',
    author: 'Pooja Shah',
    authorAvatar: 'https://lh3.googleusercontent.com/aida/AEtjO1XSSAo9EwrWR5z8KvDQQs3O-yBHeNK8u2w24JGeXA5fFws1UWIFsY-saDOX_CisiTDTDpI-waAFCgC8UzxTX1_NOPgta5JNszdoIDooOIslfLQojSwIKYDK9agCjz0qncvqoBbPUxzyxXT2Fad2iRxQcHjiUsvjdSiNEDxuLFLOlFuhvacNCXyre4f2gqodDivwFHdcPn1hXmlSvOqHuApkhzMDHvIj3FdFWkj6zM07Lpnh4utpdthYLCo',
    venue: 'Rajpath Club, Bodakdev',
    night: 'Night 1',
    likes: 540,
    imageUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBgv2jVNAVzHkhGZkJKt9UXf9Wa0xBGmLqOFOm3wx05yX4l8996VGQNSHXb3P2S9rtgeURvjvzSjQvTa6M8xxhrPYKa03tavOQNJbRGZrKaq-m0bM-AqY8pc0b6kWAtVYZ0X8lvgtDHl92RAK8jUpL6whtVePTBJUz8LcFkpU_5wvKRmiU0VezhmcOnF7o55kB8NfQjxo3Chy-khpEiQ4Q-lPLd08TaCnCKwvuGCCLii4UKuPdwcrBp',
    tag: 'Dancer Moments',
  },
];
