"use client";

import { Check, Crown, Settings, Star, Zap, ArrowRight, Monitor, Server, Building2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useState } from "react";

// AI Voice Subscription Plans
const subscriptionTiers = [
  {
    id: 'starter',
    name: 'Starter',
    icon: Settings,
    tagline: 'Small business, low volume',
    setupFee: 1500,
    monthly: 99,
    minutes: 200,
    popular: false,
    features: [
      'AI receptionist 24/7',
      'Phone number hosting',
      '200 minutes/month',
      'CRM integration',
      'Monthly call reports',
      'Email support',
    ],
    color: 'blue',
  },
  {
    id: 'professional',
    name: 'Professional',
    icon: Crown,
    tagline: 'Growing businesses',
    setupFee: 1500,
    monthly: 297,
    minutes: 500,
    popular: true,
    features: [
      'AI receptionist 24/7',
      'Phone number hosting',
      '500 minutes/month',
      'CRM integration (GHL, HubSpot)',
      'We manage all updates',
      'Priority support',
      'Monthly call reports',
      'Phone line maintenance',
    ],
    color: 'purple',
  },
  {
    id: 'agency',
    name: 'Agency',
    icon: Star,
    tagline: 'White-label for resellers',
    setupFee: 3500,
    monthly: 197,
    minutes: 1000,
    popular: false,
    features: [
      'Everything in Professional',
      '1,000 minutes/month',
      'Your branding on portal',
      'Resell to your clients',
      'Agency dashboard',
      'Custom integrations',
      'Dedicated account manager',
    ],
    color: 'green',
  },
];

// CRM Purchase Options
const crmTiers = [
  {
    id: 'crm-license',
    name: 'CRM License',
    icon: Monitor,
    tagline: 'Self-hosted solution',
    price: 2997,
    popular: false,
    features: [
      'Full CRM software',
      'Self-host on your servers',
      'Source code access',
      'Documentation',
      'Community support',
    ],
    color: 'blue',
  },
  {
    id: 'crm-setup',
    name: 'CRM + Setup',
    icon: Server,
    tagline: 'We deploy it for you',
    price: 4997,
    popular: true,
    features: [
      'Full CRM software',
      'We handle deployment',
      'Custom branding',
      'Initial configuration',
      '30-day support',
      'Training session',
    ],
    color: 'purple',
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    icon: Building2,
    tagline: 'Full white-glove service',
    price: 9997,
    popular: false,
    features: [
      'Everything in CRM + Setup',
      'Custom integrations',
      'Your branding throughout',
      '90-day priority support',
      '3 training sessions',
      'Dedicated engineer',
      'Ongoing consultation',
    ],
    color: 'gold',
  },
];

// CRM Add-ons
const crmAddons = [
  { name: 'Monthly Maintenance', price: '$149/mo' },
  { name: 'Priority Support', price: '$99/mo' },
  { name: 'Custom Integrations', price: '$150/hr' },
];

export function PricingTiers() {
  const [activeTab, setActiveTab] = useState<'subscription' | 'crm'>('subscription');

  return (
    <section id="pricing" className="py-16 md:py-32 relative">
      <div className="container mx-auto px-4 md:px-12">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-3xl md:text-6xl font-black tracking-tighter mb-4 md:mb-6 uppercase">
            Two Ways to Win.
          </h2>
          <p className="text-base md:text-xl text-muted-foreground/60 max-w-2xl mx-auto">
            Subscribe to our AI voice service or buy the CRM outright.
          </p>
        </div>

        {/* Tab Switcher */}
        <div className="flex justify-center mb-12 md:mb-16">
          <div className="inline-flex rounded-full bg-white/5 p-1">
            <button
              onClick={() => setActiveTab('subscription')}
              className={`px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wider transition-all ${
                activeTab === 'subscription'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              AI Voice Subscription
            </button>
            <button
              onClick={() => setActiveTab('crm')}
              className={`px-6 md:px-8 py-3 rounded-full text-sm md:text-base font-bold uppercase tracking-wider transition-all ${
                activeTab === 'crm'
                  ? 'bg-primary text-primary-foreground'
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              CRM Purchase
            </button>
          </div>
        </div>

        {/* Subscription Tiers */}
        {activeTab === 'subscription' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {subscriptionTiers.map((tier) => {
                const Icon = tier.icon;
                const colors: Record<string, string> = {
                  blue: 'from-blue-500 to-blue-600',
                  purple: 'from-purple-500 to-purple-600',
                  green: 'from-green-500 to-green-600',
                };

                return (
                  <div
                    key={tier.id}
                    className={`glass-chrome rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col glow-border relative group ${
                      tier.popular ? 'border-primary/30 ring-2 ring-primary/20' : ''
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap">
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
                        <span className="text-3xl font-black text-primary">${tier.monthly}</span>
                        <span className="text-sm opacity-40">/month</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">{tier.minutes} minutes included</p>
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

            {/* Usage Note */}
            <div className="mt-8 text-center text-sm text-muted-foreground">
              <p>Additional minutes: $0.15/min beyond your allocation</p>
            </div>
          </>
        )}

        {/* CRM Purchase Tiers */}
        {activeTab === 'crm' && (
          <>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-5xl mx-auto">
              {crmTiers.map((tier) => {
                const Icon = tier.icon;
                const colors: Record<string, string> = {
                  blue: 'from-blue-500 to-blue-600',
                  purple: 'from-purple-500 to-purple-600',
                  gold: 'from-amber-500 to-yellow-500',
                };

                return (
                  <div
                    key={tier.id}
                    className={`glass-chrome rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 flex flex-col glow-border relative group ${
                      tier.popular ? 'border-primary/30 ring-2 ring-primary/20' : ''
                    }`}
                  >
                    {tier.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-[9px] font-bold uppercase tracking-widest rounded-full whitespace-nowrap">
                        Best Value
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
                        <span className="text-3xl font-black">${tier.price.toLocaleString()}</span>
                        <span className="text-xs opacity-40">one-time</span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-2">Own it forever</p>
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
                        Buy Now
                      </Button>
                    </Link>
                  </div>
                );
              })}
            </div>

            {/* Add-ons */}
            <div className="mt-12 max-w-2xl mx-auto">
              <h4 className="text-center text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                Optional Add-ons
              </h4>
              <div className="flex flex-wrap justify-center gap-4">
                {crmAddons.map((addon) => (
                  <div key={addon.name} className="px-4 py-2 bg-white/5 rounded-full text-sm">
                    <span className="text-muted-foreground">{addon.name}:</span>{' '}
                    <span className="font-bold">{addon.price}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}

        {/* Comparison Table */}
        <div className="mt-16 md:mt-24">
          <h3 className="text-2xl md:text-3xl font-bold text-center mb-8 md:mb-12">
            How We Compare
          </h3>
          <div className="overflow-x-auto">
            <table className="w-full text-sm md:text-base">
              <thead>
                <tr className="border-b border-white/10">
                  <th className="text-left py-4 px-2 md:px-4 font-bold">Feature</th>
                  <th className="text-center py-4 px-2 md:px-4 font-bold text-primary">Apex Voice</th>
                  <th className="text-center py-4 px-2 md:px-4 font-bold opacity-60">GoHighLevel</th>
                  <th className="text-center py-4 px-2 md:px-4 font-bold opacity-60">Synthflow</th>
                  <th className="text-center py-4 px-2 md:px-4 font-bold opacity-60">Retell</th>
                </tr>
              </thead>
              <tbody className="text-muted-foreground">
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 md:px-4">Monthly Base</td>
                  <td className="py-3 px-2 md:px-4 text-center text-foreground font-bold">$99-$297</td>
                  <td className="py-3 px-2 md:px-4 text-center">$297-$497</td>
                  <td className="py-3 px-2 md:px-4 text-center">Usage only</td>
                  <td className="py-3 px-2 md:px-4 text-center">Usage only</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 md:px-4">Minutes Included</td>
                  <td className="py-3 px-2 md:px-4 text-center text-foreground font-bold">200-1,000</td>
                  <td className="py-3 px-2 md:px-4 text-center">0 (pay extra)</td>
                  <td className="py-3 px-2 md:px-4 text-center">0</td>
                  <td className="py-3 px-2 md:px-4 text-center">0</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 md:px-4">Setup Service</td>
                  <td className="py-3 px-2 md:px-4 text-center text-green-400">✓ We handle it</td>
                  <td className="py-3 px-2 md:px-4 text-center">DIY</td>
                  <td className="py-3 px-2 md:px-4 text-center">DIY</td>
                  <td className="py-3 px-2 md:px-4 text-center">DIY</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 md:px-4">White-Label</td>
                  <td className="py-3 px-2 md:px-4 text-center text-green-400">✓ $197/mo</td>
                  <td className="py-3 px-2 md:px-4 text-center">$497/mo</td>
                  <td className="py-3 px-2 md:px-4 text-center text-red-400">$2,000/mo</td>
                  <td className="py-3 px-2 md:px-4 text-center">Not available</td>
                </tr>
                <tr className="border-b border-white/5">
                  <td className="py-3 px-2 md:px-4">CRM Ownership</td>
                  <td className="py-3 px-2 md:px-4 text-center text-green-400">✓ Available</td>
                  <td className="py-3 px-2 md:px-4 text-center">Rent only</td>
                  <td className="py-3 px-2 md:px-4 text-center">N/A</td>
                  <td className="py-3 px-2 md:px-4 text-center">N/A</td>
                </tr>
                <tr>
                  <td className="py-3 px-2 md:px-4 font-bold">Annual Cost (Entry)</td>
                  <td className="py-3 px-2 md:px-4 text-center text-foreground font-bold text-green-400">$2,688</td>
                  <td className="py-3 px-2 md:px-4 text-center">$3,564+</td>
                  <td className="py-3 px-2 md:px-4 text-center">Variable</td>
                  <td className="py-3 px-2 md:px-4 text-center">Variable</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-12 p-6 md:p-8 bg-gradient-to-r from-primary/10 to-primary/5 rounded-2xl md:rounded-3xl text-center max-w-2xl mx-auto border border-primary/20">
          <p className="text-lg md:text-xl font-bold mb-2">
            Not sure which option fits?
          </p>
          <p className="text-muted-foreground mb-4">
            Book a 15-minute call. We'll figure it out together.
          </p>
          <Link href="#book">
            <Button className="h-12 px-8 bg-foreground text-background rounded-xl text-sm font-bold uppercase tracking-wider">
              Book a Call
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
