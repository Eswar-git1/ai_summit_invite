# Page Analytics Setup Guide

## Quick Setup

### 1. Run the Analytics SQL Script

Go to your Supabase Dashboard and run the `supabase-analytics.sql` script:

1. Open Supabase Dashboard: https://supabase.com/dashboard
2. Go to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of `supabase-analytics.sql`
5. Click **Run**

This creates the `page_analytics` table.

### 2. Restart Your Dev Server

The analytics tracking is now automatically enabled! Just restart:

```bash
npm run dev
```

### 3. Test It

1. Visit http://localhost:3000
2. Navigate to different pages
3. Go to http://localhost:3000/eswar
4. Login with password: `eswar2026`
5. See your page visit analytics!

---

## How It Works

### Automatic Tracking

The `AnalyticsProvider` component automatically tracks every page visit:

- **Visitor ID**: Unique ID stored in localStorage
- **Page Path**: Current route (/, /panelists, etc.)
- **User Agent**: Browser information
- **Referrer**: Where the visitor came from

### What's Tracked

- **Total Page Visits**: Every page view
- **Unique Visitors**: Distinct visitors (based on visitor ID)
- **Page Views Breakdown**: Visits per page

### Privacy

- No personal information is collected
- Visitor IDs are random, anonymous strings
- Data is only visible in the admin dashboard

---

## Admin Dashboard Features

Visit `/eswar` to see:

### RSVP Summary
- Total responses
- Attending count
- Tentative count
- Unable to attend count

### Website Analytics
- **Total Page Visits**: All page views
- **Unique Visitors**: Distinct visitors
- **Page Views Breakdown**: Which pages are most visited

### Recent Responses
- Last 10 RSVP submissions
- Name, appointment, organization, status, timestamp

### Auto-Refresh
- Dashboard updates every 30 seconds
- Manual refresh button available

---

## Deployment

When deploying to Vercel, the analytics will work automatically. Just make sure:

1. The `ADMIN_SECRET_KEY` environment variable is set
2. The `supabase-analytics.sql` script has been run in your Supabase project

---

## Troubleshooting

### No analytics data showing

1. Check that `supabase-analytics.sql` was run successfully
2. Verify the `page_analytics` table exists in Supabase
3. Check browser console for errors
4. Make sure you've visited some pages first

### Analytics not tracking

1. Clear browser cache and localStorage
2. Check that JavaScript is enabled
3. Verify the analytics API endpoint is working: `/api/analytics`

---

## Data Management

### View Raw Data

In Supabase Dashboard:
1. Go to **Table Editor**
2. Select `page_analytics` table
3. View all tracked visits

### Export Data

1. In Supabase Table Editor
2. Click **Export** → **CSV**
3. Download your analytics data

### Clear Old Data

To delete analytics older than 30 days:

```sql
DELETE FROM page_analytics 
WHERE created_at < NOW() - INTERVAL '30 days';
```

---

## Next Steps

The analytics system is now live! You can:

- Monitor visitor traffic in real-time
- See which pages are most popular
- Track RSVP conversion rates
- Export data for reporting

All analytics are visible at: `/eswar` (password: `eswar2026`)
