"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Phone, PhoneOff, Activity, ShieldCheck, Zap } from "lucide-react";

declare global {
  interface Window {
    Vapi: new (apiKey: string) => VapiInstance;
  }
}

interface VapiInstance {
  start: (assistantId: string) => void;
  stop: () => void;
  on: (event: string, callback: (data?: unknown) => void) => void;
  off: (event: string, callback: (data?: unknown) => void) => void;
}

// VAPI Public Key and Assistant ID
const VAPI_PUBLIC_KEY = "140ada0a-5ae8-47f8-bc9f-5c912f339258";
const DEMO_ASSISTANT_ID = "77a64bc3-9fbc-4edd-ae80-8e3987e2b492"; // Apex Demo AI Receptionist

export function VapiVoiceDemo() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isCalling, setIsCalling] = useState(false);
  const [status, setStatus] = useState("Standby");
  const vapiRef = useRef<VapiInstance | null>(null);

  useEffect(() => {
    // Load VAPI Web SDK
    const script = document.createElement("script");
    script.src = "https://cdn.jsdelivr.net/npm/@vapi-ai/web@latest/dist/index.global.js";
    script.async = true;
    script.onload = () => {
      console.log("VAPI SDK loaded");
      setIsLoaded(true);
    };
    script.onerror = () => {
      console.error("Failed to load VAPI SDK");
      setStatus("SDK Load Error");
    };
    document.body.appendChild(script);

    return () => {
      // Cleanup on unmount
      if (vapiRef.current) {
        vapiRef.current.stop();
      }
      document.body.removeChild(script);
    };
  }, []);

  const startCall = () => {
    if (!window.Vapi) {
      console.error("VAPI SDK not loaded");
      setStatus("SDK Not Ready");
      return;
    }

    try {
      setStatus("Connecting...");
      
      // Create VAPI instance
      const vapi = new window.Vapi(VAPI_PUBLIC_KEY);
      vapiRef.current = vapi;

      // Event handlers
      vapi.on("call-start", () => {
        console.log("Call started");
        setIsCalling(true);
        setStatus("Active Feed");
      });

      vapi.on("call-end", () => {
        console.log("Call ended");
        setIsCalling(false);
        setStatus("Standby");
        vapiRef.current = null;
      });

      vapi.on("error", (err) => {
        console.error("VAPI error:", err);
        setStatus("Connection Error");
        setIsCalling(false);
      });

      vapi.on("speech-start", () => {
        console.log("Agent speaking");
      });

      vapi.on("speech-end", () => {
        console.log("Agent stopped speaking");
      });

      // Start the call with assistant ID
      vapi.start(DEMO_ASSISTANT_ID);
    } catch (err) {
      console.error("Failed to start call:", err);
      setStatus("Failed to Connect");
    }
  };

  const endCall = () => {
    if (vapiRef.current) {
      vapiRef.current.stop();
      setIsCalling(false);
      setStatus("Standby");
      vapiRef.current = null;
    }
  };

  return (
    <div className="w-full max-w-sm glass-chrome rounded-[2.5rem] p-10 flex flex-col items-center gap-10 glow-border relative overflow-hidden group">
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-primary/50 to-transparent"></div>

      {/* Audiophile Visualizer */}
      <div className="relative mb-4">
        <div className={`absolute inset-0 bg-primary/20 rounded-full blur-2xl transition-all duration-1000 ${isCalling ? "scale-150 opacity-100" : "scale-50 opacity-0"}`}></div>
        <div className={`w-32 h-32 rounded-full border-2 flex items-center justify-center transition-all duration-700 ${isCalling ? "border-primary bg-primary/10 shadow-[0_0_60px_rgba(99,102,241,0.3)] ring-8 ring-primary/5" : "border-white/10 bg-white/5"}`}>
          <Bot className={`h-16 w-16 transition-colors duration-700 ${isCalling ? "text-primary" : "text-white/20"}`} />
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
          onClick={isCalling ? endCall : startCall}
          disabled={!isLoaded}
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

      {!isLoaded && (
        <div className="text-[10px] text-muted-foreground/40">Loading voice SDK...</div>
      )}
    </div>
  );
}
