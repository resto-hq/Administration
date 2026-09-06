"use client";

import { useEffect, useState, type FormEvent } from "react";
import FormField from "@/components/auth/FormField";
import StampButton from "@/components/StampButton";
import Stepper from "@/components/dashboard/Stepper";
import { parseList, joinList } from "@/lib/form-utils";
import { saveRestaurantDraft, loadRestaurantDraft } from "@/lib/restaurant-draft";
import type { components } from "@/services/api-types";

const STEPS = [
  "Identité",
  "Catégorisation & tarifs",
  "Services & paiement",
  "Horaires",
  "Infos & engagements",
  "Réseaux & autres",
] as const;

type RestaurantCreate = components["schemas"]["RestaurantCreate"];
type RestaurantRead = components["schemas"]["RestaurantRead"];

const SERVICE_FIELDS = [
  "Delivery available",
  "Reservations Online",
  "Parking available",
  "Accessible for people with reduced mobility",
  "Free Wi-Fi",
  "Outdoor terrace/Open air",
  "Private room",
  "Catering service",
] as const;

const DAYS = [
  ["monday", "Lundi"],
  ["tuesday", "Mardi"],
  ["wednesday", "Mercredi"],
  ["thursday", "Jeudi"],
  ["friday", "Vendredi"],
  ["saturday", "Samedi"],
  ["sunday", "Dimanche"],
] as const;
type Day = (typeof DAYS)[number][0];

type DayHours = { open: string; close: string };

type FormState = {
  name: string;
  address: string;
  lat: string;
  lng: string;
  phone_numbers: string;
  email: string;
  website: string;
  description: string;
  restaurant_types: string;
  cuisine_types: string;
  concept: string;
  signature_dishes: string;
  suggested_starters: string;
  price_range_min: string;
  price_range_max: string;
  menu_items: string;
  promotions: string;
  delivery_available: boolean;
  takeaway_available: boolean;
  services: Record<(typeof SERVICE_FIELDS)[number], boolean>;
  payment_methods: { cards: boolean; cash: boolean; mobile_money: boolean };
  opening_hours: Record<Day, DayHours>;
  seating_capacity: string;
  cancellation_policy: string;
  house_rules: string;
  architectural_features: string;
  environmental_commitments: string;
  community_commitments: string;
  loyalty_programs: string;
  health_certifications: string;
  social_links: {
    facebook: string;
    instagram: string;
    tiktok: string;
    twitter: string;
    youtube: string;
    linkedin: string;
    website: string;
  };
  contact_form_enabled: boolean;
  newsletter_enabled: boolean;
  booking_integrations: string;
};

function emptyDayHours(): Record<Day, DayHours> {
  return Object.fromEntries(DAYS.map(([key]) => [key, { open: "", close: "" }])) as Record<
    Day,
    DayHours
  >;
}

function emptyServices(): Record<(typeof SERVICE_FIELDS)[number], boolean> {
  return Object.fromEntries(SERVICE_FIELDS.map((key) => [key, false])) as Record<
    (typeof SERVICE_FIELDS)[number],
    boolean
  >;
}

function emptyState(): FormState {
  return {
    name: "",
    address: "",
    lat: "",
    lng: "",
    phone_numbers: "",
    email: "",
    website: "",
    description: "",
    restaurant_types: "",
    cuisine_types: "",
    concept: "",
    signature_dishes: "",
    suggested_starters: "",
    price_range_min: "",
    price_range_max: "",
    menu_items: "",
    promotions: "",
    delivery_available: false,
    takeaway_available: false,
    services: emptyServices(),
    payment_methods: { cards: false, cash: false, mobile_money: false },
    opening_hours: emptyDayHours(),
    seating_capacity: "",
    cancellation_policy: "",
    house_rules: "",
    architectural_features: "",
    environmental_commitments: "",
    community_commitments: "",
    loyalty_programs: "",
    health_certifications: "",
    social_links: {
      facebook: "",
      instagram: "",
      tiktok: "",
      twitter: "",
      youtube: "",
      linkedin: "",
      website: "",
    },
    contact_form_enabled: false,
    newsletter_enabled: false,
    booking_integrations: "",
  };
}

/** Pre-fills the form from an existing fiche (edit mode). */
function stateFromRestaurant(restaurant: RestaurantRead): FormState {
  const base = emptyState();
  return {
    ...base,
    name: restaurant.name,
    address: restaurant.address,
    lat: String(restaurant.coordinates?.lat ?? ""),
    lng: String(restaurant.coordinates?.lng ?? ""),
    phone_numbers: joinList(restaurant.phone_numbers),
    email: restaurant.email ?? "",
    website: restaurant.website ?? "",
    description: restaurant.description ?? "",
    restaurant_types: joinList(restaurant.restaurant_types),
    cuisine_types: joinList(restaurant.cuisine_types),
    concept: restaurant.concept ?? "",
    signature_dishes: joinList(restaurant.signature_dishes),
    suggested_starters: joinList(restaurant.suggested_starters),
    price_range_min:
      restaurant.price_range?.min_price != null ? String(restaurant.price_range.min_price) : "",
    price_range_max:
      restaurant.price_range?.max_price != null ? String(restaurant.price_range.max_price) : "",
    menu_items: joinList(restaurant.menu_items),
    promotions: joinList(restaurant.promotions),
    delivery_available: restaurant.delivery_available,
    takeaway_available: restaurant.takeaway_available,
    services: { ...base.services, ...(restaurant.services ?? {}) },
    payment_methods: { ...base.payment_methods, ...(restaurant.payment_methods ?? {}) },
    opening_hours: Object.fromEntries(
      DAYS.map(([key]) => [
        key,
        {
          open: restaurant.opening_hours?.[key]?.open ?? "",
          close: restaurant.opening_hours?.[key]?.close ?? "",
        },
      ])
    ) as Record<Day, DayHours>,
    seating_capacity:
      restaurant.seating_capacity != null ? String(restaurant.seating_capacity) : "",
    cancellation_policy: restaurant.cancellation_policy ?? "",
    house_rules: restaurant.house_rules ?? "",
    architectural_features: restaurant.architectural_features ?? "",
    environmental_commitments: joinList(restaurant.environmental_commitments),
    community_commitments: joinList(restaurant.community_commitments),
    loyalty_programs: joinList(restaurant.loyalty_programs),
    health_certifications: joinList(restaurant.health_certifications),
    social_links: {
      facebook: restaurant.social_links?.facebook ?? "",
      instagram: restaurant.social_links?.instagram ?? "",
      tiktok: restaurant.social_links?.tiktok ?? "",
      twitter: restaurant.social_links?.twitter ?? "",
      youtube: restaurant.social_links?.youtube ?? "",
      linkedin: restaurant.social_links?.linkedin ?? "",
      website: restaurant.social_links?.website ?? "",
    },
    contact_form_enabled: restaurant.contact_form_enabled,
    newsletter_enabled: restaurant.newsletter_enabled,
    booking_integrations: joinList(restaurant.booking_integrations),
  };
}

function toRestaurantCreate(state: FormState): RestaurantCreate {
  const openingHours = Object.fromEntries(
    DAYS.map(([key]) => {
      const day = state.opening_hours[key];
      return [key, { open: day.open || null, close: day.close || null }];
    })
  );

  return {
    name: state.name.trim(),
    address: state.address.trim(),
    coordinates: {
      lat: state.lat ? Number(state.lat) : 0,
      lng: state.lng ? Number(state.lng) : 0,
    },
    phone_numbers: parseList(state.phone_numbers),
    email: state.email.trim() || null,
    website: state.website.trim() || null,
    description: state.description.trim() || null,
    restaurant_types: parseList(state.restaurant_types),
    cuisine_types: parseList(state.cuisine_types),
    concept: state.concept.trim() || null,
    signature_dishes: parseList(state.signature_dishes),
    suggested_starters: parseList(state.suggested_starters),
    price_range_min: state.price_range_min ? Number(state.price_range_min) : null,
    price_range_max: state.price_range_max ? Number(state.price_range_max) : null,
    menu_items: parseList(state.menu_items),
    promotions: parseList(state.promotions),
    delivery_available: state.delivery_available,
    takeaway_available: state.takeaway_available,
    services: state.services,
    payment_methods: state.payment_methods,
    opening_hours: openingHours,
    seating_capacity: state.seating_capacity ? Number(state.seating_capacity) : null,
    cancellation_policy: state.cancellation_policy.trim() || null,
    house_rules: state.house_rules.trim() || null,
    architectural_features: state.architectural_features.trim() || null,
    environmental_commitments: parseList(state.environmental_commitments),
    community_commitments: parseList(state.community_commitments),
    loyalty_programs: parseList(state.loyalty_programs),
    health_certifications: parseList(state.health_certifications),
    social_links: state.social_links,
    contact_form_enabled: state.contact_form_enabled,
    newsletter_enabled: state.newsletter_enabled,
    booking_integrations: parseList(state.booking_integrations),
  };
}

function Checkbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
}) {
  return (
    <label className="flex items-center gap-2 text-sm text-ink">
      <input
        type="checkbox"
        checked={checked}
        onChange={(event) => onChange(event.target.checked)}
        className="h-4 w-4 accent-primary"
      />
      {label}
    </label>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <fieldset className="space-y-4">
      <legend className="text-stamp mb-1 text-lg text-ink">{title}</legend>
      {children}
    </fieldset>
  );
}

export default function RestaurantFieldsForm({
  restaurant,
  submitLabel,
  pending,
  errorMessage,
  onSubmit,
}: {
  restaurant?: RestaurantRead;
  submitLabel: string;
  pending: boolean;
  errorMessage?: string | null;
  onSubmit: (data: RestaurantCreate) => void;
}) {
  // In create mode (no `restaurant`), a local draft survives navigating away
  // mid-wizard — there's no backend concept of a partially-filled fiche, the
  // record only exists once the last step actually submits.
  const draft = restaurant ? null : loadRestaurantDraft<FormState>();

  const [state, setState] = useState<FormState>(() =>
    restaurant ? stateFromRestaurant(restaurant) : (draft?.state ?? emptyState())
  );
  const [step, setStep] = useState(() => draft?.step ?? 0);
  const isLastStep = step === STEPS.length - 1;

  useEffect(() => {
    if (!restaurant) saveRestaurantDraft(state, step);
  }, [restaurant, state, step]);

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setState((current) => ({ ...current, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!isLastStep) {
      setStep((s) => s + 1);
      return;
    }
    if (!state.name.trim() || !state.address.trim()) return;
    onSubmit(toRestaurantCreate(state));
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-3xl">
      <Stepper steps={[...STEPS]} current={step} />

      <div className="space-y-10">
      {step === 0 && (
      <Section title="Identité">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Nom du restaurant"
            id="name"
            value={state.name}
            onChange={(e) => set("name", e.target.value)}
            required
          />
          <FormField
            label="Adresse"
            id="address"
            value={state.address}
            onChange={(e) => set("address", e.target.value)}
            required
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Latitude"
            id="lat"
            type="number"
            step="any"
            value={state.lat}
            onChange={(e) => set("lat", e.target.value)}
          />
          <FormField
            label="Longitude"
            id="lng"
            type="number"
            step="any"
            value={state.lng}
            onChange={(e) => set("lng", e.target.value)}
          />
        </div>
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Téléphones (séparés par une virgule, max 2)"
            id="phone_numbers"
            value={state.phone_numbers}
            onChange={(e) => set("phone_numbers", e.target.value)}
          />
          <FormField
            label="Email"
            id="email"
            type="email"
            value={state.email}
            onChange={(e) => set("email", e.target.value)}
          />
        </div>
        <FormField
          label="Site web"
          id="website"
          type="url"
          value={state.website}
          onChange={(e) => set("website", e.target.value)}
        />
        <div>
          <label htmlFor="description" className="mb-1.5 block text-sm font-semibold text-ink">
            Description
          </label>
          <textarea
            id="description"
            rows={3}
            value={state.description}
            onChange={(e) => set("description", e.target.value)}
            maxLength={1500}
            className="cut-corners-sm w-full border border-ink/15 bg-paper-alt px-4 py-3 text-ink outline-none placeholder:text-ink/35 focus:border-primary focus:ring-2 focus:ring-primary/40"
          />
        </div>
      </Section>
      )}

      {step === 1 && (
      <>
      <Section title="Catégorisation">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Types de restaurant (max 3, virgules)"
            id="restaurant_types"
            value={state.restaurant_types}
            onChange={(e) => set("restaurant_types", e.target.value)}
          />
          <FormField
            label="Types de cuisine (max 3, virgules)"
            id="cuisine_types"
            value={state.cuisine_types}
            onChange={(e) => set("cuisine_types", e.target.value)}
          />
        </div>
        <FormField
          label="Concept"
          id="concept"
          value={state.concept}
          onChange={(e) => set("concept", e.target.value)}
        />
        <FormField
          label="Plats signature (max 3, virgules)"
          id="signature_dishes"
          value={state.signature_dishes}
          onChange={(e) => set("signature_dishes", e.target.value)}
        />
        <FormField
          label="Entrées suggérées (max 20, virgules)"
          id="suggested_starters"
          value={state.suggested_starters}
          onChange={(e) => set("suggested_starters", e.target.value)}
        />
        <FormField
          label="Articles du menu (max 200, virgules)"
          id="menu_items"
          value={state.menu_items}
          onChange={(e) => set("menu_items", e.target.value)}
        />
        <FormField
          label="Promotions (max 10, virgules)"
          id="promotions"
          value={state.promotions}
          onChange={(e) => set("promotions", e.target.value)}
        />
      </Section>

      <Section title="Tarifs">
        <div className="grid gap-5 sm:grid-cols-2">
          <FormField
            label="Prix minimum"
            id="price_range_min"
            type="number"
            step="any"
            value={state.price_range_min}
            onChange={(e) => set("price_range_min", e.target.value)}
          />
          <FormField
            label="Prix maximum"
            id="price_range_max"
            type="number"
            step="any"
            value={state.price_range_max}
            onChange={(e) => set("price_range_max", e.target.value)}
          />
        </div>
      </Section>
      </>
      )}

      {step === 2 && (
      <>
      <Section title="Services">
        <div className="grid gap-2 sm:grid-cols-2">
          <Checkbox
            label="Livraison disponible"
            checked={state.delivery_available}
            onChange={(v) => set("delivery_available", v)}
          />
          <Checkbox
            label="À emporter disponible"
            checked={state.takeaway_available}
            onChange={(v) => set("takeaway_available", v)}
          />
          {SERVICE_FIELDS.map((field) => (
            <Checkbox
              key={field}
              label={field}
              checked={state.services[field]}
              onChange={(v) => set("services", { ...state.services, [field]: v })}
            />
          ))}
        </div>
      </Section>

      <Section title="Moyens de paiement">
        <div className="grid gap-2 sm:grid-cols-3">
          <Checkbox
            label="Cartes bancaires"
            checked={state.payment_methods.cards}
            onChange={(v) => set("payment_methods", { ...state.payment_methods, cards: v })}
          />
          <Checkbox
            label="Espèces"
            checked={state.payment_methods.cash}
            onChange={(v) => set("payment_methods", { ...state.payment_methods, cash: v })}
          />
          <Checkbox
            label="Mobile money"
            checked={state.payment_methods.mobile_money}
            onChange={(v) =>
              set("payment_methods", { ...state.payment_methods, mobile_money: v })
            }
          />
        </div>
      </Section>
      </>
      )}

      {step === 3 && (
      <Section title="Horaires d'ouverture">
        <div className="space-y-2">
          {DAYS.map(([key, label]) => (
            <div
              key={key}
              className="grid grid-cols-2 gap-2 sm:grid-cols-[100px_1fr_1fr] sm:items-center sm:gap-3"
            >
              <span className="col-span-2 text-sm font-semibold text-ink sm:col-span-1">
                {label}
              </span>
              <input
                type="time"
                value={state.opening_hours[key].open}
                onChange={(e) =>
                  set("opening_hours", {
                    ...state.opening_hours,
                    [key]: { ...state.opening_hours[key], open: e.target.value },
                  })
                }
                className="cut-corners-sm border border-ink/15 bg-paper-alt px-3 py-2 text-sm text-ink outline-none focus:border-primary"
              />
              <input
                type="time"
                value={state.opening_hours[key].close}
                onChange={(e) =>
                  set("opening_hours", {
                    ...state.opening_hours,
                    [key]: { ...state.opening_hours[key], close: e.target.value },
                  })
                }
                className="cut-corners-sm border border-ink/15 bg-paper-alt px-3 py-2 text-sm text-ink outline-none focus:border-primary"
              />
            </div>
          ))}
        </div>
      </Section>
      )}

      {step === 4 && (
      <>
      <Section title="Infos pratiques">
        <FormField
          label="Capacité d'accueil"
          id="seating_capacity"
          type="number"
          value={state.seating_capacity}
          onChange={(e) => set("seating_capacity", e.target.value)}
        />
        <FormField
          label="Politique d'annulation"
          id="cancellation_policy"
          value={state.cancellation_policy}
          onChange={(e) => set("cancellation_policy", e.target.value)}
        />
        <FormField
          label="Règles de la maison"
          id="house_rules"
          value={state.house_rules}
          onChange={(e) => set("house_rules", e.target.value)}
        />
        <FormField
          label="Particularités architecturales"
          id="architectural_features"
          value={state.architectural_features}
          onChange={(e) => set("architectural_features", e.target.value)}
        />
      </Section>

      <Section title="Engagements">
        <FormField
          label="Engagements environnementaux (max 10, virgules)"
          id="environmental_commitments"
          value={state.environmental_commitments}
          onChange={(e) => set("environmental_commitments", e.target.value)}
        />
        <FormField
          label="Engagements communautaires (max 10, virgules)"
          id="community_commitments"
          value={state.community_commitments}
          onChange={(e) => set("community_commitments", e.target.value)}
        />
        <FormField
          label="Programmes de fidélité (max 10, virgules)"
          id="loyalty_programs"
          value={state.loyalty_programs}
          onChange={(e) => set("loyalty_programs", e.target.value)}
        />
        <FormField
          label="Certifications sanitaires (max 10, virgules)"
          id="health_certifications"
          value={state.health_certifications}
          onChange={(e) => set("health_certifications", e.target.value)}
        />
      </Section>
      </>
      )}

      {step === 5 && (
      <>
      <Section title="Réseaux sociaux">
        <div className="grid gap-5 sm:grid-cols-2">
          {(
            ["facebook", "instagram", "tiktok", "twitter", "youtube", "linkedin", "website"] as const
          ).map((key) => (
            <FormField
              key={key}
              label={key.charAt(0).toUpperCase() + key.slice(1)}
              id={`social_${key}`}
              value={state.social_links[key]}
              onChange={(e) =>
                set("social_links", { ...state.social_links, [key]: e.target.value })
              }
            />
          ))}
        </div>
      </Section>

      <Section title="Autres">
        <div className="grid gap-2 sm:grid-cols-2">
          <Checkbox
            label="Formulaire de contact activé"
            checked={state.contact_form_enabled}
            onChange={(v) => set("contact_form_enabled", v)}
          />
          <Checkbox
            label="Newsletter activée"
            checked={state.newsletter_enabled}
            onChange={(v) => set("newsletter_enabled", v)}
          />
        </div>
        <FormField
          label="Intégrations de réservation (max 10, virgules)"
          id="booking_integrations"
          value={state.booking_integrations}
          onChange={(e) => set("booking_integrations", e.target.value)}
        />
      </Section>
      </>
      )}
      </div>

      {errorMessage && (
        <p className="mt-6 text-sm font-semibold text-primary-dark">{errorMessage}</p>
      )}

      <div className="mt-8 flex gap-3">
        {step > 0 && (
          <StampButton type="button" variant="ink" onClick={() => setStep((s) => s - 1)}>
            Retour
          </StampButton>
        )}
        {isLastStep ? (
          <StampButton type="submit" disabled={pending} className="flex-1 sm:flex-none">
            {pending ? "Enregistrement…" : submitLabel}
          </StampButton>
        ) : (
          <StampButton type="submit" className="flex-1 sm:flex-none">
            Continuer
          </StampButton>
        )}
      </div>
    </form>
  );
}
