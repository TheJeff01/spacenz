"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import dynamic from "next/dynamic";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/sections/Footer";
import Gallery from "@/components/property/Gallery";
import FloorPlan from "@/components/property/FloorPlan";
import SectionLabel from "@/components/ui/SectionLabel";
import LenisProvider from "@/lib/LenisProvider";
import { formatPrice } from "@/data/properties";

const MapEmbed = dynamic(() => import("@/components/map/MapEmbed"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[var(--ink-dim)]" />
  ),
});

export default function PropertyDetailClient({ property }) {
  const [enquirySent, setEnquirySent] = useState(false);
  const [enquiryForm, setEnquiryForm] = useState({ name: "", email: "", message: "" });

  const stats = [
    { label: "Bedrooms", value: property.beds },
    { label: "Bathrooms", value: property.baths },
    { label: "Area", value: `${property.sqft.toLocaleString()} sq ft` },
    { label: "Year built", value: property.year },
  ];

  return (
    <LenisProvider>
      <Nav />
      <main className="pt-20">
        {/* Breadcrumb */}
        <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16 pt-8 pb-6">
          <nav className="flex items-center gap-3" aria-label="Breadcrumb">
            <Link href="/" className="label text-[var(--muted)] hover:text-[var(--fg)] transition-colors text-[0.65rem]">
              Home
            </Link>
            <span className="text-[var(--muted)] opacity-40">/</span>
            <Link href="/properties" className="label text-[var(--muted)] hover:text-[var(--fg)] transition-colors text-[0.65rem]">
              Properties
            </Link>
            <span className="text-[var(--muted)] opacity-40">/</span>
            <span className="label text-[var(--fg)] text-[0.65rem]">{property.name}</span>
          </nav>
        </div>

        {/* Gallery */}
        <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16 mb-14">
          <Gallery images={property.images} name={property.name} />
        </div>

        {/* Main content */}
        <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
            {/* Left: main info */}
            <div className="lg:col-span-7">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
              >
                <SectionLabel className="mb-5">
                  {property.type} · {property.location.area}, {property.location.city}
                </SectionLabel>
                <h1 className="font-display text-[clamp(2.25rem,5vw,4.5rem)] font-light leading-[1.0] tracking-[-0.02em] text-[var(--fg)] mb-4">
                  {property.name}
                </h1>
                <p className="font-display text-xl font-light text-[var(--muted)] mb-10 italic">
                  {property.tagline}
                </p>

                {/* Stats band */}
                <div className="grid grid-cols-4 gap-4 border-t border-b border-[var(--border-light)] py-7 mb-12">
                  {stats.map((s) => (
                    <div key={s.label}>
                      <p className="font-display text-2xl md:text-3xl font-light text-[var(--fg)] mb-1">
                        {s.value}
                      </p>
                      <p className="label text-[var(--muted)] text-[0.6rem]">{s.label}</p>
                    </div>
                  ))}
                </div>

                {/* Description */}
                <div className="space-y-5 mb-14">
                  <p className="text-[var(--muted)] leading-loose text-[0.9375rem]">
                    {property.description}
                  </p>
                </div>

                {/* Features */}
                <div>
                  <SectionLabel className="mb-7">Key features</SectionLabel>
                  <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {property.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-[var(--muted)]">
                        <span className="block w-1.5 h-1.5 rounded-full mt-1.5 shrink-0" style={{ backgroundColor: "var(--accent)" }} />
                        {f}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            </div>

            {/* Right: price + enquiry */}
            <div className="lg:col-span-5">
              <div className="sticky top-28 border border-[var(--border)] p-8">
                <p className="label text-[var(--muted)] mb-3">Asking price</p>
                <p className="font-display text-4xl font-light text-[var(--fg)] mb-1">
                  {formatPrice(property.price)}
                </p>
                <p className="text-[var(--muted)] text-xs mb-8">
                  Exclusive of transaction costs and local taxes
                </p>

                {/* Quick stats */}
                <div className="flex gap-6 mb-8 pb-8 border-b border-[var(--border-light)]">
                  <div>
                    <p className="label text-[var(--muted)] mb-1">Beds</p>
                    <p className="text-[var(--fg)] font-light">{property.beds}</p>
                  </div>
                  <div>
                    <p className="label text-[var(--muted)] mb-1">Baths</p>
                    <p className="text-[var(--fg)] font-light">{property.baths}</p>
                  </div>
                  <div>
                    <p className="label text-[var(--muted)] mb-1">Area</p>
                    <p className="text-[var(--fg)] font-light">{property.sqft.toLocaleString()} sq ft</p>
                  </div>
                </div>

                {/* Enquiry form */}
                <AnimatePresence mode="wait">
                  {enquirySent ? (
                    <motion.div
                      key="sent"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-center py-6"
                    >
                      <p className="label text-[var(--accent)] mb-3">Request received</p>
                      <p className="text-[var(--muted)] text-sm">
                        We&apos;ll be in touch within one business day to arrange your viewing of {property.name}.
                      </p>
                    </motion.div>
                  ) : (
                    <motion.form
                      key="form"
                      className="space-y-5"
                      onSubmit={(e) => { e.preventDefault(); setEnquirySent(true); }}
                    >
                      {[
                        { name: "name", label: "Your name", type: "text" },
                        { name: "email", label: "Email address", type: "email" },
                      ].map((f) => (
                        <div key={f.name}>
                          <label className="label text-[var(--muted)] block mb-2 text-[0.6rem]" htmlFor={`detail-${f.name}`}>
                            {f.label}
                          </label>
                          <input
                            id={`detail-${f.name}`}
                            type={f.type}
                            name={f.name}
                            value={enquiryForm[f.name]}
                            onChange={(e) => setEnquiryForm((p) => ({ ...p, [f.name]: e.target.value }))}
                            className="w-full bg-transparent border-b border-[var(--border)] py-2.5 text-[var(--fg)] text-sm focus:outline-none focus:border-[var(--accent)] transition-colors duration-300"
                            required
                          />
                        </div>
                      ))}
                      <button
                        type="submit"
                        className="w-full label border border-[var(--border)] py-4 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300 mt-2"
                      >
                        Request a viewing
                      </button>
                    </motion.form>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Floor plan */}
          <section className="mb-20 border-t border-[var(--border-light)] pt-16">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
              <div className="lg:col-span-4">
                <SectionLabel className="mb-8">Floor plan</SectionLabel>
                <h2 className="font-display text-3xl font-light text-[var(--fg)] mb-6 leading-tight">
                  The spatial
                  <br />
                  arrangement
                </h2>
                <p className="text-[var(--muted)] text-sm leading-relaxed">
                  Hover over each room to explore the layout.
                  All dimensions are indicative.
                </p>
              </div>
              <div className="lg:col-span-8 border border-[var(--border-light)] p-8">
                <FloorPlan floorplan={property.floorplan} />
              </div>
            </div>
          </section>

          {/* Location map */}
          <section className="mb-20 border-t border-[var(--border-light)] pt-16">
            <SectionLabel className="mb-8">Location</SectionLabel>
            <h2 className="font-display text-3xl font-light text-[var(--fg)] mb-10">
              {property.location.area}, {property.location.city}
            </h2>
            <div className="relative h-[360px] border border-[var(--border-light)] overflow-hidden">
              <MapEmbed properties={[property]} />
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </LenisProvider>
  );
}
