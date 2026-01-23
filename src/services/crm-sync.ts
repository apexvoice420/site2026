import db from "@/lib/db";
import { VapiPayload } from "@/lib/vapi";

export async function syncVapiData(payload: VapiPayload) {
    const { message, agent: vapiAgentInfo } = payload;

    // 1. Identify Tenancy & Agent
    // Ideally, we pass tenantId in metadata, or we look up Agent by vapiAgentId
    if (!vapiAgentInfo?.id) {
        console.warn("Sync: No Vapi Agent ID provided.");
        return null;
    }

    const agent = await db.agent.findFirst({
        where: { vapiAgentId: vapiAgentInfo.id },
        include: { tenant: true }
    });

    if (!agent) {
        console.warn(`Sync: Agent not found for Vapi ID ${vapiAgentInfo.id}`);
        return null;
    }

    const tenantId = agent.tenantId;

    // 2. Extract Lead Data
    const customerPhone = message.customer?.number || "Unknown";
    const customerName = message.customer?.name || "Unknown Lead";

    // Find or Create Lead
    let lead = await db.lead.findFirst({
        where: {
            phone: customerPhone,
            tenantId: tenantId
        }
    });

    if (!lead) {
        console.log(`Sync: Creating new lead for ${customerPhone}`);
        lead = await db.lead.create({
            data: {
                phone: customerPhone,
                firstName: customerName.split(' ')[0] || "Unknown",
                lastName: customerName.split(' ').slice(1).join(' ') || "",
                tenantId: tenantId,
                status: "NEW", // Or determine from call outcome
                tags: "vapi-inbound",
                customData: JSON.stringify(message.analysis?.structuredData || {})
            }
        });
    } else {
        // Update existing lead with new info if available
        // For now, we only update customData if needed, or leave as is.
        // Could append tags: lead.tags + ",vapi-call"
    }

    // 3. Create Call Log
    const callStatus = message.call?.endedReason || message.call?.status || "completed";
    const duration = message.call?.durationSeconds || 0;
    const recordingUrl = message.call?.recordingUrl || message.artifact?.recordingUrl || "";
    const transcript = message.transcript || message.artifact?.transcript || "";
    const summary = message.analysis?.summary || "";
    const outcome = message.analysis?.successEvaluation || "unknown";

    const callLog = await db.callLog.create({
        data: {
            direction: "INBOUND", // Vapi mostly inbound for now, or assume INBOUND
            status: callStatus,
            duration: Math.round(duration),
            recordingUrl: recordingUrl,
            transcript: transcript,
            summary: summary,
            outcome: outcome,
            agentId: agent.id,
            leadId: lead.id
        }
    });

    console.log(`Sync: Call logged ${callLog.id} for Lead ${lead.id}`);

    return { lead, callLog, agent };
}
