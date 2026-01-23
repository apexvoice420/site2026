"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireTenant } from "@/lib/auth";

export async function getLeads() {
    const tenant = await requireTenant();
    return await db.lead.findMany({
        where: { tenantId: tenant.id },
        orderBy: { createdAt: "desc" },
        include: {
            calls: true
        }
    });
}

export async function createLead(formData: FormData) {
    const tenant = await requireTenant();
    const firstName = formData.get("firstName") as string;
    const lastName = formData.get("lastName") as string;
    const email = formData.get("email") as string;
    const phone = formData.get("phone") as string;

    await db.lead.create({
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

    revalidatePath("/dashboard/leads");
}
