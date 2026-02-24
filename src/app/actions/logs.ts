"use server";

const API_BASE = "https://apex-voice-crm-production.up.railway.app";

export async function getCallLogs() {
    try {
        const res = await fetch(`${API_BASE}/api/calls`);
        if (!res.ok) return [];
        const data = await res.json();
        return (data.calls || []).map((c: any) => ({
            id: c.id,
            createdAt: c.created_at || c.createdAt,
            duration: c.duration || 0,
            status: c.status || "completed",
            agent: { name: c.agent_name || "AI Agent" },
            lead: { 
                firstName: c.lead_name?.split(" ")[0] || "",
                lastName: c.lead_name?.split(" ")[1] || "",
                phone: c.lead_phone || ""
            }
        }));
    } catch (error) {
        console.error("Get call logs error:", error);
        return [];
    }
}
