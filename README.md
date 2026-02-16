# Apex Voice Solutions - AI Voice Agent CRM

24/7 AI receptionist for local service businesses. Never miss a call again.

## Tech Stack

- **Frontend**: Vite + React 19 + Tailwind CSS
- **Backend**: Express + Prisma + PostgreSQL
- **Voice**: VAPI.ai
- **Deployment**: Vercel (frontend) + Railway (backend)

## Quick Start

### 1. Install Dependencies

```bash
# Frontend
npm install

# Backend
cd server && npm install && cd ..
```

### 2. Set Up Database

You need a PostgreSQL database. Free options:

**Option A: Neon (Recommended)**
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project called "apex-voice"
3. Copy the connection string
4. Update `server/.env` with your `DATABASE_URL`

**Option B: Railway**
1. Go to [railway.app](https://railway.app)
2. Create PostgreSQL database
3. Copy the connection string

### 3. Configure Environment

Update `server/.env`:
```env
DATABASE_URL="postgresql://your-connection-string"
JWT_SECRET="your-random-secret-key"
VAPI_API_KEY="your-vapi-key"
VAPI_ASSISTANT_ID="your-assistant-id"
```

### 4. Initialize Database

```bash
cd server
npx prisma generate
npx prisma db push
cd ..
```

### 5. Run Development Servers

```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
npm run dev
```

- Frontend: http://localhost:5173
- Backend: http://localhost:3001
- API Health: http://localhost:3001/health

### 6. Login

Default credentials:
- Email: `apexvoicesolutions@gmail.com`
- Password: `password123`

## API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check |
| `/api/auth/register` | POST | Create account |
| `/api/auth/login` | POST | Login |
| `/api/leads` | GET/POST | Manage leads |
| `/api/calls` | GET/POST | Call logs |
| `/api/agents` | GET/POST | Voice agents |
| `/api/stats` | GET | Dashboard stats |
| `/api/vapi/call` | POST | Trigger outbound call |
| `/api/vapi/webhook` | POST | VAPI callbacks |

## Deployment

### Frontend (Vercel)
```bash
vercel --prod
```

### Backend (Railway)
1. Connect GitHub repo to Railway
2. Set root directory to `server`
3. Add environment variables
4. Deploy

## Project Structure

```
apex-voice-solutions/
├── server/                 # Express backend
│   ├── index.js           # Main server
│   ├── prisma/            # Database schema
│   └── .env               # Backend env vars
├── src/                    # React source
├── components/            # UI components
├── App.tsx                # Main app
├── .env.local             # Frontend env vars
└── package.json           # Frontend deps
```

## Environment Variables

### Frontend (`.env.local`)
- `VITE_VAPI_API_KEY` - VAPI public key
- `VITE_VAPI_ASSISTANT_ID` - VAPI assistant ID
- `VITE_API_URL` - Backend API URL

### Backend (`server/.env`)
- `DATABASE_URL` - PostgreSQL connection
- `JWT_SECRET` - Secret for JWT tokens
- `VAPI_API_KEY` - VAPI private key
- `VAPI_ASSISTANT_ID` - VAPI assistant ID

## License

MIT
