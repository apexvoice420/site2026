"use server";

import { triggerWorkflow } from "@/services/workflow-engine";
import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireTenant } from "@/lib/auth";

export async function createLead(formData: FormData) {
    const tenant = await requireTenant();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    const lead = await db.lead.create({
        data: {
            firstName,
            lastName,
            email,
            phone,
            tenantId: tenant.id,
            status: "NEW",
            tags: "",
            customData: "{}"
        }
    });

    // Trigger Workflow
    await triggerWorkflow("LEAD_CREATED", { lead });

    revalidatePath("/dashboard/leads");
}

export async function getLead(leadId: string) {
    const tenant = await requireTenant();
    return await db.lead.findUnique({
        where: { id: leadId, tenantId: tenant.id },
        include: {
            calls: true
        }
    });
}

