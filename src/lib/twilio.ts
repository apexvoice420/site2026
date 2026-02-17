// Twilio SMS Client for Apex Voice Solutions
// Environment variables required:
// TWILIO_ACCOUNT_SID=your_account_sid
// TWILIO_AUTH_TOKEN=your_auth_token
// TWILIO_PHONE_NUMBER=your_twilio_phone_number

interface TwilioMessage {
    to: string;
    body: string;
    from?: string;
}

interface SendResult {
    success: boolean;
    messageId?: string;
    error?: string;
}

class TwilioClient {
    private accountSid: string | undefined;
    private authToken: string | undefined;
    private phoneNumber: string | undefined;
    private baseUrl: string | undefined;

    constructor() {
        this.accountSid = process.env.TWILIO_ACCOUNT_SID;
        this.authToken = process.env.TWILIO_AUTH_TOKEN;
        this.phoneNumber = process.env.TWILIO_PHONE_NUMBER;
        
        if (this.accountSid) {
            this.baseUrl = `https://api.twilio.com/2010-04-01/Accounts/${this.accountSid}`;
        }
    }

    isConfigured(): boolean {
        return !!(this.accountSid && this.authToken && this.phoneNumber);
    }

    async sendMessage(params: TwilioMessage): Promise<SendResult> {
        if (!this.isConfigured()) {
            console.warn("Twilio not configured. SMS not sent.");
            return { success: false, error: "Twilio not configured" };
        }

        const from = params.from || this.phoneNumber;
        const url = `${this.baseUrl}/Messages.json`;

        try {
            const credentials = Buffer.from(`${this.accountSid}:${this.authToken}`).toString('base64');
            
            const response = await fetch(url, {
                method: 'POST',
                headers: {
                    'Authorization': `Basic ${credentials}`,
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: new URLSearchParams({
                    To: params.to,
                    From: from!,
                    Body: params.body
                }).toString()
            });

            const data = await response.json();

            if (response.ok && data.sid) {
                console.log(`Twilio: SMS sent successfully to ${params.to}, SID: ${data.sid}`);
                return { success: true, messageId: data.sid };
            } else {
                console.error("Twilio SMS failed:", data);
                return { success: false, error: data.message || "Unknown error" };
            }
        } catch (error) {
            console.error("Twilio SMS error:", error);
            return { success: false, error: String(error) };
        }
    }

    async sendCallAcknowledgment(to: string, businessName: string): Promise<SendResult> {
        const body = `Thanks for calling ${businessName}! We received your request and our AI receptionist is processing it. We'll be in touch shortly.`;
        return this.sendMessage({ to, body });
    }

    async sendAppointmentReminder(to: string, time: string, businessName: string): Promise<SendResult> {
        const body = `Reminder: You have an appointment with ${businessName} scheduled for ${time}. Reply YES to confirm or call to reschedule.`;
        return this.sendMessage({ to, body });
    }

    async sendLeadNotification(to: string, customerName: string, issue: string): Promise<SendResult> {
        const body = `New lead from ${customerName}: "${issue.substring(0, 50)}...". Check your dashboard for details.`;
        return this.sendMessage({ to, body });
    }
}

// Export singleton instance
export const twilio = new TwilioClient();

// Export for direct use
export async function sendSMS(to: string, body: string): Promise<SendResult> {
    return twilio.sendMessage({ to, body });
}

export async function sendCallAck(to: string, businessName: string): Promise<SendResult> {
    return twilio.sendCallAcknowledgment(to, businessName);
}
