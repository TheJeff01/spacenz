"use client";

import { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import Link from "next/link";
import { formatPrice } from "@/data/properties";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix leaflet's default icon path issue in Next.js
const markerIcon = L.divIcon({
  html: `<span style="
    display:block;width:10px;height:10px;border-radius:50%;
    background:var(--gold,#C9A86A);border:1.5px solid rgba(255,255,255,0.5);
    box-shadow:0 0 0 3px rgba(201,168,106,0.25);
  "></span>`,
  className: "",
  iconSize: [10, 10],
  iconAnchor: [5, 5],
});

export default function MapEmbed({ properties }) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const center = [4, 15]; // Centre of Africa

  return (
    <MapContainer
      center={center}
      zoom={3}
      scrollWheelZoom={false}
      style={{ width: "100%", height: "100%", background: "#14110E" }}
      zoomControl={false}
    >
      <TileLayer
        attribution=""
        url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
      />

      {properties.map((p) => (
        <Marker
          key={p.slug}
          position={[p.location.lat, p.location.lng]}
          icon={markerIcon}
        >
          <Popup
            className="spacenz-popup"
            closeButton={false}
            offset={[0, -2]}
          >
            <div
              style={{
                background: "var(--bg,#14110E)",
                border: "1px solid rgba(201,168,106,0.2)",
                padding: "14px 16px",
                minWidth: "220px",
                fontFamily: "var(--font-geist-sans, system-ui)",
              }}
            >
              <p style={{ fontSize: "0.6rem", letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--gold,#C9A86A)", marginBottom: "6px" }}>
                {p.location.area}, {p.location.city}
              </p>
              <p style={{ color: "var(--paper,#FAF8F4)", fontSize: "0.9rem", fontWeight: 300, marginBottom: "8px" }}>
                {p.name}
              </p>
              <p style={{ color: "#A8A29E", fontSize: "0.75rem", marginBottom: "12px" }}>
                {p.beds} bd · {formatPrice(p.price)}
              </p>
              <a
                href={`/properties/${p.slug}`}
                style={{
                  display: "inline-flex", alignItems: "center", gap: "6px",
                  fontSize: "0.6rem", letterSpacing: "0.18em", textTransform: "uppercase",
                  color: "var(--gold,#C9A86A)", textDecoration: "none",
                }}
              >
                View property →
              </a>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
