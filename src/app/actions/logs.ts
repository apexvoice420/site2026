"use server";

import db from "@/lib/db";
import { requireTenant } from "@/lib/auth";

export async function getCallLogs() {
    const tenant = await requireTenant();
    return await db.callLog.findMany({
        where: {
            agent: {
                tenantId: tenant.id
            }
        },
        orderBy: { createdAt: "desc" },
        include: {
            agent: true,
            lead: true
        }
    });
}
