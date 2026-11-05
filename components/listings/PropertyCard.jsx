"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { formatPrice } from "@/data/properties";

export default function PropertyCard({ property }) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/properties/${property.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      aria-label={`View ${property.name}`}
    >
      {/* Image */}
      <div className="relative overflow-hidden mb-5" style={{ aspectRatio: "4/5" }}>
        <motion.div
          className="absolute inset-0"
          animate={{ scale: hovered ? 1.05 : 1 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          <Image
            src={property.images[0]}
            alt={property.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
            className="object-cover object-center"
          />
        </motion.div>
        <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/60 via-transparent to-transparent opacity-70" />

        {/* Type */}
        <span className="absolute top-4 left-4 label border border-[var(--paper)]/20 px-3 py-1.5 text-[var(--paper)]/80 text-[0.6rem] bg-[#14110E]/50 backdrop-blur-sm">
          {property.type}
        </span>

        {/* Second image peek on hover */}
        <motion.div
          className="absolute inset-0"
          animate={{ opacity: hovered ? 1 : 0 }}
          transition={{ duration: 0.5 }}
        >
          <Image
            src={property.images[1] || property.images[0]}
            alt=""
            fill
            sizes="(max-width: 640px) 100vw, 33vw"
            className="object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/60 via-transparent to-transparent" />
        </motion.div>
      </div>

      {/* Info */}
      <div>
        <p className="label text-[var(--accent)] mb-2">
          {property.location.area}, {property.location.city}
        </p>
        <h2 className="font-display text-xl font-light text-[var(--fg)] mb-2 leading-tight">
          {property.name}
        </h2>
        <p className="text-[var(--muted)] text-xs mb-3">
          {property.beds} bd · {property.baths} ba · {property.sqft.toLocaleString()} sq ft · {property.year}
        </p>
        <div className="flex items-center justify-between">
          <p className="font-display text-lg font-light text-[var(--fg)]">
            {formatPrice(property.price)}
          </p>
          <motion.span
            className="label text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-1.5 text-[0.6rem]"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.3 }}
          >
            View
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.span>
        </div>
      </div>
    </Link>
  );
}
