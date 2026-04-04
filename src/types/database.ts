export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: 'student' | 'parent' | 'coach' | 'admin'
          first_name: string
          last_name: string
          avatar_url: string | null
          date_of_birth: string | null
          age_tier: '5-8' | '9-12' | '13-17' | null
          approved: boolean
          approved_at: string | null
          approved_by: string | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'student' | 'parent' | 'coach' | 'admin'
          first_name: string
          last_name: string
          avatar_url?: string | null
          date_of_birth?: string | null
          age_tier?: '5-8' | '9-12' | '13-17' | null
          approved?: boolean
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'student' | 'parent' | 'coach' | 'admin'
          first_name?: string
          last_name?: string
          avatar_url?: string | null
          date_of_birth?: string | null
          age_tier?: '5-8' | '9-12' | '13-17' | null
          approved?: boolean
          approved_at?: string | null
          approved_by?: string | null
          created_at?: string
        }
      }
      parent_student_links: {
        Row: {
          id: string
          parent_id: string
          student_id: string
          created_at: string
        }
        Insert: {
          id?: string
          parent_id: string
          student_id: string
          created_at?: string
        }
        Update: {
          id?: string
          parent_id?: string
          student_id?: string
          created_at?: string
        }
      }
      coach_assignments: {
        Row: {
          id: string
          coach_id: string
          student_id: string
          track: string
          active: boolean
          created_at: string
        }
        Insert: {
          id?: string
          coach_id: string
          student_id: string
          track: string
          active?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          coach_id?: string
          student_id?: string
          track?: string
          active?: boolean
          created_at?: string
        }
      }
      tracks: {
        Row: {
          id: string
          name: 'coding' | 'ai' | 'chess'
          description: string
          icon: string
          color: string
        }
        Insert: {
          id?: string
          name: 'coding' | 'ai' | 'chess'
          description: string
          icon: string
          color: string
        }
        Update: {
          id?: string
          name?: 'coding' | 'ai' | 'chess'
          description?: string
          icon?: string
          color?: string
        }
      }
      levels: {
        Row: {
          id: string
          track_id: string
          name: string
          level_order: number
          description: string
          xp_required: number
          badge_emoji: string
        }
        Insert: {
          id?: string
          track_id: string
          name: string
          level_order: number
          description: string
          xp_required: number
          badge_emoji: string
        }
        Update: {
          id?: string
          track_id?: string
          name?: string
          level_order?: number
          description?: string
          xp_required?: number
          badge_emoji?: string
        }
      }
      modules: {
        Row: {
          id: string
          level_id: string
          name: string
          module_order: number
          description: string
          lesson_count: number
        }
        Insert: {
          id?: string
          level_id: string
          name: string
          module_order: number
          description: string
          lesson_count: number
        }
        Update: {
          id?: string
          level_id?: string
          name?: string
          module_order?: number
          description?: string
          lesson_count?: number
        }
      }
      lessons: {
        Row: {
          id: string
          module_id: string
          name: string
          lesson_order: number
          description: string
          duration_minutes: number
          content_type: 'live' | 'practice' | 'project' | 'assessment'
        }
        Insert: {
          id?: string
          module_id: string
          name: string
          lesson_order: number
          description: string
          duration_minutes: number
          content_type: 'live' | 'practice' | 'project' | 'assessment'
        }
        Update: {
          id?: string
          module_id?: string
          name?: string
          lesson_order?: number
          description?: string
          duration_minutes?: number
          content_type?: 'live' | 'practice' | 'project' | 'assessment'
        }
      }
      student_progress: {
        Row: {
          id: string
          student_id: string
          lesson_id: string
          status: 'not_started' | 'in_progress' | 'completed'
          score: number | null
          started_at: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          student_id: string
          lesson_id: string
          status?: 'not_started' | 'in_progress' | 'completed'
          score?: number | null
          started_at?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          student_id?: string
          lesson_id?: string
          status?: 'not_started' | 'in_progress' | 'completed'
          score?: number | null
          started_at?: string | null
          completed_at?: string | null
        }
      }
      achievements: {
        Row: {
          id: string
          name: string
          description: string
          icon: string
          track_id: string | null
          category: 'mastery' | 'streak' | 'practice' | 'speed' | 'mentor' | 'competition' | 'special'
          criteria: Record<string, unknown>
        }
        Insert: {
          id?: string
          name: string
          description: string
          icon: string
          track_id?: string | null
          category: 'mastery' | 'streak' | 'practice' | 'speed' | 'mentor' | 'competition' | 'special'
          criteria: Record<string, unknown>
        }
        Update: {
          id?: string
          name?: string
          description?: string
          icon?: string
          track_id?: string | null
          category?: 'mastery' | 'streak' | 'practice' | 'speed' | 'mentor' | 'competition' | 'special'
          criteria?: Record<string, unknown>
        }
      }
      student_achievements: {
        Row: {
          id: string
          student_id: string
          achievement_id: string
          earned_at: string
        }
        Insert: {
          id?: string
          student_id: string
          achievement_id: string
          earned_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          achievement_id?: string
          earned_at?: string
        }
      }
      xp_events: {
        Row: {
          id: string
          student_id: string
          event_type: string
          xp_amount: number
          track_id: string | null
          description: string | null
          created_at: string
        }
        Insert: {
          id?: string
          student_id: string
          event_type: string
          xp_amount: number
          track_id?: string | null
          description?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          event_type?: string
          xp_amount?: number
          track_id?: string | null
          description?: string | null
          created_at?: string
        }
      }
      sessions_schedule: {
        Row: {
          id: string
          coach_id: string
          track_id: string
          scheduled_at: string
          duration_minutes: number
          location_type: 'home' | 'online'
          status: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
          notes: string | null
          created_at: string
        }
        Insert: {
          id?: string
          coach_id: string
          track_id: string
          scheduled_at: string
          duration_minutes: number
          location_type: 'home' | 'online'
          status?: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
          notes?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          coach_id?: string
          track_id?: string
          scheduled_at?: string
          duration_minutes?: number
          location_type?: 'home' | 'online'
          status?: 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
          notes?: string | null
          created_at?: string
        }
      }
      session_students: {
        Row: {
          id: string
          session_id: string
          student_id: string
        }
        Insert: {
          id?: string
          session_id: string
          student_id: string
        }
        Update: {
          id?: string
          session_id?: string
          student_id?: string
        }
      }
      contact_submissions: {
        Row: {
          id: string
          name: string
          phone: string
          email: string | null
          child_age: string | null
          interest: string | null
          format: string | null
          message: string | null
          status: 'new' | 'contacted' | 'enrolled' | 'closed'
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          phone: string
          email?: string | null
          child_age?: string | null
          interest?: string | null
          format?: string | null
          message?: string | null
          status?: 'new' | 'contacted' | 'enrolled' | 'closed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          phone?: string
          email?: string | null
          child_age?: string | null
          interest?: string | null
          format?: string | null
          message?: string | null
          status?: 'new' | 'contacted' | 'enrolled' | 'closed'
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Relationships: []
      }
      audit_log: {
        Row: {
          id: string
          actor_id: string | null
          action: string
          entity_type: string
          entity_id: string | null
          metadata: Record<string, unknown>
          ip_address: string | null
          created_at: string
        }
        Insert: {
          id?: string
          actor_id?: string | null
          action: string
          entity_type: string
          entity_id?: string | null
          metadata?: Record<string, unknown>
          ip_address?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          actor_id?: string | null
          action?: string
          entity_type?: string
          entity_id?: string | null
          metadata?: Record<string, unknown>
          ip_address?: string | null
          created_at?: string
        }
      }
      pricing_plans: {
        Row: {
          id: string
          name: string
          description: string | null
          price_kes: number
          price_usd: number | null
          billing_period: 'monthly' | 'termly' | 'annual'
          track: 'coding' | 'ai' | 'chess' | 'bundle' | null
          is_active: boolean
          features: string[]
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          price_kes: number
          price_usd?: number | null
          billing_period: 'monthly' | 'termly' | 'annual'
          track?: 'coding' | 'ai' | 'chess' | 'bundle' | null
          is_active?: boolean
          features?: string[]
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          price_kes?: number
          price_usd?: number | null
          billing_period?: 'monthly' | 'termly' | 'annual'
          track?: 'coding' | 'ai' | 'chess' | 'bundle' | null
          is_active?: boolean
          features?: string[]
          created_at?: string
          updated_at?: string
        }
      }
      invoices: {
        Row: {
          id: string
          parent_id: string | null
          plan_id: string | null
          amount_kes: number
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_at: string | null
          invoice_number: string
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          parent_id?: string | null
          plan_id?: string | null
          amount_kes: number
          status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date: string
          paid_at?: string | null
          invoice_number: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          parent_id?: string | null
          plan_id?: string | null
          amount_kes?: number
          status?: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
          due_date?: string
          paid_at?: string | null
          invoice_number?: string
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          invoice_id: string | null
          parent_id: string | null
          amount_kes: number
          payment_method: 'mpesa' | 'card' | 'bank_transfer' | 'cash'
          reference: string | null
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          processed_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          invoice_id?: string | null
          parent_id?: string | null
          amount_kes: number
          payment_method: 'mpesa' | 'card' | 'bank_transfer' | 'cash'
          reference?: string | null
          status: 'pending' | 'completed' | 'failed' | 'refunded'
          processed_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          invoice_id?: string | null
          parent_id?: string | null
          amount_kes?: number
          payment_method?: 'mpesa' | 'card' | 'bank_transfer' | 'cash'
          reference?: string | null
          status?: 'pending' | 'completed' | 'failed' | 'refunded'
          processed_at?: string | null
          created_at?: string
        }
      }
      churn_scores: {
        Row: {
          id: string
          student_id: string
          score: number
          risk_level: 'low' | 'medium' | 'high' | 'critical'
          factors: string[]
          computed_at: string
        }
        Insert: {
          id?: string
          student_id: string
          score: number
          risk_level: 'low' | 'medium' | 'high' | 'critical'
          factors?: string[]
          computed_at?: string
        }
        Update: {
          id?: string
          student_id?: string
          score?: number
          risk_level?: 'low' | 'medium' | 'high' | 'critical'
          factors?: string[]
          computed_at?: string
        }
      }
      referrals: {
        Row: {
          id: string
          referrer_id: string | null
          referred_email: string
          referred_id: string | null
          status: 'pending' | 'signed_up' | 'converted' | 'rewarded'
          reward_kes: number | null
          created_at: string
          converted_at: string | null
        }
        Insert: {
          id?: string
          referrer_id?: string | null
          referred_email: string
          referred_id?: string | null
          status: 'pending' | 'signed_up' | 'converted' | 'rewarded'
          reward_kes?: number | null
          created_at?: string
          converted_at?: string | null
        }
        Update: {
          id?: string
          referrer_id?: string | null
          referred_email?: string
          referred_id?: string | null
          status?: 'pending' | 'signed_up' | 'converted' | 'rewarded'
          reward_kes?: number | null
          created_at?: string
          converted_at?: string | null
        }
      }
      notification_templates: {
        Row: {
          id: string
          name: string
          subject: string
          body: string
          channel: 'email' | 'sms' | 'whatsapp' | 'in_app'
          variables: string[]
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          subject: string
          body: string
          channel: 'email' | 'sms' | 'whatsapp' | 'in_app'
          variables?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          subject?: string
          body?: string
          channel?: 'email' | 'sms' | 'whatsapp' | 'in_app'
          variables?: string[]
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      platform_announcements: {
        Row: {
          id: string
          title: string
          body: string
          audience: 'all' | 'students' | 'parents' | 'coaches'
          is_active: boolean
          starts_at: string | null
          ends_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          body: string
          audience: 'all' | 'students' | 'parents' | 'coaches'
          is_active?: boolean
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          body?: string
          audience?: 'all' | 'students' | 'parents' | 'coaches'
          is_active?: boolean
          starts_at?: string | null
          ends_at?: string | null
          created_at?: string
        }
      }
      platform_settings: {
        Row: {
          key: string
          value: Record<string, unknown>
          description: string | null
          updated_at: string
          updated_by: string | null
        }
        Insert: {
          key: string
          value: Record<string, unknown>
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
        Update: {
          key?: string
          value?: Record<string, unknown>
          description?: string | null
          updated_at?: string
          updated_by?: string | null
        }
      }
      alerts: {
        Row: {
          id: string
          type: 'churn_risk' | 'payment_failed' | 'low_engagement' | 'no_show' | 'system'
          severity: 'info' | 'warning' | 'critical'
          title: string
          description: string | null
          entity_type: string | null
          entity_id: string | null
          is_read: boolean
          is_resolved: boolean
          created_at: string
          resolved_at: string | null
        }
        Insert: {
          id?: string
          type: 'churn_risk' | 'payment_failed' | 'low_engagement' | 'no_show' | 'system'
          severity: 'info' | 'warning' | 'critical'
          title: string
          description?: string | null
          entity_type?: string | null
          entity_id?: string | null
          is_read?: boolean
          is_resolved?: boolean
          created_at?: string
          resolved_at?: string | null
        }
        Update: {
          id?: string
          type?: 'churn_risk' | 'payment_failed' | 'low_engagement' | 'no_show' | 'system'
          severity?: 'info' | 'warning' | 'critical'
          title?: string
          description?: string | null
          entity_type?: string | null
          entity_id?: string | null
          is_read?: boolean
          is_resolved?: boolean
          created_at?: string
          resolved_at?: string | null
        }
      }
    }
    Views: Record<string, never>
    Functions: Record<string, never>
    Enums: Record<string, never>
  }
}

// Convenience row types
export type Profile = Database['public']['Tables']['profiles']['Row']
export type ParentStudentLink = Database['public']['Tables']['parent_student_links']['Row']
export type CoachAssignment = Database['public']['Tables']['coach_assignments']['Row']
export type Track = Database['public']['Tables']['tracks']['Row']
export type Level = Database['public']['Tables']['levels']['Row']
export type Module = Database['public']['Tables']['modules']['Row']
export type Lesson = Database['public']['Tables']['lessons']['Row']
export type StudentProgress = Database['public']['Tables']['student_progress']['Row']
export type Achievement = Database['public']['Tables']['achievements']['Row']
export type StudentAchievement = Database['public']['Tables']['student_achievements']['Row']
export type XpEvent = Database['public']['Tables']['xp_events']['Row']
export type SessionSchedule = Database['public']['Tables']['sessions_schedule']['Row']
export type SessionStudent = Database['public']['Tables']['session_students']['Row']

// Convenience insert types
export type ProfileInsert = Database['public']['Tables']['profiles']['Insert']
export type ParentStudentLinkInsert = Database['public']['Tables']['parent_student_links']['Insert']
export type CoachAssignmentInsert = Database['public']['Tables']['coach_assignments']['Insert']
export type TrackInsert = Database['public']['Tables']['tracks']['Insert']
export type LevelInsert = Database['public']['Tables']['levels']['Insert']
export type ModuleInsert = Database['public']['Tables']['modules']['Insert']
export type LessonInsert = Database['public']['Tables']['lessons']['Insert']
export type StudentProgressInsert = Database['public']['Tables']['student_progress']['Insert']
export type AchievementInsert = Database['public']['Tables']['achievements']['Insert']
export type StudentAchievementInsert = Database['public']['Tables']['student_achievements']['Insert']
export type XpEventInsert = Database['public']['Tables']['xp_events']['Insert']
export type SessionScheduleInsert = Database['public']['Tables']['sessions_schedule']['Insert']
export type SessionStudentInsert = Database['public']['Tables']['session_students']['Insert']

// Convenience update types
export type ProfileUpdate = Database['public']['Tables']['profiles']['Update']
export type ParentStudentLinkUpdate = Database['public']['Tables']['parent_student_links']['Update']
export type CoachAssignmentUpdate = Database['public']['Tables']['coach_assignments']['Update']
export type TrackUpdate = Database['public']['Tables']['tracks']['Update']
export type LevelUpdate = Database['public']['Tables']['levels']['Update']
export type ModuleUpdate = Database['public']['Tables']['modules']['Update']
export type LessonUpdate = Database['public']['Tables']['lessons']['Update']
export type StudentProgressUpdate = Database['public']['Tables']['student_progress']['Update']
export type AchievementUpdate = Database['public']['Tables']['achievements']['Update']
export type StudentAchievementUpdate = Database['public']['Tables']['student_achievements']['Update']
export type XpEventUpdate = Database['public']['Tables']['xp_events']['Update']
export type SessionScheduleUpdate = Database['public']['Tables']['sessions_schedule']['Update']
export type SessionStudentUpdate = Database['public']['Tables']['session_students']['Update']

// Enum union types
export type UserRole = 'student' | 'parent' | 'coach' | 'admin'
export type AgeTier = '5-8' | '9-12' | '13-17'
export type TrackName = 'coding' | 'ai' | 'chess'
export type ContentType = 'live' | 'practice' | 'project' | 'assessment'
export type LessonStatus = 'not_started' | 'in_progress' | 'completed'
export type SessionLocationType = 'home' | 'online'
export type SessionStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
export type AchievementCategory = 'mastery' | 'streak' | 'practice' | 'speed' | 'mentor' | 'competition' | 'special'

// Admin table types
export type AuditLog = Database['public']['Tables']['audit_log']['Row']
export type AuditLogInsert = Database['public']['Tables']['audit_log']['Insert']
export type PricingPlan = Database['public']['Tables']['pricing_plans']['Row']
export type PricingPlanInsert = Database['public']['Tables']['pricing_plans']['Insert']
export type PricingPlanUpdate = Database['public']['Tables']['pricing_plans']['Update']
export type Invoice = Database['public']['Tables']['invoices']['Row']
export type InvoiceInsert = Database['public']['Tables']['invoices']['Insert']
export type InvoiceUpdate = Database['public']['Tables']['invoices']['Update']
export type Payment = Database['public']['Tables']['payments']['Row']
export type PaymentInsert = Database['public']['Tables']['payments']['Insert']
export type ChurnScore = Database['public']['Tables']['churn_scores']['Row']
export type Referral = Database['public']['Tables']['referrals']['Row']
export type NotificationTemplate = Database['public']['Tables']['notification_templates']['Row']
export type NotificationTemplateInsert = Database['public']['Tables']['notification_templates']['Insert']
export type NotificationTemplateUpdate = Database['public']['Tables']['notification_templates']['Update']
export type PlatformAnnouncement = Database['public']['Tables']['platform_announcements']['Row']
export type PlatformAnnouncementInsert = Database['public']['Tables']['platform_announcements']['Insert']
export type PlatformSetting = Database['public']['Tables']['platform_settings']['Row']
export type Alert = Database['public']['Tables']['alerts']['Row']
export type AlertInsert = Database['public']['Tables']['alerts']['Insert']
export type AlertType = 'churn_risk' | 'payment_failed' | 'low_engagement' | 'no_show' | 'system'
export type AlertSeverity = 'info' | 'warning' | 'critical'
export type InvoiceStatus = 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled'
export type PaymentMethod = 'mpesa' | 'card' | 'bank_transfer' | 'cash'
export type PaymentStatus = 'pending' | 'completed' | 'failed' | 'refunded'
export type ChurnRiskLevel = 'low' | 'medium' | 'high' | 'critical'
export type BillingPeriod = 'monthly' | 'termly' | 'annual'
export type NotificationChannel = 'email' | 'sms' | 'whatsapp' | 'in_app'
