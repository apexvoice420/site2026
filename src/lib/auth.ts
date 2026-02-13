import db from "@/lib/db";

// Stub auth for local/offline mode - no Clerk required
export async function getCurrentUser() {
    // Return a default user for offline mode
    const user = await db.user.findFirst({
        include: { tenant: true }
    });
    return user;
}

export async function requireUser() {
    const user = await getCurrentUser();
    if (!user) {
        // Create a default user if none exists
        const tenant = await db.tenant.findFirst() || await db.tenant.create({
            data: { name: "Default Tenant", industry: "Voice AI" }
        });
        return await db.user.create({
            data: {
                email: "admin@apexvoicesolutions.org",
                name: "Admin",
                clerkId: "local-user",
                tenantId: tenant.id,
                role: 'OWNER'
            },
            include: { tenant: true }
        });
    }
    return user;
}

export async function requireTenant() {
    const user = await requireUser();
    return user.tenant;
}
