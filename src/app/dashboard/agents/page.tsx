"use client";

import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Plus, Loader2, Phone } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { useEffect, useState } from "react";

const API_BASE = "https://apex-voice-crm-production.up.railway.app";

interface Agent {
    id: string;
    name: string;
    status: string;
    model?: string;
    voice?: string;
    phoneNumber?: string;
}

export default function AgentsPage() {
    const [agents, setAgents] = useState<Agent[]>([]);
    const [loading, setLoading] = useState(true);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [formData, setFormData] = useState({ name: "", industry: "" });

    useEffect(() => {
        fetchAgents();
    }, []);

    async function fetchAgents() {
        try {
            const res = await fetch(`${API_BASE}/api/vapi/assistants`);
            const data = await res.json();
            setAgents(data.assistants || []);
        } catch (error) {
            console.error("Failed to fetch agents:", error);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">VAPI Agents</h2>
                <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> View in VAPI
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Agent</DialogTitle>
                            <DialogDescription>
                                Create agents directly in your VAPI dashboard at dashboard.vapi.ai
                            </DialogDescription>
                        </DialogHeader>
                        <div className="py-4">
                            <p className="text-sm text-muted-foreground">
                                Your VAPI agents are automatically synced here. To create a new agent:
                            </p>
                            <ol className="list-decimal list-inside text-sm text-muted-foreground mt-2 space-y-1">
                                <li>Go to dashboard.vapi.ai</li>
                                <li>Create a new assistant</li>
                                <li>Configure voice and model</li>
                                <li>Refresh this page</li>
                            </ol>
                        </div>
                        <DialogFooter>
                            <Button asChild>
                                <a href="https://dashboard.vapi.ai" target="_blank" rel="noopener noreferrer">
                                    Open VAPI Dashboard
                                </a>
                            </Button>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>
            </div>

            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
                </div>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {agents.map((agent) => (
                        <Card key={agent.id} className="hover:bg-muted/50 transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">
                                    {agent.name || "Unnamed Agent"}
                                </CardTitle>
                                <Badge variant="default">
                                    Active
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground mt-2">
                                    <Phone className="h-4 w-4" />
                                    <span>Voice Agent</span>
                                </div>
                                <div className="text-xs text-muted-foreground mt-2 font-mono">
                                    ID: {agent.id}
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                    {agents.length === 0 && (
                        <div className="col-span-3 text-center py-10 text-muted-foreground">
                            No VAPI agents found. Create one in your VAPI dashboard.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
