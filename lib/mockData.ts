export type RestaurantStatus = "validé" | "en attente" | "rejeté";

export const RESTAURANTS: { nom: string; quartier: string; statut: RestaurantStatus }[] = [
  { nom: "Chez Ama", quartier: "Tokoin", statut: "validé" },
  { nom: "Le Maquis d'Agoè", quartier: "Agoè", statut: "en attente" },
  { nom: "Chez Fifi", quartier: "Bè", statut: "en attente" },
  { nom: "Le Kodjoviakopé Grill", quartier: "Kodjoviakopé", statut: "rejeté" },
  { nom: "La Table de Nyékonakpoè", quartier: "Nyékonakpoè", statut: "validé" },
];

export const KYB_QUEUE = [
  {
    nom: "Le Maquis d'Agoè",
    quartier: "Agoè",
    rccm: "TG-LOM-2024-B-1123",
    soumis: "2 août 2026",
  },
  {
    nom: "Chez Fifi",
    quartier: "Bè",
    rccm: "TG-LOM-2024-B-0898",
    soumis: "3 août 2026",
  },
];

export const MEMBRES = {
  restaurateurs: [
    { nom: "Ama K.", email: "ama@chezama.tg", resto: "Chez Ama" },
    { nom: "Fifi N.", email: "fifi@resto.app", resto: "Chez Fifi" },
    { nom: "Kodjo A.", email: "kodjo@resto.app", resto: "Le Kodjoviakopé Grill" },
  ],
  gourmets: [
    { nom: "Kossi A.", email: "kossi@mail.tg", ville: "Lomé" },
    { nom: "Afi D.", email: "afi@mail.tg", ville: "Lomé" },
    { nom: "Yao M.", email: "yao@mail.tg", ville: "Aného" },
  ],
};

export const EVENEMENTS_PLATEFORME = [
  { titre: "Soirée dégustation vins locaux", resto: "Chez Ama", date: "Jeu. 13 août" },
  { titre: "Brunch du dimanche", resto: "La Table de Nyékonakpoè", date: "Dim. 16 août" },
];
