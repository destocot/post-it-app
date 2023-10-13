export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      posts: {
        Row: {
          color: string
          content: string
          created_at: string
          id: string
          pinned: boolean
          private: boolean
          title: string | null
          user_id: string
        }
        Insert: {
          color?: string
          content: string
          created_at?: string
          id?: string
          pinned?: boolean
          private?: boolean
          title?: string | null
          user_id: string
        }
        Update: {
          color?: string
          content?: string
          created_at?: string
          id?: string
          pinned?: boolean
          private?: boolean
          title?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          avatar_url: string | null
          dark_mode: boolean
          id: string
          name: string | null
        }
        Insert: {
          avatar_url?: string | null
          dark_mode?: boolean
          id: string
          name?: string | null
        }
        Update: {
          avatar_url?: string | null
          dark_mode?: boolean
          id?: string
          name?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
