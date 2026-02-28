"use client";

import { Check, Crown, Settings, Star, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    id: 'full-service',
    name: 'Full Service',
    icon: Crown,
    tagline: 'We handle everything',
    setupFee: 1500,
    monthly: 500,
    popular: true,
    features: [
      'AI receptionist setup',
      'VAPI phone number',
      'We manage all updates',
      '24/7 monitoring',
      'Priority support',
      'Monthly call reports',
    ],
    color: 'purple',
  },
  {
    id: 'self-service',
    name: 'Self-Service',
    icon: Settings,
    tagline: 'You manage, we host',
    setupFee: 2500,
    monthly: 150,
    popular: false,
    features: [
      'AI receptionist setup',
      'VAPI phone number',
      'Client portal access',
      'Edit greeting, FAQ, hours',
      '24/7 monitoring',
      'Monthly call reports',
    ],
    color: 'blue',
  },
  {
    id: 'white-label',
    name: 'White-Label',
    icon: Star,
    tagline: 'Your brand, our tech',
    setupFee: 3500,
    monthly: 250,
    popular: false,
    features: [
      'Everything in Self-Service',
      'Your branding on portal',
      'Resell to your clients',
      'Priority support',
      'Custom integrations',
      'Agency dashboard',
    ],
    color: 'green',
  },
  {
    id: 'handoff',
    name: 'One-Time Handoff',
    icon: Zap,
    tagline: 'We build, you own it',
    setupFee: 3500,
    monthly: 0,
    popular: false,
    features: [
      'AI receptionist setup',
      'VAPI phone number',
      'Full account ownership',
      'No monthly fees',
      'Support available ($150/hr)',
      'Complete control',
    ],
    color: 'orange',
  },
];

export function PricingTiers() {
  return (
    <section id="pricing" className="py-16 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-12">
        {/* Header */}
        <div className="text-center mb-12 md:mb-20">
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 uppercase">
            Choose Your Tier.
          </h2>
          <p className="text-base md:text-xl text-muted-foreground/60 max-w-2xl mx-auto">
            Four ways to work with us. Pick what fits your business — or your clients' businesses.
          </p>
        </div>

        {/* Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-6">
          {tiers.map((tier) => {
            const Icon = tier.icon;
            const colors: Record<string, string> = {
              purple: 'from-purple-500 to-purple-600',
              blue: 'from-blue-500 to-blue-600',
              green: 'from-green-500 to-green-600',
              orange: 'from-orange-500 to-orange-600',
            };

            return (
              <div
                key={tier.id}
                className={`glass-chrome rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col glow-border relative group ${
                  tier.popular ? 'border-primary/30 ring-1 ring-primary/20' : ''
                }`}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${colors[tier.color]} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className="h-6 w-6 text-white" />
                </div>

                {/* Name & Tagline */}
                <h3 className="text-lg md:text-xl font-bold mb-1">{tier.name}</h3>
                <p className="text-xs text-muted-foreground mb-4">{tier.tagline}</p>

                {/* Pricing */}
                <div className="mb-6">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-black">${tier.setupFee.toLocaleString()}</span>
                    <span className="text-xs opacity-40">setup</span>
                  </div>
                  <div className="flex items-baseline gap-1 mt-1">
                    <span className="text-lg font-bold text-muted-foreground">
                      {tier.monthly === 0 ? '$0' : `$${tier.monthly}`}
                    </span>
                    <span className="text-xs opacity-40">/month</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-2 mb-6 flex-1 text-xs md:text-sm">
                  {tier.features.map((feature, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <Check className="h-4 w-4 text-primary shrink-0 mt-0.5" />
                      <span className="text-muted-foreground">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <Link href="#book" className="mt-auto">
                  <Button
                    className={`w-full h-12 rounded-xl text-xs font-bold uppercase tracking-wider ${
                      tier.popular
                        ? 'bg-foreground text-background'
                        : 'bg-white/5 hover:bg-white/10'
                    }`}
                  >
                    Get Started
                  </Button>
                </Link>
              </div>
            );
          })}
        </div>

        {/* Compare CTA */}
        <div className="mt-12 md:mt-16 text-center">
          <p className="text-muted-foreground mb-4">
            Want to see how we compare to GoHighLevel?
          </p>
          <Link 
            href="https://crm.apexvoicesolutions.org/compare"
            target="_blank"
            className="inline-flex items-center gap-2 text-primary hover:text-primary/80 font-bold text-sm uppercase tracking-wider transition-colors"
          >
            View Full Comparison <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Annual Savings */}
        <div className="mt-12 p-6 md:p-8 bg-green-500/10 rounded-2xl md:rounded-3xl text-center max-w-2xl mx-auto">
          <p className="text-sm text-muted-foreground mb-2">Why our pricing works</p>
          <p className="text-lg md:text-xl font-bold">
            <span className="text-green-400">Save $10,000+ per year</span> compared to GoHighLevel subscriptions.
            <span className="text-muted-foreground block mt-2 text-base font-normal">
              You own the tech. No rental fees eating your margins.
            </span>
          </p>
        </div>
      </div>
    </section>
  );
}
