-- ============================================================================
-- COGNITRON — COMBINED MIGRATION (ALL 6 FILES)
-- ============================================================================
-- Run this in Supabase Dashboard → SQL Editor → New Query → Paste → Run
-- ============================================================================

-- ============================================================================
-- FILE 1: 20250101000000_initial_schema.sql
-- ============================================================================

CREATE EXTENSION IF NOT EXISTS "pgcrypto";

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

CREATE TABLE parent_student_links (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id   uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    student_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    created_at  timestamptz DEFAULT now() NOT NULL,
    UNIQUE(parent_id, student_id)
);

CREATE TABLE coach_assignments (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    coach_id    uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    student_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    track       text        NOT NULL,
    active      boolean     DEFAULT true NOT NULL,
    created_at  timestamptz DEFAULT now() NOT NULL,
    UNIQUE(coach_id, student_id, track)
);

CREATE TABLE tracks (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    name        text        NOT NULL UNIQUE CHECK (name IN ('coding', 'ai', 'chess')),
    description text        NOT NULL,
    icon        text        NOT NULL,
    color       text        NOT NULL,
    created_at  timestamptz DEFAULT now() NOT NULL
);

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

CREATE TABLE student_achievements (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id      uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    achievement_id  uuid        REFERENCES achievements(id) ON DELETE CASCADE NOT NULL,
    earned_at       timestamptz DEFAULT now() NOT NULL,
    UNIQUE(student_id, achievement_id)
);

CREATE TABLE xp_events (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    event_type  text        NOT NULL,
    xp_amount   integer     NOT NULL,
    track_id    uuid        REFERENCES tracks(id) ON DELETE SET NULL,
    description text,
    created_at  timestamptz DEFAULT now() NOT NULL
);

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

CREATE TABLE session_students (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    session_id  uuid        REFERENCES sessions_schedule(id) ON DELETE CASCADE NOT NULL,
    student_id  uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    UNIQUE(session_id, student_id)
);

-- Indexes
CREATE INDEX idx_profiles_user_id             ON profiles(user_id);
CREATE INDEX idx_profiles_role                ON profiles(role);
CREATE INDEX idx_student_progress_student_id  ON student_progress(student_id);
CREATE INDEX idx_student_progress_lesson_id   ON student_progress(lesson_id);
CREATE INDEX idx_xp_events_student_id         ON xp_events(student_id);
CREATE INDEX idx_xp_events_created_at         ON xp_events(created_at);
CREATE INDEX idx_sessions_schedule_coach_id   ON sessions_schedule(coach_id);
CREATE INDEX idx_sessions_schedule_scheduled  ON sessions_schedule(scheduled_at);
CREATE INDEX idx_student_achievements_student ON student_achievements(student_id);

-- Helper functions
CREATE OR REPLACE FUNCTION get_user_role()
RETURNS text LANGUAGE sql STABLE SECURITY DEFINER AS $$
    SELECT role FROM profiles WHERE user_id = auth.uid() LIMIT 1;
$$;

CREATE OR REPLACE FUNCTION is_parent_of(student_profile_id uuid)
RETURNS boolean LANGUAGE sql STABLE SECURITY DEFINER AS $$
    SELECT EXISTS (
        SELECT 1 FROM parent_student_links psl
        JOIN profiles p ON p.id = psl.parent_id
        WHERE psl.student_id = student_profile_id AND p.user_id = auth.uid()
    );
$$;

-- Auto-create profile trigger
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS trigger LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
    INSERT INTO public.profiles (user_id, role, first_name, last_name)
    VALUES (
        NEW.id,
        COALESCE(NEW.raw_user_meta_data ->> 'role', 'student'),
        COALESCE(NEW.raw_user_meta_data ->> 'first_name', ''),
        COALESCE(NEW.raw_user_meta_data ->> 'last_name', '')
    );
    RETURN NEW;
END;
$$;

CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION handle_new_user();

-- Enable RLS on all tables
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

-- RLS Policies
CREATE POLICY profiles_select ON profiles FOR SELECT USING (
    user_id = auth.uid() OR is_parent_of(id) OR get_user_role() = 'coach'
);
CREATE POLICY profiles_update ON profiles FOR UPDATE USING (user_id = auth.uid());
CREATE POLICY profiles_insert ON profiles FOR INSERT WITH CHECK (false);

CREATE POLICY parent_student_links_select ON parent_student_links FOR SELECT USING (
    parent_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR get_user_role() = 'coach'
);

CREATE POLICY coach_assignments_select ON coach_assignments FOR SELECT USING (
    coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR get_user_role() = 'coach'
);

CREATE POLICY tracks_select ON tracks FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY levels_select ON levels FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY modules_select ON modules FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY lessons_select ON lessons FOR SELECT USING (auth.uid() IS NOT NULL);
CREATE POLICY achievements_select ON achievements FOR SELECT USING (auth.uid() IS NOT NULL);

CREATE POLICY student_progress_select ON student_progress FOR SELECT USING (
    student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR is_parent_of(student_id) OR get_user_role() = 'coach'
);
CREATE POLICY student_progress_insert ON student_progress FOR INSERT WITH CHECK (
    student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY student_progress_update ON student_progress FOR UPDATE USING (
    student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

CREATE POLICY student_achievements_select ON student_achievements FOR SELECT USING (
    student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR is_parent_of(student_id) OR get_user_role() = 'coach'
);

CREATE POLICY xp_events_select ON xp_events FOR SELECT USING (
    student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR is_parent_of(student_id) OR get_user_role() = 'coach'
);
CREATE POLICY xp_events_insert ON xp_events FOR INSERT WITH CHECK (
    student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

CREATE POLICY sessions_schedule_select ON sessions_schedule FOR SELECT USING (
    coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
    OR EXISTS (SELECT 1 FROM session_students ss WHERE ss.session_id = sessions_schedule.id
        AND ss.student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
    OR EXISTS (SELECT 1 FROM session_students ss WHERE ss.session_id = sessions_schedule.id
        AND is_parent_of(ss.student_id))
    OR get_user_role() = 'coach'
);
CREATE POLICY sessions_schedule_insert ON sessions_schedule FOR INSERT WITH CHECK (get_user_role() = 'coach');
CREATE POLICY sessions_schedule_update ON sessions_schedule FOR UPDATE USING (
    coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

CREATE POLICY session_students_select ON session_students FOR SELECT USING (
    EXISTS (SELECT 1 FROM sessions_schedule s WHERE s.id = session_students.session_id AND (
        s.coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
        OR is_parent_of(student_id) OR get_user_role() = 'coach'
    ))
);

-- Seed tracks
INSERT INTO tracks (name, description, icon, color) VALUES
    ('coding', 'Coding & App Development', '💻', '#2a9d8f'),
    ('ai',     'AI & Machine Learning',    '🤖', '#e8614d'),
    ('chess',  'Chess & Strategy',          '♟️', '#d4a843');


-- ============================================================================
-- FILE 2: 20250402000000_delete_rls_policies.sql
-- ============================================================================

CREATE POLICY profiles_delete ON profiles FOR DELETE USING (false);

CREATE POLICY parent_student_links_delete ON parent_student_links FOR DELETE USING (
    parent_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

CREATE POLICY coach_assignments_delete ON coach_assignments FOR DELETE USING (
    coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

CREATE POLICY student_progress_delete ON student_progress FOR DELETE USING (
    student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR is_parent_of(student_id)
);

CREATE POLICY student_achievements_delete ON student_achievements FOR DELETE USING (
    student_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()) OR is_parent_of(student_id)
);

CREATE POLICY xp_events_delete ON xp_events FOR DELETE USING (false);
CREATE POLICY tracks_delete ON tracks FOR DELETE USING (false);
CREATE POLICY levels_delete ON levels FOR DELETE USING (false);
CREATE POLICY modules_delete ON modules FOR DELETE USING (false);
CREATE POLICY lessons_delete ON lessons FOR DELETE USING (false);
CREATE POLICY achievements_delete ON achievements FOR DELETE USING (false);

CREATE POLICY sessions_schedule_delete ON sessions_schedule FOR DELETE USING (
    coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);

CREATE POLICY session_students_delete ON session_students FOR DELETE USING (
    EXISTS (SELECT 1 FROM sessions_schedule s WHERE s.id = session_students.session_id
        AND s.coach_id IN (SELECT id FROM profiles WHERE user_id = auth.uid()))
);


-- ============================================================================
-- FILE 3: 20250403000000_contact_submissions.sql
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

CREATE POLICY contact_submissions_insert ON contact_submissions
    FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE POLICY contact_submissions_select ON contact_submissions
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM profiles WHERE profiles.user_id = auth.uid() AND profiles.role = 'coach')
    );


-- ============================================================================
-- FILE 4: 20250404000000_seed_curriculum.sql (levels, modules, lessons, achievements)
-- ============================================================================

-- CODING levels
INSERT INTO levels (track_id, name, level_order, description, xp_required, badge_emoji) VALUES
    ((SELECT id FROM tracks WHERE name = 'coding'), 'Explorer',  1, 'Scratch basics for ages 5-8', 0, '🧭'),
    ((SELECT id FROM tracks WHERE name = 'coding'), 'Builder',   2, 'Python introduction for ages 9-12', 500, '🔨'),
    ((SELECT id FROM tracks WHERE name = 'coding'), 'Creator',   3, 'Web development for ages 13-15', 1500, '🎨'),
    ((SELECT id FROM tracks WHERE name = 'coding'), 'Innovator', 4, 'Full-stack development for ages 16-17', 3500, '🚀');

-- AI levels
INSERT INTO levels (track_id, name, level_order, description, xp_required, badge_emoji) VALUES
    ((SELECT id FROM tracks WHERE name = 'ai'), 'Curious',   1, 'What is AI? Ages 5-8', 0, '🔍'),
    ((SELECT id FROM tracks WHERE name = 'ai'), 'Thinker',   2, 'No-code ML for ages 9-12', 500, '🧠'),
    ((SELECT id FROM tracks WHERE name = 'ai'), 'Engineer',  3, 'Python ML for ages 13-15', 1500, '⚙️'),
    ((SELECT id FROM tracks WHERE name = 'ai'), 'Architect', 4, 'Deep learning intro for ages 16-17', 3500, '🏛️');

-- Chess levels
INSERT INTO levels (track_id, name, level_order, description, xp_required, badge_emoji) VALUES
    ((SELECT id FROM tracks WHERE name = 'chess'), 'Pawn',   1, 'Chess foundations for ages 5-8', 0, '♟️'),
    ((SELECT id FROM tracks WHERE name = 'chess'), 'Knight', 2, 'Intermediate chess for ages 9-12', 500, '♞'),
    ((SELECT id FROM tracks WHERE name = 'chess'), 'Bishop', 3, 'Advanced chess for ages 13-15', 1500, '♝'),
    ((SELECT id FROM tracks WHERE name = 'chess'), 'Rook',   4, 'Competitive chess for ages 16-17', 3500, '♜');

-- CODING modules
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 1), 'Scratch Fundamentals', 1, 'Learn the Scratch interface, sprites, and basic motion blocks', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 1), 'Animation & Simple Games', 2, 'Create animated stories and your first interactive game', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 2), 'Python Basics', 1, 'Variables, data types, input/output, and basic operations', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 2), 'Logic & Simple Projects', 2, 'Conditionals, loops, functions, and building small programs', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 3), 'HTML & CSS Foundations', 1, 'Structuring web pages, styling, layouts, and responsive design', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 3), 'JavaScript & Interactivity', 2, 'DOM manipulation, events, and building interactive mini-projects', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 4), 'React & Frontend Architecture', 1, 'Components, state, props, and single-page applications', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'coding') AND level_order = 4), 'Backend, APIs & Portfolio', 2, 'REST APIs, databases, authentication, and portfolio project', 4);

-- AI modules
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 1), 'Meet the Machines', 1, 'Discover what AI is, voice assistants, and smart devices', 3),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 1), 'AI Art & Image Fun', 2, 'Image recognition games, AI-generated art, and creative projects', 3),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 2), 'Teachable Machine & Data Patterns', 1, 'Train your first ML model', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 2), 'Chatbots & Smart Applications', 2, 'Build a chatbot and explore recommendation systems', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 3), 'Python for Data Science', 1, 'NumPy, pandas, data cleaning', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 3), 'Building ML Models', 2, 'Scikit-learn basics — classification, regression', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 4), 'Neural Networks & Deep Learning', 1, 'Perceptrons, neural network architecture, TensorFlow/Keras', 3),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'ai') AND level_order = 4), 'NLP & AI Ethics', 2, 'Natural language processing and responsible AI', 3);

-- Chess modules
INSERT INTO modules (level_id, name, module_order, description, lesson_count) VALUES
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 1), 'The Chessboard & Pieces', 1, 'Board setup, how each piece moves, and capturing', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 1), 'Check, Checkmate & Simple Tactics', 2, 'Understanding check, achieving checkmate', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 2), 'Opening Principles', 1, 'Controlling the center, developing pieces, king safety', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 2), 'Tactical Patterns', 2, 'Forks, pins, skewers, discovered attacks', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 3), 'Endgame Technique', 1, 'King and pawn endings, rook endings', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 3), 'Positional Play & Tournaments', 2, 'Pawn structure, piece activity, planning', 4),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 4), 'Advanced Strategy', 1, 'Prophylaxis, pawn breaks, imbalances', 3),
    ((SELECT id FROM levels WHERE track_id = (SELECT id FROM tracks WHERE name = 'chess') AND level_order = 4), 'Game Analysis & Competitive Play', 2, 'Annotating master games, improvement plans', 3);

-- Achievements
INSERT INTO achievements (name, description, icon, track_id, category, criteria) VALUES
    ('Explorer Complete', 'Completed the Explorer level!', '🧭', (SELECT id FROM tracks WHERE name = 'coding'), 'mastery', '{"level": "Explorer", "track": "coding"}'),
    ('Builder Complete', 'Completed the Builder level!', '🔨', (SELECT id FROM tracks WHERE name = 'coding'), 'mastery', '{"level": "Builder", "track": "coding"}'),
    ('Creator Complete', 'Completed the Creator level!', '🎨', (SELECT id FROM tracks WHERE name = 'coding'), 'mastery', '{"level": "Creator", "track": "coding"}'),
    ('Innovator Complete', 'Completed the Innovator level!', '🚀', (SELECT id FROM tracks WHERE name = 'coding'), 'mastery', '{"level": "Innovator", "track": "coding"}'),
    ('Curious Complete', 'Completed the Curious level!', '🔍', (SELECT id FROM tracks WHERE name = 'ai'), 'mastery', '{"level": "Curious", "track": "ai"}'),
    ('Thinker Complete', 'Completed the Thinker level!', '🧠', (SELECT id FROM tracks WHERE name = 'ai'), 'mastery', '{"level": "Thinker", "track": "ai"}'),
    ('Engineer Complete', 'Completed the Engineer level!', '⚙️', (SELECT id FROM tracks WHERE name = 'ai'), 'mastery', '{"level": "Engineer", "track": "ai"}'),
    ('Architect Complete', 'Completed the Architect level!', '🏛️', (SELECT id FROM tracks WHERE name = 'ai'), 'mastery', '{"level": "Architect", "track": "ai"}'),
    ('Pawn Complete', 'Completed the Pawn level!', '♟️', (SELECT id FROM tracks WHERE name = 'chess'), 'mastery', '{"level": "Pawn", "track": "chess"}'),
    ('Knight Complete', 'Completed the Knight level!', '♞', (SELECT id FROM tracks WHERE name = 'chess'), 'mastery', '{"level": "Knight", "track": "chess"}'),
    ('Bishop Complete', 'Completed the Bishop level!', '♝', (SELECT id FROM tracks WHERE name = 'chess'), 'mastery', '{"level": "Bishop", "track": "chess"}'),
    ('Rook Complete', 'Completed the Rook level!', '♜', (SELECT id FROM tracks WHERE name = 'chess'), 'mastery', '{"level": "Rook", "track": "chess"}'),
    ('Week Warrior', 'Maintained a 7-day learning streak!', '🔥', NULL, 'streak', '{"streak_days": 7}'),
    ('Monthly Master', 'Maintained a 30-day learning streak!', '⚡', NULL, 'streak', '{"streak_days": 30}'),
    ('Century Streak', 'Maintained a 100-day learning streak!', '💯', NULL, 'streak', '{"streak_days": 100}'),
    ('First Steps', 'Completed your very first lesson!', '👣', NULL, 'special', '{"type": "first_lesson"}'),
    ('Project Pioneer', 'Submitted your first project!', '🏗️', NULL, 'special', '{"type": "first_project"}'),
    ('Tournament Ready', 'Completed all preparation for competitive play!', '🏆', NULL, 'special', '{"type": "tournament_ready"}');


-- ============================================================================
-- FILE 5: 20250715000000_admin_tables.sql
-- ============================================================================

-- Add admin role
ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check CHECK (role IN ('student', 'parent', 'coach', 'admin'));

CREATE TABLE audit_log (
    id          uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    actor_id    uuid        REFERENCES profiles(id) ON DELETE SET NULL,
    action      text        NOT NULL,
    entity_type text        NOT NULL,
    entity_id   uuid,
    metadata    jsonb       DEFAULT '{}'::jsonb NOT NULL,
    ip_address  inet,
    created_at  timestamptz DEFAULT now() NOT NULL
);
CREATE INDEX idx_audit_log_actor   ON audit_log(actor_id);
CREATE INDEX idx_audit_log_entity  ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created ON audit_log(created_at DESC);

CREATE TABLE pricing_plans (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    name            text        NOT NULL,
    description     text,
    price_kes       integer     NOT NULL,
    price_usd       integer,
    billing_period  text        NOT NULL CHECK (billing_period IN ('monthly', 'termly', 'annual')),
    track           text        CHECK (track IN ('coding', 'ai', 'chess', 'bundle')),
    is_active       boolean     DEFAULT true NOT NULL,
    features        jsonb       DEFAULT '[]'::jsonb NOT NULL,
    created_at      timestamptz DEFAULT now() NOT NULL,
    updated_at      timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE invoices (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    parent_id       uuid        REFERENCES profiles(id) ON DELETE SET NULL,
    plan_id         uuid        REFERENCES pricing_plans(id) ON DELETE SET NULL,
    amount_kes      integer     NOT NULL,
    status          text        NOT NULL CHECK (status IN ('draft', 'sent', 'paid', 'overdue', 'cancelled')),
    due_date        date        NOT NULL,
    paid_at         timestamptz,
    invoice_number  text        NOT NULL UNIQUE,
    notes           text,
    created_at      timestamptz DEFAULT now() NOT NULL,
    updated_at      timestamptz DEFAULT now() NOT NULL
);
CREATE INDEX idx_invoices_parent ON invoices(parent_id);
CREATE INDEX idx_invoices_status ON invoices(status);

CREATE TABLE payments (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    invoice_id      uuid        REFERENCES invoices(id) ON DELETE SET NULL,
    parent_id       uuid        REFERENCES profiles(id) ON DELETE SET NULL,
    amount_kes      integer     NOT NULL,
    payment_method  text        NOT NULL CHECK (payment_method IN ('mpesa', 'card', 'bank_transfer', 'cash')),
    reference       text,
    status          text        NOT NULL CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
    processed_at    timestamptz,
    created_at      timestamptz DEFAULT now() NOT NULL
);
CREATE INDEX idx_payments_invoice ON payments(invoice_id);
CREATE INDEX idx_payments_parent  ON payments(parent_id);
CREATE INDEX idx_payments_status  ON payments(status);

CREATE TABLE churn_scores (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    student_id      uuid        REFERENCES profiles(id) ON DELETE CASCADE NOT NULL,
    score           numeric(4,2) NOT NULL CHECK (score >= 0 AND score <= 1),
    risk_level      text        NOT NULL CHECK (risk_level IN ('low', 'medium', 'high', 'critical')),
    factors         jsonb       DEFAULT '[]'::jsonb NOT NULL,
    computed_at     timestamptz DEFAULT now() NOT NULL
);
CREATE INDEX idx_churn_student ON churn_scores(student_id);
CREATE INDEX idx_churn_risk    ON churn_scores(risk_level);

CREATE TABLE referrals (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    referrer_id     uuid        REFERENCES profiles(id) ON DELETE SET NULL,
    referred_email  text        NOT NULL,
    referred_id     uuid        REFERENCES profiles(id) ON DELETE SET NULL,
    status          text        NOT NULL CHECK (status IN ('pending', 'signed_up', 'converted', 'rewarded')),
    reward_kes      integer,
    created_at      timestamptz DEFAULT now() NOT NULL,
    converted_at    timestamptz
);
CREATE INDEX idx_referrals_referrer ON referrals(referrer_id);

CREATE TABLE notification_templates (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    name            text        NOT NULL UNIQUE,
    subject         text        NOT NULL,
    body            text        NOT NULL,
    channel         text        NOT NULL CHECK (channel IN ('email', 'sms', 'whatsapp', 'in_app')),
    variables       jsonb       DEFAULT '[]'::jsonb NOT NULL,
    is_active       boolean     DEFAULT true NOT NULL,
    created_at      timestamptz DEFAULT now() NOT NULL,
    updated_at      timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE platform_announcements (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    title           text        NOT NULL,
    body            text        NOT NULL,
    audience        text        NOT NULL CHECK (audience IN ('all', 'students', 'parents', 'coaches')),
    is_active       boolean     DEFAULT true NOT NULL,
    starts_at       timestamptz,
    ends_at         timestamptz,
    created_at      timestamptz DEFAULT now() NOT NULL
);

CREATE TABLE platform_settings (
    key             text        PRIMARY KEY,
    value           jsonb       NOT NULL,
    description     text,
    updated_at      timestamptz DEFAULT now() NOT NULL,
    updated_by      uuid        REFERENCES profiles(id) ON DELETE SET NULL
);

CREATE TABLE alerts (
    id              uuid        DEFAULT gen_random_uuid() PRIMARY KEY,
    type            text        NOT NULL CHECK (type IN ('churn_risk', 'payment_failed', 'low_engagement', 'no_show', 'system')),
    severity        text        NOT NULL CHECK (severity IN ('info', 'warning', 'critical')),
    title           text        NOT NULL,
    description     text,
    entity_type     text,
    entity_id       uuid,
    is_read         boolean     DEFAULT false NOT NULL,
    is_resolved     boolean     DEFAULT false NOT NULL,
    created_at      timestamptz DEFAULT now() NOT NULL,
    resolved_at     timestamptz
);
CREATE INDEX idx_alerts_type     ON alerts(type);
CREATE INDEX idx_alerts_severity ON alerts(severity);
CREATE INDEX idx_alerts_unread   ON alerts(is_read, is_resolved);

-- RLS for admin tables
ALTER TABLE audit_log ENABLE ROW LEVEL SECURITY;
ALTER TABLE pricing_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE invoices ENABLE ROW LEVEL SECURITY;
ALTER TABLE payments ENABLE ROW LEVEL SECURITY;
ALTER TABLE churn_scores ENABLE ROW LEVEL SECURITY;
ALTER TABLE referrals ENABLE ROW LEVEL SECURITY;
ALTER TABLE notification_templates ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE platform_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE alerts ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean LANGUAGE sql SECURITY DEFINER STABLE AS $$
    SELECT EXISTS (SELECT 1 FROM profiles WHERE user_id = auth.uid() AND role = 'admin');
$$;

CREATE POLICY admin_all_audit_log ON audit_log FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_pricing_plans ON pricing_plans FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_invoices ON invoices FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_payments ON payments FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_churn_scores ON churn_scores FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_referrals ON referrals FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_notification_templates ON notification_templates FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_platform_announcements ON platform_announcements FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_platform_settings ON platform_settings FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_alerts ON alerts FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY parent_read_invoices ON invoices FOR SELECT USING (
    parent_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY parent_read_payments ON payments FOR SELECT USING (
    parent_id IN (SELECT id FROM profiles WHERE user_id = auth.uid())
);
CREATE POLICY read_active_announcements ON platform_announcements FOR SELECT USING (is_active = true);
CREATE POLICY read_active_plans ON pricing_plans FOR SELECT USING (is_active = true);

CREATE POLICY admin_all_profiles ON profiles FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_coach_assignments ON coach_assignments FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_sessions_schedule ON sessions_schedule FOR ALL USING (is_admin()) WITH CHECK (is_admin());
CREATE POLICY admin_all_student_progress ON student_progress FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Admin metric functions
CREATE OR REPLACE FUNCTION admin_get_mrr()
RETURNS integer LANGUAGE sql SECURITY DEFINER STABLE AS $$
    SELECT COALESCE(SUM(pp.price_kes), 0)::integer
    FROM invoices i JOIN pricing_plans pp ON i.plan_id = pp.id
    WHERE i.status = 'paid' AND i.paid_at >= date_trunc('month', now()) AND pp.billing_period = 'monthly';
$$;

CREATE OR REPLACE FUNCTION admin_get_active_students()
RETURNS integer LANGUAGE sql SECURITY DEFINER STABLE AS $$
    SELECT COUNT(DISTINCT sp.student_id)::integer FROM student_progress sp WHERE sp.completed_at >= now() - interval '30 days';
$$;

CREATE OR REPLACE FUNCTION admin_get_churn_rate()
RETURNS numeric(5,2) LANGUAGE sql SECURITY DEFINER STABLE AS $$
    SELECT CASE WHEN (SELECT COUNT(*) FROM profiles WHERE role = 'student') = 0 THEN 0
    ELSE (SELECT (COUNT(*)::numeric / (SELECT COUNT(*) FROM profiles WHERE role = 'student') * 100)
        FROM profiles p WHERE p.role = 'student' AND NOT EXISTS (
            SELECT 1 FROM student_progress sp WHERE sp.student_id = p.id AND sp.completed_at >= now() - interval '14 days'
        )) END;
$$;

CREATE OR REPLACE FUNCTION admin_get_completion_rate()
RETURNS numeric(5,2) LANGUAGE sql SECURITY DEFINER STABLE AS $$
    SELECT CASE WHEN COUNT(*) = 0 THEN 0
    ELSE (COUNT(*) FILTER (WHERE status = 'completed')::numeric / COUNT(*) * 100)
    END FROM student_progress;
$$;


-- ============================================================================
-- FILE 6: 20250716000000_approval_gate.sql
-- ============================================================================

ALTER TABLE profiles
  ADD COLUMN approved boolean NOT NULL DEFAULT false,
  ADD COLUMN approved_at timestamptz,
  ADD COLUMN approved_by uuid REFERENCES profiles(id);

UPDATE profiles SET approved = true;

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


-- ============================================================================
-- DONE — All migrations applied
-- ============================================================================
