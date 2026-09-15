"use client";

import { useState, type ReactNode } from "react";
import Sidebar from "@/components/dashboard/Sidebar";
import PersonKycIntroScreen from "@/components/dashboard/PersonKycIntroScreen";
import PersonKycStatusModal from "@/components/dashboard/PersonKycStatusModal";
import KycApprovedModal from "@/components/dashboard/KycApprovedModal";
import AppShell from "@/components/dashboard/AppShell";
import { useKycStatus } from "@/hooks/useKyc";
import { useMyRestaurants } from "@/hooks/useRestaurants";
import { hasSeenKycIntro } from "@/lib/kyc-onboarding";

export default function DashboardShell({ children }: { children: ReactNode }) {
  const { data: kycStatus, isPending: kycPending } = useKycStatus();
  const { data: restaurants } = useMyRestaurants();
  const [introSkipped, setIntroSkipped] = useState(false);

  if (kycPending) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-app-bg">
        <p className="text-sm text-ink/60">Chargement…</p>
      </div>
    );
  }

  const personStatus = kycStatus?.person_kyc.status ?? "not_submitted";

  if (personStatus === "not_submitted" && !introSkipped && !hasSeenKycIntro()) {
    return <PersonKycIntroScreen onSkip={() => setIntroSkipped(true)} />;
  }

  // Logging in always lands on the dashboard itself — never straight into the
  // (long) restaurant creation form. Being newly approved just adds a prompt
  // offering to continue there, with an explicit way to postpone it.
  const justApproved = personStatus === "approved" && (restaurants?.length ?? 0) === 0;

  return (
    <>
      {(personStatus === "pending" || personStatus === "rejected") && (
        <PersonKycStatusModal
          key={personStatus}
          status={personStatus}
          rejectionReason={kycStatus?.person_kyc.rejection_reason}
        />
      )}
      {justApproved && <KycApprovedModal />}
      <AppShell sidebar={<Sidebar />}>{children}</AppShell>
    </>
  );
}
