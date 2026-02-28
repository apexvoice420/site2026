"use client";

import { useState } from "react";
import { Calculator, TrendingDown, DollarSign, PhoneOff, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export function MissedCallsCalculator() {
  const [missedCallsPerWeek, setMissedCallsPerWeek] = useState(5);
  const [avgJobValue, setAvgJobValue] = useState(500);

  const missedCallsPerMonth = missedCallsPerWeek * 4.3;
  const missedCallsPerYear = missedCallsPerWeek * 52;
  const lostRevenuePerMonth = missedCallsPerMonth * avgJobValue * 0.3; // 30% conversion
  const lostRevenuePerYear = missedCallsPerYear * avgJobValue * 0.3;

  return (
    <section className="py-16 md:py-32 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-red-500/5 to-transparent pointer-events-none"></div>
      
      <div className="container mx-auto px-4 md:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12 md:mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 text-red-400 text-xs font-bold uppercase tracking-widest mb-6">
              <TrendingDown className="h-4 w-4" />
              Revenue Loss Calculator
            </div>
            <h2 className="text-3xl md:text-5xl font-bold mb-4">
              How Much Are Missed Calls Costing You?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Every unanswered call is a customer going to your competition. Calculate your true loss.
            </p>
          </div>

          {/* Calculator */}
          <div className="glass-chrome rounded-[2rem] md:rounded-[3rem] p-8 md:p-12 glow-border">
            <div className="grid md:grid-cols-2 gap-8 md:gap-12">
              {/* Inputs */}
              <div className="space-y-8">
                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    <PhoneOff className="inline mr-2 h-4 w-4" />
                    Missed Calls Per Week
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="50"
                    value={missedCallsPerWeek}
                    onChange={(e) => setMissedCallsPerWeek(parseInt(e.target.value))}
                    className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-red-500"
                  />
                  <div className="flex justify-between text-sm mt-2 text-muted-foreground">
                    <span>1</span>
                    <span className="text-2xl font-bold text-foreground">{missedCallsPerWeek}</span>
                    <span>50</span>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-bold uppercase tracking-widest text-muted-foreground mb-4">
                    <DollarSign className="inline mr-2 h-4 w-4" />
                    Average Job Value ($)
                  </label>
                  <input
                    type="range"
                    min="100"
                    max="5000"
                    step="100"
                    value={avgJobValue}
                    onChange={(e) => setAvgJobValue(parseInt(e.target.value))}
                    className="w-full h-3 bg-white/10 rounded-full appearance-none cursor-pointer accent-green-500"
                  />
                  <div className="flex justify-between text-sm mt-2 text-muted-foreground">
                    <span>$100</span>
                    <span className="text-2xl font-bold text-foreground">${avgJobValue.toLocaleString()}</span>
                    <span>$5,000</span>
                  </div>
                </div>
              </div>

              {/* Results */}
              <div className="bg-red-500/10 rounded-2xl md:rounded-3xl p-6 md:p-8">
                <h3 className="text-sm font-bold uppercase tracking-widest text-red-400 mb-6">
                  Your Annual Loss
                </h3>
                
                <div className="text-center mb-8">
                  <div className="text-5xl md:text-6xl font-black text-red-500">
                    ${lostRevenuePerYear.toLocaleString()}
                  </div>
                  <p className="text-muted-foreground text-sm mt-2">
                    Based on 30% call-to-sale conversion
                  </p>
                </div>

                <div className="space-y-4 text-sm">
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-muted-foreground">Missed calls/year</span>
                    <span className="font-bold">{missedCallsPerYear}</span>
                  </div>
                  <div className="flex justify-between py-3 border-b border-white/10">
                    <span className="text-muted-foreground">Lost opportunities</span>
                    <span className="font-bold">{Math.round(missedCallsPerYear * 0.3)}</span>
                  </div>
                  <div className="flex justify-between py-3">
                    <span className="text-muted-foreground">Monthly loss</span>
                    <span className="font-bold text-red-400">${Math.round(lostRevenuePerMonth).toLocaleString()}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* CTA */}
            <div className="mt-8 md:mt-12 pt-8 border-t border-white/10 text-center">
              <p className="text-lg mb-6">
                <span className="text-muted-foreground">Our AI receptionist costs </span>
                <span className="text-green-400 font-bold">as low as $150/month</span>
                <span className="text-muted-foreground"> — a fraction of what you're losing.</span>
              </p>
              <Link href="#pricing">
                <Button className="h-14 px-8 bg-foreground text-background rounded-2xl text-sm font-bold uppercase tracking-wider">
                  Stop Losing Money <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
