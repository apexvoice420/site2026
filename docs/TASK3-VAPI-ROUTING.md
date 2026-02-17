# Task 3: VAPI Inbound Call Routing — Architecture Plan

## Status: PAUSED

## The Problem

When a call comes in via VAPI, the webhook fires but we don't know **which tenant** the call belongs to. Currently, `crm-sync.ts` tries to look up by `vapiAgentId`, but inbound calls may not have that context.

**Scenario:** Someone calls your client's roofing company number. VAPI sends a webhook. We need to know: *Which Apex tenant owns this phone number?*

---

## Proposed Architecture

### Schema Changes (Prisma)

```prisma
model Agent {
  // ... existing fields
  phoneNumber String?   // NEW: The VAPI phone number this agent answers
  voiceId     String?   // NEW: VAPI voice ID for TTS
  
  @@index([phoneNumber])  // Fast lookup by phone
}

model Tenant {
  // ... existing fields
  twilioPhone String?   // NEW: Twilio number for SMS (if different from VAPI)
}
```

### Call Flow

```
1. Caller dials +1-555-ROOFING
2. VAPI receives call, triggers webhook
3. Webhook includes:
   - message.call.id (VAPI call ID)
   - message.customer.number (caller's phone)
   - message.to (CALLED number) ← KEY for routing
4. crm-sync.ts:
   a) Look up Agent by phoneNumber = message.to
   b) Get tenant from Agent.tenantId
   c) Process call with correct tenant context
5. Log call to correct tenant's database
   Trigger SMS via Twilio with tenant's business name
```

### Key Code Change: `crm-sync.ts`

```typescript
// NEW: Handle inbound calls by phone number
export async function syncVapiData(payload: VapiPayload) {
    const { message } = payload;
    
    // Method 1: Check metadata for tenantId (outbound calls)
    let tenantId = message.metadata?.tenantId;
    let agent = null;
    
    // Method 2: Look up by vapiAgentId (if provided)
    if (!tenantId && payload.agent?.id) {
        agent = await db.agent.findFirst({
            where: { vapiAgentId: payload.agent.id },
            include: { tenant: true }
        });
        if (agent) tenantId = agent.tenantId;
    }
    
    // Method 3: Look up by called phone number (INBOUND)
    if (!tenantId && message.call?.to) {
        agent = await db.agent.findFirst({
            where: { phoneNumber: message.call.to },
            include: { tenant: true }
        });
        if (agent) tenantId = agent.tenantId;
    }
    
    if (!tenantId) {
        console.error("Cannot identify tenant for call");
        return null;
    }
    
    // ... rest of sync logic
}
```

---

## Migration Required

```bash
npx prisma migrate dev --name add-agent-phone-number
```

---

## UI Changes

**Agent Config Page** (`/dashboard/agents/[agentId]`):
- Add "Phone Number" field (the VAPI number this agent answers)
- Add "Voice" dropdown (VAPI voice selection)

---

## Implementation Order

| Step | What | Effort |
|------|------|--------|
| 1 | Add `phoneNumber` to Prisma schema + migrate | 10 min |
| 2 | Update `crm-sync.ts` with 3-tier lookup logic | 15 min |
| 3 | Add phone number field to Agent UI | 10 min |
| 4 | Wire Twilio SMS trigger in workflow-engine | 10 min |
| 5 | Test with actual inbound call | 15 min |

---

## Dependencies

- VAPI webhook must include `message.to` (called number) — verify this in VAPI docs
- Twilio integration (Task 4) already built

---

## Resume Command

"Continue Task 3: VAPI Inbound Call Routing"
