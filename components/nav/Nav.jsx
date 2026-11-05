"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";

const links = [
  { label: "Properties", href: "/properties" },
  { label: "Locations", href: "/#map" },
  { label: "About", href: "/#about" },
];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    const stored = localStorage.getItem("spacenz-theme");
    if (stored) setTheme(stored);
  }, []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const toggleTheme = useCallback(() => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    document.documentElement.setAttribute("data-theme", next);
    localStorage.setItem("spacenz-theme", next);
  }, [theme]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? "bg-[var(--bg)]/95 backdrop-blur-sm border-b border-[var(--border-light)]"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
          <div className="flex h-16 md:h-20 items-center justify-between">
            {/* Logo */}
            <Link
              href="/"
              className="font-display text-xl font-light tracking-[0.06em] text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-300"
              aria-label="Spacenz home"
            >
              SPACENZ
            </Link>

            {/* Desktop links */}
            <nav
              className="hidden md:flex items-center gap-10"
              aria-label="Main navigation"
            >
              {links.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="label text-[var(--muted)] hover:text-[var(--fg)] transition-colors duration-300"
                >
                  {l.label}
                </Link>
              ))}
            </nav>

            {/* Right side */}
            <div className="flex items-center gap-5">
              {/* Theme toggle */}
              <button
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="hidden md:flex items-center justify-center w-8 h-8 text-[var(--muted)] hover:text-[var(--fg)] transition-colors"
              >
                {theme === "dark" ? (
                  <SunIcon />
                ) : (
                  <MoonIcon />
                )}
              </button>

              {/* Book a viewing CTA */}
              <Link
                href="/#contact"
                className="hidden md:inline-flex label items-center gap-2 border border-[var(--border)] px-5 py-2.5 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)] transition-all duration-300"
              >
                Book a Viewing
              </Link>

              {/* Mobile menu trigger */}
              <button
                className="md:hidden flex flex-col gap-1.5 p-1"
                onClick={() => setMenuOpen((o) => !o)}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
                aria-expanded={menuOpen}
              >
                <motion.span
                  animate={menuOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-px bg-[var(--fg)] origin-center transition-colors"
                  style={{ backgroundColor: "var(--fg)" }}
                />
                <motion.span
                  animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
                  className="block w-4 h-px bg-[var(--fg)]"
                  style={{ backgroundColor: "var(--fg)" }}
                />
                <motion.span
                  animate={menuOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
                  className="block w-6 h-px bg-[var(--fg)] origin-center"
                  style={{ backgroundColor: "var(--fg)" }}
                />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[var(--bg)] flex flex-col justify-between px-6 pt-28 pb-12"
          >
            <nav className="flex flex-col gap-2" aria-label="Mobile navigation">
              {links.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.4 }}
                >
                  <Link
                    href={l.href}
                    onClick={() => setMenuOpen(false)}
                    className="font-display text-4xl font-light text-[var(--fg)] hover:text-[var(--accent)] transition-colors duration-300 block py-3 border-b border-[var(--border-light)]"
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </nav>

            <div className="flex items-center justify-between">
              <Link
                href="/#contact"
                onClick={() => setMenuOpen(false)}
                className="label text-[var(--accent)] border border-[var(--border)] px-6 py-3"
              >
                Book a Viewing
              </Link>
              <button
                onClick={toggleTheme}
                className="label text-[var(--muted)] flex items-center gap-2"
              >
                {theme === "dark" ? "Light mode" : "Dark mode"}
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function SunIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <circle cx="12" cy="12" r="4" />
      <line x1="12" y1="2" x2="12" y2="4" />
      <line x1="12" y1="20" x2="12" y2="22" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="2" y1="12" x2="4" y2="12" />
      <line x1="20" y1="12" x2="22" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
      <path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z" />
    </svg>
  );
}
