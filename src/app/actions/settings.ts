"use server";

import db from "@/lib/db";
import { revalidatePath } from "next/cache";
import { requireTenant } from "@/lib/auth";

export async function getSettings() {
    const tenant = await requireTenant();
    return tenant;
}

export async function updateSettings(formData: FormData) {
    const tenant = await requireTenant();
    const vapiKey = formData.get("vapiKey") as string;
    const phoneNumber = formData.get("phoneNumber") as string;
    const industry = formData.get("industry") as string;

    await db.tenant.update({
        where: { id: tenant.id },
        data: {
            vapiKey,
            phoneNumber,
            industry
        }
    });

    revalidatePath("/dashboard/settings");
}
