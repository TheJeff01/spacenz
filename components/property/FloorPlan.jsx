"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function FloorPlan({ floorplan }) {
  const [active, setActive] = useState(null);

  if (!floorplan?.rooms?.length) return null;

  return (
    <div>
      <div className="relative w-full" style={{ aspectRatio: "4/3" }}>
        <svg
          viewBox="0 0 100 100"
          className="w-full h-full"
          preserveAspectRatio="xMidYMid meet"
          role="img"
          aria-label="Interactive floor plan"
        >
          {/* Background */}
          <rect width="100" height="100" fill="transparent" />

          {floorplan.rooms.map((room) => {
            const isActive = active === room.id;
            return (
              <g
                key={room.id}
                onMouseEnter={() => setActive(room.id)}
                onMouseLeave={() => setActive(null)}
                onFocus={() => setActive(room.id)}
                onBlur={() => setActive(null)}
                tabIndex={0}
                role="button"
                aria-label={room.label}
                style={{ cursor: "pointer", outline: "none" }}
              >
                <motion.rect
                  x={room.x}
                  y={room.y}
                  width={room.w}
                  height={room.h}
                  rx={0}
                  fill={isActive ? "rgba(201,168,106,0.15)" : "transparent"}
                  stroke={isActive ? "var(--gold,#C9A86A)" : "rgba(201,168,106,0.3)"}
                  strokeWidth={isActive ? 0.6 : 0.4}
                  animate={{ fill: isActive ? "rgba(201,168,106,0.15)" : "rgba(0,0,0,0)" }}
                  transition={{ duration: 0.25 }}
                />
                <text
                  x={room.x + room.w / 2}
                  y={room.y + room.h / 2}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fill={isActive ? "var(--gold,#C9A86A)" : "rgba(201,168,106,0.55)"}
                  fontSize="3.2"
                  fontFamily="system-ui, sans-serif"
                  letterSpacing="0.08em"
                  style={{ userSelect: "none", transition: "fill 0.25s" }}
                >
                  {room.label}
                </text>
              </g>
            );
          })}
        </svg>
      </div>

      {/* Active room name */}
      <div className="mt-4 h-6">
        {active && (
          <motion.p
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            className="label text-[var(--accent)]"
          >
            {floorplan.rooms.find((r) => r.id === active)?.label}
          </motion.p>
        )}
      </div>
    </div>
  );
}
