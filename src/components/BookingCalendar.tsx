"use client";

import { useEffect, useRef } from "react";

export function BookingCalendar() {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.id = "cal-embed-script";
    document.body.appendChild(script);

    // Initialize Cal embed after script loads
    script.onload = () => {
      // @ts-expect-error Cal namespace
      if (window.Cal) {
        // @ts-expect-error Cal namespace
        window.Cal("init", { origin: "https://app.cal.com" });
        // @ts-expect-error Cal namespace
        window.Cal("inline", {
          elementOrSelector: "#cal-embed",
          calLink: "apexvoicesolutions/demo",
          config: { layout: "month_view", theme: "dark" }
        });
      }
    };

    return () => {
      const existing = document.getElementById("cal-embed-script");
      if (existing) document.body.removeChild(existing);
    };
  }, []);

  return (
    <div className="w-full h-[650px] glass-chrome rounded-[3rem] p-4 glow-border overflow-hidden relative">
      <div className="absolute inset-0 bg-white/[0.02] pointer-events-none rounded-[3rem]"></div>
      <div 
        ref={containerRef}
        id="cal-embed"
        className="w-full h-full rounded-[2rem] overflow-hidden bg-white/5"
        style={{ minWidth: "100%", minHeight: "600px" }}
      />
    </div>
  );
}
