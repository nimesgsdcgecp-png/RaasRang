export interface ParkingTelemetry {
  lotName: string;
  totalBays: number;
  availableBays: number;
  status: 'Green Flow' | 'Moderate' | 'Amber Alert' | 'Full';
  transitTimeMins: number;
  type: string;
  advice: string;
  lat: number;
  lng: number;
}

export interface Review {
  id: string;
  author: string;
  role: string;
  rating: number;
  date: string;
  text: string;
  parkingUsed: string;
  dropTime: string;
  likes: number;
  avatar: string;
  photoUrl?: string;
  photoCaption?: string;
}

export interface GarbaVenue {
  id: string;
  name: string;
  subtitle: string;
  area: string; // Specific Ahmedabad area
  address: string;
  lat: number;
  lng: number;
  artists: string;
  capacity: string;
  rating: number;
  reviewCount: number;
  entryType: 'free' | 'pass'; // 'free' = ₹0 / open public / heritage; 'pass' = ticketed pass required
  perNightPrice: number;
  seasonPrice: number;
  bmsLink: string;
  districtLink: string;
  bannerImage: string;
  badge: string;
  floorType: string;
  parking: ParkingTelemetry[];
  perks: string[];
  reviews: Review[];
  description: string;
  trafficAdvisory: string;
}

export const AHMEDABAD_VENUES: GarbaVenue[] = [
  // 1. GMDC Ground (Official Mega Ground - Pass Entry)
  {
    id: 'gmdc-ground-ahmedabad',
    name: 'GMDC Ground - Vibrant Gujarat Garba 2025',
    subtitle: 'The Grand State Celebration of Gujarat',
    area: 'Memnagar & Vastrapur',
    address: 'GMDC Ground, 132 Feet Ring Road, Near Helmet Circle, Memnagar, Ahmedabad, Gujarat 380052',
    lat: 23.0487,
    lng: 72.5342,
    artists: 'Kinjal Dave, Kirtidan Gadhvi & 16-Piece Orchestra',
    capacity: '60,000+ Dancers',
    rating: 4.8,
    reviewCount: 3420,
    entryType: 'pass',
    perNightPrice: 600,
    seasonPrice: 2900,
    bmsLink: 'https://in.bookmyshow.com/explore/events-ahmedabad',
    districtLink: 'https://www.district.in/events',
    bannerImage: 'https://lh3.googleusercontent.com/aida/AEtjO1UE4CJX2y8Rc3Q26XTY01QFKaewfgaTp3Qwll1haaNcQ_YpbqYSv1rN8ZCqQxSrDncoCu4VdzhlZzYv1_kDkfQFxsWEjBbJhc5By9gHVABx1pkhksUfigrmYnInfbPMdGUmeNS1qVRmk8RUFKYgL15KXAcp_eEwJVFYCYJ6qzVf1mul7pj3e6N9P-TOL_GMd9wPGFoeO2pqup6-wdGEtwDErv963YVcG20wUb_q8moTAK1UKg_h3UQ_7O0',
    badge: 'Gujarat Official Mega Ground',
    floorType: 'Compressed Heavy Eco-Turf with Anti-Dust Binding',
    perks: ['1,200 Covered Spots', 'Live Dhol Tasha', 'Metro Line 1 Direct (Helmet Cross)', 'Handicap Ramp Access', '18 RO Water Points'],
    description: 'Ahmedabad’s most iconic and expansive official Garba festival, organized with 14 concentric step circles. Known for high security, live television broadcast, midnight maha-aarti, and lightning fast RFID gate turnstiles.',
    trafficAdvisory: 'Heavy movement on 132 Feet Ring Road after 9:15 PM. Use Helmet Circle Metro Station exit 3 for direct 2-minute foot walk into Gate 2.',
    parking: [
      {
        lotName: 'Helmet Cross Multi-Level (Lot A)',
        totalBays: 800,
        availableBays: 480,
        status: 'Green Flow',
        transitTimeMins: 3,
        type: '4-Wheeler Automated Multi-Level',
        advice: 'Best for attendees arriving via Drive-In Road or Vastrapur.',
        lat: 23.0475,
        lng: 72.5332,
      },
      {
        lotName: 'Gate 3 Fast Track (Lot B)',
        totalBays: 1200,
        availableBays: 620,
        status: 'Green Flow',
        transitTimeMins: 4,
        type: 'VIP Valet & 4-Wheeler',
        advice: 'Follow yellow painted lanes directly from Memnagar road.',
        lat: 23.0501,
        lng: 72.5358,
      },
      {
        lotName: 'Ring Road Two-Wheeler Bay (Lot C)',
        totalBays: 2500,
        availableBays: 1650,
        status: 'Green Flow',
        transitTimeMins: 1,
        type: 'Free Two-Wheeler Paddock',
        advice: '100% Free parking for scooters and motorbikes throughout Navratri.',
        lat: 23.0468,
        lng: 72.5365,
      }
    ],
    reviews: [
      {
        id: 'rev-gmdc-1',
        author: 'Jignesh K. Patel',
        role: 'Verified 9-Night Season Passholder',
        rating: 5.0,
        date: 'Night 3 • Oct 2025',
        text: 'The dust suppression spray on the soil was top tier! Kinjal Dave’s entry at 10:30 PM brought insane energy across all 14 rings. Gate 3 turnstiles cleared thousands in under 4 minutes flat.',
        parkingUsed: 'Helmet Cross Multi-Level',
        dropTime: '3 mins gate turnaround',
        likes: 184,
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=120&auto=format&fit=crop&q=80',
        photoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1VeuQYfwMWya1nDvK16yIwS1HvGED00ugCNgvU14px-QfUuDtqJXBB7JIMTtaOw4ucxPIbAVL5KthhyG1RjAn7zZLtlkY-_s5JzjdKmNRLFcZdn3fEPpB-4jIflanKYISNi5d6IDfDJd2CWNDJoLsT1QWdOtMTkjCOBRCUdb5j_hQffayQruck3fiAND-QOEO0Ya8m_o6s0H2vAPpLOAACyG57r5jOVWo6uAH0Iu66U9TY52YLI32zUSDc',
        photoCaption: 'Traditional wooden dandiyas at GMDC ground entrance'
      },
      {
        id: 'rev-gmdc-2',
        author: 'Pooja & Ronak Shah',
        role: 'Ahmedabad Passholder',
        rating: 4.8,
        date: 'Night 2 • Oct 2025',
        text: 'The Midnight Maha Aarti with 50,000 people holding brass diyas was pure divinity. Sound engineering across all line towers was clean without heavy distortion.',
        parkingUsed: 'Gate 3 Valet',
        dropTime: 'Valet pickup in 5 mins',
        likes: 92,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 2. Manek Chowk & Chandla Ol Heritage Pol (ICONIC FREE ENTRY GARBA)
  {
    id: 'manek-chowk-heritage-pol-ahmedabad',
    name: 'Manek Chowk & Chandla Ol Heritage Pol Garba',
    subtitle: 'UNESCO Walled City Midnight Sacred Pol Garba',
    area: 'Old City & Manek Chowk',
    address: 'Manek Chowk Heritage Square, Chandla Ol & Muhurat Pol, Khadia, Old City, Ahmedabad, Gujarat 380001',
    lat: 23.0242,
    lng: 72.5878,
    artists: 'Heritage Pol Mahila Mandal & Traditional Dhol Tasha Troupe',
    capacity: '12,000+ Dancers & Devotees',
    rating: 4.9,
    reviewCount: 4890,
    entryType: 'free',
    perNightPrice: 0,
    seasonPrice: 0,
    bmsLink: '',
    districtLink: '',
    bannerImage: 'https://lh3.googleusercontent.com/aida/AEtjO1U5UOm5SbkTrWI9BhxDLmci5tmLKmVjCB3UG8cYL1xljVaOzxBSHwUzoScYEsujkAGJaeLBGiNyn4Ihx66OaWbJ1dQ7LF_V9arj5VueHbkXQ6Ucz8QMsGMe9HQ3HHNKvlq7gUIcfoqXghEa5L3cjRdc8FZxI6CZ_b57ubYJ83JHP_4RF31uaNJ1PTnoOw88b26LPKoBanMavSTsuozlI2qkA0WpaiTUtHveeC62YjT38u78VNqIQbSxSXQ',
    badge: '100% Free Public Heritage Entry',
    floorType: 'Historic Pol Stone & Sand Courtyard (100% Barefoot Friendly)',
    perks: ['100% Free Entry • No Pass Needed', 'Midnight Pol Step Rounds', 'Famous Late-Night Food Market Nearby', 'Ancient Brass Garbi Mandap', 'Open to All Devotees'],
    description: 'The ancient spiritual heart of Ahmedabad Navratri. Held inside the centuries-old pols of the UNESCO World Heritage City, this Garba requires ZERO tickets or passes. Dancers dance in devotion till 3:00 AM around lit oil lamps accompanied by authentic dhol and acoustic folk singing.',
    trafficAdvisory: 'Vehicular movement inside Pols is closed after 10 PM. Park at AMC Gandhi Road Multi-Level or Kankaria West Hub and take a 4-minute walk.',
    parking: [
      {
        lotName: 'AMC Gandhi Road Multi-Level Parking',
        totalBays: 600,
        availableBays: 390,
        status: 'Green Flow',
        transitTimeMins: 4,
        type: 'Automated AMC City Multi-Level',
        advice: 'Nominal municipal parking rate; safe 24-hour security.',
        lat: 23.0255,
        lng: 72.5860,
      },
      {
        lotName: 'Manek Chowk Night Two-Wheeler Bay',
        totalBays: 1500,
        availableBays: 940,
        status: 'Green Flow',
        transitTimeMins: 2,
        type: 'Free Public Two-Wheeler Lot',
        advice: 'Free dedicated scooter bays along Danapith road.',
        lat: 23.0238,
        lng: 72.5885,
      }
    ],
    reviews: [
      {
        id: 'rev-manek-1',
        author: 'Dharmesh V. Joshi',
        role: 'Old City Resident & Folk Enthusiast',
        rating: 5.0,
        date: 'Night 3 • Oct 2025',
        text: 'This is authentic Gujarati Garba in its purest form! No commercial passes, no VIP barricades, just pure devotion and the rhythm of traditional dhol echoing off wooden carved havelis.',
        parkingUsed: 'AMC Gandhi Road Multi-Level',
        dropTime: '3 mins walk through Muhurat Pol',
        likes: 215,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80',
        photoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UKxKVtOgUaWKP3JnV5vAQipfLDeiu_1GNqS6upsF_L7DVd76IgkDhxriYAk0hiXnZYE2wiluGbbk6NjzF2FN6YxpsHWbDq0YHFp51kvjEgiYzgqzex3yaYSNJGbzhkfAfgPkhoBM3zspwG2VG1tUMKvb__xl1r1bFS_BgLv3BkQ_oZEaa6T_VahnI814RX-G7niyGdCtNSsQ8gWAB3xBJ-4-dmTUe48kipCupdNAx9m5LOdX7p3Elhh1Q',
        photoCaption: 'Sacred midnight Garba deepaks in historic Manek Chowk'
      }
    ]
  },

  // 3. Karnavati Club (Elite Club - Pass Entry)
  {
    id: 'karnavati-club-ahmedabad',
    name: 'Karnavati Club Raas Utsav 2025',
    subtitle: 'Ahmedabad’s Prestigious Heritage Club Garba',
    area: 'SG Highway & Mumatpura',
    address: 'Karnavati Club, Gandhinagar - Sarkhej Hwy, Opp. Golden Tulip, Mumatpura, Ahmedabad, Gujarat 380058',
    lat: 23.0135,
    lng: 72.5028,
    artists: 'Osman Mir & Aditya Gadhvi',
    capacity: '35,000 Dancers',
    rating: 4.9,
    reviewCount: 4120,
    entryType: 'pass',
    perNightPrice: 1500,
    seasonPrice: 5500,
    bmsLink: 'https://in.bookmyshow.com/explore/events-ahmedabad',
    districtLink: 'https://www.district.in/events',
    bannerImage: 'https://lh3.googleusercontent.com/aida/AEtjO1U5UOm5SbkTrWI9BhxDLmci5tmLKmVjCB3UG8cYL1xljVaOzxBSHwUzoScYEsujkAGJaeLBGiNyn4Ihx66OaWbJ1dQ7LF_V9arj5VueHbkXQ6Ucz8QMsGMe9HQ3HHNKvlq7gUIcfoqXghEa5L3cjRdc8FZxI6CZ_b57ubYJ83JHP_4RF31uaNJ1PTnoOw88b26LPKoBanMavSTsuozlI2qkA0WpaiTUtHveeC62YjT38u78VNqIQbSxSXQ',
    badge: 'Elite Barefoot Lawn • Pass Required',
    floorType: 'Natural Treated Soft Grass Lawn (100% Barefoot Friendly)',
    perks: ['3 Underground Basements', 'Strict Traditional Chaniya Choli Rule', 'Air-Cooled VIP Lounges', 'Zero Dust Guarantee', 'Gourmet Midnight Farsan Court'],
    description: 'Renowned as the most aristocratic traditional Garba in Ahmedabad. Features deep rhythmic folk Gujarati tunes, barefoot dancers on manicured Bermuda grass, and seamless VIP valet management on SG Highway.',
    trafficAdvisory: 'South-bound SG Highway slow near ISKCON bridge. Take the interior Judges Bungalow road or Mumatpura feeder road.',
    parking: [
      {
        lotName: 'Karnavati North Basement (Lot 1)',
        totalBays: 600,
        availableBays: 240,
        status: 'Moderate',
        transitTimeMins: 4,
        type: 'Underground Electronic Valet',
        advice: 'Dedicated fast-entry lane for Season Passholders.',
        lat: 23.0142,
        lng: 72.5035,
      },
      {
        lotName: 'South Club Perimeter (Lot 2)',
        totalBays: 1000,
        availableBays: 480,
        status: 'Green Flow',
        transitTimeMins: 5,
        type: 'Surface Parking & Free Buggy',
        advice: 'Electric golf carts shuttle senior citizens to Gate 1 directly.',
        lat: 23.0125,
        lng: 72.5015,
      }
    ],
    reviews: [
      {
        id: 'rev-karn-1',
        author: 'Dr. Ananya Trivedi',
        role: 'Verified BMS Passholder',
        rating: 5.0,
        date: 'Night 4 • Oct 2025',
        text: 'Barefoot dancing on Karnavati turf is the pinnacle of Navratri! Aditya Gadhvi singing "Khalasi" live sent shivers down the spine. Strict dress code ensured everyone was in authentic vibrant attire.',
        parkingUsed: 'North Basement Valet',
        dropTime: '2 mins drop turnaround',
        likes: 145,
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=120&auto=format&fit=crop&q=80',
        photoUrl: 'https://lh3.googleusercontent.com/aida/AEtjO1UKxKVtOgUaWKP3JnV5vAQipfLDeiu_1GNqS6upsF_L7DVd76IgkDhxriYAk0hiXnZYE2wiluGbbk6NjzF2FN6YxpsHWbDq0YHFp51kvjEgiYzgqzex3yaYSNJGbzhkfAfgPkhoBM3zspwG2VG1tUMKvb__xl1r1bFS_BgLv3BkQ_oZEaa6T_VahnI814RX-G7niyGdCtNSsQ8gWAB3xBJ-4-dmTUe48kipCupdNAx9m5LOdX7p3Elhh1Q',
        photoCaption: 'Midnight concentric rings under royal canopy'
      }
    ]
  },

  // 4. Bhadrakali Mandir Chowk (ICONIC FREE ENTRY GARBA)
  {
    id: 'bhadrakali-mandir-chowk-ahmedabad',
    name: 'Bhadrakali Mandir Chowk Maha Garba',
    subtitle: 'Nagar-Devi Divine Shakti Peeth Royal Courtyard',
    area: 'Lal Darwaja & Bhadra',
    address: 'Shree Bhadrakali Mandir Courtyard, Opposite Bhadra Fort, Lal Darwaja, Ahmedabad, Gujarat 380001',
    lat: 23.0275,
    lng: 72.5805,
    artists: 'Shakti Mandli, Traditional Shehnai & Dhol Tasha Troupe',
    capacity: '18,000+ Devotees',
    rating: 4.9,
    reviewCount: 3620,
    entryType: 'free',
    perNightPrice: 0,
    seasonPrice: 0,
    bmsLink: '',
    districtLink: '',
    bannerImage: 'https://lh3.googleusercontent.com/aida/AEtjO1UE4CJX2y8Rc3Q26XTY01QFKaewfgaTp3Qwll1haaNcQ_YpbqYSv1rN8ZCqQxSrDncoCu4VdzhlZzYv1_kDkfQFxsWEjBbJhc5By9gHVABx1pkhksUfigrmYnInfbPMdGUmeNS1qVRmk8RUFKYgL15KXAcp_eEwJVFYCYJ6qzVf1mul7pj3e6N9P-TOL_GMd9wPGFoeO2pqup6-wdGEtwDErv963YVcG20wUb_q8moTAK1UKg_h3UQ_7O0',
    badge: '100% Free Public Temple Entry',
    floorType: 'Polished Kota Stone Temple Mandap (100% Barefoot)',
    perks: ['100% Free Public Entry', 'Sacred Mahaprasad Counter', 'Midnight 108-Diya Aarti', 'Free Shoe Cloakroom', 'Family & Elderly Seating'],
    description: 'Held directly in the grand courtyard of Ahmedabad’s protector deity Ma Bhadrakali. 100% free community devotional Garba. Every attendee receives sanctified prasadam, and thousands sway in devotion to sacred shlokas and soulful Gujarati raas.',
    trafficAdvisory: 'Use Bhadra Plaza pedestrian precinct. Free public bus connections from all city parts directly to Lal Darwaja Terminus.',
    parking: [
      {
        lotName: 'Lal Darwaja Terminus Public Car Park',
        totalBays: 500,
        availableBays: 310,
        status: 'Green Flow',
        transitTimeMins: 3,
        type: 'Managed Surface Public Lot',
        advice: 'Safe municipal parking directly beside Bhadra Plaza.',
        lat: 23.0268,
        lng: 72.5795,
      }
    ],
    reviews: [
      {
        id: 'rev-bhadra-1',
        author: 'Vaishali Shukla',
        role: 'Devotee & Traditional Dancer',
        rating: 5.0,
        date: 'Night 2 • Oct 2025',
        text: 'The divine vibration when the 108 deepaks are lifted during the midnight aarti is incomparable to any commercial plot. Completely free entry, safe atmosphere for families, and holy prasad for everyone.',
        parkingUsed: 'Lal Darwaja Terminus Lot',
        dropTime: '2 mins walk into temple courtyard',
        likes: 167,
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=120&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 5. Rajpath Club (Pass Entry)
  {
    id: 'rajpath-club-ahmedabad',
    name: 'Rajpath Club Golden Dandiya 2025',
    subtitle: 'The Royal Tradition of Bodakdev',
    area: 'SG Highway & Bodakdev',
    address: 'Rajpath Club, S.G. Highway, Bodakdev, Ahmedabad, Gujarat 380059',
    lat: 23.0372,
    lng: 72.5118,
    artists: 'Sanjay Oza & Rupali Jagga',
    capacity: '30,000 Dancers',
    rating: 4.9,
    reviewCount: 3890,
    entryType: 'pass',
    perNightPrice: 1200,
    seasonPrice: 4800,
    bmsLink: 'https://in.bookmyshow.com/explore/events-ahmedabad',
    districtLink: 'https://www.district.in/events',
    bannerImage: 'https://lh3.googleusercontent.com/aida/AEtjO1UKxKVtOgUaWKP3JnV5vAQipfLDeiu_1GNqS6upsF_L7DVd76IgkDhxriYAk0hiXnZYE2wiluGbbk6NjzF2FN6YxpsHWbDq0YHFp51kvjEgiYzgqzex3yaYSNJGbzhkfAfgPkhoBM3zspwG2VG1tUMKvb__xl1r1bFS_BgLv3BkQ_oZEaa6T_VahnI814RX-G7niyGdCtNSsQ8gWAB3xBJ-4-dmTUe48kipCupdNAx9m5LOdX7p3Elhh1Q',
    badge: 'Heritage Elite Club • Pass Required',
    floorType: 'Natural Treated Soft Turf with Border Wooden Platform',
    perks: ['Pakwan Cross Shuttle', 'Valet Drop Points 1 & 2', 'Dedicated Senior Gallery', 'Free Dandiya Sticks for Ladies'],
    description: 'A celebrated fixture of Ahmedabad festival nights, featuring traditional Sanedo, Dakla, and slow rhythmic 2-tali & 3-tali steps before transitioning into electrifying speed-rounds.',
    trafficAdvisory: 'Expect slow traffic near Pakwan Junction from 9:30 PM. Use Sindhu Bhavan connection flyover.',
    parking: [
      {
        lotName: 'Pakwan Cross Underground Bay (Lot A)',
        totalBays: 500,
        availableBays: 190,
        status: 'Moderate',
        transitTimeMins: 4,
        type: 'Underground Multi-Level',
        advice: 'Free shuttle bus runs every 2 minutes from Pakwan lot to Gate 1.',
        lat: 23.0360,
        lng: 72.5125,
      },
      {
        lotName: 'Rajpath East Valet Lane',
        totalBays: 350,
        availableBays: 85,
        status: 'Amber Alert',
        transitTimeMins: 7,
        type: 'Valet Service Bay',
        advice: 'Peak traffic between 9:45 PM and 10:30 PM.',
        lat: 23.0380,
        lng: 72.5110,
      }
    ],
    reviews: [
      {
        id: 'rev-raj-1',
        author: 'Meera & Harshil Parikh',
        role: 'VIP Passholders',
        rating: 4.9,
        date: 'Night 3 • Oct 2025',
        text: 'Zero crowd pushing, beautiful acoustic balance, and the senior citizen seating enclosure allowed our parents to comfortably enjoy the divine aarti.',
        parkingUsed: 'Pakwan Underground',
        dropTime: 'Shuttle took 2 mins',
        likes: 78,
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?w=120&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 6. Gujarat University Youth Ground (ICONIC FREE ENTRY GARBA)
  {
    id: 'gujarat-university-ground-ahmedabad',
    name: 'Gujarat University Youth & Public Cultural Garba',
    subtitle: 'Open Student & Community Folk Pavilion',
    area: 'Navrangpura & University',
    address: 'Gujarat University Open Grounds, Near Senate Hall, University Road, Navrangpura, Ahmedabad, Gujarat 380009',
    lat: 23.0366,
    lng: 72.5450,
    artists: 'Saurashtra Folk Beats & Gujarat Vidyapith Mandli',
    capacity: '22,000 Dancers & Students',
    rating: 4.7,
    reviewCount: 2410,
    entryType: 'free',
    perNightPrice: 0,
    seasonPrice: 0,
    bmsLink: '',
    districtLink: '',
    bannerImage: 'https://lh3.googleusercontent.com/aida/AEtjO1VeuQYfwMWya1nDvK16yIwS1HvGED00ugCNgvU14px-QfUuDtqJXBB7JIMTtaOw4ucxPIbAVL5KthhyG1RjAn7zZLtlkY-_s5JzjdKmNRLFcZdn3fEPpB-4jIflanKYISNi5d6IDfDJd2CWNDJoLsT1QWdOtMTkjCOBRCUdb5j_hQffayQruck3fiAND-QOEO0Ya8m_o6s0H2vAPpLOAACyG57r5jOVWo6uAH0Iu66U9TY52YLI32zUSDc',
    badge: '100% Free Open Cultural Entry',
    floorType: 'Natural Campus Lawn with Red Soil Ring',
    perks: ['100% Free Public Entry', 'Youth & Student Inclusive', 'Metro Line 1 (Commerce Six Roads)', 'Spacious 2-Wheeler Free Bays', 'Affordable Tea & Snack Stalls'],
    description: 'A vibrant, open cultural Garba organized in Navrangpura. Completely free to enter for students, families, and city dancers. Famous for high-speed dodhiyu steps, youthful energy, and warm inclusive festive camaraderie.',
    trafficAdvisory: 'Smooth traffic on University Road. Commerce Six Roads Metro station is an easy 3-minute stroll.',
    parking: [
      {
        lotName: 'University Convention Center Ground Bay',
        totalBays: 1200,
        availableBays: 780,
        status: 'Green Flow',
        transitTimeMins: 3,
        type: 'Open Campus Free Parking',
        advice: 'Free parking for 2-wheelers and cars in designated university paddocks.',
        lat: 23.0355,
        lng: 72.5460,
      }
    ],
    reviews: [
      {
        id: 'rev-uni-1',
        author: 'Kinjal Bhatt',
        role: 'University Alumni',
        rating: 4.8,
        date: 'Night 1 • Oct 2025',
        text: 'The best dodhiyu choreography in town! No expensive passes or wristband hassles, just bring your dandiyas and dance the night away.',
        parkingUsed: 'University Ground Bay',
        dropTime: '2 mins walk',
        likes: 89,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 7. SOI Mandli - Shankus Dandiya on SBR (Pass Entry)
  {
    id: 'soi-mandli-sbr-ahmedabad',
    name: 'SOI Mandli - Shankus Dandiya on SBR',
    subtitle: 'The Electric Youth & Folk Fusion Hub',
    area: 'Sindhu Bhavan Road (SBR)',
    address: 'Near Taj Skyline, Sindhu Bhavan Marg, Bodakdev, Ahmedabad, Gujarat 380054',
    lat: 23.0441,
    lng: 72.5005,
    artists: 'Aishwarya Majmudar & Arvind Vegda (Bhai Bhai)',
    capacity: '25,000 Dancers',
    rating: 4.7,
    reviewCount: 2650,
    entryType: 'pass',
    perNightPrice: 800,
    seasonPrice: 3200,
    bmsLink: 'https://in.bookmyshow.com/explore/events-ahmedabad',
    districtLink: 'https://www.district.in/events',
    bannerImage: 'https://lh3.googleusercontent.com/aida/AEtjO1VeuQYfwMWya1nDvK16yIwS1HvGED00ugCNgvU14px-QfUuDtqJXBB7JIMTtaOw4ucxPIbAVL5KthhyG1RjAn7zZLtlkY-_s5JzjdKmNRLFcZdn3fEPpB-4jIflanKYISNi5d6IDfDJd2CWNDJoLsT1QWdOtMTkjCOBRCUdb5j_hQffayQruck3fiAND-QOEO0Ya8m_o6s0H2vAPpLOAACyG57r5jOVWo6uAH0Iu66U9TY52YLI32zUSDc',
    badge: 'Sindhu Bhavan Highlight • Pass Required',
    floorType: 'Compressed Heavy Turf with Anti-Dust Matting',
    perks: ['SBR Food Street Adjacent', '2-Wheeler Paddock Free', 'RFID Wristband Express', 'High-Speed Dodhiyu Rounds'],
    description: 'Set right on Ahmedabad’s trendiest avenue, Sindhu Bhavan Road. A high-voltage arena where high-fashion Chaniya Cholis meet thunderous Gujarati fusion rhythms and lightning fast step choreography.',
    trafficAdvisory: 'SBR has designated one-way parking lanes managed by Ahmedabad Traffic Police. Strictly park in marked lots.',
    parking: [
      {
        lotName: 'SBR South Field Paddock (Lot 1)',
        totalBays: 700,
        availableBays: 340,
        status: 'Green Flow',
        transitTimeMins: 3,
        type: 'Managed Open Field Car Park',
        advice: 'Turn in right before Taj Skyline junction.',
        lat: 23.0435,
        lng: 72.4990,
      }
    ],
    reviews: [
      {
        id: 'rev-soi-1',
        author: 'Kavish Dave',
        role: 'Circle Lead Dancer',
        rating: 4.8,
        date: 'Night 2 • Oct 2025',
        text: 'Aishwarya Majmudar’s high-pitch folk melodies keep the tempo relentless! Best dodhiyu steps in West Ahmedabad.',
        parkingUsed: 'SBR South Field',
        dropTime: 'Parked in 4 mins',
        likes: 64,
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=120&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 8. Mirchi Rock N Dhol (Pass Entry)
  {
    id: 'mirchi-rock-n-dhol-ahmedabad',
    name: 'Radio Mirchi Rock N Dhol 2025',
    subtitle: 'The Celebrity Star Arena',
    area: 'Thaltej & SBR Extension',
    address: 'Aman Akash Party Plot, Sindhu Bhavan Extension, Thaltej, Ahmedabad, Gujarat 380059',
    lat: 23.0560,
    lng: 72.4921,
    artists: 'Bhoomi Trivedi & Live Fusion Band',
    capacity: '20,000 Dancers',
    rating: 4.8,
    reviewCount: 2980,
    entryType: 'pass',
    perNightPrice: 750,
    seasonPrice: 3000,
    bmsLink: 'https://in.bookmyshow.com/explore/events-ahmedabad',
    districtLink: 'https://www.district.in/events',
    bannerImage: 'https://lh3.googleusercontent.com/aida/AEtjO1UE4CJX2y8Rc3Q26XTY01QFKaewfgaTp3Qwll1haaNcQ_YpbqYSv1rN8ZCqQxSrDncoCu4VdzhlZzYv1_kDkfQFxsWEjBbJhc5By9gHVABx1pkhksUfigrmYnInfbPMdGUmeNS1qVRmk8RUFKYgL15KXAcp_eEwJVFYCYJ6qzVf1mul7pj3e6N9P-TOL_GMd9wPGFoeO2pqup6-wdGEtwDErv963YVcG20wUb_q8moTAK1UKg_h3UQ_7O0',
    badge: 'Celebrity Headliner • Pass Required',
    floorType: 'Double-Layered Carpeted Wooden Flooring',
    perks: ['Live Mirchi Radio Broadcast', 'Selfie Booths', 'FSSAI Approved Food Stalls', 'Medical Tents Active'],
    description: 'Ahmedabad’s favorite celebrity Garba party plot, hosting Bollywood & Gujarati singer Bhoomi Trivedi alongside massive synchronized sound systems and festive laser projections.',
    trafficAdvisory: 'Approach from Sardar Patel Ring Road to avoid interior Thaltej village congestion.',
    parking: [
      {
        lotName: 'Aman Akash Gate 1 & 2 Valet Bay',
        totalBays: 600,
        availableBays: 280,
        status: 'Green Flow',
        transitTimeMins: 4,
        type: 'Valet & Guarded Lot',
        advice: 'Security personnel guide 4-wheelers to parallel shaded bays.',
        lat: 23.0555,
        lng: 72.4910,
      }
    ],
    reviews: [
      {
        id: 'rev-mirchi-1',
        author: 'Rhea Panchal',
        role: 'Verified BMS Passholder',
        rating: 4.8,
        date: 'Night 1 • Oct 2025',
        text: 'Bhoomi Trivedi sang Ramleela tracks live at 11 PM and the whole crowd was singing along in step! Super smooth car exit afterwards.',
        parkingUsed: 'Gate 1 Valet',
        dropTime: '3 mins wait',
        likes: 53,
        avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=120&auto=format&fit=crop&q=80'
      }
    ]
  },

  // 9. Swarnim Park Heritage Community Garba (Pass Entry)
  {
    id: 'swarnim-park-bopal-ahmedabad',
    name: 'Swarnim Park Heritage Community Garba',
    subtitle: 'Authentic Sheri & Society Garba Spirit',
    area: 'South Bopal & Ambli',
    address: 'Swarnim Park Ground, Gala Gymkhana Road, South Bopal, Ahmedabad, Gujarat 380058',
    lat: 23.0289,
    lng: 72.4642,
    artists: 'Hemant Chauhan Mandli & Traditional Folk Troupe',
    capacity: '15,000 Dancers',
    rating: 4.7,
    reviewCount: 1840,
    entryType: 'pass',
    perNightPrice: 350,
    seasonPrice: 1800,
    bmsLink: 'https://in.bookmyshow.com/explore/events-ahmedabad',
    districtLink: 'https://www.district.in/events',
    bannerImage: 'https://lh3.googleusercontent.com/aida/AEtjO1U5UOm5SbkTrWI9BhxDLmci5tmLKmVjCB3UG8cYL1xljVaOzxBSHwUzoScYEsujkAGJaeLBGiNyn4Ihx66OaWbJ1dQ7LF_V9arj5VueHbkXQ6Ucz8QMsGMe9HQ3HHNKvlq7gUIcfoqXghEa5L3cjRdc8FZxI6CZ_b57ubYJ83JHP_4RF31uaNJ1PTnoOw88b26LPKoBanMavSTsuozlI2qkA0WpaiTUtHveeC62YjT38u78VNqIQbSxSXQ',
    badge: 'Society & Family Favorite',
    floorType: 'Treated Soft Red Soil (Traditional Barefoot Circle)',
    perks: ['Free Shoe Cloakroom', 'Family Only Enclosure', 'Affordable Community Passes', 'Senior Citizen Free Entry'],
    description: 'Experience authentic Gujarati Sheri Garba nostalgia in South Bopal. Pure acoustic dhol without synthetic synthesizers, sacred earthen garbo mandap in the center, and warm community hospitality.',
    trafficAdvisory: 'Smooth traffic movement along Gala Gymkhana road. Wide roadside parking bays.',
    parking: [
      {
        lotName: 'Swarnim Park Ground Bay (Lot 1)',
        totalBays: 400,
        availableBays: 220,
        status: 'Green Flow',
        transitTimeMins: 2,
        type: 'Free Community Parking',
        advice: 'Managed by South Bopal Society volunteer marshals.',
        lat: 23.0280,
        lng: 72.4635,
      }
    ],
    reviews: [
      {
        id: 'rev-bopal-1',
        author: 'Devang Mehtalia',
        role: 'Local Society Resident',
        rating: 5.0,
        date: 'Night 3 • Oct 2025',
        text: 'No commercial showmanship—just pure devotion, smiling aunties, energetic youth doing 3-tali, and delicious piping hot Jalebi-Fafda counter by local sweet shops.',
        parkingUsed: 'Community Bay',
        dropTime: '1 min walk',
        likes: 47,
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=120&auto=format&fit=crop&q=80'
      }
    ]
  }
];

export const AHMEDABAD_AREAS = [
  'All Ahmedabad',
  'Old City & Manek Chowk',
  'Lal Darwaja & Bhadra',
  'Navrangpura & University',
  'Memnagar & Vastrapur',
  'SG Highway & Mumatpura',
  'SG Highway & Bodakdev',
  'Sindhu Bhavan Road (SBR)',
  'Thaltej & SBR Extension',
  'South Bopal & Ambli'
];
