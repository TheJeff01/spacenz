"use client";

import Link from "next/link";
import SectionLabel from "@/components/ui/SectionLabel";

const NAV = {
  Properties: [
    { label: "All residences", href: "/properties" },
    { label: "Villas", href: "/properties?type=Villa" },
    { label: "Penthouses", href: "/properties?type=Penthouse" },
    { label: "Apartments", href: "/properties?type=Apartment" },
    { label: "Estates", href: "/properties?type=Estate" },
  ],
  Locations: [
    { label: "Lagos", href: "/properties?city=Lagos" },
    { label: "Abuja", href: "/properties?city=Abuja" },
    { label: "Nairobi", href: "/properties?city=Nairobi" },
    { label: "Cape Town", href: "/properties?city=Cape Town" },
    { label: "Accra", href: "/properties?city=Accra" },
  ],
  Company: [
    { label: "About Spacenz", href: "/#about" },
    { label: "Our process", href: "/#process" },
    { label: "Finance", href: "/#calculator" },
    { label: "Privacy policy", href: "/" },
    { label: "Terms of service", href: "/" },
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-[var(--border-light)] pt-20 pb-10">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        {/* Top: statement + contact */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 mb-20">
          <div className="lg:col-span-5">
            <Link
              href="/"
              className="font-display text-2xl font-light tracking-[0.06em] text-[var(--fg)] block mb-8"
            >
              SPACENZ
            </Link>
            <p className="font-display text-[clamp(1.75rem,3vw,3rem)] font-light leading-[1.1] tracking-[-0.02em] text-[var(--fg)] mb-10">
              The right property is
              <br />
              worth waiting for.
            </p>
            <SectionLabel className="mb-4">Get in touch</SectionLabel>
            <a
              href="mailto:enquiries@spacenz.com"
              className="text-[var(--fg)] text-sm hover:text-[var(--accent)] transition-colors duration-300"
            >
              enquiries@spacenz.com
            </a>
          </div>

          <div className="lg:col-span-7">
            <div className="grid grid-cols-3 gap-8">
              {Object.entries(NAV).map(([group, links]) => (
                <div key={group}>
                  <p className="label text-[var(--muted)] mb-6">{group}</p>
                  <ul className="space-y-3">
                    {links.map((l) => (
                      <li key={l.label}>
                        <Link
                          href={l.href}
                          className="text-[var(--muted)] text-sm hover:text-[var(--fg)] transition-colors duration-300"
                        >
                          {l.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 pt-8 border-t border-[var(--border-light)]">
          <p className="text-[var(--muted)] text-xs">
            &copy; {new Date().getFullYear()} Spacenz Real Estate. All rights reserved.
          </p>
          <p className="text-[var(--muted)] text-xs">
            Lagos &middot; Nairobi &middot; Cape Town &middot; Accra &middot; Abuja
          </p>
        </div>
      </div>
    </footer>
  );
}
