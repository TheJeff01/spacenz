"use client";

import { useState } from "react";

const TYPES = ["All", "Villa", "Penthouse", "Apartment", "Estate"];
const BED_OPTIONS = [
  { label: "Any", value: 0 },
  { label: "3+", value: 3 },
  { label: "4+", value: 4 },
  { label: "5+", value: 5 },
];
const PRICE_OPTIONS = [
  { label: "Any", max: Infinity },
  { label: "Under $2M", max: 2000000 },
  { label: "Under $4M", max: 4000000 },
  { label: "$4M+", max: Infinity, min: 4000000 },
];
const CITIES = ["All", "Lagos", "Abuja", "Nairobi", "Cape Town", "Accra", "Port Harcourt"];

export default function FilterBar({ filters, onChange }) {
  return (
    <div className="flex flex-wrap items-center gap-6 py-6 border-b border-[var(--border-light)]">
      {/* Type */}
      <FilterGroup label="Type">
        {TYPES.map((t) => (
          <Chip
            key={t}
            active={filters.type === t}
            onClick={() => onChange({ ...filters, type: t })}
          >
            {t}
          </Chip>
        ))}
      </FilterGroup>

      {/* City */}
      <FilterGroup label="City">
        {CITIES.map((c) => (
          <Chip
            key={c}
            active={filters.city === c}
            onClick={() => onChange({ ...filters, city: c })}
          >
            {c}
          </Chip>
        ))}
      </FilterGroup>

      {/* Beds */}
      <FilterGroup label="Beds">
        {BED_OPTIONS.map((b) => (
          <Chip
            key={b.label}
            active={filters.beds === b.value}
            onClick={() => onChange({ ...filters, beds: b.value })}
          >
            {b.label}
          </Chip>
        ))}
      </FilterGroup>

      {/* Price */}
      <FilterGroup label="Price">
        {PRICE_OPTIONS.map((p) => (
          <Chip
            key={p.label}
            active={filters.priceLabel === p.label}
            onClick={() => onChange({ ...filters, priceLabel: p.label, priceMin: p.min, priceMax: p.max })}
          >
            {p.label}
          </Chip>
        ))}
      </FilterGroup>
    </div>
  );
}

function FilterGroup({ label, children }) {
  return (
    <div className="flex items-center gap-2 flex-wrap">
      <span className="label text-[var(--muted)] mr-1">{label}:</span>
      {children}
    </div>
  );
}

function Chip({ children, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`label px-4 py-2 border transition-all duration-200 ${
        active
          ? "border-[var(--accent)] text-[var(--accent)]"
          : "border-[var(--border-light)] text-[var(--muted)] hover:border-[var(--border)] hover:text-[var(--fg)]"
      }`}
    >
      {children}
    </button>
  );
}
