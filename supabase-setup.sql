-- Defence Panel RSVP - Supabase Database Schema
-- Run this in Supabase SQL Editor to create the table

-- Create the rsvp_responses table
CREATE TABLE IF NOT EXISTS rsvp_responses (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  rank TEXT,
  appointment TEXT NOT NULL,
  unit_organization TEXT NOT NULL,
  contact_number TEXT NOT NULL,
  email TEXT NOT NULL,
  attendance_status TEXT NOT NULL CHECK (attendance_status IN ('attending', 'tentative', 'unable')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create an index on email for faster lookups
CREATE INDEX IF NOT EXISTS idx_rsvp_email ON rsvp_responses(email);

-- Create an index on created_at for sorting
CREATE INDEX IF NOT EXISTS idx_rsvp_created_at ON rsvp_responses(created_at DESC);

-- Enable Row Level Security (RLS)
ALTER TABLE rsvp_responses ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow INSERT from anyone (for form submissions)
CREATE POLICY "Allow public insert" ON rsvp_responses
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a policy to allow SELECT only with service role (for admin viewing)
CREATE POLICY "Allow service role select" ON rsvp_responses
  FOR SELECT
  TO service_role
  USING (true);

-- Create a function to update the updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc'::text, NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update updated_at
CREATE TRIGGER update_rsvp_responses_updated_at
  BEFORE UPDATE ON rsvp_responses
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Grant permissions
GRANT INSERT ON rsvp_responses TO anon;
GRANT ALL ON rsvp_responses TO service_role;

-- Success message
DO $$
BEGIN
  RAISE NOTICE 'RSVP table created successfully!';
END $$;
