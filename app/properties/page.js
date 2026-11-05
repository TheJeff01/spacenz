"use client";

import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Nav from "@/components/nav/Nav";
import Footer from "@/components/sections/Footer";
import PropertyCard from "@/components/listings/PropertyCard";
import FilterBar from "@/components/listings/FilterBar";
import LenisProvider from "@/lib/LenisProvider";
import { properties } from "@/data/properties";
import SectionLabel from "@/components/ui/SectionLabel";

const defaultFilters = {
  type: "All",
  city: "All",
  beds: 0,
  priceLabel: "Any",
  priceMin: 0,
  priceMax: Infinity,
};

export default function PropertiesPage() {
  const [filters, setFilters] = useState(defaultFilters);

  const filtered = useMemo(() => {
    return properties.filter((p) => {
      if (filters.type !== "All" && p.type !== filters.type) return false;
      if (filters.city !== "All" && p.location.city !== filters.city) return false;
      if (filters.beds > 0 && p.beds < filters.beds) return false;
      if (p.price > filters.priceMax) return false;
      if (filters.priceMin && p.price < filters.priceMin) return false;
      return true;
    });
  }, [filters]);

  return (
    <LenisProvider>
      <Nav />
      <main className="pt-24 md:pt-32 pb-0">
        <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
          {/* Page header */}
          <div className="mb-10">
            <SectionLabel className="mb-6">All residences</SectionLabel>
            <h1 className="font-display text-[clamp(2.5rem,5vw,5rem)] font-light leading-[1.0] tracking-[-0.02em] text-[var(--fg)]">
              {filtered.length} {filtered.length === 1 ? "property" : "properties"}
            </h1>
          </div>

          {/* Filter bar */}
          <FilterBar filters={filters} onChange={setFilters} />

          {/* Grid */}
          <div className="py-14">
            <AnimatePresence mode="popLayout">
              {filtered.length === 0 ? (
                <motion.div
                  key="empty"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="py-32 text-center"
                >
                  <p className="font-display text-3xl font-light text-[var(--fg)] mb-4">
                    No properties match
                  </p>
                  <p className="text-[var(--muted)] text-sm mb-8">
                    Try adjusting your filters to see more results.
                  </p>
                  <button
                    onClick={() => setFilters(defaultFilters)}
                    className="label border border-[var(--border)] px-6 py-3 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
                  >
                    Clear filters
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  key="grid"
                  className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14"
                  layout
                >
                  {filtered.map((p, i) => (
                    <motion.div
                      key={p.slug}
                      layout
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, scale: 0.96 }}
                      transition={{ duration: 0.5, delay: i * 0.04 }}
                    >
                      <PropertyCard property={p} />
                    </motion.div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
      <Footer />
    </LenisProvider>
  );
}
