"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";

export function BookingCalendar() {
  const [calLoaded, setCalLoaded] = useState(false);

  useEffect(() => {
    // Load Cal.com embed script
    const script = document.createElement("script");
    script.src = "https://app.cal.com/embed/embed.js";
    script.async = true;
    script.id = "cal-embed-script";
    script.onload = () => {
      setCalLoaded(true);
      // @ts-expect-error Cal namespace
      if (window.Cal) {
        // @ts-expect-error Cal namespace
        window.Cal("init", { origin: "https://app.cal.com" });
      }
    };
    document.body.appendChild(script);

    return () => {
      const existing = document.getElementById("cal-embed-script");
      if (existing) document.body.removeChild(existing);
    };
  }, []);

  return (
    <div className="w-full h-[650px] glass-chrome rounded-[3rem] p-6 glow-border overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 bg-white/[0.02] pointer-events-none rounded-[3rem]"></div>
      
      {/* Header */}
      <div className="relative z-10 mb-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-primary/20 rounded-xl flex items-center justify-center">
            <Calendar className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-bold text-sm">Book a Demo</h3>
            <p className="text-[10px] text-muted-foreground">15-minute consultation</p>
          </div>
        </div>
        <a 
          href="https://cal.com/apexvoicesolutions/demo" 
          target="_blank" 
          rel="noopener noreferrer"
        >
          <Button variant="outline" size="sm" className="text-xs">
            Open in New Tab
          </Button>
        </a>
      </div>

      {/* Cal.com Embed Container */}
      <div className="flex-1 relative rounded-[2rem] overflow-hidden bg-white/5">
        {/* @ts-expect-error Cal embed */}
        <cal-inline-widget 
          style={{ width: "100%", height: "100%", border: "none" }}
          cal-link="apexvoicesolutions/demo"
          cal-config='{"layout":"month_view","theme":"dark"}'
        />
        
        {/* Fallback if embed doesn't load */}
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-background/80 pointer-events-none opacity-0 hover:opacity-100 transition-opacity">
          <p className="text-sm text-muted-foreground">Calendar not loading?</p>
          <a 
            href="https://cal.com/apexvoicesolutions/demo" 
            target="_blank" 
            rel="noopener noreferrer"
            className="pointer-events-auto"
          >
            <Button className="bg-primary text-primary-foreground">
              Book Directly on Cal.com
            </Button>
          </a>
        </div>
      </div>
    </div>
  );
}
