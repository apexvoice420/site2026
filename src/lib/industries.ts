export interface IndustryConfig {
    slug: string;
    title: string;
    icon: string;
    hero: {
        title: string;
        subtitle: string;
    };
    painPoints: {
        title: string;
        description: string;
    }[];
    agentConfig: {
        name: string;
        industry: string;
        prompt: string;
        firstMessage: string;
    };
    faq: {
        question: string;
        answer: string;
    }[];
}

export const INDUSTRIES: Record<string, IndustryConfig> = {
    roofing: {
        slug: "roofing",
        title: "Roofing & Storm Restoration",
        icon: "Hammer",
        hero: {
            title: "Never Miss a Storm Lead Again",
            subtitle: "The AI Receptionist that books inspections 24/7, even while you're on the roof."
        },
        painPoints: [
            { title: "Missed Calls = Lost Revenue", description: "Every missed call during storm season is a $10k+ job going to your competitor." },
            { title: "No Time to Qualify", description: "Stop wasting gas driving to jobs that don't fit your minimums." },
            { title: "Chaos After Storms", description: "Your phone rings off the hook. Let AI handle the intake while you handle the repairs." }
        ],
        agentConfig: {
            name: "Roofing Dispatcher",
            industry: "Roofing",
            firstMessage: "Thanks for calling Apex Roofing. Are you calling about a roof inspection?",
            prompt: `You are a professional, friendly, and efficient receptionist for a Roofing Company.
Your goal is to qualify leads and book roof inspections.
You must sound like a real human, not a robot. Use "uh-huh" and natural pauses.

QUALIFICATION QUESTIONS:
1. Is this for a residential or commercial property?
2. Do you have active leaks or storm damage?
3. What is the approximate age of the roof?

RULES:
- If they have water coming in NOW, categorize as EMERGENCY and explain someone will call back within 15 minutes.
- If it is just an estimate, ask for their address to check satellite imagery (pretend to interpret).
- Do NOT give specific pricing. say "It depends on the square footage and materials, but we offer free inspections."

TONE: Trustworthy, rugged, professional.`
        },
        faq: [
            { question: "Can it handle storm surges?", answer: "Yes, it can handle unlimited concurrent calls, ensuring no lead is lost during peak demand." },
            { question: "Does it integrate with my CRM?", answer: "Absolutely. Leads are instantly pushed to your CRM like JobNimbus or AccuLynx." }
        ]
    },
    plumbing: {
        slug: "plumbing",
        title: "Plumbing & HVAC",
        icon: "Wrench",
        hero: {
            title: "24/7 Emergency Dispatch",
            subtitle: "Capture every emergency call instantly. Dispatch the right tech, every time."
        },
        painPoints: [
            { title: "Late Night Calls", description: "Stop waking up at 3AM for non-emergencies. AI filters the urgent calls from the routine." },
            { title: "Dispatch Errors", description: "Ensure full details (problem, address, gate codes) are captured accurately before rolling a truck." },
            { title: "Scheduling Headaches", description: "Books directly into your ServiceTitan or Housecall Pro calendar." }
        ],
        agentConfig: {
            name: "Plumbing Dispatcher",
            industry: "Plumbing",
            firstMessage: "Apex Plumbing & HVAC. This is Sarah. Is this an emergency service request?",
            prompt: `You are Sarah, the senior dispatcher for a Plumbing and HVAC company.
Your priority is to determine if a call is an EMERGENCY (water leaking, no heat in winter) or ROUTINE (tune-up, quote).

PROTOCOL:
1. Ask "What seems to be the issue today?"
2. If water is leaking: "Okay, I can have a technician there. Can you turn off the main water valve?"
3. Ask for address and best contact number.
4. Quoting: "Our dispatch fee is $89, which is waived if you proceed with the work. Does that work for you?"

TONE: Calm, reassuring, capable. You are the expert helping them in a crisis.`
        },
        faq: [
            { question: "How does it handle on-call schedules?", answer: "We can program the AI to route calls to different technicians based on your on-call schedule." }
        ]
    },
    dentist: {
        slug: "dentist",
        title: "Dental & Medical Offices",
        icon: "Stethoscope",
        hero: {
            title: "Fill Chairs, Not Voicemail",
            subtitle: "HIPAA-compliant appointment scheduling that treats your patients with care."
        },
        painPoints: [
            { title: "Front Desk Overload", description: "Your staff is busy with patients. AI handles the phones so they can focus on care." },
            { title: "After-Hours Emergencies", description: "Capture patients in pain on weekends and book them for Monday morning." },
            { title: "Appointment Reminders", description: "Reduce no-shows with intelligent confirmation calls." }
        ],
        agentConfig: {
            name: "Medical Receptionist",
            industry: "Medical",
            firstMessage: "Thank you for calling Apex Dental Care. Are you a new or existing patient?",
            prompt: `You are a warm, compassionate receptionist for a Dental Office.
You adhere strictly to HIPAA guidelines. Do not read back private medical info loudly.

TASKS:
1. Identify if New or Existing Patient.
2. New: Ask for insurance provider (to check network status) and primary concern (cleaning, pain, whitening).
3. Urgent: If they are in pain, express empathy. "I'm so sorry to hear that. Let's get you in as soon as possible."
4. Scheduling: Offered AM/PM slots.

TONE: Warm, gentle, professional, empathetic.`
        },
        faq: [
            { question: "Is this HIPAA compliant?", answer: "Yes. Our platform is built with security and privacy as the core foundation." }
        ]
    },
    legal: {
        slug: "legal",
        title: "Law Firms & Attorneys",
        icon: "Scale",
        hero: {
            title: "Intake That Wins Cases",
            subtitle: "Professional legal intake that qualifies clients 24/7 without billable hour burnout."
        },
        painPoints: [
            { title: "Unqualified Leads", description: "Stop spending expensive attorney time talking to clients you can't help." },
            { title: "Missed Opportunities", description: "If you don't answer, they call the next lawyer on Google. Be the first to answer." },
            { title: "Professionalism", description: "A robotic menu creates a bad first impression. AI provides a white-glove experience." }
        ],
        agentConfig: {
            name: "Legal Intake Specialist",
            industry: "Legal",
            firstMessage: "Apex Law Group. How may we direct your call?",
            prompt: `You are the Setup Director for a prestigious law firm.
You are articulate, discreet, and professional.

INTAKE FLOW:
1. "Briefly, what type of legal matter is this regarding?" (Personal Injury, Family, Estate, etc.)
2. If Personal Injury: "I am sorry to hear that. When did the incident occur?"
3. "Are you currently represented by another attorney?" (If yes, politely end call).
4. Contact Info: "I will have an attorney review this. What is the best number?"

DISCLAIMER: Always state "I am an intake specialist, not an attorney. I cannot provide legal advice."
TONE: Formal, intelligent, discreet.`
        },
        faq: [
            { question: "Can it transfer calls?", answer: "Yes. If a high-value case is identified, the AI can patch the call directly to a partner's cell." }
        ]
    }
};
