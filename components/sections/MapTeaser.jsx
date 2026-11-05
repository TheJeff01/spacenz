"use client";

import { useRef } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { motion, useInView } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";
import { properties, formatPrice } from "@/data/properties";

// Leaflet must be client-only
const MapEmbed = dynamic(() => import("@/components/map/MapEmbed"), {
  ssr: false,
  loading: () => (
    <div className="w-full h-full bg-[var(--ink-dim)] flex items-center justify-center">
      <span className="label text-[var(--muted)]">Loading map…</span>
    </div>
  ),
});

export default function MapTeaser() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      ref={ref}
      className="py-24 md:py-36 border-t border-[var(--border-light)]"
      id="map"
    >
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        {/* Header */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-end mb-12">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <SectionLabel className="mb-6">Locations</SectionLabel>
            </motion.div>
            <motion.h2
              className="font-display text-[clamp(2rem,4vw,4rem)] font-light leading-[1.05] tracking-[-0.02em] text-[var(--fg)]"
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
            >
              Properties across
              <br />
              the continent
            </motion.h2>
          </div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="md:text-right"
          >
            <Link
              href="/properties"
              className="label text-[var(--accent)] inline-flex items-center gap-2 hover:gap-4 transition-all duration-300"
            >
              Explore all on map
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </Link>
          </motion.div>
        </div>

        {/* Map */}
        <motion.div
          className="relative h-[480px] md:h-[560px] overflow-hidden border border-[var(--border-light)]"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <MapEmbed properties={properties} />
        </motion.div>
      </div>
    </section>
  );
}
