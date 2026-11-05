import { notFound } from "next/navigation";
import { getPropertyBySlug, properties, formatPrice } from "@/data/properties";
import PropertyDetailClient from "./PropertyDetailClient";

export async function generateStaticParams() {
  return properties.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const property = getPropertyBySlug((await params).slug);
  if (!property) return {};
  return {
    title: `${property.name} — Spacenz`,
    description: property.tagline,
  };
}

export default async function PropertyPage({ params }) {
  const property = getPropertyBySlug((await params).slug);
  if (!property) notFound();
  return <PropertyDetailClient property={property} />;
}
