export type RestaurantStatus = "non soumis" | "en attente" | "validé" | "rejeté";

export type Restaurant = {
  id: string;
  ownerId: string;
  nom: string;
  quartier: string;
  statut: RestaurantStatus;
  description?: string;
  horaires?: string;
  specialites?: string;
  raisonSociale?: string;
  rccm?: string;
  soumisLe?: string;
};

export const CURRENT_USER_ID = "u1";

export const RESTAURANTS: Restaurant[] = [
  {
    id: "chez-ama",
    ownerId: "u1",
    nom: "Chez Ama",
    quartier: "Tokoin",
    statut: "validé",
    description:
      "Cuisine togolaise maison, grillades et jus locaux, à deux pas du marché de Tokoin.",
    horaires: "Lun–Dim, 11h–22h",
    specialites: "Akpan, riz sauce arachide",
  },
  {
    id: "petit-ama",
    ownerId: "u1",
    nom: "Le Petit Ama",
    quartier: "Agoè",
    statut: "non soumis",
  },
  {
    id: "maquis-agoe",
    ownerId: "u2",
    nom: "Le Maquis d'Agoè",
    quartier: "Agoè",
    statut: "en attente",
    rccm: "TG-LOM-2024-B-1123",
    soumisLe: "2 août 2026",
  },
  {
    id: "chez-fifi",
    ownerId: "u3",
    nom: "Chez Fifi",
    quartier: "Bè",
    statut: "en attente",
    rccm: "TG-LOM-2024-B-0898",
    soumisLe: "3 août 2026",
  },
  {
    id: "kodjoviakope-grill",
    ownerId: "u4",
    nom: "Le Kodjoviakopé Grill",
    quartier: "Kodjoviakopé",
    statut: "rejeté",
  },
  {
    id: "table-nyekonakpoe",
    ownerId: "u5",
    nom: "La Table de Nyékonakpoè",
    quartier: "Nyékonakpoè",
    statut: "validé",
  },
];

export type KybDossier = {
  id: string;
  nom: string;
  quartier: string;
  rccm: string;
  soumis: string;
  telephone: string;
  email: string;
};

export const KYB_QUEUE: KybDossier[] = [
  {
    id: "kyb-1",
    nom: "Le Maquis d'Agoè",
    quartier: "Agoè",
    rccm: "TG-LOM-2024-B-1123",
    soumis: "2 août 2026",
    telephone: "+228 90 11 22 33",
    email: "contact@maquisagoe.tg",
  },
  {
    id: "kyb-2",
    nom: "Chez Fifi",
    quartier: "Bè",
    rccm: "TG-LOM-2024-B-0898",
    soumis: "3 août 2026",
    telephone: "+228 91 22 33 44",
    email: "fifi@resto.app",
  },
];

export type Membre = {
  id: string;
  nom: string;
  email: string;
  telephone: string;
  resto?: string;
  ville?: string;
};

export const MEMBRES: { restaurateurs: Membre[]; gourmets: Membre[] } = {
  restaurateurs: [
    { id: "mem-r1", nom: "Ama K.", email: "ama@chezama.tg", telephone: "+228 90 12 34 56", resto: "Chez Ama" },
    { id: "mem-r2", nom: "Fifi N.", email: "fifi@resto.app", telephone: "+228 91 22 33 44", resto: "Chez Fifi" },
    {
      id: "mem-r3",
      nom: "Kodjo A.",
      email: "kodjo@resto.app",
      telephone: "+228 92 33 44 55",
      resto: "Le Kodjoviakopé Grill",
    },
  ],
  gourmets: [
    { id: "mem-g1", nom: "Kossi A.", email: "kossi@mail.tg", telephone: "+228 93 44 55 66", ville: "Lomé" },
    { id: "mem-g2", nom: "Afi D.", email: "afi@mail.tg", telephone: "+228 94 55 66 77", ville: "Lomé" },
    { id: "mem-g3", nom: "Yao M.", email: "yao@mail.tg", telephone: "+228 95 66 77 88", ville: "Aného" },
  ],
};

export type EvenementPlateforme = {
  id: string;
  titre: string;
  resto: string;
  date: string;
  description?: string;
};

export const EVENEMENTS_PLATEFORME: EvenementPlateforme[] = [
  {
    id: "evp-1",
    titre: "Soirée dégustation vins locaux",
    resto: "Chez Ama",
    date: "Jeu. 13 août",
    description: "Dégustation de vins de palme et jus locaux accompagnée de bouchées maison.",
  },
  {
    id: "evp-2",
    titre: "Brunch du dimanche",
    resto: "La Table de Nyékonakpoè",
    date: "Dim. 16 août",
    description: "Formule brunch avec spécialités togolaises et cafés locaux, dès 10h.",
  },
];

export type Avis = {
  id: string;
  auteur: string;
  note: number;
  texte: string;
  restoNom: string;
};

export const AVIS: Avis[] = [
  {
    id: "avis-1",
    auteur: "Kossi A.",
    note: 5,
    texte: "Le riz sauce arachide est excellent, service rapide.",
    restoNom: "Chez Ama",
  },
  {
    id: "avis-2",
    auteur: "Afi D.",
    note: 4,
    texte: "Bonne ambiance, un peu bruyant le week-end.",
    restoNom: "Chez Ama",
  },
  {
    id: "avis-3",
    auteur: "Yao M.",
    note: 5,
    texte: "Mon maquis préféré à Tokoin, j'y retourne chaque semaine.",
    restoNom: "Chez Ama",
  },
  {
    id: "avis-4",
    auteur: "Sena K.",
    note: 4,
    texte: "Le poulet grillé du Petit Ama est top, cadre plus calme qu'à Tokoin.",
    restoNom: "Le Petit Ama",
  },
];

export type Reservation = {
  id: string;
  nom: string;
  personnes: number;
  date: string;
  statut: "En attente" | "Confirmée";
  restoNom: string;
  telephone: string;
  note?: string;
};

export const RESERVATIONS: Reservation[] = [
  {
    id: "res-1",
    nom: "Sena K.",
    personnes: 4,
    date: "Ven. 7 août, 20h00",
    statut: "En attente",
    restoNom: "Chez Ama",
    telephone: "+228 96 77 88 99",
    note: "Anniversaire, table près de la fenêtre si possible.",
  },
  {
    id: "res-2",
    nom: "Elom T.",
    personnes: 2,
    date: "Sam. 8 août, 13h00",
    statut: "Confirmée",
    restoNom: "Chez Ama",
    telephone: "+228 97 88 99 00",
  },
  {
    id: "res-3",
    nom: "Afi D.",
    personnes: 3,
    date: "Dim. 9 août, 19h00",
    statut: "En attente",
    restoNom: "Le Petit Ama",
    telephone: "+228 94 55 66 77",
    note: "Allergie à l'arachide, prévenir la cuisine.",
  },
];

export type Evenement = {
  id: string;
  titre: string;
  date: string;
  description?: string;
};

export const EVENEMENTS: Evenement[] = [
  {
    id: "ev-1",
    titre: "Soirée dégustation vins locaux",
    date: "Jeu. 13 août",
    description: "Dégustation de vins de palme et jus locaux accompagnée de bouchées maison.",
  },
];
