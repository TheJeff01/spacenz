"use client";

import Link from "next/link";

export default function Button({
  children,
  href,
  onClick,
  variant = "outline",
  className = "",
  ...props
}) {
  const base =
    "inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.18em] uppercase transition-all duration-300 focus-visible:outline focus-visible:outline-offset-4";

  const variants = {
    outline:
      "border border-[var(--border)] px-7 py-3.5 text-[var(--fg)] hover:border-[var(--accent)] hover:text-[var(--accent)]",
    solid:
      "bg-[var(--accent)] px-7 py-3.5 text-[var(--ink)] hover:opacity-90",
    ghost:
      "px-0 py-1 text-[var(--muted)] hover:text-[var(--fg)] underline-offset-4 hover:underline",
  };

  const classes = `${base} ${variants[variant]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={classes} {...props}>
        {children}
      </Link>
    );
  }

  return (
    <button onClick={onClick} className={classes} {...props}>
      {children}
    </button>
  );
}
