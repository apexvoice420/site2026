export const dynamic = 'force-dynamic';

import { getAgents, createAgent } from "@/app/actions/agents";
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
import { Plus } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";

export default async function AgentsPage() {
    const agents = await getAgents();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Agents</h2>
                <Dialog>
                    <DialogTrigger asChild>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Create Agent
                        </Button>
                    </DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Create New Agent</DialogTitle>
                            <DialogDescription>
                                Configure a new AI voice agent for your business.
                            </DialogDescription>
                        </DialogHeader>
                        <form action={createAgent}>
                            <div className="grid gap-4 py-4">
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="name" className="text-right">
                                        Name
                                    </Label>
                                    <Input
                                        id="name"
                                        name="name"
                                        placeholder="e.g. Sales Rep"
                                        className="col-span-3"
                                    />
                                </div>
                                <div className="grid grid-cols-4 items-center gap-4">
                                    <Label htmlFor="industry" className="text-right">
                                        Industry
                                    </Label>
                                    <Input
                                        id="industry"
                                        name="industry"
                                        placeholder="e.g. Real Estate"
                                        className="col-span-3"
                                    />
                                </div>
                            </div>
                            <DialogFooter>
                                <Button type="submit">Create Agent</Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {agents.map((agent) => (
                    <Link key={agent.id} href={`/dashboard/agents/${agent.id}`}>
                        <Card className="hover:bg-muted/50 cursor-pointer transition-colors">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">
                                    {agent.name}
                                </CardTitle>
                                <Badge variant={agent.status === "ACTIVE" ? "default" : "secondary"}>
                                    {agent.status}
                                </Badge>
                            </CardHeader>
                            <CardContent>
                                <div className="text-sm text-muted-foreground mt-2">
                                    ID: {agent.vapiAgentId || "Not Configured"}
                                </div>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
                {agents.length === 0 && (
                    <div className="col-span-3 text-center py-10 text-muted-foreground">
                        No agents found. Create one to get started.
                    </div>
                )}
            </div>
        </div>
    );
}
