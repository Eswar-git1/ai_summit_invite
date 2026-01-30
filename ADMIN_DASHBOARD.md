# Admin Dashboard Documentation

## Access Information

**URL**: `/eswar` (e.g., https://ai-summit-invite.vercel.app/eswar)

**Password**: `eswar2026`

---

## Features

### 📊 Real-Time Analytics

1. **Summary Statistics**
   - Total RSVP responses
   - Confirmed attending count
   - Tentative responses
   - Unable to attend count

2. **Attendance Rate**
   - Visual circular progress indicator
   - Percentage of confirmed attendees

3. **Recent Responses Table**
   - Last 10 RSVP submissions
   - Name, appointment, organization, status, and timestamp
   - Color-coded status badges

4. **Auto-Refresh**
   - Dashboard automatically refreshes every 30 seconds
   - Manual refresh button available

---

## Security

### Two-Layer Protection

1. **Client-Side Password**
   - Password: `eswar2026`
   - Prevents unauthorized access to the dashboard UI

2. **Server-Side API Key**
   - API Key: `eswar-admin-2026`
   - Protects the admin API endpoint
   - Set in `.env.local` as `ADMIN_SECRET_KEY`

### Important Notes

- The `/eswar` route is not linked from the main website
- Only accessible via direct URL
- Password and API key are required for access
- All credentials are stored in `.env.local` (git-ignored)

---

## Deployment to Vercel

When deploying, add this environment variable:

```
ADMIN_SECRET_KEY=eswar-admin-2026
```

**Steps:**
1. Go to Vercel Project Settings
2. Navigate to Environment Variables
3. Add `ADMIN_SECRET_KEY` with value `eswar-admin-2026`
4. Redeploy the application

---

## Accessing the Dashboard

1. Navigate to: `https://ai-summit-invite.vercel.app/eswar`
2. Enter password: `eswar2026`
3. Click "Access Dashboard"
4. View real-time analytics

---

## Dashboard Sections

### Summary Cards
- **Total Responses**: Overall RSVP count
- **Attending**: Green card with checkmark
- **Tentative**: Orange card with question mark
- **Unable**: Red card with X mark

### Attendance Rate Circle
- Visual representation of confirmation rate
- Percentage displayed in center
- Green progress arc

### Recent Responses Table
Columns:
- Name
- Appointment/Designation
- Unit/Organization
- Status (color-coded badge)
- Submission timestamp

---

## Customization

### Change Password

Edit `src/app/eswar/page.tsx`:
```typescript
if (password === "your_new_password") {
```

### Change API Key

1. Edit `.env.local`:
```
ADMIN_SECRET_KEY=your_new_api_key
```

2. Edit `src/app/eswar/page.tsx`:
```typescript
"x-admin-key": "your_new_api_key",
```

### Adjust Refresh Interval

Edit `src/app/eswar/page.tsx`:
```typescript
const interval = setInterval(fetchDashboardData, 30000); // 30 seconds
```

---

## Troubleshooting

### "Unauthorized" Error
- Check that `ADMIN_SECRET_KEY` is set in `.env.local`
- Verify the API key matches in both the page and API route

### "Failed to load dashboard data"
- Check Supabase connection
- Verify `SUPABASE_SERVICE_ROLE_KEY` is set correctly
- Check browser console for errors

### Dashboard Not Loading
- Clear browser cache
- Check that the dev server is running
- Verify all environment variables are set

---

## Security Best Practices

1. **Change Default Passwords**: Update both the client password and API key before deployment
2. **Use Strong Credentials**: Use complex, unique passwords
3. **Rotate Keys Regularly**: Change API keys periodically
4. **Monitor Access**: Check Vercel logs for unauthorized access attempts
5. **HTTPS Only**: Ensure the site is only accessible via HTTPS in production

---

## Future Enhancements

Potential additions:
- Export data to CSV
- Date range filters
- Search functionality
- Email notifications for new RSVPs
- More detailed analytics (by organization, by date, etc.)
- User authentication with proper login system
