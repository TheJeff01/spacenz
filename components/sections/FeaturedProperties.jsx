"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { featuredProperties, formatPrice } from "@/data/properties";

function PropertyTile({ property, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8, delay: index * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <Link
        href={`/properties/${property.slug}`}
        className="group block"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        aria-label={`View ${property.name}`}
      >
        {/* Image container */}
        <div
          className="relative overflow-hidden mb-6"
          style={{
            aspectRatio: index === 0 ? "3/4" : "4/5",
          }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ scale: hovered ? 1.04 : 1 }}
            transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
          >
            <Image
              src={property.images[0]}
              alt={`${property.name}, ${property.location.area}`}
              fill
              sizes="(max-width: 768px) 100vw, 33vw"
              className="object-cover object-center"
            />
          </motion.div>

          {/* Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#14110E]/70 via-transparent to-transparent opacity-80" />

          {/* Type badge */}
          <span className="absolute top-5 left-5 label border border-[var(--paper)]/25 px-3 py-1.5 text-[var(--paper)]/80 text-[0.6rem] bg-[#14110E]/40 backdrop-blur-sm">
            {property.type}
          </span>

          {/* Bottom info overlay */}
          <div className="absolute bottom-0 left-0 right-0 p-6">
            <motion.div
              animate={{ y: hovered ? -4 : 0 }}
              transition={{ duration: 0.4 }}
            >
              <p className="label text-[var(--gold)] mb-2">{property.location.area}, {property.location.city}</p>
              <h3 className="font-display text-2xl md:text-3xl font-light text-[var(--paper)] leading-tight">
                {property.name}
              </h3>
            </motion.div>
          </div>
        </div>

        {/* Below-image info */}
        <div className="flex items-end justify-between">
          <div>
            <p className="text-[var(--muted)] text-xs mb-1">
              {property.beds} bd · {property.baths} ba · {property.sqft.toLocaleString()} sq ft
            </p>
            <p className="font-display text-xl font-light text-[var(--fg)]">
              {formatPrice(property.price)}
            </p>
          </div>

          <motion.span
            className="label text-[var(--muted)] group-hover:text-[var(--accent)] transition-colors duration-300 flex items-center gap-2"
            animate={{ x: hovered ? 4 : 0 }}
            transition={{ duration: 0.4 }}
          >
            View
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M5 12h14M12 5l7 7-7 7" />
            </svg>
          </motion.span>
        </div>
      </Link>
    </motion.div>
  );
}

export default function FeaturedProperties() {
  const headerRef = useRef(null);
  const headerInView = useInView(headerRef, { once: true, margin: "-60px" });

  return (
    <section className="py-24 md:py-36 border-t border-[var(--border-light)]">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div
          ref={headerRef}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-16 md:mb-20"
        >
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel className="mb-6">Selected residences</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-display text-[clamp(2rem,4vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-[var(--fg)]"
              initial={{ opacity: 0, y: 30 }}
              animate={headerInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Properties that
              <br />
              define their context
            </motion.h2>
          </div>

          <motion.div
            className="md:text-right"
            initial={{ opacity: 0, y: 20 }}
            animate={headerInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <p className="text-[var(--muted)] text-sm leading-relaxed mb-6 md:ml-auto md:max-w-[340px]">
              Each of these residences was selected because it solves
              something — a difficult site, an unusual brief, a standard of
              material finish that sets it apart from the comparable.
            </p>
            <Link
              href="/properties"
              className="label text-[var(--accent)] inline-flex items-center gap-2 hover:gap-4 transition-all duration-300"
            >
              All properties
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Grid — intentionally asymmetric */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10 items-start">
          {/* First card spans differently */}
          <div className="md:col-span-1 md:mt-0">
            <PropertyTile property={featuredProperties[0]} index={0} />
          </div>
          <div className="md:col-span-1 md:mt-16">
            <PropertyTile property={featuredProperties[1]} index={1} />
          </div>
          <div className="md:col-span-1 md:mt-8">
            <PropertyTile property={featuredProperties[2]} index={2} />
          </div>
        </div>
      </div>
    </section>
  );
}
