"use client";

import { useEffect } from "react";

export function BookingCalendar() {
    useEffect(() => {
        // Cal.com embed
        const script = document.createElement("script");
        script.src = "https://app.cal.com/embed/embed.js";
        script.async = true;
        script.id = "calcom-embed";
        document.body.appendChild(script);

        return () => {
            const existing = document.getElementById("calcom-embed");
            if (existing) document.body.removeChild(existing);
        };
    }, []);

    return (
        <div className="w-full h-[650px] glass-chrome rounded-[3rem] p-4 glow-border overflow-hidden relative">
            <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>
            {/* Cal.com embed - replace with your actual booking link */}
            <div 
                className="cal-embed w-full h-full rounded-[2rem] overflow-hidden"
                data-cal-link="apexvoicesolutions/demo"
                data-config='{"layout":"month_view","theme":"dark"}'
            />
        </div>
    );
}
