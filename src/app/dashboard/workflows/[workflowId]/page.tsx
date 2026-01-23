export const dynamic = 'force-dynamic';

import { WorkflowEditor } from "@/components/workflow/WorkflowEditor";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import db from "@/lib/db";

async function getWorkflow(id: string) {
    return await db.workflow.findUnique({ where: { id } });
}

export default async function WorkflowPage({ params }: { params: Promise<{ workflowId: string }> }) {
    const { workflowId } = await params;
    const workflow = await getWorkflow(workflowId);

    const title = workflow?.name || "New Workflow";

    let nodes = [];
    let edges = [];

    try {
        if (workflow?.nodes) nodes = JSON.parse(workflow.nodes);
        if (workflow?.edges) edges = JSON.parse(workflow.edges);
    } catch (e) {
        console.error("Failed to parse workflow data", e);
    }

    const initialData = workflow ? { nodes, edges } : undefined;

    return (
        <div className="space-y-4">
            <div className="flex items-center gap-4">
                <Link href="/dashboard/workflows">
                    <Button variant="outline" size="icon">
                        <ArrowLeft className="h-4 w-4" />
                    </Button>
                </Link>
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
                    <p className="text-sm text-muted-foreground">{workflow?.trigger || "No trigger set"}</p>
                </div>
            </div>

            <WorkflowEditor workflowId={workflowId} initialData={initialData} />
        </div>
    );
}
