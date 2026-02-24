"use server";

import { revalidatePath } from "next/cache";

// Workflows are stored in memory for now
// TODO: Add workflows table to Railway backend

const mockWorkflows: any[] = [];

export async function getWorkflows() {
    return mockWorkflows;
}

export async function getWorkflow(id: string) {
    return mockWorkflows.find(w => w.id === id) || null;
}

export async function saveWorkflow(id: string, data: any) {
    const nodes = JSON.stringify(data.nodes);
    const edges = JSON.stringify(data.edges);

    if (id === 'new') {
        const newWorkflow = {
            id: `workflow_${Date.now()}`,
            name: "New Workflow",
            trigger: "INCOMING_CALL",
            nodes,
            edges,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
        };
        mockWorkflows.push(newWorkflow);
        revalidatePath("/dashboard/workflows");
        return { success: true, id: newWorkflow.id };
    } else {
        const workflow = mockWorkflows.find(w => w.id === id);
        if (workflow) {
            workflow.nodes = nodes;
            workflow.edges = edges;
            workflow.updatedAt = new Date().toISOString();
        }
    }

    revalidatePath("/dashboard/workflows");
    revalidatePath(`/dashboard/workflows/${id}`);
    return { success: true, id };
}
