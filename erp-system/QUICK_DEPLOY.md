# 🚀 Quick Deploy to Vercel

## One-Click Deploy (Recommended)

1. **Push to GitHub**:
   ```bash
   cd /workspace/erp-system
   git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Visit: https://vercel.com/new
   - Import your GitHub repository
   - Add environment variables (see below)
   - Click Deploy!

## Environment Variables Required

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | Pooled PostgreSQL connection | `postgresql://user:pass@ep-xxx.us-east-2.aws.neon.tech/db?sslmode=require` |
| `NEXTAUTH_SECRET` | Random secret for auth | Generate with `openssl rand -base64 32` |
| `NEXTAUTH_URL` | Your Vercel URL | `https://your-app.vercel.app` |

## Get a Free Database

### Neon.tech (Recommended)
1. Visit [neon.tech](https://neon.tech)
2. Sign up (free)
3. Create a project
4. Copy the connection string
5. ✅ Done!

### Supabase
1. Visit [supabase.com](https://supabase.com)
2. Create a project (free)
3. Go to Settings → Database
4. Enable connection pooling
5. Copy transaction mode connection string

## Post-Deploy: Setup Database

After deployment, run migrations:

```bash
# Locally with production DB
DATABASE_URL="your-production-url" npx prisma migrate deploy
```

Or use Vercel's cron jobs / GitHub Actions for automated migrations.

---

**Need help?** See [DEPLOYMENT.md](./DEPLOYMENT.md) for detailed instructions.
