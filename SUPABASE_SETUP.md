# Supabase Setup Guide
## Defence Panel RSVP - India AI Impact Summit & Expo 2026

This guide will help you complete the Supabase integration for storing RSVP responses.

---

## ✅ Step 1: Create the Database Table

1. Go to your Supabase Dashboard: https://supabase.com/dashboard/project/your_project_id
2. Click on **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Copy and paste the entire contents of `supabase-setup.sql` (in the project root)
5. Click **"Run"** or press `Ctrl+Enter`
6. You should see a success message: "RSVP table created successfully!"

This will create:
- `rsvp_responses` table with all required columns
- Indexes for better performance
- Row Level Security (RLS) policies
- Automatic timestamp triggers

---

## ✅ Step 2: Get Your API Keys

### Publishable (Anon) Key
1. In Supabase Dashboard, go to **Settings** → **API**
2. Find **"Project API keys"** section
3. Copy the **"anon" / "public"** key

### Service Role Key (SECRET)
1. On the same page, scroll down to find **"service_role"** key
2. Click to **reveal** the secret key
3. Copy it (⚠️ Keep this secret! Never commit to git)

---

## ✅ Step 3: Configure Environment Variables

1. In your project root, create a file named `.env.local`
2. Add the following (replace with your actual keys):

```env
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your_project_id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_publishable_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_secret_key_here
```

3. Save the file

**Example:**
```env
NEXT_PUBLIC_SUPABASE_URL=https://your_project_id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI...
```

---

## ✅ Step 4: Restart the Development Server

After creating `.env.local`, restart your dev server:

```bash
# Stop the current server (Ctrl+C in terminal)
# Then restart:
npm run dev
```

---

## ✅ Step 5: Test the Integration

1. Open http://localhost:3000
2. Fill out the RSVP form
3. Submit it
4. Check Supabase Dashboard → **Table Editor** → **rsvp_responses**
5. You should see your test submission!

---

## 📊 Viewing Submissions

### Option 1: Supabase Dashboard
- Go to **Table Editor** → **rsvp_responses**
- View all submissions in a spreadsheet-like interface
- Export to CSV if needed

### Option 2: API Endpoint
- Visit: http://localhost:3000/api/rsvp
- You'll see statistics: total, attending, tentative, unable

---

## 🔒 Security Features

The setup includes:

1. **Row Level Security (RLS)**: Enabled on the table
2. **Public Insert Policy**: Anyone can submit RSVPs (needed for the form)
3. **Service Role Select**: Only server-side code can read submissions
4. **Email Uniqueness**: Prevents duplicate submissions from same email

---

## 🚀 Deployment to Vercel

When deploying to Vercel:

1. Go to your Vercel project settings
2. Navigate to **Environment Variables**
3. Add all three variables from your `.env.local`:
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
4. Redeploy your application

---

## 📝 Database Schema

```sql
rsvp_responses
├── id (UUID, Primary Key)
├── name (TEXT, Required)
├── rank (TEXT, Optional)
├── appointment (TEXT, Required)
├── unit_organization (TEXT, Required)
├── contact_number (TEXT, Required)
├── email (TEXT, Required, Indexed)
├── attendance_status (TEXT, Required: attending/tentative/unable)
├── created_at (TIMESTAMP, Auto)
└── updated_at (TIMESTAMP, Auto)
```

---

## 🆘 Troubleshooting

### "Missing Supabase environment variables"
- Make sure `.env.local` exists in the project root
- Restart the dev server after creating the file

### "Failed to save RSVP"
- Check that you ran the SQL setup script
- Verify your service role key is correct
- Check Supabase Dashboard → Logs for errors

### "An RSVP with this email already exists"
- This is expected behavior to prevent duplicates
- Each email can only submit once

---

## ✨ What's Changed

- ✅ Installed `@supabase/supabase-js`
- ✅ Updated API route to use Supabase
- ✅ Created database schema with RLS
- ✅ Added duplicate email prevention
- ✅ Improved error handling

---

## 📞 Need Help?

If you encounter any issues:
1. Check the browser console for errors
2. Check the terminal/server logs
3. Check Supabase Dashboard → Logs → API
4. Verify all environment variables are set correctly
