"use server";

import db from "@/lib/db";
import { INDUSTRIES } from "@/lib/industries";
import { redirect } from "next/navigation";

export async function createAgentFromTemplate(industrySlug: string) {
    const template = INDUSTRIES[industrySlug];
    if (!template) {
        throw new Error("Invalid template");
    }

    let tenant = await db.tenant.findFirst();
    if (!tenant) {
        tenant = await db.tenant.create({
            data: { name: "Default Tenant", industry: template.title }
        });
    }

    const config = JSON.stringify({
        prompt: template.agentConfig.prompt,
        industry: template.agentConfig.industry
    });

    const agent = await db.agent.create({
        data: {
            name: `${template.agentConfig.name} (Copy)`,
            tenantId: tenant.id,
            status: 'DRAFT',
            config
        }
    });

    redirect(`/dashboard/agents/${agent.id}`);
}
