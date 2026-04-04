-- ============================================================================
-- COGNITRON — DELETE RLS POLICIES
-- ============================================================================
-- Default stance: DENY all deletes via the API.
-- Admin operations use the service_role key which bypasses RLS entirely,
-- so explicit admin-delete policies are unnecessary.
--
-- Only grant DELETE where there is a clear, legitimate user-facing need.
-- ============================================================================

-- ============================================================================
-- profiles — No self-deletion.
-- GDPR / DPA deletion requests are handled via admin process (service role).
-- ============================================================================

CREATE POLICY profiles_delete ON profiles
    FOR DELETE USING (false);

-- ============================================================================
-- parent_student_links — A parent can remove their own link to a child.
-- Admin removals go through the service role.
-- ============================================================================

CREATE POLICY parent_student_links_delete ON parent_student_links
    FOR DELETE USING (
        parent_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- ============================================================================
-- coach_assignments — Coaches can remove their own assignments.
-- ============================================================================

CREATE POLICY coach_assignments_delete ON coach_assignments
    FOR DELETE USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- ============================================================================
-- student_progress — Student can delete their own progress records.
-- Parent of the student can also delete on their behalf.
-- ============================================================================

CREATE POLICY student_progress_delete ON student_progress
    FOR DELETE USING (
        student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR is_parent_of(student_id)
    );

-- ============================================================================
-- student_achievements — Student can delete their own earned achievements.
-- Parent of the student can also delete on their behalf.
-- ============================================================================

CREATE POLICY student_achievements_delete ON student_achievements
    FOR DELETE USING (
        student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR is_parent_of(student_id)
    );

-- ============================================================================
-- xp_events — Immutable audit log. No deletes via API.
-- ============================================================================

CREATE POLICY xp_events_delete ON xp_events
    FOR DELETE USING (false);

-- ============================================================================
-- Curriculum tables — No API deletes. Managed by admin via service role.
-- ============================================================================

CREATE POLICY tracks_delete ON tracks
    FOR DELETE USING (false);

CREATE POLICY levels_delete ON levels
    FOR DELETE USING (false);

CREATE POLICY modules_delete ON modules
    FOR DELETE USING (false);

CREATE POLICY lessons_delete ON lessons
    FOR DELETE USING (false);

CREATE POLICY achievements_delete ON achievements
    FOR DELETE USING (false);

-- ============================================================================
-- sessions_schedule — Coaches can delete their own sessions.
-- ============================================================================

CREATE POLICY sessions_schedule_delete ON sessions_schedule
    FOR DELETE USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- ============================================================================
-- session_students — Coach who owns the session can remove students from it.
-- ============================================================================

CREATE POLICY session_students_delete ON session_students
    FOR DELETE USING (
        EXISTS (
            SELECT 1 FROM sessions_schedule s
            WHERE s.id = session_students.session_id
              AND s.coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        )
    );

-- ============================================================================
-- NOTE: contact_submissions table does not exist in the schema yet.
-- When it is added, a DELETE USING (false) policy should be applied.
-- ============================================================================
