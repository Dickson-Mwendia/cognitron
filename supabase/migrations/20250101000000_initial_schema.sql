-- ============================================================================
-- COGNITRON LEARNING PLATFORM — INITIAL SCHEMA MIGRATION
-- ============================================================================
-- Sets up the complete database for the Cognitron multi-track learning
-- platform (Coding, AI, Chess) with full Row Level Security.
-- ============================================================================

-- ============================================================================
-- EXTENSIONS
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- TABLE: profiles
-- Extends auth.users with application-specific fields.
-- ============================================================================

CREATE TABLE profiles (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id     uuid        REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL UNIQUE,
    role        text        NOT NULL CHECK (role IN ('student', 'parent', 'coach')),
    first_name  text        NOT NULL,
    last_name   text        NOT NULL,
    avatar_url  text,
    date_of_birth date,
    age_tier    text        CHECK (age_tier IN ('5-8', '9-12', '13-17')),
    created_at  timestamptz DEFAULT now() NOT NULL,
    updated_at  timestamptz DEFAULT now() NOT NULL
);

-- ============================================================================
-- TABLE: parent_student_links
-- Many-to-many relationship between parent and student profiles.
-- ============================================================================

CREATE TABLE parent_student_links (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id   uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    student_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    created_at  timestamptz DEFAULT now() NOT NULL,
    UNIQUE(parent_id, student_id)
);

-- ============================================================================
-- TABLE: coach_assignments
-- Links coaches to students for a specific track.
-- ============================================================================

CREATE TABLE coach_assignments (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    coach_id    uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    student_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    track       text        NOT NULL,
    active      boolean     DEFAULT true NOT NULL,
    created_at  timestamptz DEFAULT now() NOT NULL,
    UNIQUE(coach_id, student_id, track)
);

-- ============================================================================
-- TABLE: tracks
-- The three learning tracks offered by Cognitron.
-- ============================================================================

CREATE TABLE tracks (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    name        text        NOT NULL UNIQUE CHECK (name IN ('coding', 'ai', 'chess')),
    description text        NOT NULL,
    icon        text        NOT NULL,
    color       text        NOT NULL,
    created_at  timestamptz DEFAULT now() NOT NULL
);

-- ============================================================================
-- TABLE: levels
-- Progression levels within a track (e.g. Beginner, Intermediate …).
-- ============================================================================

CREATE TABLE levels (
    id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    track_id      uuid        REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
    name          text        NOT NULL,
    level_order   integer     NOT NULL,
    description   text        NOT NULL DEFAULT '',
    xp_required   integer     NOT NULL DEFAULT 0,
    badge_emoji   text        NOT NULL DEFAULT '⭐',
    created_at    timestamptz DEFAULT now() NOT NULL,
    UNIQUE(track_id, level_order)
);

-- ============================================================================
-- TABLE: modules
-- Groups of lessons within a level.
-- ============================================================================

CREATE TABLE modules (
    id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    level_id      uuid        REFERENCES levels(id) ON DELETE CASCADE NOT NULL,
    name          text        NOT NULL,
    module_order  integer     NOT NULL,
    description   text        NOT NULL DEFAULT '',
    lesson_count  integer     NOT NULL DEFAULT 0,
    created_at    timestamptz DEFAULT now() NOT NULL,
    UNIQUE(level_id, module_order)
);

-- ============================================================================
-- TABLE: lessons
-- Individual learning activities within a module.
-- ============================================================================

CREATE TABLE lessons (
    id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    module_id         uuid        REFERENCES modules(id) ON DELETE CASCADE NOT NULL,
    name              text        NOT NULL,
    lesson_order      integer     NOT NULL,
    description       text        NOT NULL DEFAULT '',
    duration_minutes  integer     NOT NULL DEFAULT 90,
    content_type      text        NOT NULL DEFAULT 'live'
                      CHECK (content_type IN ('live', 'practice', 'project', 'assessment')),
    created_at        timestamptz DEFAULT now() NOT NULL,
    UNIQUE(module_id, lesson_order)
);

-- ============================================================================
-- TABLE: student_progress
-- Tracks each student's completion status and score per lesson.
-- ============================================================================

CREATE TABLE student_progress (
    id            uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id    uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    lesson_id     uuid        REFERENCES lessons(id) ON DELETE CASCADE NOT NULL,
    status        text        NOT NULL DEFAULT 'not_started'
                  CHECK (status IN ('not_started', 'in_progress', 'completed')),
    score         integer     CHECK (score >= 0 AND score <= 100),
    started_at    timestamptz,
    completed_at  timestamptz,
    created_at    timestamptz DEFAULT now() NOT NULL,
    UNIQUE(student_id, lesson_id)
);

-- ============================================================================
-- TABLE: achievements
-- Catalogue of earnable badges / achievements (some track-specific, some global).
-- ============================================================================

CREATE TABLE achievements (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    name        text        NOT NULL,
    description text        NOT NULL,
    icon        text        NOT NULL,
    track_id    uuid        REFERENCES tracks(id) ON DELETE SET NULL,
    category    text        NOT NULL
                CHECK (category IN ('mastery', 'streak', 'practice', 'speed', 'mentor', 'competition', 'special')),
    criteria    jsonb       NOT NULL DEFAULT '{}',
    created_at  timestamptz DEFAULT now() NOT NULL
);

-- ============================================================================
-- TABLE: student_achievements
-- Records which achievements each student has earned.
-- ============================================================================

CREATE TABLE student_achievements (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id      uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    achievement_id  uuid        REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
    earned_at       timestamptz DEFAULT now() NOT NULL,
    UNIQUE(student_id, achievement_id)
);

-- ============================================================================
-- TABLE: xp_events
-- Immutable log of every XP gain for auditing and leaderboards.
-- ============================================================================

CREATE TABLE xp_events (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    event_type  text        NOT NULL,
    xp_amount   integer     NOT NULL,
    track_id    uuid        REFERENCES tracks(id) ON DELETE SET NULL,
    description text,
    created_at  timestamptz DEFAULT now() NOT NULL
);

-- ============================================================================
-- TABLE: sessions_schedule
-- Coaching session calendar entries.
-- ============================================================================

CREATE TABLE sessions_schedule (
    id                uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    coach_id          uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    track_id          uuid        REFERENCES tracks(id) ON DELETE CASCADE NOT NULL,
    scheduled_at      timestamptz NOT NULL,
    duration_minutes  integer     NOT NULL DEFAULT 90,
    location_type     text        NOT NULL
                      CHECK (location_type IN ('home', 'online')),
    status            text        NOT NULL DEFAULT 'scheduled'
                      CHECK (status IN ('scheduled', 'completed', 'cancelled', 'rescheduled')),
    notes             text,
    created_at        timestamptz DEFAULT now() NOT NULL
);

-- ============================================================================
-- TABLE: session_students
-- Junction table linking students to scheduled sessions.
-- ============================================================================

CREATE TABLE session_students (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id  uuid        REFERENCES sessions_schedule(id) ON DELETE CASCADE NOT NULL,
    student_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    UNIQUE(session_id, student_id)
);

-- ============================================================================
-- INDEXES
-- ============================================================================

CREATE INDEX idx_profiles_user_id             ON profiles(user_id);
CREATE INDEX idx_profiles_role                ON profiles(role);
CREATE INDEX idx_student_progress_student_id  ON student_progress(student_id);
CREATE INDEX idx_student_progress_lesson_id   ON student_progress(lesson_id);
CREATE INDEX idx_xp_events_student_id         ON xp_events(student_id);
CREATE INDEX idx_xp_events_created_at         ON xp_events(created_at);
CREATE INDEX idx_sessions_schedule_coach_id   ON sessions_schedule(coach_id);
CREATE INDEX idx_sessions_schedule_scheduled  ON sessions_schedule(scheduled_at);
CREATE INDEX idx_student_achievements_student ON student_achievements(student_id);

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Returns the application role ('student', 'parent', 'coach') of the
-- currently authenticated user, or NULL when there is no matching profile.
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT role
    FROM profiles
    WHERE user_id = auth.uid()
    LIMIT 1;
$$;

-- Returns TRUE when the current auth user is a parent linked to the given
-- student profile id via parent_student_links.
CREATE OR REPLACE FUNCTION is_parent_of(student_profile_id uuid)
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
AS $$
    SELECT EXISTS (
        SELECT 1
        FROM parent_student_links psl
        JOIN profiles p ON p.id = psl.parent_id
        WHERE psl.student_id = student_profile_id
          AND p.user_id = auth.uid()
    );
$$;

-- ============================================================================
-- TRIGGER: auto-create profile on auth.users insert
-- ============================================================================
-- Expects raw_user_meta_data to contain: role, first_name, last_name

CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
    INSERT INTO public.profiles (user_id, role, first_name, last_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'role',      'student'),
        COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
        COALESCE(NEW.raw_user_meta_data ->> 'last_name',  '')
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW
    EXECUTE FUNCTION handle_new_user();

-- ============================================================================
-- ROW LEVEL SECURITY — ENABLE ON ALL TABLES
-- ============================================================================

ALTER TABLE profiles              ENABLE ROW LEVEL SECURITY;
ALTER TABLE parent_student_links  ENABLE ROW LEVEL SECURITY;
ALTER TABLE coach_assignments     ENABLE ROW LEVEL SECURITY;
ALTER TABLE tracks                ENABLE ROW LEVEL SECURITY;
ALTER TABLE levels                ENABLE ROW LEVEL SECURITY;
ALTER TABLE modules               ENABLE ROW LEVEL SECURITY;
ALTER TABLE lessons               ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_progress      ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements          ENABLE ROW LEVEL SECURITY;
ALTER TABLE student_achievements  ENABLE ROW LEVEL SECURITY;
ALTER TABLE xp_events             ENABLE ROW LEVEL SECURITY;
ALTER TABLE sessions_schedule     ENABLE ROW LEVEL SECURITY;
ALTER TABLE session_students      ENABLE ROW LEVEL SECURITY;

-- ============================================================================
-- RLS POLICIES: profiles
-- ============================================================================

-- SELECT: users see own profile; parents see linked children; coaches see all
CREATE POLICY profiles_select ON profiles
    FOR SELECT USING (
        user_id = auth.uid()
        OR is_parent_of(id)
        OR get_user_role() = 'coach'
    );

-- UPDATE: users can only update their own profile
CREATE POLICY profiles_update ON profiles
    FOR UPDATE USING (
        user_id = auth.uid()
    );

-- INSERT: service role only (the trigger runs as SECURITY DEFINER)
CREATE POLICY profiles_insert ON profiles
    FOR INSERT WITH CHECK (false);

-- ============================================================================
-- RLS POLICIES: parent_student_links
-- ============================================================================

-- SELECT: parents see own links; students see links where they are the student; coaches see all
CREATE POLICY parent_student_links_select ON parent_student_links
    FOR SELECT USING (
        parent_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR get_user_role() = 'coach'
    );

-- ============================================================================
-- RLS POLICIES: coach_assignments
-- ============================================================================

-- SELECT: coaches see own assignments; students see where they are the student; coaches see all
CREATE POLICY coach_assignments_select ON coach_assignments
    FOR SELECT USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR get_user_role() = 'coach'
    );

-- ============================================================================
-- RLS POLICIES: curriculum tables (tracks, levels, modules, lessons, achievements)
-- Anyone authenticated can read the curriculum.
-- ============================================================================

CREATE POLICY tracks_select ON tracks
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY levels_select ON levels
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY modules_select ON modules
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY lessons_select ON lessons
    FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY achievements_select ON achievements
    FOR SELECT USING (auth.uid() IS NOT NULL);

-- ============================================================================
-- RLS POLICIES: student_progress
-- ============================================================================

-- SELECT: students see own; parents see linked children; coaches see all
CREATE POLICY student_progress_select ON student_progress
    FOR SELECT USING (
        student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR is_parent_of(student_id)
        OR get_user_role() = 'coach'
    );

-- INSERT: students can insert their own progress
CREATE POLICY student_progress_insert ON student_progress
    FOR INSERT WITH CHECK (
        student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- UPDATE: students can update their own progress
CREATE POLICY student_progress_update ON student_progress
    FOR UPDATE USING (
        student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- ============================================================================
-- RLS POLICIES: student_achievements
-- ============================================================================

-- SELECT: students see own; parents see linked children; coaches see all
CREATE POLICY student_achievements_select ON student_achievements
    FOR SELECT USING (
        student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR is_parent_of(student_id)
        OR get_user_role() = 'coach'
    );

-- ============================================================================
-- RLS POLICIES: xp_events
-- ============================================================================

-- SELECT: students see own; parents see linked children; coaches see all
CREATE POLICY xp_events_select ON xp_events
    FOR SELECT USING (
        student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR is_parent_of(student_id)
        OR get_user_role() = 'coach'
    );

-- INSERT: students can log their own XP events
CREATE POLICY xp_events_insert ON xp_events
    FOR INSERT WITH CHECK (
        student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- ============================================================================
-- RLS POLICIES: sessions_schedule
-- ============================================================================

-- SELECT: coaches see own sessions; students in those sessions see them;
--         parents see children's sessions; coaches see all
CREATE POLICY sessions_schedule_select ON sessions_schedule
    FOR SELECT USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR EXISTS (
            SELECT 1 FROM session_students ss
            WHERE ss.session_id = sessions_schedule.id
              AND ss.student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        )
        OR EXISTS (
            SELECT 1 FROM session_students ss
            WHERE ss.session_id = sessions_schedule.id
              AND is_parent_of(ss.student_id)
        )
        OR get_user_role() = 'coach'
    );

-- INSERT: coaches can create sessions
CREATE POLICY sessions_schedule_insert ON sessions_schedule
    FOR INSERT WITH CHECK (
        get_user_role() = 'coach'
    );

-- UPDATE: coaches can update their own sessions
CREATE POLICY sessions_schedule_update ON sessions_schedule
    FOR UPDATE USING (
        coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    );

-- ============================================================================
-- RLS POLICIES: session_students
-- ============================================================================

-- SELECT: same visibility as sessions_schedule
CREATE POLICY session_students_select ON session_students
    FOR SELECT USING (
        EXISTS (
            SELECT 1 FROM sessions_schedule s
            WHERE s.id = session_students.session_id
              AND (
                  s.coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
                  OR student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
                  OR is_parent_of(student_id)
                  OR get_user_role() = 'coach'
              )
        )
    );

-- ============================================================================
-- SEED DATA: tracks
-- ============================================================================

INSERT INTO tracks (name, description, icon, color) VALUES
    ('coding', 'Coding & App Development', '💻', '#2a9d8f'),
    ('ai',     'AI & Machine Learning',    '🤖', '#e8614d'),
    ('chess',  'Chess & Strategy',          '♟️', '#d4a843');

-- ============================================================================
-- DONE
-- ============================================================================
