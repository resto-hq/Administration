// Mock content for the public showcase page. Nothing here is fetched from the
// backend — mirrors the "prototype" convention of the design reference
// (mockLandingStats stay [N], everything else is explicitly demo content),
// to be swapped for real collecte-terrain data once it exists.

export type MockRestaurant = {
  name: string;
  neighborhood: string;
  rating: number;
  reviewCount: number;
  tags: [string, string];
  priceRange: string;
};

export const mockRestaurants: MockRestaurant[] = [
  {
    name: "Le Palmier Bleu",
    neighborhood: "Bè",
    rating: 4.6,
    reviewCount: 57,
    tags: ["Togolaise", "Maquis"],
    priceRange: "1 500 à 4 000 FCFA",
  },
  {
    name: "Chez Maman Adjo",
    neighborhood: "Tokoin",
    rating: 4.5,
    reviewCount: 64,
    tags: ["Togolaise", "Fast food"],
    priceRange: "1 000 à 3 000 FCFA",
  },
  {
    name: "La Terrasse d'Agoè",
    neighborhood: "Agoè",
    rating: 4.3,
    reviewCount: 28,
    tags: ["Africaine", "Rooftop"],
    priceRange: "2 500 à 7 000 FCFA",
  },
  {
    name: "Saveurs d'Atakpamé",
    neighborhood: "Lomé",
    rating: 4.2,
    reviewCount: 33,
    tags: ["Togolaise", "Traiteur"],
    priceRange: "2 000 à 6 000 FCFA",
  },
  {
    name: "Le Comptoir du Golfe",
    neighborhood: "Kodjoviakopé",
    rating: 4.4,
    reviewCount: 83,
    tags: ["Européenne", "Gastronomique"],
    priceRange: "6 000 à 18 000 FCFA",
  },
  {
    name: "Braise & Co",
    neighborhood: "Adidogomé",
    rating: 4.1,
    reviewCount: 39,
    tags: ["Grillades", "Fast food"],
    priceRange: "2 000 à 5 500 FCFA",
  },
];

export const restaurantFilterChips = [
  "Togolaise",
  "Maquis",
  "Grillades",
  "Européenne",
  "Africaine",
  "Fast food",
  "Moins de 3 000 FCFA",
  "Ouvert maintenant",
] as const;

export type MockEvent = {
  day: string;
  month: string;
  title: string;
  venue: string;
  neighborhood: string;
};

export const mockEvents: MockEvent[] = [
  {
    day: "04",
    month: "OCT",
    title: "Soirée grillades et live band",
    venue: "Le Palmier Bleu",
    neighborhood: "Bè",
  },
  {
    day: "11",
    month: "OCT",
    title: "Dégustation de vins et fromages",
    venue: "Le Comptoir du Golfe",
    neighborhood: "Kodjoviakopé",
  },
  {
    day: "18",
    month: "OCT",
    title: "Atelier cuisine togolaise",
    venue: "Chez Maman Adjo",
    neighborhood: "Tokoin",
  },
];

export const neighborhoods = ["Lomé", "Bè", "Tokoin", "Adidogomé", "Agoè"];

// Rounded, plausible mock counts — swap for the real collecte-terrain numbers
// once available. Kept in one place so every section quoting them agrees.
export const totalRestaurantsCollected = 42;
export const totalFieldAgents = 8;
