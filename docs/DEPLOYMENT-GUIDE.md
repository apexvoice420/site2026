# Apex Voice Solutions - Deployment Guide

## Current Status

✅ **Code Ready** - All features implemented:
- Dashboard with real stats
- VAPI inbound call routing
- Twilio SMS integration
- Calendar webhook
- Agent UI with phone/voice fields

❌ **Deployment Blocked** - Need public database URL

---

## Step 1: Get Public Database URL from Railway

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click on your **Postgres** service
3. Go to **Variables** tab
4. Look for one of these:
   - `DATABASE_PUBLIC_URL`
   - `POSTGRES_URL_PUBLIC`
   - Any URL with `.railway.app` (NOT `.railway.internal`)
   
5. Copy that URL - it should look like:
   ```
   postgresql://postgres:PASSWORD@containers-us-west-XXX.railway.app:PORT/railway
   ```

**If you don't see a public URL:**
1. Go to Postgres service → **Settings** → **Networking**
2. Enable **Public Networking**
3. Copy the public connection string

---

## Step 2: Deploy to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click **Add New** → **Project**
3. Import `apexvoice420/site2026`
4. **Framework:** Next.js (auto-detected)
5. **Root Directory:** `./` (leave default)
6. **Environment Variables:**

| Key | Value |
|-----|-------|
| `DATABASE_URL` | *(paste public Railway URL from Step 1)* |
| `JWT_SECRET` | `apex-voice-super-secret-jwt-key-2024` |
| `VAPI_API_KEY` | *(your VAPI key)* |
| `VAPI_ASSISTANT_ID` | `4deec673-b116-45dd-9ceb-54057a18ebb2` |
| `TWILIO_ACCOUNT_SID` | *(your Twilio SID)* |
| `TWILIO_AUTH_TOKEN` | *(your Twilio token)* |
| `TWILIO_PHONE_NUMBER` | `+13865595733` |

7. Click **Deploy**

---

## Step 3: Add Custom Domain

1. In Vercel project → **Settings** → **Domains**
2. Add: `crm.apexvoicesolutions.org`
3. Vercel will verify DNS (already pointing to Vercel)
4. Done!

---

## Step 4: Run Database Migration

After deployment succeeds:

1. In Vercel project → **Settings** → **Environment Variables**
2. Make sure DATABASE_URL is set
3. Go to **Deployments** → Click latest → **Redeploy**

Or run locally:
```bash
cd /data/.openclaw/workspace/apex-site/server
npx prisma db push
```

---

## Step 5: Configure Monica (VAPI Agent)

1. Go to your deployed CRM: `https://crm.apexvoicesolutions.org/dashboard/agents`
2. Create or edit the agent with:
   - **Name:** Monica
   - **VAPI Agent ID:** `4deec673-b116-45dd-9ceb-54057a18ebb2`
   - **Phone Number:** `+13865595733`
   - **Voice:** Rachel
   - **Status:** Active

---

## Step 6: Test

1. **Call** `+1 (386) 559-5733`
2. Check CRM for new lead
3. Verify SMS was sent (if Twilio configured)

---

## Alternative: Use Neon Database (Free)

If Railway public URL doesn't work:

1. Go to [Neon](https://neon.tech)
2. Sign up with GitHub
3. Create a new project: `apex-crm`
4. Copy the connection string
5. Use that as `DATABASE_URL` in Vercel

---

## Files Changed

```
server/prisma/schema.prisma     - Added phoneNumber, voiceId to Agent
src/app/actions/stats.ts        - Dashboard stats from real DB
src/app/actions/agents.ts       - Agent CRUD with phone/voice
src/app/api/calendar/route.ts   - Cal.com/Calendly webhook
src/app/api/twilio/route.ts     - Twilio SMS webhook
src/app/dashboard/page.tsx      - Real-time dashboard
src/app/dashboard/agents/[id]   - Agent config UI
src/lib/twilio.ts               - Twilio client
src/services/crm-sync.ts        - VAPI routing logic
```

---

## Need Help?

- Vercel docs: https://vercel.com/docs
- Neon docs: https://neon.tech/docs
- Railway docs: https://docs.railway.app

---

**Quick Command to Push Code:**

```bash
cd /data/.openclaw/workspace/apex-site
git push
```

Then deploy to Vercel.
