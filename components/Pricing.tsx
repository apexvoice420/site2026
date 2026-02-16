
import React from 'react';
import { PRICING_PLANS } from '../constants';
import { ChevronRight } from 'lucide-react';
import { AppView } from '../types';

const Pricing: React.FC<{ setView: (v: AppView) => void }> = ({ setView }) => {
    return (
        <div className="bg-white min-h-screen pt-24 pb-32">
            <div className="max-w-6xl mx-auto px-6">
                <div className="text-center space-y-4 mb-16">
                    <h2 className="text-4xl font-bold text-[#1E2A38]">Simple, Transparent Pricing</h2>
                    <p className="text-gray-500 text-xl">Pick the plan that fits your job volume.</p>
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
        </div>
    );
};

export default Pricing;
