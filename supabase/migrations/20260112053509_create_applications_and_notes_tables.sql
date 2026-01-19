/*
  # Create Applications and Notes Tables

  1. New Tables
    - `applications` - Track job applications
    - `notes` - Store notes for applications
    - `contacts` - Store professional contacts
    
  2. Security
    - Enable RLS on all tables
    - Users can only access their own data
*/

CREATE TABLE IF NOT EXISTS applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name text NOT NULL,
  position text NOT NULL,
  status text NOT NULL DEFAULT 'applied' CHECK (status IN ('applied', 'interviewing', 'offer', 'rejected', 'accepted')),
  salary_range text,
  job_url text,
  application_date timestamptz DEFAULT now(),
  interview_date timestamptz,
  notes text,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS notes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  application_id uuid REFERENCES applications(id) ON DELETE CASCADE,
  title text NOT NULL,
  content text NOT NULL,
  note_type text DEFAULT 'general' CHECK (note_type IN ('general', 'interview', 'research', 'follow-up')),
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

CREATE TABLE IF NOT EXISTS contacts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name text NOT NULL,
  email text,
  phone text,
  company text,
  position text,
  relationship text,
  last_contact timestamptz,
  notes text,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

ALTER TABLE applications ENABLE ROW LEVEL SECURITY;
ALTER TABLE notes ENABLE ROW LEVEL SECURITY;
ALTER TABLE contacts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own applications"
  ON applications FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own applications"
  ON applications FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own applications"
  ON applications FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own applications"
  ON applications FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own notes"
  ON notes FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own notes"
  ON notes FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own notes"
  ON notes FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own notes"
  ON notes FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can view own contacts"
  ON contacts FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own contacts"
  ON contacts FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own contacts"
  ON contacts FOR UPDATE
  TO authenticated
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete own contacts"
  ON contacts FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);