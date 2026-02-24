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
  Command
} from "lucide-react";
import { INDUSTRIES } from "@/lib/industries";
import { VapiVoiceDemo } from "@/components/VapiVoiceDemo";
import { BookingCalendar } from "@/components/BookingCalendar";

export default function Home() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground selection:bg-primary/20 transition-colors duration-1000 font-sans">
      {/* Ultra-Premium Navigation */}
      <header className="sticky top-0 z-50 w-full border-b border-white/5 bg-background/50 backdrop-blur-2xl">
        <div className="container mx-auto flex h-20 items-center justify-between px-6 lg:px-12">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 glass-chrome rounded-xl flex items-center justify-center glow-border">
              <Bot className="h-6 w-6 text-primary" />
            </div>
            <span className="font-bold text-lg tracking-tighter uppercase italic">
              Apex <span className="text-muted-foreground font-light">Voice</span>
            </span>
          </div>
          <nav className="hidden lg:flex items-center gap-10 text-[13px] font-bold uppercase tracking-[0.2em] text-muted-foreground/60">
            <Link href="#features" className="hover:text-foreground transition-colors">Intelligence</Link>
            <Link href="#solutions" className="hover:text-foreground transition-colors">Solutions</Link>
            <Link href="#demo" className="hover:text-foreground transition-colors">Live Feed</Link>
            <Link href="#pricing" className="hover:text-foreground transition-colors">Access</Link>
          </nav>
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="outline" className="h-11 px-6 glass-chrome border-white/10 rounded-full text-xs font-bold uppercase tracking-widest hover:bg-white/5">
                Dashboard
              </Button>
            </Link>
            <Link href="#book">
              <Button className="h-11 px-6 bg-foreground text-background hover:bg-foreground/90 rounded-full text-xs font-bold uppercase tracking-widest transition-transform active:scale-95">
                Book Demo
              </Button>
            </Link>
          </div>
        </div>
      </header>

      <main className="flex-1">
        {/* V4 Hero - Status: Active */}
        <section className="relative pt-32 pb-48 lg:pt-48 lg:pb-64 overflow-hidden">
          {/* Ambient Lighting */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1200px] h-[600px] bg-primary/5 blur-[160px] rounded-full -z-10"></div>

          <div className="container mx-auto px-6 text-center">
            <div className="perspective-1000 inline-block mb-12">
              <div className="preserve-3d animate-in fade-in slide-in-from-bottom-8 duration-1000">
                <div className="glass-chrome px-5 py-2 rounded-full text-[11px] font-bold uppercase tracking-[0.3em] flex items-center gap-3 border-white/10 shadow-2xl">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.8)]"></div>
                  <span className="opacity-80">Network Status: <span className="text-foreground">Optimal</span></span>
                  <div className="w-px h-3 bg-white/20"></div>
                  <span className="opacity-60 text-[10px]">V4.0.1 Stable</span>
                </div>
              </div>
            </div>

            <h1 className="text-6xl md:text-[140px] font-black tracking-[-0.04em] leading-[0.85] mb-12 animate-in fade-in zoom-in-95 duration-1000 delay-200">
              ELIMINATE THE <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-b from-foreground to-foreground/30">MISSED CALL.</span>
            </h1>

            <p className="max-w-[800px] mx-auto text-lg md:text-2xl text-muted-foreground/80 font-medium leading-relaxed mb-16 px-4 animate-in fade-in slide-in-from-bottom-12 duration-1000 delay-500 text-pretty">
              Advanced voice-native intelligence that captures, qualifies, and <br className="hidden md:block" />
              synchronizes every opportunity while you sleep.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-8 animate-in fade-in slide-in-from-bottom-16 duration-1000 delay-700">
              <Link href="#demo">
                <Button className="h-20 px-12 group bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl text-lg font-bold shadow-2xl transition-all active:scale-95">
                  <Activity className="mr-4 h-6 w-6 group-hover:scale-125 transition-transform" />
                  Initialize Interface
                </Button>
              </Link>
              <Link href="#book">
                <Button variant="ghost" className="h-20 px-12 text-lg font-bold opacity-60 hover:opacity-100 transition-opacity">
                  View Capability &rarr;
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {/* Bento Grid Features */}
        <section id="features" className="py-32 relative">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="grid grid-cols-1 md:grid-cols-4 md:grid-rows-2 gap-6 h-full md:h-[800px]">
              {/* Main Bento Tile */}
              <div className="md:col-span-2 md:row-span-2 glass-chrome rounded-[3rem] p-12 flex flex-col justify-between group overflow-hidden glow-border">
                <div className="relative">
                  <div className="w-16 h-16 bg-primary/20 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                    <Command className="h-8 w-8 text-primary" />
                  </div>
                  <h3 className="text-4xl font-bold mb-6">Omniscient Reception.</h3>
                  <p className="text-muted-foreground text-xl leading-relaxed">
                    Our agents don't just answer; they understand. Trained on millions of conversations to handle objections, recognize intent, and close loops with zero latency.
                  </p>
                </div>
                <div className="mt-12 opacity-40 group-hover:opacity-100 transition-opacity duration-700">
                  <div className="flex flex-col gap-4">
                    <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                      <div className="h-full bg-primary w-2/3"></div>
                    </div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                      <span>Processing Load</span>
                      <span className="text-primary">64ms Latency</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Secondary Bento Tile */}
              <div className="md:col-span-2 glass-chrome rounded-[3rem] p-12 flex items-center justify-between group glow-border">
                <div className="max-w-[60%]">
                  <h3 className="text-3xl font-bold mb-4">Neural CRM Sync.</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Instant data propagation into GHL, HubSpot, or custom stacks. No manual entry.
                  </p>
                </div>
                <div className="w-24 h-24 bg-white/5 rounded-3xl flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                  <Layers className="h-10 w-10 text-primary" />
                </div>
              </div>

              {/* Mini Bento Tile 1 */}
              <div className="glass-chrome rounded-[3rem] p-8 group glow-border">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:rotate-12 transition-transform">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold mb-2">Vault Secure.</h4>
                <p className="text-sm text-muted-foreground">SOC2 and HIPAA aligned data infrastructure.</p>
              </div>

              {/* Mini Bento Tile 2 */}
              <div className="glass-chrome rounded-[3rem] p-8 group glow-border">
                <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                  <Sparkles className="h-6 w-6 text-primary" />
                </div>
                <h4 className="text-lg font-bold mb-2">Voice Native.</h4>
                <p className="text-sm text-muted-foreground">Studio-quality synthesis with emotive inflections.</p>
              </div>
            </div>
          </div>
        </section>

        {/* Audiophile Demo Section */}
        <section id="demo" className="py-32 relative bg-background">
          <div className="container mx-auto px-6">
            <div className="max-w-6xl mx-auto glass-chrome rounded-[4rem] p-12 lg:p-24 overflow-hidden relative glow-border">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent pointer-events-none"></div>
              <div className="grid lg:grid-cols-2 gap-24 items-center relative z-10">
                <div>
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-green-500/10 text-green-500 text-[10px] font-black uppercase tracking-widest mb-8">
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-ping"></div>
                    Live Connection
                  </div>
                  <h2 className="text-5xl md:text-7xl font-bold mb-8 leading-[0.9]">Experience the <br className="hidden md:block" /> Intelligence.</h2>
                  <p className="text-muted-foreground text-xl leading-relaxed mb-12">
                    Click the interface to engage with a production-grade agent.
                    Observe the latency, tone, and decision-making logic in real-time.
                  </p>
                  <div className="grid grid-cols-2 gap-8 mb-12">
                    <div>
                      <div className="text-3xl font-bold mb-1">0.6s</div>
                      <div className="text-[10px] uppercase font-bold tracking-widest opacity-40">Average Response</div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold mb-1">Natural</div>
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

        {/* Premium Industries */}
        <section id="solutions" className="py-32">
          <div className="container mx-auto px-6 lg:px-12 text-center">
            <h2 className="text-5xl font-bold mb-20">Universal Application.</h2>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {Object.values(INDUSTRIES).map((industry) => (
                <Link key={industry.slug} href={`/solutions/${industry.slug}`}>
                  <div className="group relative glass-chrome p-10 rounded-[3rem] hover:bg-white/10 transition-all duration-700 glow-border h-full">
                    <div className="mb-8 p-4 bg-white/5 rounded-2xl w-fit group-hover:scale-110 transition-transform">
                      <Bot className="h-8 w-8 text-primary" />
                    </div>
                    <h3 className="text-2xl font-bold mb-4">{industry.title}</h3>
                    <p className="text-muted-foreground text-sm opacity-60 line-clamp-2">
                      {industry.hero.subtitle}
                    </p>
                    <div className="mt-8 flex items-center justify-center w-10 h-10 border border-white/10 rounded-full group-hover:bg-foreground group-hover:text-background transition-all mx-auto">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* Pricing Section - 3 Tiers */}
        <section id="pricing" className="py-32 relative">
          <div className="container mx-auto px-6">
            <div className="text-center mb-20">
              <h2 className="text-5xl md:text-6xl font-black tracking-tighter mb-6 uppercase">Choose Your Protocol.</h2>
              <p className="text-xl text-muted-foreground/60 max-w-2xl mx-auto">
                Scalable voice infrastructure. From solo operators to enterprise fleets.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Starter Tier */}
              <div className="glass-chrome rounded-[3rem] p-10 flex flex-col glow-border group">
                <div className="mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Starter</span>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black">$97</span>
                    <span className="text-sm opacity-40">/activation</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground/70">Perfect for solo operators testing the waters.</p>
                </div>

                <ul className="space-y-4 mb-10 flex-1 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>1 AI Voice Agent</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>500 minutes/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>Basic CRM integration</span>
                  </li>
                  <li className="flex items-center gap-3 opacity-40">
                    <CheckCircle className="h-4 w-4 shrink-0" />
                    <span>Email support</span>
                  </li>
                </ul>

                <Link href="#book">
                  <Button variant="outline" className="w-full h-14 rounded-2xl text-sm font-bold uppercase tracking-wider">
                    Get Started
                  </Button>
                </Link>
              </div>

              {/* Professional Tier - Featured */}
              <div className="glass-chrome rounded-[3rem] p-10 flex flex-col glow-border relative border-primary/30 group">
                <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-[10px] font-bold uppercase tracking-widest rounded-full">
                  Most Popular
                </div>

                <div className="mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-primary">Professional</span>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-5xl font-black">$297</span>
                    <span className="text-sm opacity-40">/activation</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground/70">For growing businesses ready to scale.</p>
                </div>

                <ul className="space-y-4 mb-10 flex-1 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>3 AI Voice Agents</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>2,000 minutes/month</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>Advanced CRM sync (GHL, HubSpot)</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>Call transcription & analytics</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>Priority support</span>
                  </li>
                </ul>

                <Link href="#book">
                  <Button className="w-full h-14 rounded-2xl text-sm font-bold uppercase tracking-wider shadow-2xl">
                    Deploy Now
                  </Button>
                </Link>
              </div>

              {/* Enterprise Tier */}
              <div className="glass-chrome rounded-[3rem] p-10 flex flex-col glow-border group">
                <div className="mb-8">
                  <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-muted-foreground/60">Enterprise</span>
                  <div className="mt-4 flex items-baseline gap-1">
                    <span className="text-4xl font-black">$997</span>
                    <span className="text-sm opacity-40">/activation</span>
                  </div>
                  <p className="mt-4 text-sm text-muted-foreground/70">Full-scale operations with custom needs.</p>
                </div>

                <ul className="space-y-4 mb-10 flex-1 text-sm">
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>Unlimited AI Agents</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>Unlimited minutes</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>Custom integrations & webhooks</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>Dedicated account manager</span>
                  </li>
                  <li className="flex items-center gap-3">
                    <CheckCircle className="h-4 w-4 text-primary shrink-0" />
                    <span>SLA guarantee & 24/7 support</span>
                  </li>
                </ul>

                <Link href="#book">
                  <Button variant="outline" className="w-full h-14 rounded-2xl text-sm font-bold uppercase tracking-wider">
                    Contact Sales
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Global Strategy Section */}
        <section id="book" className="py-48 bg-[#0a0a0a]">
          <div className="container mx-auto px-6">
            <div className="grid lg:grid-cols-2 gap-32 items-center">
              <div>
                <h2 className="text-6xl md:text-8xl font-black tracking-tighter mb-12 uppercase leading-[0.85]">
                  Schedule <br />
                  <span className="opacity-20 hover:opacity-100 transition-opacity">Protocol.</span>
                </h2>
                <p className="text-xl text-muted-foreground font-medium leading-relaxed mb-16 italic opacity-60">
                  Secure a 15-minute diagnostic session with our technical architects to engineer your bespoke voice automation pipeline.
                </p>
                <div className="p-10 glass-chrome rounded-[3rem] border-white/5 glow-border">
                  <h4 className="font-bold text-sm uppercase tracking-[0.4em] mb-4 opacity-40">Consultation Focus</h4>
                  <ul className="space-y-4 text-lg font-medium opacity-80">
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

      <footer className="py-20 border-t border-white/5 bg-background">
        <div className="container mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center justify-between gap-12 font-bold uppercase tracking-[0.2em] text-[10px] opacity-40">
          <div className="flex items-center gap-2">
            <Bot className="h-5 w-5" />
            <span>Apex Voice Solutions V4</span>
          </div>
          <div className="flex items-center gap-12">
            <Link href="#" className="hover:text-foreground">Security</Link>
            <Link href="#" className="hover:text-foreground">Network</Link>
            <Link href="#" className="hover:text-foreground">Legal</Link>
          </div>
          <p>
            &copy; 2026 APEX_INTEL_SYSTEMS
          </p>
        </div>
      </footer>
    </div>
  );
}
