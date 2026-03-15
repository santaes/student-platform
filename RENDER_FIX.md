# Updated Render Deployment Instructions

## Fixed Build Command
Use this build command in Render:
```
npm install && npm run build
```

## Environment Variables
```
NODE_ENV=production
JWT_SECRET=HaU/m8zU56XMuuCHfwynQv41lpohg0KFv56Lxuh4v6U=
FRONTEND_URL=https://platformmama.netlify.app
```

## Quick Fix
The deployment should now automatically retry with the updated package-lock.json. If it doesn't:
1. Go to your Render service
2. Click "Manual Deploy" → "Deploy Latest Commit"
