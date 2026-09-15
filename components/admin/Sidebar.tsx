import SidebarNav, { type NavItem } from "@/components/SidebarNav";
import SidebarLogoutButton from "@/components/SidebarLogoutButton";

const NAV_ITEMS: NavItem[] = [
  {
    href: "/admin",
    label: "Vue d'ensemble",
    icon: <path d="M4 4h6v6H4V4Zm10 0h6v6h-6V4ZM4 14h6v6H4v-6Zm10 0h6v6h-6v-6Z" />,
  },
  {
    href: "/admin/verifications",
    label: "Vérifications KYC",
    icon: (
      <path d="M12 3l7 3v6c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Zm-1.5 10.5-2-2-1.4 1.4 3.4 3.4 5.4-5.4-1.4-1.4-4 4Z" />
    ),
  },
  {
    href: "/admin/restaurants",
    label: "Restaurants",
    icon: <path d="M4 4h16v4H4V4Zm0 6h16v10H4V10Zm2 2v2h5v-2H6Z" />,
  },
  {
    href: "/admin/membres",
    label: "Membres",
    icon: (
      <path d="M9 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2c-3.3 0-6 1.8-6 4v2h12v-2c0-2.2-2.7-4-6-4Zm9-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6Zm0 2c-.8 0-1.6.1-2.3.4 1.4 1 2.3 2.5 2.3 4.6v2h5v-2c0-2.2-2.4-4-5-5Z" />
    ),
  },
  {
    href: "/admin/evenements",
    label: "Événements",
    icon: <path d="M4 11a8 8 0 0 1 14-5l2 2-3 3-2-2a4 4 0 0 0-7 2l-1 3-3-1 0-2Zm0 0-2 6 6-2" />,
  },
  {
    href: "/admin/signalements",
    label: "Signalements",
    icon: (
      <path d="M12 9v4m0 4h.01M10.3 3.9 2.7 17a2 2 0 0 0 1.7 3h15.2a2 2 0 0 0 1.7-3L13.7 3.9a2 2 0 0 0-3.4 0Z" />
    ),
  },
  {
    href: "/admin/audit",
    label: "Journal d'audit",
    icon: (
      <path d="M9 3h6a2 2 0 0 1 2 2v14l-5-3-5 3V5a2 2 0 0 1 2-2Zm0 5h6m-6 4h6" />
    ),
  },
  {
    href: "/admin/statistiques",
    label: "Statistiques",
    icon: (
      <path d="M4 20V10m6 10V4m6 16v-7m6 7V8" />
    ),
  },
];

export default function Sidebar() {
  return (
    <SidebarNav
      items={NAV_ITEMS}
      badge="ADMIN"
      footer={<SidebarLogoutButton redirectTo="/admin/connexion" />}
    />
  );
}
