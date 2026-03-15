# Deployment Guide - Student Learning Platform

## Free Deployment Setup

### Frontend (Netlify) ✅ Already Deployed
- **URL**: https://platformmama.netlify.app
- **Status**: Live and working
- **Configuration**: Angular SSR with Netlify Functions

### Backend (Render) - Steps to Deploy

1. **Create Render Account**
   - Go to https://render.com
   - Sign up for free account

2. **Create New Web Service**
   - Click "New" → "Web Service"
   - Connect your GitHub repository
   - Select the `backend` folder as root directory

3. **Configure Build Settings**
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start`
   - **Node Version**: 20

4. **Environment Variables**
   ```
   NODE_ENV=production
   JWT_SECRET=your-secure-jwt-secret-key
   FRONTEND_URL=https://platformmama.netlify.app
   ```

5. **Database Setup**
   - Render provides free PostgreSQL database
   - Database URL will be automatically provided as `DATABASE_URL`

### Alternative Backend Options

**Vercel Serverless Functions** (Free)
- Convert backend to serverless functions
- Deploy alongside frontend

**Railway** (Free tier)
- Similar to Render
- Good for Node.js applications

**Heroku** (Free tier discontinued, but Eco Plan available)
- $5/month for small projects

### Post-Deployment Steps

1. **Update Frontend API URL**
   - Get backend URL from Render
   - Update `api.service.ts` with the actual URL
   - Redeploy frontend

2. **Test Integration**
   - Test authentication endpoints
   - Verify database connectivity
   - Check CORS configuration

3. **Monitor Performance**
   - Use Render's free monitoring
   - Check Netlify function logs
   - Set up error tracking

### Cost Breakdown (Free Tier)

- **Netlify**: Free (100GB bandwidth/month)
- **Render**: Free (750 hours/month)
- **Database**: Free PostgreSQL (256MB)
- **Total**: $0/month

### Scaling Considerations

- **Frontend**: Netlify scales automatically
- **Backend**: Render scales with usage
- **Database**: Upgrade when needed
- **CDN**: Netlify provides global CDN

## Quick Commands

```bash
# Deploy frontend
npm run build
npx netlify-cli deploy --prod

# Deploy backend (via Render dashboard)
# Configure automatic deployments from GitHub
```

## Environment Files

### Backend (.env)
```
DB_HOST=${DATABASE_URL}
NODE_ENV=production
JWT_SECRET=${JWT_SECRET}
FRONTEND_URL=https://platformmama.netlify.app
```

### Frontend (api.service.ts)
```typescript
private apiUrl = 'https://your-backend.onrender.com';
```

## Next Steps

1. Deploy backend to Render
2. Update frontend API URL
3. Test full application
4. Set up monitoring
5. Configure custom domains (optional)
