import db from "@/lib/db";
import { VapiPayload } from "@/lib/vapi";

export async function syncVapiData(payload: VapiPayload) {
    const { message, agent: vapiAgentInfo } = payload;

    // 1. Identify Tenancy & Agent via 3-tier lookup
    let tenantId: string | undefined;
    let agent: any = null;

    // Method 1: Check metadata for tenantId (outbound calls with context)
    tenantId = message.metadata?.tenantId;

    // Method 2: Look up by vapiAgentId (if provided in payload)
    if (!tenantId && vapiAgentInfo?.id) {
        agent = await db.agent.findFirst({
            where: { vapiAgentId: vapiAgentInfo.id },
            include: { tenant: true }
        });
        if (agent) tenantId = agent.tenantId;
    }

    // Method 3: Look up by called phone number (INBOUND calls)
    // VAPI sends the destination number in message.call.to or message.to
    if (!tenantId) {
        const calledNumber = (message as any).call?.to || (message as any).to;
        if (calledNumber) {
            // Normalize phone number (remove spaces, parens, dashes)
            const normalizedPhone = calledNumber.replace(/[\s\(\)\-]/g, '');
            agent = await db.agent.findFirst({
                where: { phoneNumber: { contains: normalizedPhone.slice(-10) } },
                include: { tenant: true }
            });
            if (agent) {
                tenantId = agent.tenantId;
                console.log(`Sync: Routed inbound call to ${calledNumber} → Agent ${agent.name} (Tenant: ${agent.tenant?.name})`);
            }
        }
    }

    if (!tenantId) {
        console.warn("Sync: Cannot identify tenant for call. Payload:", JSON.stringify(payload).substring(0, 500));
        return null;
    }

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
            agentId: agent?.id,
            leadId: lead.id,
            tenantId: tenantId
        }
    });

    console.log(`Sync: Call logged ${callLog.id} for Lead ${lead.id}`);

    return { lead, callLog, agent };
}
