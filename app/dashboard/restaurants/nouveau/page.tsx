import PageHeader from "@/components/dashboard/PageHeader";
import RestaurantForm from "@/components/dashboard/RestaurantForm";

export default function NouveauRestaurantPage() {
  return (
    <div>
      <PageHeader
        eyebrow="TES ÉTABLISSEMENTS"
        title="Ajouter un restaurant"
        subtitle="Tu pourras compléter sa fiche et son dossier KYB juste après."
      />

      <div className="max-w-md">
        <RestaurantForm submitLabel="Créer ce restaurant" />
      </div>
    </div>
  );
}
