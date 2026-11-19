
export type Category =
  | 'Coast & Islands'
  | 'Heritage & History'
  | 'Nature & Wellness';

export type Scene = 'islands' | 'lighthouse' | 'springs';

// GitHub Pages repository path
const BASE_PATH = process.env.NEXT_PUBLIC_BASE_PATH || '';

// Image path helper
export function assetPath(path: string): string {
  if (/^(https?:\/\/|data:|blob:)/i.test(path)) {
    return path;
  }

  return `${BASE_PATH}${path.startsWith('/') ? path : `/${path}`}`;
}

export type Destination = {
  slug: string;
  title: string;
  place: string;
  category: Category;
  scene: Scene;
  cardImage: string;
  heroImage: string;
  short: string;
  intro: string;
  story: string[];
  highlights: { title: string; description: string }[];
  tips: string[];
  goodFor: string[];
  mapQuery: string;
  sourceUrl: string;
  sourceName: string;
  travelNote: string;
  number: string;
  tag: string;
};

export const destinations: Destination[] = [
  {
    slug: 'hundred-islands',
    title: 'Hundred Islands',
    place: 'Alaminos City',
    category: 'Coast & Islands',
    scene: 'islands',
    cardImage: assetPath('/photos/hundred-islands-720.webp'),
    heroImage: assetPath('/photos/hundred-islands-1280.webp'),
    tag: 'The coastal icon',
    number: '01',
    short: 'A maze of emerald islets, warm sea breezes, and endless blue.',
    intro: 'Let the sea lead you through a remarkable collection of limestone islets along Lingayen Gulf.',
    story: [
      'Hundred Islands National Park is one of Pangasinan’s best-known natural landmarks. Its limestone islets rise out of the water like green jewels, creating an unforgettable coastal landscape.',
      'For generations, the sea has shaped the livelihoods and stories of nearby communities. A visit is an opportunity to appreciate the islands, meet local guides, and help protect the marine environment for future travelers.'
    ],
    highlights: [
      {
        title: 'Island-hopping',
        description: 'Discover scenic coves and island views with a locally authorized boat operator.'
      },
      {
        title: 'Viewpoints',
        description: 'Enjoy panoramic vistas where accessible and permitted by park staff.'
      },
      {
        title: 'Marine life',
        description: 'Observe coastal ecosystems respectfully; never step on coral or collect wildlife.'
      }
    ],
    tips: [
      'Begin at Lucap Wharf in Alaminos City and confirm the current visitor process.',
      'Check marine weather and boat safety before heading out.',
      'Bring drinking water, reef-conscious sun protection, and a reusable bag.',
      'Fees, island access, and operating rules can change; verify them with the park.'
    ],
    goodFor: ['Island explorers', 'Nature lovers', 'Families'],
    mapQuery: 'Hundred Islands National Park Lucap Wharf Alaminos Pangasinan',
    sourceUrl: 'https://www.thehundredislands.ph/',
    sourceName: 'Hundred Islands National Park visitor website',
    travelNote: 'Coastal trip · Weather dependent',
  },

  {
    slug: 'cape-bolinao-lighthouse',
    title: 'Cape Bolinao Lighthouse',
    place: 'Bolinao',
    category: 'Heritage & History',
    scene: 'lighthouse',
    cardImage: assetPath('/photos/cape-bolinao-lighthouse-720.webp'),
    heroImage: assetPath('/photos/cape-bolinao-lighthouse-1280.webp'),
    tag: 'A beacon through time',
    number: '02',
    short: 'A historic coastal sentinel with stories carried by the wind.',
    intro: 'Follow the shoreline to a century-old lighthouse overlooking the sea.',
    story: [
      'Built in 1905, Cape Bolinao Lighthouse is a striking reminder of the region’s maritime history. For decades, lighthouses helped vessels navigate coastal waters long before modern digital navigation became common.',
      'Today, the structure is a much-loved landmark. It invites visitors to look beyond the view and think about the people, trade, and coastal communities connected by the sea.'
    ],
    highlights: [
      {
        title: 'Maritime heritage',
        description: 'Learn how coastal lights served as navigational aids for passing vessels.'
      },
      {
        title: 'Coastal scenery',
        description: 'Take in wide views and changing light near the western shoreline.'
      },
      {
        title: 'Architecture',
        description: 'Observe the details of the lighthouse from public, permitted areas.'
      }
    ],
    tips: [
      'Visit during daylight and allow time to enjoy the coastal landscape.',
      'Do not assume tower entry is available; follow all posted access rules.',
      'Avoid climbing restricted structures or leaving any litter.',
      'Check local conditions and transportation options before your visit.'
    ],
    goodFor: ['History enthusiasts', 'Photographers', 'Slow travelers'],
    mapQuery: 'Cape Bolinao Lighthouse Patar Bolinao Pangasinan',
    sourceUrl: 'https://www.pangasinan.gov.ph/what-makes-pangasinan-ang-galing/',
    sourceName: 'Province of Pangasinan tourism feature',
    travelNote: 'Historic coastal landmark · Daytime visits',
  },

  {
    slug: 'balungao-hot-springs',
    title: 'Balungao Hot Springs',
    place: 'Balungao',
    category: 'Nature & Wellness',
    scene: 'springs',
    cardImage: assetPath('/photos/balungao-hot-springs-720.webp'),
    heroImage: assetPath('/photos/balungao-hot-springs-1280.webp'),
    tag: 'A refreshing retreat',
    number: '03',
    short: 'Warm springs, green hills, and a slower rhythm of adventure.',
    intro: 'Trade the coast for the countryside, where water and volcanic terrain shape the landscape.',
    story: [
      'Near Mount Balungao, hot and cold springs offer a different side of Pangasinan’s natural character. The mountain’s volcanic origins help explain this distinctive setting.',
      'Balungao is also known for its outdoor recreation and local community life. The area brings together relaxation and adventure, while reminding visitors to care for the landscape that makes these experiences possible.'
    ],
    highlights: [
      {
        title: 'Hot and cold springs',
        description: 'Experience a relaxing waterside retreat where facilities are operating and available.'
      },
      {
        title: 'Hilltop setting',
        description: 'Appreciate the greenery and the geological story of Mount Balungao.'
      },
      {
        title: 'Outdoor adventure',
        description: 'Ask local operators which recreational activities are currently offered.'
      }
    ],
    tips: [
      'Confirm opening schedules, water conditions, and admission details with the operator.',
      'Test water temperature before entering and supervise children closely.',
      'Bring a change of clothes and respect posted pool safety rules.',
      'Help keep pathways and spring areas clean.'
    ],
    goodFor: ['Wellness seekers', 'Friends & families', 'Nature escapes'],
    mapQuery: 'Balungao Hilltop Adventure Hot and Cold Springs Resort Pangasinan',
    sourceUrl: 'https://www.pangasinan.gov.ph/city-municipalities/balungao/',
    sourceName: 'Province of Pangasinan: Balungao',
    travelNote: 'Inland retreat · Check facility hours',
  }
];

// Find destination by slug
export function getDestination(slug: string) {
  return destinations.find(
    (destination) => destination.slug === slug
  );
}

// Available categories
export const categories: Array<'All places' | Category> = [
  'All places',
  'Coast & Islands',
  'Heritage & History',
  'Nature & Wellness'
];

// Google Maps URL generator
export function createMapUrl(query: string) {
  return `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query)}`;
}
