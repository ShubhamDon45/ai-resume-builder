# Vercel Deployment Guide

## Steps to Deploy

1. **Push to GitHub**
   ```bash
   git push origin main
   ```

2. **Connect to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Select root directory: `resume-builder`

3. **Set Environment Variables in Vercel Dashboard**
   ```
   DATABASE_URL = your_postgres_connection_string
   JWT_SECRET = your_jwt_secret
   OPENAI_API_KEY = your_openai_api_key
   ```

4. **Deploy**
   - Click "Deploy"
   - Vercel will automatically build and deploy

## Environment Variables Setup

### PostgreSQL Database
You need a managed PostgreSQL service:
- **Neon**: https://neon.tech (Free tier available)
- **Supabase**: https://supabase.com (Free tier available)
- **Railway**: https://railway.app

Example `DATABASE_URL`:
```
postgresql://user:password@host:5432/resume_builder_db?schema=public
```

### JWT_SECRET
Generate a random secret:
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### OPENAI_API_KEY
Get from: https://platform.openai.com/api-keys

## Troubleshooting

**Build Errors:**
- Check Node version compatibility
- Ensure all dependencies are in package.json
- Run `npm install` locally first

**Runtime Errors:**
- Check Vercel logs in deployment dashboard
- Verify environment variables are set
- Ensure PostgreSQL connection string is correct

**Database Issues:**
- Run migrations: `npx prisma migrate deploy`
- Check connection pooling settings for serverless
