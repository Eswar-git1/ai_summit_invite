-- Page Analytics Table
-- Tracks page visits for the Defence Panel RSVP website

-- Create analytics table
CREATE TABLE IF NOT EXISTS page_analytics (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    page_path TEXT NOT NULL,
    visitor_id TEXT,
    user_agent TEXT,
    referrer TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_analytics_page_path ON page_analytics(page_path);
CREATE INDEX IF NOT EXISTS idx_analytics_created_at ON page_analytics(created_at);
CREATE INDEX IF NOT EXISTS idx_analytics_visitor_id ON page_analytics(visitor_id);

-- Enable Row Level Security
ALTER TABLE page_analytics ENABLE ROW LEVEL SECURITY;

-- Policy: Allow anyone to insert analytics (for tracking)
CREATE POLICY "Allow public insert on analytics"
ON page_analytics
FOR INSERT
TO public
WITH CHECK (true);

-- Policy: Only service role can read analytics
CREATE POLICY "Service role can read analytics"
ON page_analytics
FOR SELECT
TO service_role
USING (true);

-- Success message
DO $$
BEGIN
    RAISE NOTICE 'Page analytics table created successfully!';
END $$;
