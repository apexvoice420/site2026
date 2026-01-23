"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireTenant } from "@/lib/auth";

export async function saveWorkflow(id: string, data: any) {
    const tenant = await requireTenant();
    const nodes = JSON.stringify(data.nodes);
    const edges = JSON.stringify(data.edges);

    if (id === 'new') {
        await db.workflow.create({
            data: {
                name: "New Workflow",
                trigger: "INCOMING_CALL",
                nodes,
                edges,
                tenantId: tenant.id
            }
        });
    } else {
        await db.workflow.update({
            where: { id, tenantId: tenant.id },
            data: {
                nodes,
                edges
            }
        });
    }

    revalidatePath("/dashboard/workflows");
    revalidatePath(`/dashboard/workflows/${id}`);
    return { success: true };
}
