import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";
import { twilio } from "@/lib/twilio";

// Twilio webhook handler for incoming SMS
// Webhook URL: https://your-domain.com/api/twilio/webhook

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();
        const from = formData.get("From") as string;
        const to = formData.get("To") as string;
        const body = formData.get("Body") as string;
        const messageSid = formData.get("MessageSid") as string;

        console.log(`TwilioWebhook: SMS from ${from}: ${body}`);

        // Find lead by phone number
        const lead = await db.lead.findFirst({
            where: { phone: from }
        });

        if (lead) {
            // Log SMS in customData
            const existingData = lead.customData ? JSON.parse(lead.customData) : {};
            const smsHistory = existingData.smsHistory || [];
            
            smsHistory.push({
                from,
                to,
                body,
                messageSid,
                direction: "INBOUND",
                timestamp: new Date().toISOString()
            });

            await db.lead.update({
                where: { id: lead.id },
                data: {
                    customData: JSON.stringify({
                        ...existingData,
                        smsHistory,
                        lastSms: body,
                        lastSmsAt: new Date().toISOString()
                    })
                }
            });

            console.log(`TwilioWebhook: Logged SMS to lead ${lead.id}`);

            // Check for keywords
            const lowerBody = body.toLowerCase().trim();
            
            if (lowerBody === "yes" || lowerBody === "confirm") {
                // Confirm appointment logic
                if (existingData.lastAppointment) {
                    await db.lead.update({
                        where: { id: lead.id },
                        data: {
                            status: "CONFIRMED"
                        }
                    });

                    // Send confirmation reply
                    if (twilio.isConfigured()) {
                        await twilio.sendMessage({
                            to: from,
                            body: "Thank you! Your appointment has been confirmed. We look forward to seeing you."
                        });
                    }
                }
            } else if (lowerBody === "cancel" || lowerBody === "reschedule") {
                // Handle cancellation/reschedule request
                if (twilio.isConfigured()) {
                    await twilio.sendMessage({
                        to: from,
                        body: "We received your request. Someone will contact you shortly to help with rescheduling."
                    });
                }
            }
        }

        // Return TwiML response (empty = no auto-reply unless we sent one above)
        const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;
        return new NextResponse(twiml, {
            headers: { "Content-Type": "application/xml" }
        });

    } catch (error) {
        console.error("TwilioWebhook error:", error);
        const twiml = `<?xml version="1.0" encoding="UTF-8"?><Response></Response>`;
        return new NextResponse(twiml, {
            headers: { "Content-Type": "application/xml" }
        });
    }
}

// GET endpoint to show webhook URL for setup
export async function GET() {
    return NextResponse.json({
        integration: "Twilio SMS Webhook",
        webhookUrl: "/api/twilio",
        setup: {
            step1: "Go to Twilio Console > Phone Numbers > Active Numbers",
            step2: "Select your phone number",
            step3: "Under 'Messaging', set the webhook URL for 'A message comes in'",
            step4: "Select HTTP POST method"
        },
        environmentVariables: [
            "TWILIO_ACCOUNT_SID",
            "TWILIO_AUTH_TOKEN", 
            "TWILIO_PHONE_NUMBER"
        ],
        features: [
            "Auto-log inbound SMS to lead records",
            "Keyword detection (YES, CONFIRM, CANCEL, RESCHEDULE)",
            "Auto-reply for confirmations and reschedules"
        ]
    });
}
