"use client";

export default function SectionLabel({ children, className = "" }) {
  return (
    <span
      className={`label inline-flex items-center gap-3 ${className}`}
      aria-hidden="false"
    >
      <span
        className="block h-px w-8 shrink-0"
        style={{ backgroundColor: "var(--accent)" }}
      />
      {children}
    </span>
  );
}
