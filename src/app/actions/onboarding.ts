"use server";

import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function createFromOnboarding(formData: FormData) {
    const companyName = formData.get("companyName") as string;
    const industry = formData.get("industry") as string;

    if (!companyName) throw new Error("Company Name is required");

    // 1. Create Tenant
    const tenant = await db.tenant.create({
        data: {
            name: companyName,
            industry: industry
        }
    });

    // 2. Create User for local mode
    await db.user.create({
        data: {
            email: "admin@apexvoicesolutions.org",
            name: "Admin User",
            clerkId: "local-user-" + Date.now(),
            tenantId: tenant.id,
            role: 'OWNER'
        }
    });

    redirect("/dashboard");
}
