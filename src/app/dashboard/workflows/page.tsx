export const dynamic = 'force-dynamic';

import Link from "next/link";
import { Button } from "@/components/ui/button";
import db from "@/lib/db";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Plus, Workflow } from "lucide-react";

async function getWorkflows() {
    return await db.workflow.findMany({ orderBy: { updatedAt: 'desc' } });
}

export default async function WorkflowsLayoutPage() {
    const workflows = await getWorkflows();

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <h2 className="text-3xl font-bold tracking-tight">Workflows</h2>
                <Link href="/dashboard/workflows/new">
                    <Button>
                        <Plus className="mr-2 h-4 w-4" /> Create Workflow
                    </Button>
                </Link>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {workflows.map((wf) => (
                    <Link key={wf.id} href={`/dashboard/workflows/${wf.id}`}>
                        <Card className="hover:bg-muted/50 transition-colors cursor-pointer">
                            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                                <CardTitle className="text-base font-medium">{wf.name}</CardTitle>
                                <Workflow className="h-4 w-4 text-muted-foreground" />
                            </CardHeader>
                            <CardContent>
                                <CardDescription className="mt-2">
                                    Trigger: {wf.trigger}
                                </CardDescription>
                            </CardContent>
                        </Card>
                    </Link>
                ))}
                {workflows.length === 0 && (
                    <div className="col-span-3 text-center py-10 text-muted-foreground">
                        No workflows found.
                    </div>
                )}
            </div>
        </div>
    );
}
