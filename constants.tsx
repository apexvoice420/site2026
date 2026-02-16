
import React from 'react';
import { Shield, Zap, PhoneCall, Calendar, MessageSquare, BarChart3 } from 'lucide-react';

export const COLORS = {
  NAVY: '#1E2A38',
  ELECTRIC_BLUE: '#1479FF',
  SLATE_GRAY: '#5C6773',
  SIGNAL_ORANGE: '#FF7A00',
};

export const FEATURES = [
  {
    icon: <PhoneCall className="w-6 h-6 text-[#1479FF]" />,
    title: "24/7 AI Receptionist",
    description: "Never miss a job again. Our AI answers in 1 second, day or night."
  },
  {
    icon: <Calendar className="w-6 h-6 text-[#1479FF]" />,
    title: "Automatic Booking",
    description: "AI qualifies customers and books appointments directly into your calendar."
  },
  {
    icon: <Shield className="w-6 h-6 text-[#1479FF]" />,
    title: "Emergency Escalation",
    description: "Instantly routes burst pipes or roof leaks to your phone via SMS."
  },
  {
    icon: <MessageSquare className="w-6 h-6 text-[#1479FF]" />,
    title: "Instant SMS Summaries",
    description: "Receive a full summary of every call via text as soon as the AI hangs up."
  }
];

export const PRICING_PLANS = [
  {
    name: "Starter",
    price: "$199",
    minutes: "500",
    features: ["24/7 AI Receptionist", "Basic Appointment Booking", "SMS Call Summaries", "1 Dedicated Phone Number"]
  },
  {
    name: "Business",
    price: "$499",
    minutes: "2,500",
    popular: true,
    features: ["Advanced Logic & Qualifying", "Full CRM Integration", "Emergency Escalation", "Custom Brand Voice"]
  },
  {
    name: "Enterprise",
    price: "$999",
    minutes: "Unlimited",
    features: ["Multi-agent Workflows", "Outbound Follow-ups", "Priority 24/7 Support", "Dedicated Account Manager"]
  }
];
