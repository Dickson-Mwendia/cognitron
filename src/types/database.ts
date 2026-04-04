export type Database = {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          user_id: string
          role: 'student' | 'parent' | 'coach'
          first_name: string
          last_name: string
          avatar_url: string | null
          date_of_birth: string | null
          age_tier: '5-8' | '9-12' | '13-17' | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          role: 'student' | 'parent' | 'coach'
          first_name: string
          last_name: string
          avatar_url?: string | null
          date_of_birth?: string | null
          age_tier?: '5-8' | '9-12' | '13-17' | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          role?: 'student' | 'parent' | 'coach'
          first_name?: string
          last_name?: string
          avatar_url?: string | null
          date_of_birth?: string | null
          age_tier?: '5-8' | '9-12' | '13-17' | null
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
export type UserRole = 'student' | 'parent' | 'coach'
export type AgeTier = '5-8' | '9-12' | '13-17'
export type TrackName = 'coding' | 'ai' | 'chess'
export type ContentType = 'live' | 'practice' | 'project' | 'assessment'
export type LessonStatus = 'not_started' | 'in_progress' | 'completed'
export type SessionLocationType = 'home' | 'online'
export type SessionStatus = 'scheduled' | 'completed' | 'cancelled' | 'rescheduled'
export type AchievementCategory = 'mastery' | 'streak' | 'practice' | 'speed' | 'mentor' | 'competition' | 'special'
