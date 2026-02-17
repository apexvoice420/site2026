"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireTenant } from "@/lib/auth";

export async function getAgents() {
    const tenant = await requireTenant();
    return await db.agent.findMany({
        where: { tenantId: tenant.id },
        orderBy: { updatedAt: "desc" },
    });
}

export async function createAgent(formData: FormData) {
    const tenant = await requireTenant();
    const name = formData.get("name") as string;
    const industry = formData.get("industry") as string;

    if (!name) throw new Error("Name is required");

    // Serialize config to string
    const config = JSON.stringify({ industry });

    await db.agent.create({
        data: {
            name,
            tenantId: tenant.id,
            config,
            status: "DRAFT",
        },
    });

    revalidatePath("/dashboard/agents");
}

export async function getAgent(id: string) {
    const tenant = await requireTenant();
    return await db.agent.findFirst({
        where: { id, tenantId: tenant.id },
    });
}

export async function updateAgent(id: string, formData: FormData) {
    const tenant = await requireTenant();
    const name = formData.get("name") as string;
    const status = formData.get("status") as string;
    const vapiAgentId = formData.get("vapiAgentId") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const voiceId = formData.get("voiceId") as string;
    const prompt = formData.get("prompt") as string;

    const configObj = { prompt };
    const config = JSON.stringify(configObj);

    await db.agent.update({
        where: { id, tenantId: tenant.id },
        data: {
            name,
            status,
            vapiAgentId,
            phoneNumber: phoneNumber || null,
            voiceId: voiceId || null,
            config
        }
    });

    revalidatePath(`/dashboard/agents/${id}`);
    revalidatePath("/dashboard/agents");
}
