"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionLabel from "@/components/ui/SectionLabel";

function formatCurrency(val) {
  if (!val) return "—";
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(val);
}

function calcMonthly(principal, annualRate, termYears) {
  const r = annualRate / 100 / 12;
  const n = termYears * 12;
  if (r === 0) return principal / n;
  return (principal * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
}

function AmortBar({ label, value, max, color }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-2">
        <span className="label text-[var(--muted)]">{label}</span>
        <span className="font-display text-lg font-light text-[var(--fg)]">
          {formatCurrency(value)}
        </span>
      </div>
      <div className="h-px w-full bg-[var(--border-light)] relative overflow-hidden">
        <motion.span
          className="absolute left-0 top-0 h-full block"
          style={{ backgroundColor: color }}
          initial={{ width: 0 }}
          animate={{ width: `${(value / max) * 100}%` }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </div>
    </div>
  );
}

function Slider({ label, min, max, step, value, onChange, format }) {
  return (
    <div>
      <div className="flex justify-between items-baseline mb-3">
        <label className="label text-[var(--muted)]">{label}</label>
        <span className="font-display text-xl font-light text-[var(--fg)]">
          {format(value)}
        </span>
      </div>
      <div className="relative">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
          className="w-full appearance-none h-px cursor-pointer"
          style={{
            background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${
              ((value - min) / (max - min)) * 100
            }%, var(--border) ${((value - min) / (max - min)) * 100}%, var(--border) 100%)`,
            outline: "none",
          }}
        />
      </div>
    </div>
  );
}

export default function MortgageCalculator() {
  const [principal, setPrincipal] = useState(1500000);
  const [rate, setRate] = useState(6.5);
  const [term, setTerm] = useState(25);

  const monthly = calcMonthly(principal, rate, term);
  const totalPaid = monthly * term * 12;
  const totalInterest = totalPaid - principal;
  const maxBar = Math.max(totalPaid, principal * 1.1);

  return (
    <section className="py-24 md:py-36 border-t border-[var(--border-light)]" id="calculator">
      <div className="mx-auto max-w-[1320px] px-6 md:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">

          {/* Left: intro */}
          <div className="lg:col-span-4">
            <SectionLabel className="mb-8">Finance</SectionLabel>
            <h2 className="font-display text-[clamp(2rem,3.5vw,3.5rem)] font-light leading-[1.05] tracking-[-0.02em] text-[var(--fg)] mb-8">
              Understand
              <br />
              your position
            </h2>
            <p className="text-[var(--muted)] text-sm leading-relaxed">
              A simple model for indicative monthly payment. Actual terms
              depend on lender, jurisdiction, and the buyer's profile.
              Our advisory team can connect you with specialist finance.
            </p>

            {/* Monthly result */}
            <div className="mt-12 py-8 border-t border-b border-[var(--border-light)]">
              <p className="label text-[var(--muted)] mb-3">Monthly payment</p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={Math.round(monthly)}
                  className="font-display text-[clamp(2.5rem,5vw,4rem)] font-light text-[var(--fg)] leading-none"
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.3 }}
                >
                  {formatCurrency(monthly)}
                </motion.p>
              </AnimatePresence>
              <p className="text-[var(--muted)] text-xs mt-2">
                over {term} years at {rate}% p.a.
              </p>
            </div>
          </div>

          {/* Right: controls + breakdown */}
          <div className="lg:col-span-8 lg:pl-8">
            {/* Sliders */}
            <div className="space-y-10 mb-14">
              <Slider
                label="Property price"
                min={300000}
                max={10000000}
                step={50000}
                value={principal}
                onChange={setPrincipal}
                format={(v) => formatCurrency(v)}
              />
              <Slider
                label="Interest rate"
                min={2}
                max={15}
                step={0.25}
                value={rate}
                onChange={setRate}
                format={(v) => `${v.toFixed(2)}%`}
              />
              <Slider
                label="Loan term"
                min={5}
                max={30}
                step={1}
                value={term}
                onChange={setTerm}
                format={(v) => `${v} yrs`}
              />
            </div>

            {/* Amortization breakdown */}
            <div className="space-y-8 pt-10 border-t border-[var(--border-light)]">
              <AmortBar
                label="Principal"
                value={principal}
                max={maxBar}
                color="var(--accent)"
              />
              <AmortBar
                label="Total interest"
                value={totalInterest}
                max={maxBar}
                color="var(--ink-muted)"
              />
              <AmortBar
                label="Total cost"
                value={totalPaid}
                max={maxBar}
                color="var(--fg)"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
