import React from "react";

export function Logo({ className, variant = "light" }: { className?: string, variant?: "light" | "dark" }) {
  const isDark = variant === "dark";
  
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      <div className="relative flex flex-col items-center shrink-0">
        <svg
          width="40"
          height="32"
          viewBox="0 0 40 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="drop-shadow-sm transition-transform duration-300 hover:scale-110"
        >
          {/* Main Gilded Structure */}
          <path
            d="M5 25L20 5L35 25"
            stroke="#D4AF37"
            strokeWidth="4"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 25L20 15L28 25"
            stroke="#D4AF37"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M20 20L15 28L20 32L25 28L20 20Z"
            fill="#D4AF37"
          />
        </svg>
        <span className="text-[10px] font-serif font-bold text-[#D4AF37] leading-none tracking-[0.2em] mt-1">
          EES
        </span>
      </div>
      <div className="flex flex-col">
        <span className={`text-xl font-bold leading-none transition-colors duration-300 ${isDark ? "text-white" : "text-secondary"}`}>
          EcoMetric Engineering <br className="hidden md:block" /> Solutions
        </span>
        <span className={`text-[11px] font-medium mt-1 tracking-wide ${isDark ? "text-white/60" : "text-muted-foreground"}`}>
          Connecting the Possibilities
        </span>
      </div>
    </div>
  );
}
