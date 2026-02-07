# AI Summit RSVP - Environment Setup

## 🔧 Setting Up Supabase Credentials

### 1. Get Your Supabase Credentials

1. Go to your Supabase project dashboard: https://app.supabase.com
2. Select your project (or create a new one)
3. Navigate to **Settings** → **API**
4. You'll find:
   - **Project URL** (e.g., `https://xxxxxxxxxxxxx.supabase.co`)
   - **Project API keys**:
     - `anon` / `public` key (safe for client-side use)
     - `service_role` key (secret, only for server-side)

### 2. Configure Your Local Environment

1. Copy the example env file:
   ```bash
   cp .env.example .env.local
   ```

2. Open `.env.local` and replace the placeholder values:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_actual_anon_key_here
   ```

### 3. Configure Production Environment (Vercel)

1. Go to your Vercel project dashboard
2. Navigate to **Settings** → **Environment Variables**
3. Add the following variables:
   - `NEXT_PUBLIC_SUPABASE_URL` = your Supabase URL
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` = your Supabase anon key
4. Click **Save**
5. Redeploy your application

### 4. Restart Your Dev Server

After adding credentials, restart your development server:
```bash
# Stop the current server (Ctrl+C)
npm run dev
```

## 📝 Notes

- ✅ `.env.local` is already in `.gitignore` and will NOT be committed
- ✅ Never commit the `.env.local` file with real credentials
- ✅ Use `.env.example` as a template for other developers
- ✅ Variables starting with `NEXT_PUBLIC_` are exposed to the browser
- ⚠️ Keep `SUPABASE_SERVICE_ROLE_KEY` secret (server-side only)

## 🗄️ Database Tables Required

Make sure your Supabase project has the following table:

### `rsvp_submissions` table:
```sql
CREATE TABLE rsvp_submissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  organization TEXT NOT NULL,
  designation TEXT NOT NULL,
  mobile TEXT NOT NULL,
  dietary_preferences TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security (optional but recommended)
ALTER TABLE rsvp_submissions ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow anonymous inserts (for RSVP submissions)
CREATE POLICY "Allow anonymous inserts" ON rsvp_submissions
  FOR INSERT TO anon
  WITH CHECK (true);
```
