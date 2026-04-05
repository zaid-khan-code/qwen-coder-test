# Vercel Deployment Guide for Enterprise ERP System

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com) (free tier available)
2. **PostgreSQL Database with Connection Pooling**: 
   - Recommended: [Neon.tech](https://neon.tech) (free tier available)
   - Alternative: [Supabase](https://supabase.com) (free tier available)
   - You MUST use a pooled connection for serverless environments like Vercel

## Step 1: Set Up Your Database

### Option A: Neon.tech (Recommended)
1. Go to [neon.tech](https://neon.tech) and create a free account
2. Create a new project
3. Get your connection string from the dashboard
4. **Important**: Use the pooled connection string (looks like `postgres://...` with `?pgbouncer=true`)

### Option B: Supabase
1. Go to [supabase.com](https://supabase.com) and create a free account
2. Create a new project
3. Go to Settings → Database
4. Enable connection pooling (PgBouncer)
5. Copy the transaction mode connection string

## Step 2: Install Vercel CLI (Optional but Recommended)

```bash
npm install -g vercel
```

## Step 3: Deploy to Vercel

### Method 1: Using Vercel Dashboard (Easiest)

1. **Push your code to GitHub/GitLab/Bitbucket**:
   ```bash
   cd /workspace/erp-system
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin <your-repo-url>
   git push -u origin main
   ```

2. **Deploy via Vercel Dashboard**:
   - Go to [vercel.com/new](https://vercel.com/new)
   - Import your Git repository
   - Configure the project:
     - **Framework Preset**: Next.js (auto-detected)
     - **Build Command**: `prisma generate && next build`
     - **Output Directory**: `.next` (default)
     - **Install Command**: `npm install --legacy-peer-deps`

3. **Add Environment Variables** (CRITICAL):
   In the Vercel dashboard, go to Settings → Environment Variables and add:
   
   - `DATABASE_URL`: Your pooled PostgreSQL connection string
     ```
     postgresql://user:password@host.neon.tech/dbname?sslmode=require
     ```
   
   - `NEXTAUTH_SECRET`: Generate a secure secret
     ```bash
     openssl rand -base64 32
     ```
     Copy the output and paste it as the value
   
   - `NEXTAUTH_URL`: Your Vercel deployment URL
     ```
     https://your-app-name.vercel.app
     ```

4. **Click Deploy**

### Method 2: Using Vercel CLI

```bash
cd /workspace/erp-system

# Login to Vercel
vercel login

# Deploy (first time)
vercel

# Follow the prompts:
# - Set up and deploy? Y
# - Which scope? (select your team)
# - Link to existing project? N
# - Project name? (enter name)
# - Directory? ./
# - Override settings? N

# Add environment variables
vercel env add DATABASE_URL production
vercel env add NEXTAUTH_SECRET production  
vercel env add NEXTAUTH_URL production

# Deploy to production
vercel --prod
```

## Step 4: Post-Deployment Setup

### 1. Run Database Migrations

Since this is a serverless environment, you need to run migrations manually:

**Option A: Run locally with production DB**
```bash
# Update your local .env with the production DATABASE_URL
DATABASE_URL="your-production-pooled-connection-string"

# Generate Prisma client
npx prisma generate

# Push schema to production (for development/prototype)
npx prisma db push

# OR use migrations (recommended for production)
npx prisma migrate deploy
```

**Option B: Use Vercel Cron Jobs or GitHub Actions**
Set up automated migrations on deployment.

### 2. Test Your Deployment

1. Visit your deployed URL: `https://your-app-name.vercel.app`
2. Test all modules:
   - Employee management
   - Attendance tracking
   - Financial operations
   - Inventory management

## Important Notes

### ⚠️ Database Connection Pooling

**CRITICAL**: Vercel serverless functions have ephemeral connections. You MUST use a connection pooler:

- ✅ **Use**: Pooled connection strings (PgBouncer)
- ❌ **Don't Use**: Direct database connections

Signs you're not using pooling:
- "Too many connections" errors
- Slow cold starts
- Connection timeouts

### 📦 Build Configuration

The `vercel.json` file is already configured with:
```json
{
  "buildCommand": "prisma generate && next build",
  "installCommand": "npm install --legacy-peer-deps"
}
```

### 🔐 Security Best Practices

1. **Never commit `.env` files** to Git
2. **Rotate secrets regularly** (NEXTAUTH_SECRET)
3. **Use strong database passwords**
4. **Enable SSL** for database connections (`?sslmode=require`)
5. **Restrict database access** to Vercel IPs only

### 🚀 Performance Tips

1. **Enable Vercel Caching** for static assets
2. **Use Incremental Static Regeneration (ISR)** where possible
3. **Optimize database queries** with proper indexes
4. **Monitor function execution time** (max 10s on Hobby plan)

## Troubleshooting

### Error: "Too many connections"
- **Solution**: Ensure you're using a pooled connection string

### Error: "Prisma Client not generated"
- **Solution**: The build command includes `prisma generate`, check build logs

### Error: "Environment variables not found"
- **Solution**: Add all required env vars in Vercel dashboard

### Build fails with memory error
- **Solution**: Vercel Hobby plan has 1GB limit. Consider upgrading or optimizing builds

## Support

- [Vercel Documentation](https://vercel.com/docs)
- [Prisma on Vercel](https://www.prisma.io/docs/guides/deployment/deploy-to-vercel)
- [Next.js Deployment](https://nextjs.org/docs/deployment)

---

**Your ERP system is now live on Vercel! 🎉**
