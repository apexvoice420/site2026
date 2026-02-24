"use client";

import { Button } from "@/components/ui/button";
import { Calendar, Clock } from "lucide-react";

export function BookingCalendar() {
  return (
    <div className="w-full h-[650px] glass-chrome rounded-[3rem] p-8 glow-border overflow-hidden relative flex flex-col">
      <div className="absolute inset-0 bg-white/[0.02] pointer-events-none rounded-[3rem]"></div>
      
      {/* Header */}
      <div className="relative z-10 mb-6 flex items-center gap-3">
        <div className="w-12 h-12 bg-primary/20 rounded-xl flex items-center justify-center">
          <Calendar className="h-6 w-6 text-primary" />
        </div>
        <div>
          <h3 className="font-bold">Book a Demo</h3>
          <p className="text-xs text-muted-foreground">15-minute consultation</p>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center gap-6 text-center">
        <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
          <Clock className="h-10 w-10 text-primary" />
        </div>
        
        <div className="space-y-2">
          <h4 className="text-xl font-bold">Schedule Your Demo</h4>
          <p className="text-sm text-muted-foreground max-w-xs">
            Book a 15-minute call with our team to discuss your voice automation needs.
          </p>
        </div>

        {/* Cal.com Button */}
        <a 
          href="https://cal.com/maurice-pinnock-lrwndd" 
          target="_blank" 
          rel="noopener noreferrer"
          className="w-full max-w-xs"
        >
          <Button className="w-full h-14 rounded-2xl text-sm font-bold shadow-2xl">
            <Calendar className="mr-2 h-5 w-5" />
            Open Booking Calendar
          </Button>
        </a>
      </div>

      {/* Footer */}
      <div className="relative z-10 mt-4 text-center">
        <p className="text-[10px] text-muted-foreground/60">
          Available Monday - Friday, 9AM - 6PM EST
        </p>
      </div>
    </div>
  );
}
