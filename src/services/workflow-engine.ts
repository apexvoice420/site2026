import db from "@/lib/db";
import { Lead, CallLog, Agent } from "@prisma/client";

interface WorkflowContext {
    lead: Lead;
    callLog?: CallLog;
    agent?: Agent;
}

export async function triggerWorkflow(triggerEvent: string, context: WorkflowContext) {
    const { lead, callLog, agent } = context;

    console.log(`WorkflowEngine: Checking triggers${context.agent?.id ? ` for Agent ${context.agent.id}` : ''} on event ${triggerEvent}`);

    // 1. Find active workflows for this trigger
    const workflows = await db.workflow.findMany({
        where: {
            trigger: triggerEvent, // e.g., "CALL_COMPLETED", "LEAD_CREATED"
            isActive: true,
            ...(context.agent?.id ? { agentId: context.agent.id } : {})
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

    let nodes: any[] = [];
    let edges: any[] = [];
    try {
        nodes = JSON.parse(workflow.nodes);
        edges = JSON.parse(workflow.edges);
    } catch (e) {
        console.error("WorkflowEngine: Failed to parse workflow structure", e);
        return;
    }

    // 1. Find the trigger node
    const triggerNode = nodes.find(n => n.type === 'trigger');
    if (!triggerNode) {
        console.error("WorkflowEngine: No trigger node found");
        return;
    }

    // 2. Start traversal from the trigger node
    let currentNode = triggerNode;

    // Simplistic linear traversal for now
    while (currentNode) {
        const nextEdge = edges.find(e => e.source === currentNode.id);
        if (!nextEdge) break;

        const nextNode = nodes.find(n => n.id === nextEdge.target);
        if (!nextNode) break;

        await runNode(nextNode, context);
        currentNode = nextNode;
    }
}

async function runNode(node: any, context: WorkflowContext) {
    const type = node.type;
    const data = node.data || {};

    console.log(`WorkflowEngine: -- Running Node ${node.id} Type: ${type}`);

    switch (type) {
        case 'action':
            if (data.actionType === 'UPDATE_LEAD_TAG') {
                await updateLeadTag(context.lead.id, data.tag || "processed");
            }
            break;
        case 'email':
            console.log(`WorkflowEngine: [MOCK] Sending email to ${context.lead.email}`);
            console.log(`Subject: ${data.subject || 'Follow up'}`);
            // Integrate with a real email service here (e.g., Resend, SendGrid)
            break;
        case 'wait':
            console.log(`WorkflowEngine: [MOCK] Waiting for ${data.duration || '1 day'}`);
            // In a real system, this would schedule a background job (e.g., BullMQ)
            break;
        default:
            console.log(`WorkflowEngine: Node type ${type} not yet implemented`);
    }
}

async function updateLeadTag(leadId: string, tag: string) {
    console.log(`WorkflowEngine: Action -> Adding tag "${tag}" to lead ${leadId}`);
    try {
        const lead = await db.lead.findUnique({ where: { id: leadId } });
        const existingTags = lead?.tags ? lead.tags.split(',') : [];
        if (!existingTags.includes(tag)) {
            existingTags.push(tag);
        }
        await db.lead.update({
            where: { id: leadId },
            data: { tags: existingTags.join(',') }
        });
    } catch (error) {
        console.error("WorkflowEngine: Failed to update lead tag", error);
    }
}
