import SidebarNav, { type NavItem } from "@/components/SidebarNav";

const NAV_ITEMS: NavItem[] = [
  {
    href: "/dashboard",
    label: "Vue d'ensemble",
    icon: <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />,
  },
  {
    href: "/dashboard/verification",
    label: "Vérification (KYB)",
    icon: (
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-1.5 10.5-2-2-1.4 1.4 3.4 3.4 5.4-5.4-1.4-1.4-4 4Z" />
    ),
  },
  {
    href: "/dashboard/fiche",
    label: "Ma fiche",
    icon: <path d="M4 4h16v4H4V4Zm0 6h16v10H4V10Zm2 2v2h5v-2H6Z" />,
  },
  {
    href: "/dashboard/avis",
    label: "Avis",
    icon: <path d="m12 3 2.6 5.6 6.1.6-4.6 4.1 1.3 6-5.4-3.1-5.4 3.1 1.3-6-4.6-4.1 6.1-.6L12 3Z" />,
  },
  {
    href: "/dashboard/reservations",
    label: "Réservations",
    icon: <path d="M7 2v3M17 2v3M4 8h16M4 5h16v15H4V5Zm3 6h4v4H7v-4Z" />,
  },
  {
    href: "/dashboard/evenements",
    label: "Événements",
    icon: <path d="M4 11a8 8 0 0 1 14-5l2 2-3 3-2-2a4 4 0 0 0-7 2l-1 3-3-1 0-2Zm0 0-2 6 6-2" />,
  },
];

export default function Sidebar() {
  return <SidebarNav items={NAV_ITEMS} />;
}
