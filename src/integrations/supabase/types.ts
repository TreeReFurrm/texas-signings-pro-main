export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      expenses: {
        Row: {
          amount: number
          category: string
          created_at: string
          date: string
          description: string
          id: string
          mileage: number | null
          notary_id: string
        }
        Insert: {
          amount: number
          category: string
          created_at?: string
          date: string
          description: string
          id?: string
          mileage?: number | null
          notary_id: string
        }
        Update: {
          amount?: number
          category?: string
          created_at?: string
          date?: string
          description?: string
          id?: string
          mileage?: number | null
          notary_id?: string
        }
        Relationships: []
      }
      jobs: {
        Row: {
          address: string
          city: string
          claimed_at: string | null
          claimed_by: string | null
          client_email: string | null
          client_name: string
          client_phone: string | null
          completed_at: string | null
          created_at: string
          created_by: string | null
          fee: number | null
          id: string
          latitude: number | null
          longitude: number | null
          notes: string | null
          scheduled_date: string
          scheduled_time: string
          service_type: Database["public"]["Enums"]["notarial_act"]
          state: string | null
          status: Database["public"]["Enums"]["job_status"]
          travel_fee: number | null
          updated_at: string
          zip_code: string | null
        }
        Insert: {
          address: string
          city: string
          claimed_at?: string | null
          claimed_by?: string | null
          client_email?: string | null
          client_name: string
          client_phone?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          fee?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          scheduled_date: string
          scheduled_time: string
          service_type: Database["public"]["Enums"]["notarial_act"]
          state?: string | null
          status?: Database["public"]["Enums"]["job_status"]
          travel_fee?: number | null
          updated_at?: string
          zip_code?: string | null
        }
        Update: {
          address?: string
          city?: string
          claimed_at?: string | null
          claimed_by?: string | null
          client_email?: string | null
          client_name?: string
          client_phone?: string | null
          completed_at?: string | null
          created_at?: string
          created_by?: string | null
          fee?: number | null
          id?: string
          latitude?: number | null
          longitude?: number | null
          notes?: string | null
          scheduled_date?: string
          scheduled_time?: string
          service_type?: Database["public"]["Enums"]["notarial_act"]
          state?: string | null
          status?: Database["public"]["Enums"]["job_status"]
          travel_fee?: number | null
          updated_at?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          address: string | null
          city: string | null
          commission_expiry: string | null
          commission_number: string | null
          created_at: string
          email: string
          full_name: string
          id: string
          is_available: boolean | null
          latitude: number | null
          longitude: number | null
          phone: string | null
          state: string | null
          updated_at: string
          user_id: string
          zip_code: string | null
        }
        Insert: {
          address?: string | null
          city?: string | null
          commission_expiry?: string | null
          commission_number?: string | null
          created_at?: string
          email: string
          full_name: string
          id?: string
          is_available?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id: string
          zip_code?: string | null
        }
        Update: {
          address?: string | null
          city?: string | null
          commission_expiry?: string | null
          commission_number?: string | null
          created_at?: string
          email?: string
          full_name?: string
          id?: string
          is_available?: boolean | null
          latitude?: number | null
          longitude?: number | null
          phone?: string | null
          state?: string | null
          updated_at?: string
          user_id?: string
          zip_code?: string | null
        }
        Relationships: []
      }
      session_logs: {
        Row: {
          act_type: Database["public"]["Enums"]["notarial_act"]
          created_at: string
          document_type: string
          id: string
          id_expiry: string | null
          id_last_four: string
          id_type: string
          job_id: string | null
          mileage: number | null
          notary_fee: number | null
          notary_id: string
          notes: string | null
          session_date: string
          session_time: string
          signer_address: string | null
          signer_name: string
          travel_fee: number | null
        }
        Insert: {
          act_type: Database["public"]["Enums"]["notarial_act"]
          created_at?: string
          document_type: string
          id?: string
          id_expiry?: string | null
          id_last_four: string
          id_type: string
          job_id?: string | null
          mileage?: number | null
          notary_fee?: number | null
          notary_id: string
          notes?: string | null
          session_date: string
          session_time: string
          signer_address?: string | null
          signer_name: string
          travel_fee?: number | null
        }
        Update: {
          act_type?: Database["public"]["Enums"]["notarial_act"]
          created_at?: string
          document_type?: string
          id?: string
          id_expiry?: string | null
          id_last_four?: string
          id_type?: string
          job_id?: string | null
          mileage?: number | null
          notary_fee?: number | null
          notary_id?: string
          notes?: string | null
          session_date?: string
          session_time?: string
          signer_address?: string | null
          signer_name?: string
          travel_fee?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "session_logs_job_id_fkey"
            columns: ["job_id"]
            isOneToOne: false
            referencedRelation: "jobs"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "notary"
      job_status: "open" | "claimed" | "completed" | "cancelled"
      notarial_act:
        | "acknowledgment"
        | "jurat"
        | "copy_certification"
        | "oath_affirmation"
        | "signature_witnessing"
        | "loan_signing"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "notary"],
      job_status: ["open", "claimed", "completed", "cancelled"],
      notarial_act: [
        "acknowledgment",
        "jurat",
        "copy_certification",
        "oath_affirmation",
        "signature_witnessing",
        "loan_signing",
      ],
    },
  },
} as const
