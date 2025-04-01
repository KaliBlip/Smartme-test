export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type UserRole = "student" | "admin"
export type UserStatus = "active" | "pending" | "inactive"
export type EducationLevel = "jhs" | "shs" | "n/a"

export interface UserProfile {
  id: string
  user_id: string
  name: string
  email: string
  role: UserRole
  status: UserStatus
  level: EducationLevel
  avatar_url?: string
  quizzes_taken: number
  total_score: number
  average_score: number
  last_quiz_date: string | null
  created_at: string
  updated_at: string
}

export interface UserSettings {
  id: string
  user_id: string
  email_notifications: boolean
  push_notifications: boolean
  weekly_report: boolean
  theme: "light" | "dark" | "system"
  created_at: string
  updated_at: string
}

export interface UserStats {
  id: string
  user_id: string
  quizzes_taken: number
  total_score: number
  average_score: number
  last_quiz_date: string
  created_at: string
  updated_at: string
}

export type QuestionType = "multiple_choice" | "true_false" | "short_answer"
export type DifficultyLevel = "easy" | "medium" | "hard"

export interface Question {
  id: string
  created_at: string
  question_text: string
  subject_id: string
  question_type: QuestionType
  difficulty_level: DifficultyLevel
  correct_answer: string
  options: string[]
  explanation: string | null
  status: "active" | "inactive"
}

export interface Database {
  public: {
    Tables: {
      users: {
        Row: {
          id: string
          created_at: string
          email: string
          name: string | null
          role: 'admin' | 'student'
          level: 'JHS' | 'SHS' | null
          status: 'active' | 'pending' | 'inactive'
          quizzes_taken: number
          average_score: number | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          name?: string | null
          role: 'admin' | 'student'
          level?: 'JHS' | 'SHS' | null
          status?: 'active' | 'pending' | 'inactive'
          quizzes_taken?: number
          average_score?: number | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          name?: string | null
          role?: 'admin' | 'student'
          level?: 'JHS' | 'SHS' | null
          status?: 'active' | 'pending' | 'inactive'
          quizzes_taken?: number
          average_score?: number | null
        }
      }
      questions: {
        Row: Question
        Insert: Omit<Question, "id" | "created_at">
        Update: Partial<Omit<Question, "id" | "created_at">>
      }
      subjects: {
        Row: {
          id: string
          created_at: string
          name: string
          description: string | null
          level: 'JHS' | 'SHS'
          status: 'active' | 'inactive'
          questions_count: number
          quizzes_count: number
        }
        Insert: {
          id?: string
          created_at?: string
          name: string
          description?: string | null
          level: 'JHS' | 'SHS'
          status?: 'active' | 'inactive'
          questions_count?: number
          quizzes_count?: number
        }
        Update: {
          id?: string
          created_at?: string
          name?: string
          description?: string | null
          level?: 'JHS' | 'SHS'
          status?: 'active' | 'inactive'
          questions_count?: number
          quizzes_count?: number
        }
      }
      quizzes: {
        Row: {
          id: string
          created_at: string
          user_id: string
          subject: string
          score: number
          time_taken: number
          completed_at: string
        }
        Insert: {
          id?: string
          created_at?: string
          user_id: string
          subject: string
          score: number
          time_taken: number
          completed_at: string
        }
        Update: {
          id?: string
          created_at?: string
          user_id?: string
          subject?: string
          score?: number
          time_taken?: number
          completed_at?: string
        }
      }
      user_profiles: {
        Row: UserProfile
        Insert: Omit<UserProfile, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<UserProfile, "id" | "created_at" | "updated_at">>
      }
      user_settings: {
        Row: UserSettings
        Insert: Omit<UserSettings, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<UserSettings, "id" | "created_at" | "updated_at">>
      }
      user_stats: {
        Row: UserStats
        Insert: Omit<UserStats, "id" | "created_at" | "updated_at">
        Update: Partial<Omit<UserStats, "id" | "created_at" | "updated_at">>
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
} 