-- ============================================================================
-- COGNITRON ADMIN DASHBOARD — SCHEMA ADDITIONS
-- ============================================================================
-- Adds tables for admin features: audit logging, billing/invoices, payments,
-- churn scoring, referrals, pricing plans, notifications, and platform settings.
-- Also adds 'admin' to the profiles role constraint.
-- ============================================================================

-- ============================================================================
-- UPDATE: Add 'admin' role to profiles check constraint
-- ============================================================================

ALTER TABLE profiles DROP CONSTRAINT IF EXISTS profiles_role_check;
ALTER TABLE profiles ADD CONSTRAINT profiles_role_check
    CHECK (role IN ('student', 'parent', 'coach', 'admin'));

-- ============================================================================
-- TABLE: audit_log
-- Records all significant admin / platform actions for compliance.
-- ============================================================================

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

CREATE INDEX idx_audit_log_actor    ON audit_log(actor_id);
CREATE INDEX idx_audit_log_entity   ON audit_log(entity_type, entity_id);
CREATE INDEX idx_audit_log_created  ON audit_log(created_at DESC);

-- ============================================================================
-- TABLE: pricing_plans
-- Defines available subscription / pricing tiers.
-- ============================================================================

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

-- ============================================================================
-- TABLE: invoices
-- Billing invoices tied to families / parents.
-- ============================================================================

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

-- ============================================================================
-- TABLE: payments
-- Individual payment transactions.
-- ============================================================================

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

-- ============================================================================
-- TABLE: churn_scores
-- Predictive churn risk for each student/family.
-- ============================================================================

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

-- ============================================================================
-- TABLE: referrals
-- Tracks family referral programme.
-- ============================================================================

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

-- ============================================================================
-- TABLE: notification_templates
-- Reusable notification / email templates for admin.
-- ============================================================================

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

-- ============================================================================
-- TABLE: platform_announcements
-- Site-wide announcements managed by admin.
-- ============================================================================

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

-- ============================================================================
-- TABLE: platform_settings
-- Key-value platform configuration.
-- ============================================================================

CREATE TABLE platform_settings (
    key             text        PRIMARY KEY,
    value           jsonb       NOT NULL,
    description     text,
    updated_at      timestamptz DEFAULT now() NOT NULL,
    updated_by      uuid        REFERENCES profiles(id) ON DELETE SET NULL
);

-- ============================================================================
-- TABLE: alerts
-- System-generated alerts for admin attention.
-- ============================================================================

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

-- ============================================================================
-- ROW LEVEL SECURITY
-- Admin can read/write everything. Others have no access to admin tables.
-- ============================================================================

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

-- Helper: check if current user is admin
CREATE OR REPLACE FUNCTION is_admin()
RETURNS boolean
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT EXISTS (
        SELECT 1 FROM profiles
        WHERE user_id = auth.uid()
        AND role = 'admin'
    );
$$;

-- Admin full access policies
CREATE POLICY admin_all_audit_log ON audit_log
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_pricing_plans ON pricing_plans
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_invoices ON invoices
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_payments ON payments
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_churn_scores ON churn_scores
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_referrals ON referrals
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_notification_templates ON notification_templates
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_platform_announcements ON platform_announcements
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_platform_settings ON platform_settings
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_alerts ON alerts
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- Parents can read their own invoices
CREATE POLICY parent_read_invoices ON invoices
    FOR SELECT USING (
        parent_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid()
        )
    );

-- Parents can read their own payments
CREATE POLICY parent_read_payments ON payments
    FOR SELECT USING (
        parent_id IN (
            SELECT id FROM profiles WHERE user_id = auth.uid()
        )
    );

-- Everyone can read active announcements
CREATE POLICY read_active_announcements ON platform_announcements
    FOR SELECT USING (is_active = true);

-- Everyone can read active pricing plans
CREATE POLICY read_active_plans ON pricing_plans
    FOR SELECT USING (is_active = true);

-- Admin can read all existing tables too
CREATE POLICY admin_all_profiles ON profiles
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_coach_assignments ON coach_assignments
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_sessions_schedule ON sessions_schedule
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

CREATE POLICY admin_all_student_progress ON student_progress
    FOR ALL USING (is_admin()) WITH CHECK (is_admin());

-- ============================================================================
-- FUNCTIONS: Aggregated metrics for admin dashboard
-- ============================================================================

-- Monthly Recurring Revenue (MRR) calculation
CREATE OR REPLACE FUNCTION admin_get_mrr()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT COALESCE(SUM(pp.price_kes), 0)::integer
    FROM invoices i
    JOIN pricing_plans pp ON i.plan_id = pp.id
    WHERE i.status = 'paid'
    AND i.paid_at >= date_trunc('month', now())
    AND pp.billing_period = 'monthly';
$$;

-- Active students count
CREATE OR REPLACE FUNCTION admin_get_active_students()
RETURNS integer
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT COUNT(DISTINCT sp.student_id)::integer
    FROM student_progress sp
    WHERE sp.completed_at >= now() - interval '30 days';
$$;

-- Churn rate (students inactive > 14 days / total students)
CREATE OR REPLACE FUNCTION admin_get_churn_rate()
RETURNS numeric(5,2)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT CASE
        WHEN (SELECT COUNT(*) FROM profiles WHERE role = 'student') = 0 THEN 0
        ELSE (
            SELECT (COUNT(*)::numeric / (SELECT COUNT(*) FROM profiles WHERE role = 'student') * 100)
            FROM profiles p
            WHERE p.role = 'student'
            AND NOT EXISTS (
                SELECT 1 FROM student_progress sp
                WHERE sp.student_id = p.id
                AND sp.completed_at >= now() - interval '14 days'
            )
        )
    END;
$$;

-- Lesson completion rate
CREATE OR REPLACE FUNCTION admin_get_completion_rate()
RETURNS numeric(5,2)
LANGUAGE sql
SECURITY DEFINER
STABLE
AS $$
    SELECT CASE
        WHEN COUNT(*) = 0 THEN 0
        ELSE (COUNT(*) FILTER (WHERE status = 'completed')::numeric / COUNT(*) * 100)
    END
    FROM student_progress;
$$;
