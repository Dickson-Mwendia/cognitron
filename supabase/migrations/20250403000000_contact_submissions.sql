-- ============================================================================
-- CONTACT FORM SUBMISSIONS TABLE
-- ============================================================================
-- Stores inbound enquiries from the public contact form.
-- Coaches can view; anyone can insert (server action uses anon key).
-- ============================================================================

CREATE TABLE contact_submissions (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    name        text        NOT NULL,
    phone       text        NOT NULL,
    email       text,
    child_age   text,
    interest    text,
    format      text,
    message     text,
    status      text        NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'contacted', 'enrolled', 'closed')),
    notes       text,
    created_at  timestamptz DEFAULT now() NOT NULL,
    updated_at  timestamptz DEFAULT now() NOT NULL
);

ALTER TABLE contact_submissions ENABLE ROW LEVEL SECURITY;

-- Allow inserts from anon and authenticated roles (server action)
CREATE POLICY contact_submissions_insert ON contact_submissions
    FOR INSERT
    TO anon, authenticated
    WITH CHECK (true);

-- Only authenticated coaches can view submissions
CREATE POLICY contact_submissions_select ON contact_submissions
    FOR SELECT
    TO authenticated
    USING (
        EXISTS (
            SELECT 1 FROM profiles
            WHERE profiles.user_id = auth.uid()
            AND profiles.role = 'coach'
        )
    );

-- No public updates or deletes
