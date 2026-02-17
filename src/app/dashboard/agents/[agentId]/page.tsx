import { getAgent, updateAgent } from "@/app/actions/agents";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Phone, Save, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function AgentDetailPage({ params }: { params: Promise<{ agentId: string }> }) {
    const { agentId } = await params;
    const agent = await getAgent(agentId);

    if (!agent) {
        notFound();
    }

    // Parse JSON config
    let config: any = {};
    try {
        if (agent.config) {
            config = JSON.parse(agent.config);
        }
    } catch (e) {
        console.error("Failed to parse agent config", e);
    }

    const prompt = config.prompt || "";

    return (
        <div className="space-y-6">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/agents">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <h2 className="text-3xl font-bold tracking-tight">{agent.name}</h2>
                <div className="ml-auto flex gap-2">
                    <Button variant="secondary">
                        <Phone className="mr-2 h-4 w-4" /> Test Call
                    </Button>
                </div>
            </div>

            <form action={updateAgent.bind(null, agent.id)}>
                <div className="grid gap-6 md:grid-cols-2">
                    <Card>
                        <CardHeader>
                            <CardTitle>Settings</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="name">Agent Name</Label>
                                <Input id="name" name="name" defaultValue={agent.name} />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="status">Status</Label>
                                <Select name="status" defaultValue={agent.status}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select status" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="DRAFT">Draft</SelectItem>
                                        <SelectItem value="ACTIVE">Active</SelectItem>
                                        <SelectItem value="PAUSED">Paused</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="vapiAgentId">Vapi Agent ID</Label>
                                <Input id="vapiAgentId" name="vapiAgentId" defaultValue={agent.vapiAgentId || ""} placeholder="vapi-..." />
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="phoneNumber">Phone Number</Label>
                                <Input 
                                    id="phoneNumber" 
                                    name="phoneNumber" 
                                    defaultValue={agent.phoneNumber || ""} 
                                    placeholder="+1-555-123-4567" 
                                />
                                <p className="text-xs text-muted-foreground">The VAPI number this agent answers for inbound routing</p>
                            </div>
                            <div className="space-y-2">
                                <Label htmlFor="voiceId">Voice</Label>
                                <Select name="voiceId" defaultValue={agent.voiceId || "rachel"}>
                                    <SelectTrigger>
                                        <SelectValue placeholder="Select voice" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="rachel">Rachel (Female, US)</SelectItem>
                                        <SelectItem value="josh">Josh (Male, US)</SelectItem>
                                        <SelectItem value="bella">Bella (Female, UK)</SelectItem>
                                        <SelectItem value="antoni">Antoni (Male, UK)</SelectItem>
                                        <SelectItem value="elli">Elli (Female, US)</SelectItem>
                                        <SelectItem value="domi">Domi (Male, US)</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <Button type="submit" className="w-full">
                                <Save className="mr-2 h-4 w-4" /> Save Changes
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle>Prompt & Behavior</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="prompt">System Prompt</Label>
                                <Textarea
                                    id="prompt"
                                    name="prompt"
                                    defaultValue={prompt}
                                    className="min-h-[250px] font-mono text-sm"
                                    placeholder="You are a helpful assistant..."
                                />
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </form>
        </div>
    );
}
