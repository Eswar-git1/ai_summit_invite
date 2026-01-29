# Defence Panel RSVP - India AI Impact Summit & Expo 2026

A production-ready, hi-tech RSVP web page for the Defence Panel session curated by the Indian Army at India AI Impact Summit & Expo 2026.

## 🎯 Purpose

This webpage serves as an invitation and RSVP tracker for the Defence Panel Discussion. It allows invitees to:
- View session details and panelist information
- Confirm attendance (Attending / Not Attending / Tentative)
- Provide contact information for coordination

## ✨ Features

- 🎨 **Hi-Tech Minimalistic Design** - Neural network animations, glassmorphism effects
- 🖼️ **Dual Logos** - DGIS and India AI Summit branding
- 👥 **Panelists Page** - Dedicated page for speakers with photos and bios
- 📱 **Fully Responsive** - Works on all devices
- ♿ **Accessible** - ARIA labels, keyboard navigation
- 🔒 **Privacy Focused** - No tracking, clear data usage policy

## 🛠️ Technology Stack

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **Styling**: Vanilla CSS with hi-tech design system
- **Fonts**: System fonts only
- **Deployment**: Vercel Free Tier compatible

---

## 💾 DATA STORAGE - Where is Form Data Stored?

### Current: Local JSON File (Demo/Development Only)

**Location**: `data/rsvp-responses.json`

⚠️ **IMPORTANT**: On Vercel, the file system is **ephemeral** (read-only after deployment). This means:
- RSVP data will **NOT persist** between deployments
- The JSON file storage only works for local development/demo

### 🌟 RECOMMENDED: Google Sheets (FREE - No Database Needed!)

The simplest production solution - no database required!

#### Setup Steps:

1. **Create a Google Sheet** with these columns:
   | A | B | C | D | E | F | G |
   |---|---|---|---|---|---|---|
   | Timestamp | Full Name | Organisation | Designation | Email | Mobile | Status |

2. **Enable Google Sheets API**:
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Create project → Enable "Google Sheets API"

3. **Create Service Account**:
   - IAM & Admin → Service Accounts → Create
   - Download JSON key file

4. **Share Sheet** with service account email (Editor access)

5. **Add to Vercel Environment Variables**:
   ```
   GOOGLE_SHEETS_ID=your-spreadsheet-id
   GOOGLE_SERVICE_ACCOUNT_EMAIL=service@project.iam.gserviceaccount.com
   GOOGLE_PRIVATE_KEY=-----BEGIN PRIVATE KEY-----\n...
   ```

6. **Install googleapis**:
   ```bash
   npm install googleapis
   ```

7. **Uncomment Google Sheets code** in `src/app/api/rsvp/route.ts`

### 🗄️ ALTERNATIVE: Supabase (Free Tier)

If you need a proper database with admin dashboard:

1. **Create Free Account**: [supabase.com](https://supabase.com)

2. **Create Table**:
   ```sql
   CREATE TABLE rsvp_responses (
     id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
     full_name TEXT NOT NULL,
     organisation TEXT NOT NULL,
     designation TEXT,
     email TEXT NOT NULL,
     mobile TEXT,
     rsvp_status TEXT NOT NULL,
     submitted_at TIMESTAMPTZ DEFAULT NOW()
   );
   ```

3. **Install Supabase Client**:
   ```bash
   npm install @supabase/supabase-js
   ```

4. **Add Environment Variables**:
   ```
   NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
   SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
   ```

5. **Update API Route** (`src/app/api/rsvp/route.ts`):
   ```typescript
   import { createClient } from '@supabase/supabase-js';
   
   const supabase = createClient(
     process.env.NEXT_PUBLIC_SUPABASE_URL!,
     process.env.SUPABASE_SERVICE_ROLE_KEY!
   );
   
   // In POST handler:
   const { error } = await supabase
     .from('rsvp_responses')
     .insert(rsvpData);
   ```

### 🔷 ALTERNATIVE: Vercel Postgres (Free Tier)

Managed PostgreSQL by Vercel:

1. **Create Database** in Vercel Dashboard (Storage → Create → Postgres)

2. **Install**: `npm install @vercel/postgres`

3. **Use in API Route**:
   ```typescript
   import { sql } from '@vercel/postgres';
   
   await sql`
     INSERT INTO rsvp_responses (full_name, organisation, email, rsvp_status)
     VALUES (${data.fullName}, ${data.organisation}, ${data.email}, ${data.rsvpStatus})
   `;
   ```

---

## 🚀 Deployment to Vercel

### Quick Deploy (CLI)

```bash
cd defence-panel-rsvp
npm install -g vercel   # If not installed
vercel login
vercel --prod
```

### Via GitHub

1. Push to GitHub
2. Go to [vercel.com/new](https://vercel.com/new)
3. Import repository
4. Add environment variables (if using external storage)
5. Deploy!

---

## 🏃 Local Development

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Open http://localhost:3000
```

---

## 📁 Project Structure

```
defence-panel-rsvp/
├── public/
│   └── images/           # Logos & panelist photos
├── src/
│   ├── app/
│   │   ├── api/rsvp/     # Serverless API endpoint
│   │   ├── panelists/    # Panelists page
│   │   ├── globals.css   # Hi-tech design system
│   │   ├── layout.tsx    # SEO layout
│   │   └── page.tsx      # Main RSVP page
│   └── components/
│       └── NeuralBackground.tsx  # Neural network animation
├── data/
│   └── rsvp-responses.json       # Local storage (dev only)
└── README.md
```

---

## 🎨 Design Features

- **Neural Network Animation** - Subtle, transparent canvas animation
- **Color Palette**: Navy (#1a237e), Saffron (#ff9933), White
- **Glassmorphism** - Frosted glass card effects
- **Gradient Backgrounds** - Professional depth
- **System Fonts** - Fast loading, consistent appearance

---

## 📄 Pages

| Page | URL | Description |
|------|-----|-------------|
| RSVP | `/` | Main invitation & RSVP form |
| Panelists | `/panelists` | Speaker profiles with photos |

---

## 🔒 Security & Privacy

- RSVP data not publicly accessible
- Server-side validation
- No third-party tracking
- Privacy notice displayed
- noindex/nofollow meta tags

---

## ⚠️ Required Disclaimers (Included on Page)

- RSVP is for attendance planning only
- Official Summit registration mandatory
- Invitation does not guarantee seating
- Entry subject to security checks

---

*Defence Panel curated by the Indian Army*
*India AI Impact Summit & Expo 2026*
