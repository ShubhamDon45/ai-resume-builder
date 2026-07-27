# Vercel Deployment Guide - UPDATED

## ✅ IMPORTANT: Set Environment Variables in Vercel Dashboard FIRST

Before deploying, go to your Vercel project settings and add these environment variables:

| Variable | Value | How to Get |
|----------|-------|-----------|
| `DATABASE_URL` | PostgreSQL connection string | Create account on Neon or Supabase |
| `JWT_SECRET` | Random secret key | Run: `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` |
| `OPENAI_API_KEY` | Your OpenAI API key | Get from https://platform.openai.com/api-keys |

---

## Step-by-Step Deployment

### 1. Setup PostgreSQL Database (Choose One)

**Option A: Neon (Recommended - Free tier)**
- Go to https://neon.tech
- Sign up and create a project
- Copy the connection string
- Example: `postgresql://username:password@host/database`

**Option B: Supabase**
- Go to https://supabase.com
- Create new project
- Copy the PostgreSQL connection string from Settings

### 2. Generate Required Secrets Locally

```bash
# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Get OPENAI_API_KEY from https://platform.openai.com/api-keys
```

### 3. Add Environment Variables to Vercel

1. Go to your Vercel project dashboard
2. Click **Settings** → **Environment Variables**
3. Add these 3 variables:
   - `DATABASE_URL` = your PostgreSQL connection string
   - `JWT_SECRET` = generated secret from step 2
   - `OPENAI_API_KEY` = your OpenAI API key

### 4. Deploy

**Option A: Via Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Select your GitHub repository
4. Root directory: `resume-builder`
5. Click "Deploy"

**Option B: Via Git Push**
```bash
git add .
git commit -m "Deploy to Vercel"
git push origin main
```
Vercel will auto-deploy when you push to main branch.

---

## Troubleshooting

### ❌ "Environment variables do not exist"
**Solution:** Make sure you added all 3 variables in Vercel dashboard BEFORE deploying:
- DATABASE_URL
- JWT_SECRET
- OPENAI_API_KEY

### ❌ "Database connection failed"
**Solution:** 
- Check DATABASE_URL is correct in Vercel dashboard
- Make sure PostgreSQL service is running
- Verify your IP is whitelisted in Postgres settings

### ❌ "Build failed - Prisma error"
**Solution:**
- Run locally: `npx prisma generate`
- Run locally: `npx prisma migrate deploy`
- Make sure DATABASE_URL is set before building

### ❌ "Port already in use"
**Solution:** Vercel assigns PORT automatically. Check that server.js uses `process.env.PORT`

---

## Verify Deployment Success

After deployment, check:
1. ✅ Vercel shows "Ready" status
2. ✅ No errors in Vercel deployment logs
3. ✅ Your app URL is accessible
4. ✅ Database is connected (try login page)

---

## Local Testing Before Deployment

```bash
cd resume-builder

# Create .env file with all variables
echo 'DATABASE_URL=your_connection_string' > .env
echo 'JWT_SECRET=your_secret' >> .env
echo 'OPENAI_API_KEY=your_key' >> .env

# Install dependencies
npm install

# Generate Prisma client
npx prisma generate

# Run migrations
npx prisma migrate deploy

# Start server
npm start
```

If it works locally, it will work on Vercel!
