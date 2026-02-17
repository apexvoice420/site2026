# Apex Voice Solutions - Deployment Fix

## The Problem

Railway's internal database URL (`postgres-xxx.railway.internal`) only works inside Railway's network. Vercel can't reach it.

## The Solution: Two-Tier Architecture

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Vercel        │────▶│  Railway API    │────▶│  Railway DB     │
│   (Frontend)    │     │  (Backend)      │     │  (Postgres)     │
│   Next.js UI    │     │  Express.js     │     │  Prisma         │
└─────────────────┘     └─────────────────┘     └─────────────────┘
      Public                 Public                Internal
      Access                 Access                (works!)
```

**Frontend (Vercel)** talks to **Backend API (Railway)** via public URL.
**Backend (Railway)** talks to **Database (Railway)** via internal URL.

---

## Step 1: Get Railway Public URL for Backend

1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click on your **backend service** (the Express app)
3. Go to **Settings** → **Domains**
4. Generate a public domain (e.g., `https://apex-voice-api.railway.app`)
5. **Copy this URL** — this is your `NEXT_PUBLIC_API_URL`

---

## Step 2: Deploy Backend to Railway

Your Express backend in `/server` folder should be deployed to Railway.

**If not already deployed:**

1. In Railway, create new service
2. Connect GitHub repo: `apexvoice420/site2026`
3. Set **Root Directory**: `/server`
4. Add environment variables:
   ```
   DATABASE_URL=postgresql://postgres:PASSWORD@postgres-xxx.railway.internal:5432/railway
   JWT_SECRET=apex-voice-super-secret-jwt-key-2024
   VAPI_API_KEY=your_key
   VAPI_ASSISTANT_ID=4deec673-b116-45dd-9ceb-54057a18ebb2
   ```
5. Deploy

---

## Step 3: Deploy Frontend to Vercel

1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Import `apexvoice420/site2026`
3. **Root Directory**: `./` (default, NOT /server)
4. Framework: Next.js
5. Environment variables:
   ```
   NEXT_PUBLIC_API_URL=https://your-railway-backend.railway.app
   ```
6. Deploy

---

## Step 4: Add CRM Subdomain

1. In Vercel project → Settings → Domains
2. Add: `crm.apexvoicesolutions.org`
3. Done (DNS already points to Vercel)

---

## Quick Commands

Push all code:
```bash
cd /data/.openclaw/workspace/apex-site
git push
```

---

## Alternative: Single Database (Neon)

If you want everything on Vercel with external DB:

1. Go to https://neon.tech
2. Sign up with GitHub
3. Create project: `apex-crm`
4. Copy connection string
5. Use as `DATABASE_URL` in Vercel

---

## What's Ready

| Component | Status |
|-----------|--------|
| Dashboard UI | ✅ Ready |
| VAPI Routing | ✅ Ready |
| Twilio SMS | ✅ Ready |
| Calendar Webhooks | ✅ Ready |
| Agent Config | ✅ Ready |
| Lead Detail View | ⏳ Not started |

---

## Next Steps When You Return

1. Push code: `git push`
2. Get Railway backend public URL
3. Deploy frontend to Vercel with API URL
4. Test call: `+1 (386) 559-5733`
