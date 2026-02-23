"use client";

import { useEffect } from "react";

export function BookingCalendar() {
    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://assets.calendly.com/assets/external/widget.js";
        script.async = true;
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <div className="w-full h-[650px] glass-chrome rounded-[3rem] p-4 glow-border overflow-hidden relative">
            <div className="absolute inset-0 bg-white/[0.02] pointer-events-none"></div>
            <div
                className="calendly-inline-widget w-full h-full invert hue-rotate-180 brightness-150 rounded-[2rem] overflow-hidden"
                data-url="https://calendly.com/apex-voice/demo?hide_event_type_details=1&hide_gdpr_banner=1&primary_color=6366f1"
            />
        </div>
    );
}
