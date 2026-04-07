-- ============================================================================
-- MIGRATION: Server-side age validation for student signups.
-- Under-16 students cannot self-register (Kenya Data Protection Act 2019, §33).
-- ============================================================================

-- Add a check on the profiles table: if role = 'student' and date_of_birth
-- indicates age < 16, reject the insert. This runs as part of the
-- handle_new_user trigger (SECURITY DEFINER), so it can't be bypassed.

CREATE OR REPLACE FUNCTION enforce_student_age_gate()
RETURNS trigger AS $$
DECLARE
  student_age integer;
BEGIN
  -- Only enforce for students with a date_of_birth
  IF NEW.role = 'student' AND NEW.date_of_birth IS NOT NULL THEN
    student_age := EXTRACT(YEAR FROM age(now(), NEW.date_of_birth::timestamp));
    IF student_age < 16 THEN
      RAISE EXCEPTION 'Students under 16 must be registered by a parent or guardian (Kenya DPA 2019, §33).';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_enforce_student_age_gate
  BEFORE INSERT ON profiles
  FOR EACH ROW
  EXECUTE FUNCTION enforce_student_age_gate();
