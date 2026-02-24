"use server";

import { revalidatePath } from "next/cache";

// Settings are stored in environment variables, not editable from UI
export async function getSettings() {
    return {
        id: "default",
        name: "Apex Voice Solutions",
        vapiKey: process.env.VAPI_API_KEY ? "✓ Configured" : "Not Set",
        phoneNumber: "+13862825413",
        industry: "AI Voice Solutions"
    };
}

export async function updateSettings(formData: FormData) {
    // Settings updates would need to go through environment variables
    // For now, this is a no-op
    console.log("Settings update requested:", Object.fromEntries(formData));
    revalidatePath("/dashboard/settings");
}
