"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Bot, Zap, Database, Phone, CheckCircle2, ArrowRight, ArrowLeft } from "lucide-react";
import Link from "next/link";

const steps = [
    {
        id: "vapi",
        title: "Connect Vapi",
        description: "Link your Vapi account to power your voice agents.",
        icon: Phone,
    },
    {
        id: "agent",
        title: "Create Agent",
        description: "Configure your first AI receptionist's personality.",
        icon: Bot,
    },
    {
        id: "crm",
        title: "Connect CRM",
        description: "Sync your leads directly to your preferred software.",
        icon: Database,
    },
    {
        id: "automation",
        title: "Set up Automation",
        description: "Trigger workflows via n8n or Zapier.",
        icon: Zap,
    }
];

export default function OnboardingPage() {
    const [currentStep, setCurrentStep] = useState(0);

    const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
    const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 0));

    return (
        <div className="max-w-4xl mx-auto py-10 px-6">
            <div className="mb-12 text-center">
                <h1 className="text-4xl font-bold mb-4 tracking-tight">System Activation</h1>
                <p className="text-muted-foreground text-lg">Complete these 4 steps to launch your AI Voice Back Office.</p>
            </div>

            {/* Progress Bar */}
            <div className="flex items-center justify-between mb-12 relative">
                <div className="absolute top-1/2 left-0 w-full h-0.5 bg-muted -translate-y-1/2 -z-10"></div>
                <div
                    className="absolute top-1/2 left-0 h-0.5 bg-primary -translate-y-1/2 -z-10 transition-all duration-500"
                    style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
                ></div>
                {steps.map((step, i) => (
                    <div key={step.id} className="flex flex-col items-center">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${i <= currentStep ? "bg-primary border-primary text-white" : "bg-background border-muted text-muted-foreground"}`}>
                            {i < currentStep ? <CheckCircle2 className="h-6 w-6" /> : <span>{i + 1}</span>}
                        </div>
                        <span className={`mt-2 text-xs font-medium ${i <= currentStep ? "text-primary" : "text-muted-foreground"}`}>{step.title}</span>
                    </div>
                ))}
            </div>

            <Card className="border-2 shadow-xl shadow-primary/5 rounded-[2rem] overflow-hidden">
                <CardHeader className="bg-muted/30 pb-8 pt-10 px-10">
                    <div className="flex items-center gap-4 mb-2">
                        <div className="p-3 bg-primary/10 rounded-2xl">
                            {(() => {
                                const Icon = steps[currentStep].icon;
                                return <Icon className="h-8 w-8 text-primary" />;
                            })()}
                        </div>
                        <div>
                            <CardTitle className="text-2xl">{steps[currentStep].title}</CardTitle>
                            <CardDescription className="text-base">{steps[currentStep].description}</CardDescription>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-10">
                    {currentStep === 0 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-2">
                                <Label htmlFor="vapi-key">Vapi API Private Key</Label>
                                <Input id="vapi-key" placeholder="sk-..." type="password" className="h-12 text-lg rounded-xl" />
                                <p className="text-sm text-muted-foreground">You can find this in your Vapi Dashboard settings.</p>
                            </div>
                            <div className="p-4 bg-blue-500/5 rounded-2xl border border-blue-500/10 flex items-start gap-4">
                                <Zap className="h-5 w-5 text-blue-500 mt-0.5" />
                                <p className="text-sm text-blue-700 leading-relaxed">
                                    Connecting your Vapi key allows us to create and manage voice agents on your behalf.
                                </p>
                            </div>
                        </div>
                    )}

                    {currentStep === 1 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="grid gap-4 sm:grid-cols-2">
                                {[
                                    { name: "Roofing Specialist", icon: Phone },
                                    { name: "Dental Assistant", icon: Phone },
                                    { name: "Legal Intake", icon: Phone },
                                    { name: "General Reception", icon: Phone }
                                ].map((agent) => (
                                    <div key={agent.name} className="p-4 border rounded-2xl hover:border-primary hover:bg-primary/5 cursor-pointer transition-all flex items-center gap-4 group">
                                        <div className="p-2 bg-muted rounded-xl group-hover:bg-primary/10 group-hover:text-primary">
                                            <agent.icon className="h-6 w-6" />
                                        </div>
                                        <span className="font-semibold">{agent.name}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 2 && (
                        <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                            <div className="space-y-4">
                                {[
                                    "Google Sheets (Template)",
                                    "GoHighLevel (Lead Connector)",
                                    "HubSpot",
                                    "Custom Webhook"
                                ].map((crm) => (
                                    <div key={crm} className="flex items-center justify-between p-4 border rounded-2xl hover:border-primary transition-all">
                                        <span className="font-medium">{crm}</span>
                                        <Button variant="outline" size="sm" className="rounded-lg">Connect</Button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {currentStep === 3 && (
                        <div className="space-y-8 animate-in fade-in slide-in-from-right-4 duration-500 text-center py-4">
                            <div className="w-20 h-20 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                                <CheckCircle2 className="h-10 w-10 text-green-500" />
                            </div>
                            <div>
                                <h3 className="text-2xl font-bold mb-2">You're ready to launch!</h3>
                                <p className="text-muted-foreground">Your AI voice agent is configured and ready to handle calls.</p>
                            </div>
                            <div className="flex flex-col gap-3">
                                <Button className="h-14 rounded-2xl text-lg font-bold">
                                    Deploy My Agent
                                </Button>
                                <Link href="/dashboard">
                                    <Button variant="ghost">Go to Dashboard</Button>
                                </Link>
                            </div>
                        </div>
                    )}

                    <div className="mt-12 flex justify-between">
                        <Button
                            variant="outline"
                            onClick={prevStep}
                            disabled={currentStep === 0}
                            className="h-12 px-6 rounded-xl border-2"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" /> Previous
                        </Button>
                        {currentStep < steps.length - 1 ? (
                            <Button onClick={nextStep} className="h-12 px-8 rounded-xl font-bold">
                                Next Step <ArrowRight className="ml-2 h-4 w-4" />
                            </Button>
                        ) : null}
                    </div>
                </CardContent>
            </Card>

            <p className="mt-8 text-center text-sm text-muted-foreground">
                Need help? <Link href="#" className="text-primary font-medium hover:underline">Contact our technical support</Link>
            </p>
        </div>
    );
}
