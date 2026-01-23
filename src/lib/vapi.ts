export interface VapiPayload {
    message: {
        type: string;
        call?: {
            id: string;
            status: string;
            endedReason?: string;
            durationSeconds?: number;
            recordingUrl?: string;
        };
        customer?: {
            number?: string;
            name?: string;
            email?: string;
        };
        analysis?: {
            summary?: string;
            structuredData?: Record<string, any>;
            successEvaluation?: string;
        }; // Vapi often sends analysis in a separate object or part of the report
        transcript?: string;
        artifact?: {
            transcript?: string;
            recordingUrl?: string;
        };
        timestamp?: number;
        metadata?: Record<string, any>; // Used to pass agentId or tenantId
    };
    agent?: {
        id: string; // Vapi Agent ID
    }
}
