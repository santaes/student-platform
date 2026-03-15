# Backend Deployment Instructions

## Option 1: Render (Recommended - Free)

### Step 1: Create Render Account
1. Go to https://render.com
2. Sign up for free account (GitHub/Google)

### Step 2: Create New Web Service
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name**: `student-learning-platform-backend`
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Instance Type**: `Free`

### Step 3: Environment Variables
Add these environment variables in Render dashboard:
```
NODE_ENV=production
JWT_SECRET=your-super-secret-jwt-key-change-this
FRONTEND_URL=https://platformmama.netlify.app
DATABASE_URL=postgresql://username:password@host:port/database
```

### Step 4: Database Setup
1. Render provides free PostgreSQL
2. Database URL will be auto-provided
3. Update DATABASE_URL environment variable

### Step 5: Deploy
- Click "Create Web Service"
- Render will auto-deploy from GitHub
- Your backend URL will be: `https://student-learning-platform-backend.onrender.com`

---

## Option 2: Vercel (Alternative - Free)

### Step 1: Install Vercel CLI
```bash
npm i -g vercel
```

### Step 2: Convert to Serverless
Create `vercel.json`:
```json
{
  "version": 2,
  "builds": [
    {
      "src": "dist/main.js",
      "use": "@vercel/node"
    }
  ],
  "routes": [
    {
      "src": "/(.*)",
      "dest": "dist/main.js"
    }
  ]
}
```

### Step 3: Deploy
```bash
cd backend
vercel --prod
```

---

## Option 3: Railway (Alternative - Free)

### Step 1: Create Railway Account
1. Go to https://railway.app
2. Sign up with GitHub

### Step 2: Deploy
1. Connect repository
2. Railway auto-detects Node.js
3. Set environment variables
4. Deploy

---

## Post-Deployment Steps

### 1: Test Backend
```bash
curl https://your-backend-url.onrender.com/api/health
```

### 2: Update Frontend API URL
Update `core/services/api.service.ts`:
```typescript
private apiUrl = 'https://your-backend-url.onrender.com';
```

### 3: Redeploy Frontend
```bash
npm run build
npx netlify-cli deploy --prod
```

### 4: Test Full Integration
- Visit frontend URL
- Test login/registration
- Verify API calls work

---

## Environment Variables Template

### Production (.env)
```
NODE_ENV=production
PORT=3000
JWT_SECRET=your-secure-jwt-secret-key
FRONTEND_URL=https://platformmama.netlify.app
DATABASE_URL=postgresql://user:pass@host:5432/db
```

### Development (.env)
```
NODE_ENV=development
PORT=3000
JWT_SECRET=dev-jwt-secret
FRONTEND_URL=http://localhost:4200
DB_HOST=
DB_PORT=
DB_USERNAME=
DB_PASSWORD=
DB_DATABASE=
```

---

## Cost Summary

| Service | Free Tier Limits | Cost |
|---------|------------------|------|
| Render | 750 hours/month | $0 |
| Vercel | 100GB bandwidth | $0 |
| Railway | 500 hours/month | $0 |
| PostgreSQL | 256MB RAM | $0 |

**Total Monthly Cost: $0**
