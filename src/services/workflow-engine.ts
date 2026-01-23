import db from "@/lib/db";
import { Lead, CallLog, Agent } from "@prisma/client";

interface WorkflowContext {
    lead: Lead;
    callLog: CallLog;
    agent: Agent;
}

export async function triggerWorkflow(triggerEvent: string, context: WorkflowContext) {
    const { lead, callLog, agent } = context;

    console.log(`WorkflowEngine: Checking triggers for Agent ${agent.id} on event ${triggerEvent}`);

    // 1. Find active workflows for this agent with this trigger
    const workflows = await db.workflow.findMany({
        where: {
            agentId: agent.id,
            trigger: triggerEvent, // e.g., "CALL_COMPLETED"
            isActive: true
        }
    });

    if (workflows.length === 0) {
        console.log("WorkflowEngine: No active workflows found.");
        return;
    }

    console.log(`WorkflowEngine: Found ${workflows.length} workflows to execute.`);

    // 2. Execute each workflow
    for (const workflow of workflows) {
        await executeWorkflow(workflow, context);
    }
}

async function executeWorkflow(workflow: any, context: WorkflowContext) {
    console.log(`WorkflowEngine: Executing workflow "${workflow.name}" (${workflow.id})`);

    // Parse Nodes & Edges
    let nodes: any[] = [];
    try {
        nodes = JSON.parse(workflow.nodes);
    } catch (e) {
        console.error("WorkflowEngine: Failed to parse nodes", e);
        return;
    }

    // Simplistic Execution: Find "Action" nodes and execute them
    // In a real engine, we would traverse edges. 
    // For now, we just look for specific action types in the node list.

    for (const node of nodes) {
        if (node.type === 'actionNode') {
            const actionType = node.data?.actionType; // e.g. "UPDATE_LEAD", "NOTIFY_USER"

            console.log(`WorkflowEngine: -- Running Node ${node.id} Type: ${actionType}`);

            if (actionType === 'UPDATE_LEAD_TAG') {
                await updateLeadTag(context.lead.id, "processed-by-workflow");
            }
            // Add more actions here
        }
    }
}

async function updateLeadTag(leadId: string, tag: string) {
    console.log(`WorkflowEngine: Action -> Adding tag "${tag}" to lead ${leadId}`);
    // Ideally append to existing tags
    await db.lead.update({
        where: { id: leadId },
        data: { tags: tag } // Overwrite for simple demo
    });
}
