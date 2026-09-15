"use client";

import Link from "next/link";
import PageHeader from "@/components/dashboard/PageHeader";
import {
  usePendingKyc,
  usePendingEvents,
  useAdminRestaurantRequests,
} from "@/hooks/useAdmin";
import { useReports } from "@/hooks/useReports";

function QueueCard({ href, label, count }: { href: string; label: string; count: number }) {
  return (
    <Link
      href={href}
      className="flex items-center justify-between rounded-xl border border-border bg-panel p-5 transition-colors hover:border-primary/50"
    >
      <span className="text-sm font-semibold text-ink">{label}</span>
      <span className="text-2xl font-bold text-primary">{count}</span>
    </Link>
  );
}

type RecentType = "kyc_creator" | "kyc_restaurant" | "request" | "event" | "report";

type RecentItem = {
  id: string;
  type: RecentType;
  title: string;
  date: string;
  href: string;
};

const RECENT_TYPE_LABELS: Record<RecentType, string> = {
  kyc_creator: "KYC Créateur",
  kyc_restaurant: "KYC Restaurant",
  request: "Référencement",
  event: "Événement",
  report: "Signalement",
};

const RECENT_TYPE_STYLES: Record<RecentType, string> = {
  kyc_creator: "bg-info-soft text-info",
  kyc_restaurant: "bg-mustard/20 text-[#8A6A00]",
  request: "bg-success-soft text-success",
  event: "bg-primary/10 text-primary-dark",
  report: "bg-danger-ui-soft text-danger-ui",
};

export default function AdminOverviewPage() {
  const { data: pendingKyc } = usePendingKyc();
  const { data: pendingEvents } = usePendingEvents();
  const { data: pendingRequests } = useAdminRestaurantRequests({ status: "pending" });
  const { data: pendingReports } = useReports({ status: "pending", per_page: 50 });

  const creatorKycCount = (pendingKyc ?? []).filter(
    (kyc) => kyc.kyc_type === "person" || kyc.kyc_type === "creator"
  ).length;
  const restaurantKycCount = (pendingKyc ?? []).filter(
    (kyc) => kyc.kyc_type === "restaurant"
  ).length;
  const eventsCount = pendingEvents?.length ?? 0;
  const requestsCount = pendingRequests?.length ?? 0;
  const reportsCount = pendingReports?.length ?? 0;
  const hasQueue =
    creatorKycCount + restaurantKycCount + eventsCount + requestsCount + reportsCount > 0;

  // Same queues as the counters above, flattened into one chronological feed
  // — still "what needs attention", just detailed instead of counted.
  const recentItems: RecentItem[] = [
    ...(pendingKyc ?? []).map((kyc) => ({
      id: kyc.id,
      type: (kyc.kyc_type === "restaurant" ? "kyc_restaurant" : "kyc_creator") as RecentType,
      title: kyc.restaurant_name ?? `${kyc.first_name} ${kyc.last_name}`,
      date: kyc.submitted_at ?? "",
      href: `/admin/verifications/${kyc.id}`,
    })),
    ...(pendingRequests ?? []).map((request) => ({
      id: request.id,
      type: "request" as RecentType,
      title: request.name,
      date: request.created_at,
      href: "/admin/restaurants",
    })),
    ...(pendingEvents ?? []).map((event) => ({
      id: event.id,
      type: "event" as RecentType,
      title: event.title,
      date: event.created_at,
      href: `/admin/evenements/${event.id}`,
    })),
    ...(pendingReports ?? []).map((report) => ({
      id: report.id,
      type: "report" as RecentType,
      title: report.reason,
      date: report.created_at,
      href: `/admin/signalements/${report.id}`,
    })),
  ]
    .filter((item) => item.date)
    .sort((a, b) => (a.date < b.date ? 1 : -1))
    .slice(0, 5);

  return (
    <div>
      <PageHeader
        eyebrow="ADMIN RESTO"
        title="File d'action"
        subtitle="Ce qui attend une décision aujourd'hui. Les tendances de croissance sont dans Statistiques."
      />

      {hasQueue ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {creatorKycCount > 0 && (
            <QueueCard href="/admin/verifications" label="KYC Créateur en attente" count={creatorKycCount} />
          )}
          {restaurantKycCount > 0 && (
            <QueueCard href="/admin/verifications" label="KYC Restaurant en attente" count={restaurantKycCount} />
          )}
          {requestsCount > 0 && (
            <QueueCard
              href="/admin/restaurants"
              label="Demandes de référencement"
              count={requestsCount}
            />
          )}
          {eventsCount > 0 && (
            <QueueCard href="/admin/evenements" label="Événements à modérer" count={eventsCount} />
          )}
          {reportsCount > 0 && (
            <QueueCard href="/admin/signalements" label="Contenus signalés" count={reportsCount} />
          )}
        </div>
      ) : (
        <p className="text-sm text-ink/60">Rien n&apos;attend de décision pour le moment.</p>
      )}

      {recentItems.length > 0 && (
        <div className="mt-8 rounded-xl border border-border bg-panel">
          <div className="border-b border-border px-5 py-4">
            <h2 className="text-sm font-bold text-ink">Arrivées récentes</h2>
            <p className="mt-0.5 text-xs text-ink/50">
              Les 5 dernières demandes soumises, tous types confondus.
            </p>
          </div>
          <div>
            {recentItems.map((item, index) => (
              <Link
                key={`${item.type}-${item.id}`}
                href={item.href}
                className={`flex items-center justify-between gap-3 px-5 py-3.5 transition-colors hover:bg-app-bg ${
                  index < recentItems.length - 1 ? "border-b border-border-soft" : ""
                }`}
              >
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`shrink-0 rounded-full px-2.5 py-1 text-[11px] font-semibold ${RECENT_TYPE_STYLES[item.type]}`}
                  >
                    {RECENT_TYPE_LABELS[item.type]}
                  </span>
                  <span className="truncate text-sm font-medium text-ink">{item.title}</span>
                </div>
                <span className="shrink-0 text-xs text-ink/45">
                  {new Date(item.date).toLocaleDateString("fr-FR")}
                </span>
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
