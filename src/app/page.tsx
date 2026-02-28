"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Zap,
  Shield,
  Phone,
  CheckCircle,
  Calendar,
  PlayCircle,
  Activity,
  Layers,
  Sparkles,
  Command,
  Menu,
  X
} from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { VapiVoiceDemo } from "@/components/VapiVoiceDemo";
import { BookingCalendar } from "@/components/BookingCalendar";
import { MissedCallsCalculator } from "@/components/MissedCallsCalculator";
import { PricingTiers } from "@/components/PricingTiers";
import { useState } from "react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 transition-colors duration-1000 font-sans">
      {/* Mobile-First Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/80 backdrop-blur-xl">
        <div className="container mx-auto flex h-16 md:h-20 items-center justify-between px-4 md:px-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 glass-chrome rounded-xl flex items-center justify-center glow-border">
              <Bot className="h-5 w-5 md:h-6 md:w-6 text-primary" />
            </div>
            <span className="font-bold text-base md:text-lg tracking-tighter uppercase italic">
              Apex <span className="text-muted-foreground font-light">Voice</span>
            </span>
          </div>
          
          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10 text-[13px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            <Link href="#features" className="hover:text-foreground transition-colors">Intelligence</Link>
            <Link href="#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
            <Link href="#demo" className="hover:text-foreground transition-colors">Live Feed</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Access</Link>
          </nav>
          
          <div className="flex items-center gap-3 md:gap-4">
            <Link href="https://crm.apexvoicesolutions.org" className="hidden sm:block">
              <Button variant="outline" className="h-11 min-w-[80px] px-4 md:px-6 glass-chrome border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/5">
                Login
              </Button>
            </Link>
            <Link href="#book" className="hidden sm:block">
              <Button className="h-11 min-w-[100px] px-4 md:px-6 bg-foreground text-background hover:bg-foreground/90 rounded-full text-xs font-bold uppercase tracking-widest transition-transform active:scale-95">
                Book Demo
              </Button>
            </Link>
            
            {/* Mobile Menu Button - 48x48 touch target */}
            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden w-12 h-12 flex items-center justify-center rounded-xl glass-chrome"
            >
              {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
        
        {/* Mobile Menu Dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-white/5 bg-background/95 backdrop-blur-xl">
            <nav className="container mx-auto px-4 py-6 flex flex-col gap-4">
              <Link href="#features" onClick={() => setMobileMenuOpen(false)} className="h-12 flex items-center text-base font-bold uppercase tracking-widest text-muted-foreground/80 hover:text-foreground">Intelligence</Link>
              <Link href="#solutions" onClick={() => setMobileMenuOpen(false)} className="h-12 flex items-center text-base font-bold uppercase tracking-widest text-muted-foreground/80 hover:text-foreground">Solutions</Link>
              <Link href="#demo" onClick={() => setMobileMenuOpen(false)} className="h-12 flex items-center text-base font-bold uppercase tracking-widest text-muted-foreground/80 hover:text-foreground">Live Feed</Link>
              <Link href="#pricing" onClick={() => setMobileMenuOpen(false)} className="h-12 flex items-center text-base font-bold uppercase tracking-widest text-muted-foreground/80 hover:text-foreground">Access</Link>
              <div className="flex gap-3 pt-4 border-t border-white/10">
                <Link href="https://crm.apexvoicesolutions.org" className="flex-1">
                  <Button variant="outline" className="w-full h-12 glass-chrome rounded-xl text-sm font-bold uppercase tracking-wider">Login</Button>
                </Link>
                <Link href="#book" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                  <Button className="w-full h-12 bg-foreground text-background rounded-xl text-sm font-bold uppercase tracking-wider">Book Demo</Button>
                </Link>
              </div>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero - Mobile First */}
        <section className="relative pt-20 pb-24 md:pt-48 md:pb-64 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] md:w-[1200px] h-[300px] md:h-[600px] bg-primary/5 blur-[100px] md:blur-[160px] rounded-full -z-10"></div>

          <div className="container mx-auto px-4 md:px-12 text-center">
            {/* Status Badge */}
            <div className="inline-block mb-8 md:mb-12">
              <div className="glass-chrome px-4 py-2 md:px-5 rounded-full text-[10px] md:text-[11px] font-bold uppercase tracking-[0.2em] md:tracking-[0.3em] flex items-center gap-2 md:gap-3 border-white/10 shadow-xl">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></div>
                <span className="opacity-80">Network Status: <span className="text-foreground">Optimal</span></span>
                <div className="w-px h-3 bg-white/20 hidden sm:block"></div>
                <span className="opacity-60 text-[9px] md:text-[10px] hidden sm:inline">V4.0.1 Stable</span>
              </div>
            </div>

            {/* Headline - Responsive sizing */}
            <h1 className="text-4xl sm:text-5xl md:text-7xl lg:text-[140px] font-black tracking-tight md:tracking-[-0.04em] leading-[0.9] md:leading-[0.85] mb-8 md:mb-12">
              ELIMINATE THE <br className="hidden sm:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/30">MISSED CALL.</span>
            </h1>

            {/* Subtitle */}
            <p className="max-w-[90%] md:max-w-[800px] mx-auto text-base md:text-2xl text-muted-foreground/80 font-medium leading-relaxed mb-10 md:mb-16">
              Advanced voice-native intelligence that captures, qualifies, and synchronizes every opportunity while you sleep.
            </p>

            {/* CTA Buttons - Touch-friendly */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 md:gap-8">
              <Link href="#demo" className="w-full sm:w-auto">
                <Button className="w-full sm:w-auto h-14 md:h-20 px-8 md:px-12 group bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl text-sm md:text-lg font-bold shadow-2xl transition-all active:scale-95">
                  <Activity className="mr-3 h-5 w-5 md:h-6 md:w-6 group-hover:scale-125 transition-transform" />
                  Initialize Interface
                </Button>
              </Link>
              <Link href="#book" className="w-full sm:w-auto">
                <Button variant="ghost" className="w-full sm:w-auto h-14 md:h-20 px-8 md:px-12 text-sm md:text-lg font-bold opacity-60 hover:opacity-100 transition-opacity">
                  View Capability &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Bento Grid Features - Mobile Stacked */}
        <section id="features" className="py-16 md:py-32 relative">
          <div className="container mx-auto px-4 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6 md:grid-rows-2 md:h-[800px]">
              {/* Main Bento Tile */}
              <div className="md:col-span-2 md:row-span-2 glass-chrome rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col justify-between group overflow-hidden glow-border">
                <div className="relative">
                  <div className="w-12 h-12 md:w-16 md:h-16 bg-primary/20 rounded-xl md:rounded-2xl flex items-center justify-center mb-6 md:mb-10 group-hover:scale-110 transition-transform duration-500">
                    <Command className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-4xl font-bold mb-4 md:mb-6">Omniscient Reception.</h3>
                  <p className="text-muted-foreground text-base md:text-xl leading-relaxed">
                    Our agents don't just answer; they understand. Trained on millions of conversations to handle objections, recognize intent, and close loops with zero latency.
                  </p>
                </div>
                <div className="mt-8 md:mt-12 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                    <div className="h-full bg-primary w-2/3"></div>
                  </div>
                  <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest mt-3">
                    <span>Processing Load</span>
                    <span className="text-primary">64ms Latency</span>
                  </div>
                </div>
              </div>

              {/* Secondary Bento Tile */}
              <div className="md:col-span-2 glass-chrome rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 flex flex-col md:flex-row items-start md:items-center justify-between group glow-border gap-4">
                <div className="md:max-w-[60%]">
                  <h3 className="text-xl md:text-3xl font-bold mb-3 md:mb-4">Neural CRM Sync.</h3>
                  <p className="text-muted-foreground text-sm md:text-base leading-relaxed">
                    Instant data propagation into GHL, HubSpot, or custom stacks. No manual entry.
                  </p>
                </div>
                <div className="w-16 h-16 md:w-24 md:h-24 bg-white/5 rounded-2xl md:rounded-3xl flex items-center justify-center group-hover:bg-primary/10 transition-colors shrink-0">
                  <Layers className="h-8 w-8 md:h-10 md:w-10 text-primary" />
                </div>
              </div>

              {/* Mini Bento Tiles */}
              <div className="glass-chrome rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 group glow-border">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:rotate-12 transition-transform">
                  <Shield className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h4 className="text-base md:text-lg font-bold mb-2">Vault Secure.</h4>
                <p className="text-xs md:text-sm text-muted-foreground">SOC2 and HIPAA aligned data infrastructure.</p>
              </div>

              <div className="glass-chrome rounded-[2rem] md:rounded-[3rem] p-6 md:p-8 group glow-border">
                <div className="w-10 h-10 md:w-12 md:h-12 bg-white/5 rounded-lg md:rounded-xl flex items-center justify-center mb-4 md:mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-5 w-5 md:h-6 md:w-6 text-primary" />
                </div>
                <h4 className="text-base md:text-lg font-bold mb-2">Voice Native.</h4>
                <p className="text-xs md:text-sm text-muted-foreground">Studio-quality synthesis with emotive inflections.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section id="demo" className="py-16 md:py-32 relative bg-background">
          <div className="container mx-auto px-4 md:px-12">
            <div className="max-w-6xl mx-auto glass-chrome rounded-[2rem] md:rounded-[4rem] p-8 md:p-24 overflow-hidden relative glow-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-24 items-center relative z-10">
                <div className="text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest mb-6 md:mb-8">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                    Live Connection
                  </div>
                  <h2 className="text-3xl md:text-5xl font-bold mb-6 md:mb-8 leading-tight">Experience the Intelligence.</h2>
                  <p className="text-muted-foreground text-base md:text-xl leading-relaxed mb-8 md:mb-12">
                    Click the interface to engage with a production-grade agent. Observe the latency, tone, and decision-making logic in real-time.
                  </p>
                  <div className="grid grid-cols-2 gap-6 md:gap-8 mb-8 md:mb-12">
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">0.6s</div>
                      <div className="text-[10px] uppercase font-bold tracking-widest opacity-40">Average Response</div>
                    </div>
                    <div>
                      <div className="text-2xl md:text-3xl font-bold mb-1">Natural</div>
                      <div className="text-[10px] uppercase font-bold tracking-widest opacity-40">Inflection Engine</div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center">
                  <VapiVoiceDemo />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Solutions - Mobile Grid */}
        <section id="solutions" className="py-16 md:py-32">
          <div className="container mx-auto px-4 md:px-12 text-center">
            <h2 className="text-3xl md:text-5xl font-bold mb-12 md:mb-20">Universal Application.</h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-8">
              {Object.values(INDUSTRIES).map((industry) => (
                <Link key={industry.slug} href={`/solutions/${industry.slug}`}>
                  <div className="group relative glass-chrome p-6 md:p-10 rounded-[2rem] md:rounded-[3rem] hover:bg-white/10 transition-all duration-700 glow-border h-full">
                    <div className="mb-6 md:mb-8 p-3 md:p-4 bg-white/5 rounded-xl md:rounded-2xl w-fit group-hover:scale-110 transition-transform">
                      <Bot className="h-6 w-6 md:h-8 md:w-8 text-primary" />
                    </div>
                    <h3 className="text-base md:text-2xl font-bold mb-2 md:mb-4">{industry.title}</h3>
                    <p className="text-muted-foreground text-xs md:text-sm opacity-60 line-clamp-2">
                      {industry.hero.subtitle}
                    </p>
                    <div className="mt-6 md:mt-8 flex items-center justify-center w-10 h-10 border border-white/10 rounded-full group-hover:bg-foreground group-hover:text-background transition-all mx-auto">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing - New 4-Tier System */}
        <PricingTiers />

        {/* Missed Calls Calculator */}
        <MissedCallsCalculator />

        {/* Booking Section */}
        <section id="book" className="py-24 md:py-48 bg-[#0a0a0a]">
          <div className="container mx-auto px-4 md:px-12">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 md:gap-32 items-center">
              <div className="text-center lg:text-left">
                <h2 className="text-4xl md:text-8xl font-black tracking-tighter mb-8 md:mb-12 uppercase leading-[0.85]">
                  Schedule <br />
                  <span className="opacity-20 hover:opacity-100 transition-opacity">Protocol.</span>
                </h2>
                <p className="text-base md:text-xl text-muted-foreground font-medium leading-relaxed mb-10 md:mb-16 opacity-60">
                  Secure a 15-minute diagnostic session with our technical architects to engineer your bespoke voice automation pipeline.
                </p>
                <div className="p-8 md:p-10 glass-chrome rounded-[2rem] md:rounded-[3rem] border-white/5 glow-border inline-block w-full lg:w-auto">
                  <h4 className="font-bold text-sm uppercase tracking-[0.4em] mb-4 opacity-40">Consultation Focus</h4>
                  <ul className="space-y-4 text-base md:text-lg font-medium opacity-80 text-left">
                    <li className="flex items-center gap-4">&mdash; Infrastructure Auditing</li>
                    <li className="flex items-center gap-4">&mdash; Prompt Engineering Strategy</li>
                    <li className="flex items-center gap-4">&mdash; CRM Integration Mapping</li>
                  </ul>
                </div>
              </div>
              <div className="relative">
                <BookingCalendar />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Sticky Mobile CTA */}
      <div className="fixed bottom-0 left-0 right-0 z-40 md:hidden bg-background/95 backdrop-blur-xl border-t border-white/10 px-4 py-3">
        <Link href="#book" className="block">
          <Button className="w-full h-14 bg-primary text-primary-foreground rounded-2xl text-sm font-bold uppercase tracking-wider shadow-2xl">
            Book Your Demo
          </Button>
        </Link>
      </div>

      {/* Footer */}
      <footer className="py-12 md:py-20 border-t border-white/5 bg-background pb-20 md:pb-20">
        <div className="container mx-auto px-4 md:px-12 flex flex-col md:flex-row items-center justify-between gap-8 font-bold uppercase tracking-[0.15em] md:tracking-[0.2em] text-[10px] opacity-40">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <span>Apex Voice Solutions V4</span>
          </div>
          <div className="flex items-center gap-8 md:gap-12">
            <Link href="#" className="hover:text-foreground">Security</Link>
            <Link href="#" className="hover:text-foreground">Network</Link>
            <Link href="#" className="hover:text-foreground">Legal</Link>
          </div>
          <p>&copy; 2026 APEX_INTEL_SYSTEMS</p>
        </div>
      </footer>
    </div>
  );
}
