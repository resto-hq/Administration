"use client";

import { useState, type FormEvent } from "react";
import { useParams } from "next/navigation";
import PageHeader from "@/components/dashboard/PageHeader";
import BackLink from "@/components/dashboard/BackLink";
import StampButton from "@/components/StampButton";
import { useMyReviews, useRespondToReview } from "@/hooks/useReviews";
import { getApiErrorMessage } from "@/lib/api-error";

export default function AvisDetailPage() {
  const params = useParams<{ id: string }>();
  const { data: reviews, isPending } = useMyReviews();
  const respondToReview = useRespondToReview();
  const [response, setResponse] = useState("");

  const avis = reviews.find((r) => r.id === params.id);

  if (isPending) {
    return <p className="text-sm text-ink/60">Chargement…</p>;
  }

  if (!avis) {
    return (
      <div>
        <BackLink href="/dashboard/avis" label="Retour aux avis" />
        <PageHeader eyebrow="RÉPUTATION" title="Avis introuvable" />
      </div>
    );
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!avis) return;
    respondToReview.mutate({ reviewId: avis.id, body: { response } });
  }

  return (
    <div>
      <BackLink href="/dashboard/avis" label="Retour aux avis" />
      <PageHeader eyebrow={avis.restaurant_name.toUpperCase()} title={`Avis`} />

      <div className="max-w-xl space-y-4 rounded-xl border border-border bg-panel p-6">
        <p className="text-lg text-primary-dark">
          {"★".repeat(Math.round(avis.rating))}
          {"☆".repeat(5 - Math.round(avis.rating))}
        </p>
        <p className="text-ink/80">{avis.text}</p>
        <p className="text-xs font-semibold tracking-wide text-ink/50">
          {new Date(avis.created_at).toLocaleDateString("fr-FR")}
        </p>

        {avis.restaurant_response ? (
          <div className="rounded-lg bg-app-bg p-4">
            <p className="text-xs font-semibold tracking-wide text-ink/50">Ta réponse</p>
            <p className="mt-1 text-ink/80">{avis.restaurant_response}</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3 border-t border-ink/10 pt-4">
            <label htmlFor="response" className="block text-sm font-semibold text-ink">
              Répondre à cet avis
            </label>
            <textarea
              id="response"
              rows={3}
              value={response}
              onChange={(event) => setResponse(event.target.value)}
              required
              maxLength={1000}
              className="w-full rounded-lg border border-border bg-app-bg px-4 py-3 text-ink outline-none placeholder:text-ink/35 focus:border-primary focus:ring-2 focus:ring-primary/30"
            />
            {respondToReview.isError && (
              <p className="text-sm font-semibold text-primary-dark">
                {getApiErrorMessage(respondToReview.error, "Impossible d'envoyer la réponse.")}
              </p>
            )}
            <StampButton type="submit" disabled={respondToReview.isPending}>
              {respondToReview.isPending ? "Envoi…" : "Répondre"}
            </StampButton>
          </form>
        )}
      </div>
    </div>
  );
}
