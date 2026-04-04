-- Add approval status to profiles
ALTER TABLE profiles
  ADD COLUMN approved boolean NOT NULL DEFAULT false,
  ADD COLUMN approved_at timestamptz,
  ADD COLUMN approved_by uuid REFERENCES profiles(id);

-- Admin users are auto-approved
-- (existing profiles get approved = true so current users aren't locked out)
UPDATE profiles SET approved = true;

-- New admin accounts should be auto-approved via trigger
CREATE OR REPLACE FUNCTION auto_approve_admin()
RETURNS trigger AS $$
BEGIN
  IF NEW.role = 'admin' THEN
    NEW.approved := true;
    NEW.approved_at := now();
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_auto_approve_admin
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION auto_approve_admin();
