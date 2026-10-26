/** Minimal line icons for amenities (Nueve-like). */
export function AmenityIcon({ name }: { name?: string }) {
  const common = {
    width: 28,
    height: 28,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.25,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  switch (name) {
    case "wifi":
      return (
        <svg {...common}>
          <path d="M5 12.5c2.8-2.6 6.2-2.6 9 0" />
          <path d="M7.5 15c1.7-1.5 3.8-1.5 5.5 0" />
          <circle cx="12" cy="18" r="1" fill="currentColor" stroke="none" />
          <path d="M2.5 9.5c4.5-4.2 10.5-4.2 15 0" />
        </svg>
      );
    case "ac":
      return (
        <svg {...common}>
          <path d="M12 3v18" />
          <path d="M12 8c2.5 0 4 1.5 4 4s-1.5 4-4 4" />
          <path d="M12 8c-2.5 0-4 1.5-4 4s1.5 4 4 4" />
        </svg>
      );
    case "kitchen":
      return (
        <svg {...common}>
          <path d="M8 3v8" />
          <path d="M8 11c0 2 1.5 3 3 3h2c1.5 0 3-1 3-3V3" />
          <path d="M12 14v7" />
        </svg>
      );
    case "tv":
      return (
        <svg {...common}>
          <rect x="3" y="5" width="18" height="12" rx="1.5" />
          <path d="M8 21h8" />
          <path d="M12 17v4" />
        </svg>
      );
    case "balcony":
      return (
        <svg {...common}>
          <path d="M4 20V9l8-5 8 5v11" />
          <path d="M9 20v-6h6v6" />
        </svg>
      );
    case "washer":
      return (
        <svg {...common}>
          <rect x="4" y="3" width="16" height="18" rx="2" />
          <circle cx="12" cy="13" r="4" />
          <path d="M8 6h.01M11 6h.01" />
        </svg>
      );
    case "garden":
      return (
        <svg {...common}>
          <path d="M12 21V10" />
          <path d="M12 10c-3-4-7-4-7 0 0 3 3 5 7 7" />
          <path d="M12 10c3-4 7-4 7 0 0 3-3 5-7 7" />
        </svg>
      );
    case "parking":
      return (
        <svg {...common}>
          <rect x="5" y="3" width="14" height="18" rx="2" />
          <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
        </svg>
      );
    default:
      return (
        <svg {...common}>
          <circle cx="12" cy="12" r="7" />
        </svg>
      );
  }
}
