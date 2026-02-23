"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Phone, PhoneOff, Activity, ShieldCheck, Zap } from "lucide-react";
import Script from "next/script";

export function VapiVoiceDemo() {
    const [isCalling, setIsCalling] = useState(false);
    const [status, setStatus] = useState("Standby");

    const toggleCall = () => {
        setIsCalling(!isCalling);
        setStatus(isCalling ? "Standby" : "Active Feed");
    };

    return (
        <>
            <Script
                src="https://cdn.jsdelivr.net/gh/balacodeio/Vapi-Web-UMD@latest/dist/latest/vapi-web-bundle.min.js"
                onLoad={() => console.log("Vapi Loaded")}
            />
            <div className="w-full max-w-sm glass-chrome rounded-[2.5rem] p-10 flex flex-col items-center gap-10 glow-border relative overflow-hidden group">
                <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

                {/* Audiophile Visualizer */}
                <div className="relative mb-4">
                    <div className={`absolute inset-0 bg-primary/20 rounded-full blur-2xl transition-all duration-1000 ${isCalling ? "scale-150 opacity-100" : "scale-50 opacity-0"}`}></div>
                    <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${isCalling ? "border-primary bg-primary/10 shadow-[0_0_60px_rgba(var(--primary),0.3)] ring-8 ring-primary/5" : "border-white/10 bg-white/5"}`}>
                        <Bot className={`h-16 w-16 transition-colors duration-700 ${isCalling ? "text-primary shadow-primary" : "text-white/20"}`} />
                    </div>

                    {/* Animated Waves around the bot */}
                    {isCalling && (
                        <div className="absolute -inset-4 border border-primary/20 rounded-full animate-ping"></div>
                    )}
                </div>

                <div className="text-center space-y-2">
                    <div className="text-[10px] uppercase font-black tracking-[0.5em] opacity-40">System Protocol</div>
                    <div className={`text-2xl font-bold tracking-tighter transition-colors ${isCalling ? "text-primary" : "text-foreground"}`}>
                        {status}
                    </div>
                </div>

                <div className="flex gap-4 w-full">
                    <Button
                        size="lg"
                        onClick={toggleCall}
                        className={`flex-1 h-16 rounded-2xl text-[13px] font-black uppercase tracking-widest transition-all shadow-2xl ${isCalling ? "bg-red-500/10 border border-red-500/20 text-red-500 hover:bg-red-500/20" : "bg-primary text-primary-foreground hover:scale-[1.02] shadow-primary/20"}`}
                    >
                        {isCalling ? (
                            <>
                                <PhoneOff className="mr-3 h-5 w-5" /> Disconnect
                            </>
                        ) : (
                            <>
                                <Phone className="mr-3 h-5 w-5" /> Initialize
                            </>
                        )}
                    </Button>
                </div>

                <div className="w-full flex justify-between px-2 opacity-20 group-hover:opacity-60 transition-opacity">
                    <Zap className="h-4 w-4" />
                    <Activity className="h-4 w-4" />
                    <ShieldCheck className="h-4 w-4" />
                </div>
            </div>
        </>
    );
}
