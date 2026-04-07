-- ============================================================================
-- MIGRATION: Fix handle_new_user trigger + add coach_notes, progress_reports,
-- messages tables needed for production features.
-- ============================================================================

-- ============================================================================
-- FIX: handle_new_user trigger — persist date_of_birth from signup metadata
-- ============================================================================

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, role, first_name, last_name, date_of_birth)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'role',           'student'),
        COALESCE(NEW.raw_user_meta_data ->> 'first_name',     ''),
        COALESCE(NEW.raw_user_meta_data ->> 'last_name',      ''),
        CASE
            WHEN NEW.raw_user_meta_data ->> 'date_of_birth' IS NOT NULL
            THEN (NEW.raw_user_meta_data ->> 'date_of_birth')::date
            ELSE NULL
        END
    );
    RETURN NEW;
END;
$$;

-- ============================================================================
-- TABLE: coach_notes
-- Session/progress notes written by coaches about their students.
-- ============================================================================

CREATE TABLE IF NOT EXISTS coach_notes (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    coach_id    uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    student_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    track_id    uuid        REFERENCES tracks(id) ON DELETE SET NULL,
    content     text        NOT NULL,
    session_id  uuid        REFERENCES sessions_schedule(id) ON DELETE SET NULL,
    created_at  timestamptz DEFAULT now() NOT NULL,
    updated_at  timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_coach_notes_coach_id   ON coach_notes(coach_id);
CREATE INDEX idx_coach_notes_student_id ON coach_notes(student_id);

ALTER TABLE coach_notes ENABLE ROW LEVEL SECURITY;

-- Coaches see/edit their own notes; parents see notes about linked children
CREATE POLICY coach_notes_select ON coach_notes
    FOR SELECT USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR is_parent_of(student_id)
        OR get_user_role() = 'admin'
    );

CREATE POLICY coach_notes_insert ON coach_notes
    FOR INSERT WITH CHECK (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

CREATE POLICY coach_notes_update ON coach_notes
    FOR UPDATE USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

CREATE POLICY coach_notes_delete ON coach_notes
    FOR DELETE USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- ============================================================================
-- TABLE: progress_reports
-- Termly progress reports created by coaches and sent to parents.
-- ============================================================================

CREATE TABLE IF NOT EXISTS progress_reports (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    coach_id        uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    student_id      uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    period          text        NOT NULL,
    period_start    date,
    period_end      date,
    status          text        NOT NULL DEFAULT 'draft'
                    CHECK (status IN ('draft', 'sent')),
    report_data     jsonb       NOT NULL DEFAULT '{}',
    sent_at         timestamptz,
    created_at      timestamptz DEFAULT now() NOT NULL,
    updated_at      timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_progress_reports_coach   ON progress_reports(coach_id);
CREATE INDEX idx_progress_reports_student ON progress_reports(student_id);

ALTER TABLE progress_reports ENABLE ROW LEVEL SECURITY;

CREATE POLICY progress_reports_select ON progress_reports
    FOR SELECT USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR is_parent_of(student_id)
        OR student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR get_user_role() = 'admin'
    );

CREATE POLICY progress_reports_insert ON progress_reports
    FOR INSERT WITH CHECK (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

CREATE POLICY progress_reports_update ON progress_reports
    FOR UPDATE USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- ============================================================================
-- TABLE: messages
-- Parent ↔ coach messaging.
-- ============================================================================

CREATE TABLE IF NOT EXISTS messages (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    sender_id   uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    receiver_id uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    content     text        NOT NULL,
    is_read     boolean     DEFAULT false NOT NULL,
    created_at  timestamptz DEFAULT now() NOT NULL
);

CREATE INDEX idx_messages_sender    ON messages(sender_id);
CREATE INDEX idx_messages_receiver  ON messages(receiver_id);
CREATE INDEX idx_messages_created   ON messages(created_at);

ALTER TABLE messages ENABLE ROW LEVEL SECURITY;

-- Users can only see messages they sent or received
CREATE POLICY messages_select ON messages
    FOR SELECT USING (
        sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR receiver_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR get_user_role() = 'admin'
    );

-- Users can insert messages where they are the sender
CREATE POLICY messages_insert ON messages
    FOR INSERT WITH CHECK (
        sender_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- Receiver can mark messages as read
CREATE POLICY messages_update ON messages
    FOR UPDATE USING (
        receiver_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- ============================================================================
-- DONE
-- ============================================================================
