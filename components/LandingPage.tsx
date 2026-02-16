
import React from 'react';
import { FEATURES, PRICING_PLANS } from '../constants';
import { AppView } from '../types';
import { ChevronRight, Star } from 'lucide-react';

const LandingPage: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-[#1E2A38] text-white pt-24 pb-32 px-6 overflow-hidden">
        <div className="absolute top-0 right-0 -mt-20 -mr-20 w-96 h-96 bg-[#1479FF] rounded-full blur-[120px] opacity-20"></div>
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8 relative z-10">
            <div className="inline-flex items-center gap-2 bg-white/10 px-4 py-1.5 rounded-full border border-white/10">
              <span className="flex h-2 w-2 rounded-full bg-orange-500 animate-pulse"></span>
              <span className="text-sm font-semibold tracking-wide uppercase">2025 AI Voice Tech</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
              Stop leaving money on the <span className="text-[#1479FF]">pavement</span>. We answer the calls you can’t.
            </h1>
            <p className="text-xl text-gray-300 max-w-lg">
              Stop playing phone tag from the job site. Our AI greets every caller instantly, vets the job, and puts it on your schedule before you’ve even climbed down the ladder.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                onClick={() => setView(AppView.DEMO)}
                className="bg-[#1479FF] px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-2 shadow-xl shadow-blue-900/40"
              >
                Launch Free Demo <ChevronRight size={20} />
              </button>
              <a
                href="tel:+13863199076"
                className="inline-flex flex-col items-center gap-2 px-10 py-5 bg-gradient-to-br from-[#6366f1] to-[#8b5cf6] text-white no-underline rounded-2xl font-bold shadow-xl shadow-indigo-500/30 hover:scale-105 transition-all text-center"
              >
                <span className="text-2xl">📞</span>
                <span className="text-sm">Call for Live Demo</span>
                <span className="text-[10px] opacity-90">+1 (386) 319-9076</span>
              </a>
              <button
                onClick={() => setView(AppView.PRICING)}
                className="border border-white/20 bg-white/5 backdrop-blur-sm px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/10 transition-all"
              >
                View Pricing
              </button>
            </div>
          </div>
          <div className="hidden md:block relative">
            <div className="bg-gradient-to-br from-gray-800 to-[#1E2A38] border border-white/10 rounded-3xl p-8 shadow-2xl relative">
              <div className="absolute -top-4 -left-4 bg-orange-500 p-4 rounded-2xl shadow-lg">
                <Star className="text-white w-6 h-6" fill="currentColor" />
              </div>
              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-gray-600 overflow-hidden relative">
                    <img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80" alt="Avatar" className="object-cover w-full h-full" />
                  </div>
                  <div>
                    <div className="text-white font-bold text-sm">Mike T. (Homeowner)</div>
                    <div className="text-gray-400 text-xs">2 mins ago</div>
                  </div>
                </div>
                <div className="bg-white/5 p-4 rounded-xl border border-white/5">
                  <p className="text-gray-300 text-sm leading-relaxed">
                    "I need a quote for a roof repair. I have a leak in the living room. Can you come out tomorrow?"
                  </p>
                </div>
                <div className="pt-4 border-t border-white/5 flex justify-between items-center">
                  <div className="bg-[#1479FF]/20 px-3 py-1 rounded-lg text-xs text-[#1479FF] font-bold border border-[#1479FF]/30">
                    APPOINTMENT BOOKED
                  </div>
                  <div className="text-gray-500 text-xs font-mono">
                    Tue, Oct 24 • 9:00 AM
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-white py-12 border-b">
        <div className="max-w-6xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8">
          {[
            { label: 'Missed Calls Saved', val: '94%' },
            { label: 'Booking Increase', val: '40%+' },
            { label: 'Average ROI', val: '12x' },
            { label: 'Setup Time', val: '24h' }
          ].map((stat, i) => (
            <div key={i} className="text-center">
              <div className="text-3xl font-extrabold text-[#1E2A38]">{stat.val}</div>
              <div className="text-sm text-gray-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Features Section */}
      <section className="py-24 bg-gray-50 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-20">
            <h2 className="text-4xl font-bold text-[#1E2A38]">Built for the Trades</h2>
            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              We don't do general AI. We do high-performance receptionists for roofers and plumbers who can't afford to miss a lead.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {FEATURES.map((f, i) => (
              <div key={i} className="bg-white p-8 rounded-2xl border hover:border-[#1479FF] transition-all hover:shadow-xl hover:-translate-y-1">
                <div className="bg-blue-50 w-12 h-12 rounded-xl flex items-center justify-center mb-6">
                  {f.icon}
                </div>
                <h3 className="font-bold text-xl mb-3 text-[#1E2A38]">{f.title}</h3>
                <p className="text-gray-600 leading-relaxed">{f.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-24 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold">Simple, Transparent Pricing</h2>
            <p className="text-gray-500">Pick the plan that fits your job volume.</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan, i) => (
              <div key={i} className={`p-8 rounded-3xl border relative flex flex-col ${plan.popular ? 'border-[#1479FF] shadow-2xl shadow-blue-500/10 scale-105' : 'border-gray-100'}`}>
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#1479FF] text-white px-4 py-1 rounded-full text-xs font-bold uppercase tracking-wider">
                    Most Popular
                  </div>
                )}
                <div className="mb-8">
                  <h3 className="text-xl font-bold text-[#1E2A38] mb-2">{plan.name}</h3>
                  <div className="flex items-baseline gap-1">
                    <span className="text-4xl font-extrabold">{plan.price}</span>
                    <span className="text-gray-500">/mo</span>
                  </div>
                  <p className="text-sm text-[#1479FF] font-semibold mt-2">{plan.minutes} Call Minutes Incl.</p>
                </div>
                <div className="space-y-4 mb-10 flex-grow">
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-center gap-3 text-gray-600">
                      <ChevronRight size={16} className="text-green-500" />
                      <span className="text-sm font-medium">{feat}</span>
                    </div>
                  ))}
                </div>
                <button
                  onClick={() => setView(AppView.LOGIN)}
                  className={`w-full py-4 rounded-xl font-bold transition-all ${plan.popular ? 'bg-[#1479FF] text-white hover:bg-blue-600' : 'bg-gray-100 text-[#1E2A38] hover:bg-gray-200'}`}
                >
                  Choose {plan.name}
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#1E2A38] text-white py-16 px-6">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <img src="/assets/logo.png" alt="Apex Voice Solutions" className="h-10 w-auto" />
            </div>
            <p className="text-gray-400 max-w-xs text-sm">
              Helping American contractors grow faster through advanced AI voice automation. Never miss a job again.
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8">
            <div className="space-y-4">
              <h4 className="font-bold">Product</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Features</li>
                <li>Pricing</li>
                <li>Live Demo</li>
                <li>Integrations</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Support</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Help Center</li>
                <li>API Docs</li>
                <li>Contact</li>
              </ul>
            </div>
            <div className="space-y-4">
              <h4 className="font-bold">Legal</h4>
              <ul className="text-sm text-gray-400 space-y-2">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>GDPR</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="max-w-6xl mx-auto pt-12 mt-12 border-t border-white/5 text-center text-gray-500 text-xs">
          © 2025 Apex Voice Solutions. All rights reserved.
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
