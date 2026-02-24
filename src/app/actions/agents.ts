"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

const API_BASE = "https://apex-voice-crm-production.up.railway.app";

export async function getAgents() {
    try {
        const res = await fetch(`${API_BASE}/api/vapi/assistants`);
        if (!res.ok) return [];
        const data = await res.json();
        return (data.assistants || []).map((a: any) => ({
            id: a.id,
            name: a.name || "Unnamed Agent",
            status: "ACTIVE",
            vapiAgentId: a.id,
            config: JSON.stringify({ prompt: a.model?.messages?.[0]?.content || "" })
        }));
    } catch (error) {
        console.error("Get agents error:", error);
        return [];
    }
}

export async function createAgent(formData: FormData) {
    const name = formData.get("name") as string;
    const industry = formData.get("industry") as string;

    if (!name) throw new Error("Name is required");

    try {
        const res = await fetch(`${API_BASE}/api/vapi/assistants`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                model: {
                    provider: "openai",
                    model: "gpt-4",
                    messages: [{ role: "system", content: `You are a ${industry} receptionist.` }]
                },
                voice: {
                    provider: "11labs",
                    voiceId: "rachel"
                }
            })
        });
        
        if (!res.ok) throw new Error("Failed to create agent");
    } catch (error) {
        console.error("Create agent error:", error);
    }

    revalidatePath("/dashboard/agents");
    redirect("/dashboard/agents");
}

export async function getAgent(id: string) {
    try {
        const res = await fetch(`${API_BASE}/api/vapi/assistants/${id}`);
        if (!res.ok) return null;
        const a = await res.json();
        return {
            id: a.id,
            name: a.name || "Unnamed Agent",
            status: "ACTIVE",
            vapiAgentId: a.id,
            config: JSON.stringify({ prompt: a.model?.messages?.[0]?.content || "" })
        };
    } catch (error) {
        console.error("Get agent error:", error);
        return null;
    }
}

export async function updateAgent(id: string, formData: FormData) {
    const name = formData.get("name") as string;
    const status = formData.get("status") as string;
    const prompt = formData.get("prompt") as string;

    try {
        const res = await fetch(`${API_BASE}/api/vapi/assistants/${id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name,
                model: {
                    messages: [{ role: "system", content: prompt }]
                }
            })
        });
        
        if (!res.ok) throw new Error("Failed to update agent");
    } catch (error) {
        console.error("Update agent error:", error);
    }

    revalidatePath(`/dashboard/agents/${id}`);
    revalidatePath("/dashboard/agents");
}
