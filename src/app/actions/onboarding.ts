"use server";

import db from "@/lib/db";
import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";

export async function createFromOnboarding(formData: FormData) {
    const user = await currentUser();
    if (!user) throw new Error("Unauthorized");

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

    // 2. Create User linked to Clerk Logic
    console.log(` Onboarding: Creating user for ${user.id} in tenant ${tenant.id}`);
    await db.user.create({
        data: {
            email: user.emailAddresses[0].emailAddress,
            name: `${user.firstName} ${user.lastName}`,
            clerkId: user.id,
            tenantId: tenant.id,
            role: 'OWNER'
        }
    });

    console.log(" Onboarding: Success. Redirecting to dashboard.");
    redirect("/dashboard");
}
