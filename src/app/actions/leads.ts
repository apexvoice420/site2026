"use server";

import { revalidatePath } from "next/cache";

const API_BASE = "https://apex-voice-crm-production.up.railway.app";

export async function createLead(formData: FormData) {
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    try {
        const res = await fetch(`${API_BASE}/api/leads`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                leads: [{
                    businessName: `${firstName} ${lastName}`,
                    email,
                    phone
                }]
            })
        });
        
        if (!res.ok) throw new Error("Failed to create lead");
    } catch (error) {
        console.error("Create lead error:", error);
    }

    revalidatePath("/dashboard/leads");
}

export async function getLead(leadId: string) {
    try {
        const res = await fetch(`${API_BASE}/api/leads/${leadId}`);
        if (!res.ok) return null;
        const data = await res.json();
        return data.lead || data;
    } catch (error) {
        console.error("Get lead error:", error);
        return null;
    }
}

export async function getLeads() {
    try {
        const res = await fetch(`${API_BASE}/api/leads`);
        if (!res.ok) return [];
        const data = await res.json();
        return data.leads || [];
    } catch (error) {
        console.error("Get leads error:", error);
        return [];
    }
}
