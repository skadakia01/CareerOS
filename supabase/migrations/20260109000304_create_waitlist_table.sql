/*
  # Create Waitlist Table

  1. New Tables
    - `waitlist`
      - `id` (uuid, primary key) - Unique identifier for each waitlist entry
      - `email` (text, unique, not null) - Email address of the user
      - `created_at` (timestamptz) - Timestamp of when the user joined the waitlist
      
  2. Security
    - Enable RLS on `waitlist` table
    - Add policy for anyone to insert their email (public access for waitlist signup)
    - Only authenticated admin users can read waitlist data
*/

CREATE TABLE IF NOT EXISTS waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email text UNIQUE NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can join waitlist"
  ON waitlist
  FOR INSERT
  TO anon
  WITH CHECK (true);

CREATE POLICY "Only authenticated users can view waitlist"
  ON waitlist
  FOR SELECT
  TO authenticated
  USING (true);