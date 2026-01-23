import { NextRequest, NextResponse } from "next/server";
import { syncVapiData } from "@/services/crm-sync";
import { triggerWorkflow } from "@/services/workflow-engine";
import { VapiPayload } from "@/lib/vapi";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as VapiPayload;
        const messageType = body.message.type;

        console.log(`VapiWebhook: Received event ${messageType}`);

        if (messageType === 'end-of-call-report') {
            // 1. Sync Data
            const syncResult = await syncVapiData(body);

            if (syncResult) {
                // 2. Trigger Workflows
                await triggerWorkflow("CALL_COMPLETED", {
                    lead: syncResult.lead,
                    callLog: syncResult.callLog,
                    agent: syncResult.agent
                });
            }
        }

        return NextResponse.json({ success: true }, { status: 200 });

    } catch (error) {
        console.error("VapiWebhook: Error processing request", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
