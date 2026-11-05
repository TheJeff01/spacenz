"use client";

export default function Container({ children, className = "", wide = false }) {
  return (
    <div
      className={`mx-auto w-full px-6 md:px-10 lg:px-16 ${
        wide ? "max-w-screen-2xl" : "max-w-[1320px]"
      } ${className}`}
    >
      {children}
    </div>
  );
}
