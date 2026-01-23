import { auth, currentUser } from "@clerk/nextjs/server";
import db from "@/lib/db";
import { redirect } from "next/navigation";

export async function getCurrentUser() {
    const user = await currentUser();
    if (!user) return null;

    const dbUser = await db.user.findUnique({
        where: { clerkId: user.id },
        include: { tenant: true }
    });

    return dbUser;
}

export async function requireUser() {
    const user = await getCurrentUser();

    if (!user) {
        console.log(" Auth: User not found in DB.");
        // Check if user exists in Clerk but not DB (needs onboarding)
        const clerkAuth = await auth();
        if (clerkAuth.userId) {
            console.log(` Auth: Clerk session exists (${clerkAuth.userId}). Redirecting to onboarding.`);
            redirect("/dashboard/onboarding");
        }
        console.log(" Auth: No session. Redirecting to sign-in.");
        redirect("/sign-in");
    }
    console.log(` Auth: User verified: ${user.email} (Tenant: ${user.tenantId})`);
    return user;
}

export async function requireTenant() {
    const user = await requireUser();
    if (!user.tenant) {
        redirect("/dashboard/onboarding");
    }
    return user.tenant;
}
