import { NextRequest, NextResponse } from "next/server";
import db from "@/lib/db";

// Calendar webhook handler for Cal.com / Calendly integration
// Webhook URL: https://your-domain.com/api/calendar/webhook

interface CalWebhookPayload {
    triggerEvent: string;
    createdAt: string;
    payload: {
        title?: string;
        startTime?: string;
        endTime?: string;
        attendee?: {
            email?: string;
            name?: string;
            phoneNumber?: string;
            timeZone?: string;
        };
        organizer?: {
            email?: string;
            name?: string;
        };
        metadata?: Record<string, any>;
        status?: string;
        uid?: string;
    };
}

export async function POST(req: NextRequest) {
    try {
        const body = await req.json() as CalWebhookPayload;
        const event = body.triggerEvent;
        const data = body.payload;

        console.log(`CalendarWebhook: Received event ${event}`);

        // Handle booking created
        if (event === "BOOKING_CREATED" || event === "booking.created") {
            const attendeePhone = data.attendee?.phoneNumber || data.attendee?.email;
            const attendeeName = data.attendee?.name || "Unknown";
            const startTime = data.startTime;
            const title = data.title || "Appointment";

            if (!attendeePhone && !data.attendee?.email) {
                return NextResponse.json({ error: "No attendee contact info" }, { status: 400 });
            }

            // Find lead by phone or email
            const lead = await db.lead.findFirst({
                where: {
                    OR: [
                        { phone: attendeePhone },
                        { email: data.attendee?.email }
                    ]
                }
            });

            // Store appointment in lead's customData or create log
            const appointmentData = {
                type: "appointment",
                title,
                startTime,
                endTime: data.endTime,
                attendeeName,
                attendeeEmail: data.attendee?.email,
                attendeePhone,
                bookingId: data.uid,
                status: "scheduled",
                createdAt: new Date().toISOString()
            };

            if (lead) {
                // Update lead with appointment info
                const existingCustomData = lead.customData ? JSON.parse(lead.customData) : {};
                const appointments = existingCustomData.appointments || [];
                appointments.push(appointmentData);

                await db.lead.update({
                    where: { id: lead.id },
                    data: {
                        customData: JSON.stringify({
                            ...existingCustomData,
                            appointments,
                            lastAppointment: appointmentData
                        }),
                        status: "APPOINTMENT_SCHEDULED"
                    }
                });

                console.log(`CalendarWebhook: Updated lead ${lead.id} with appointment`);
            } else {
                // Create new lead with appointment
                await db.lead.create({
                    data: {
                        firstName: attendeeName.split(' ')[0] || "Unknown",
                        lastName: attendeeName.split(' ').slice(1).join(' ') || "",
                        phone: attendeePhone || null,
                        email: data.attendee?.email || null,
                        status: "APPOINTMENT_SCHEDULED",
                        tags: "calendar-booking",
                        customData: JSON.stringify({
                            appointments: [appointmentData],
                            lastAppointment: appointmentData
                        })
                    }
                });

                console.log(`CalendarWebhook: Created new lead for ${attendeeName}`);
            }

            return NextResponse.json({ 
                success: true, 
                message: "Appointment logged successfully",
                appointment: appointmentData
            });
        }

        // Handle booking cancelled
        if (event === "BOOKING_CANCELLED" || event === "booking.cancelled") {
            const bookingId = data.uid;

            // Find lead with this booking
            const leads = await db.lead.findMany();
            for (const lead of leads) {
                if (lead.customData) {
                    const customData = JSON.parse(lead.customData);
                    if (customData.appointments) {
                        const appointmentIndex = customData.appointments.findIndex(
                            (apt: any) => apt.bookingId === bookingId
                        );
                        if (appointmentIndex >= 0) {
                            customData.appointments[appointmentIndex].status = "cancelled";
                            await db.lead.update({
                                where: { id: lead.id },
                                data: { 
                                    customData: JSON.stringify(customData),
                                    status: "APPOINTMENT_CANCELLED"
                                }
                            });
                            console.log(`CalendarWebhook: Cancelled appointment for lead ${lead.id}`);
                            break;
                        }
                    }
                }
            }

            return NextResponse.json({ success: true, message: "Cancellation processed" });
        }

        return NextResponse.json({ received: true, event });

    } catch (error) {
        console.error("CalendarWebhook error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

// GET endpoint to show webhook URL for setup
export async function GET() {
    return NextResponse.json({
        integration: "Cal.com / Calendly Webhook",
        webhookUrl: "/api/calendar",
        supportedEvents: [
            "BOOKING_CREATED",
            "BOOKING_CANCELLED",
            "booking.created",
            "booking.cancelled"
        ],
        setup: {
            calCom: "Add this URL to your Cal.com webhook settings",
            calendly: "Add this URL to your Calendly webhook configuration"
        }
    });
}
