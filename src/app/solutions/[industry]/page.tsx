import { INDUSTRIES } from "@/lib/industries";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { MessageSquare, Phone, ShieldCheck, Zap } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LaunchAgentButton } from "@/components/industry/LaunchAgentButton";

export async function generateStaticParams() {
    return Object.keys(INDUSTRIES).map((slug) => ({
        industry: slug,
    }));
}

export default async function IndustryPage({ params }: { params: Promise<{ industry: string }> }) {
    const { industry } = await params;
    const config = INDUSTRIES[industry];

    if (!config) {
        return notFound();
    }

    return (
        <div className="min-h-screen bg-background text-foreground">
            {/* Hero Section */}
            <header className="border-b bg-card">
                <div className="container mx-auto px-4 py-16 text-center">
                    <div className="mb-4 inline-flex items-center rounded-full border px-3 py-1 text-sm text-muted-foreground">
                        <span className="mr-2 h-2 w-2 rounded-full bg-green-500"></span>
                        Apex for {config.title}
                    </div>
                    <h1 className="mb-6 text-4xl font-extrabold tracking-tight sm:text-6xl">
                        {config.hero.title}
                    </h1>
                    <p className="mx-auto mb-10 max-w-2xl text-lg text-muted-foreground">
                        {config.hero.subtitle}
                    </p>
                    <div className="flex justify-center gap-4">
                        <LaunchAgentButton slug={config.slug} />
                        <Button variant="outline" size="lg" className="h-12 px-8">
                            <Phone className="mr-2 h-5 w-5" /> Hear a Demo
                        </Button>
                    </div>
                </div>
            </header>

            {/* Pain Points */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="mb-12 text-center text-3xl font-bold">Why {config.title} Choose Apex</h2>
                <div className="grid gap-8 md:grid-cols-3">
                    {config.painPoints.map((point, i) => (
                        <Card key={i}>
                            <CardHeader>
                                <CardTitle className="flex items-center gap-2">
                                    <ShieldCheck className="h-5 w-5 text-primary" />
                                    {point.title}
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <p className="text-muted-foreground">{point.description}</p>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </section>

            {/* Agent Logic Preview */}
            <section className="bg-muted/50 py-16">
                <div className="container mx-auto px-4">
                    <div className="grid gap-12 md:grid-cols-2 lg:items-center">
                        <div>
                            <h2 className="mb-6 text-3xl font-bold">Smart Intake Logic</h2>
                            <p className="mb-6 text-lg text-muted-foreground">
                                Your AI agent is pre-trained on thousands of {config.title} calls.
                                It knows exactly what to ask to qualify leads and filter out spam.
                            </p>
                            <ul className="space-y-4">
                                <li className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                                        <MessageSquare className="h-5 w-5" />
                                    </div>
                                    <span>Starts with: "{config.agentConfig.firstMessage}"</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                                        <ShieldCheck className="h-5 w-5" />
                                    </div>
                                    <span>Filters unqualified leads instantly</span>
                                </li>
                                <li className="flex items-center gap-3">
                                    <div className="rounded-full bg-primary/10 p-2 text-primary">
                                        <Zap className="h-5 w-5" />
                                    </div>
                                    <span>Syncs directly to CRM</span>
                                </li>
                            </ul>
                        </div>
                        <div className="rounded-lg border bg-card p-6 shadow-sm">
                            <pre className="whitespace-pre-wrap text-sm font-mono text-muted-foreground">
                                {config.agentConfig.prompt.substring(0, 500)}...
                            </pre>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <section className="container mx-auto px-4 py-16">
                <h2 className="mb-12 text-center text-3xl font-bold">Frequently Asked Questions</h2>
                <Accordion type="single" collapsible className="mx-auto max-w-2xl">
                    {config.faq.map((item, i) => (
                        <AccordionItem key={i} value={`item-${i}`}>
                            <AccordionTrigger>{item.question}</AccordionTrigger>
                            <AccordionContent>{item.answer}</AccordionContent>
                        </AccordionItem>
                    ))}
                </Accordion>
            </section>

            {/* Footer */}
            <footer className="border-t py-12 text-center text-muted-foreground">
                <p>&copy; 2024 Apex Voice Solutions. Built for {config.title}.</p>
            </footer>
        </div>
    );
}
