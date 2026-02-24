"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Phone, PhoneOff, Activity, ShieldCheck, Zap, Mic } from "lucide-react";

export function VapiVoiceDemo() {
  const [isCalling, setIsCalling] = useState(false);

  return (
    <div className="w-full max-w-sm glass-chrome rounded-[2.5rem] p-10 flex flex-col items-center gap-10 glow-border relative overflow-hidden group">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      <div className="relative mb-4">
        <div className={`absolute inset-0 bg-primary/20 rounded-full blur-2xl transition-all duration-1000 ${isCalling ? "scale-150 opacity-100" : "scale-50 opacity-0"}`}></div>
        <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${isCalling ? "border-primary bg-primary/10 shadow-[0_0_60px_rgba(99,102,241,0.3)] ring-8 ring-primary/5" : "border-white/10 bg-white/5"}`}>
          <Bot className={`h-16 w-16 transition-colors duration-700 ${isCalling ? "text-primary" : "text-white/20"}`} />
        </div>
        {isCalling && (
          <div className="absolute -inset-4 border border-primary/20 rounded-full animate-ping"></div>
        )}
      </div>

      <div className="text-center space-y-2">
        <div className="text-[10px] uppercase font-black tracking-[0.5em] opacity-40">System Protocol</div>
        <div className={`text-2xl font-bold tracking-tighter transition-colors ${isCalling ? "text-primary" : "text-foreground"}`}>
          {isCalling ? "Active Feed" : "Standby"}
        </div>
      </div>

      {isCalling ? (
        <div className="w-full space-y-4 text-center">
          <div className="glass-chrome rounded-2xl p-6 space-y-3">
            <Mic className="h-8 w-8 text-primary mx-auto animate-pulse" />
            <p className="text-sm font-medium">Demo Line Active</p>
            <a href="tel:+13862825413" className="text-2xl font-bold tracking-tight hover:text-primary transition-colors">
              +1 (386) 282-5413
            </a>
            <p className="text-xs text-muted-foreground">Click to call our AI receptionist</p>
          </div>
          <Button
            size="lg"
            onClick={() => setIsCalling(false)}
            className="flex-1 h-16 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all shadow-2xl bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20 w-full"
          >
            <PhoneOff className="mr-3 h-5 w-5" /> End Session
          </Button>
        </div>
      ) : (
        <div className="w-full space-y-4">
          <Button
            size="lg"
            onClick={() => setIsCalling(true)}
            className="flex-1 h-16 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all shadow-2xl bg-primary text-primary-foreground hover:scale-[1.02] shadow-primary/20 w-full"
          >
            <Phone className="mr-3 h-5 w-5" /> Initialize
          </Button>
          <p className="text-[10px] text-muted-foreground/60 text-center">
            Click to reveal demo phone number
          </p>
        </div>
      )}

      <div className="w-full flex justify-between px-2 opacity-20 group-hover:opacity-60 transition-opacity">
        <Zap className="h-4 w-4" />
        <Activity className="h-4 w-4" />
        <ShieldCheck className="h-4 w-4" />
      </div>
    </div>
  );
}
