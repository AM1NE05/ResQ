export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.5";
  };
  public: {
    Tables: {
      alerts: {
        Row: {
          address: string | null;
          alert_type: Database["public"]["Enums"]["alert_type"];
          created_at: string;
          description: string | null;
          id: string;
          latitude: number;
          longitude: number;
          severity: Database["public"]["Enums"]["alert_severity"];
          status: Database["public"]["Enums"]["alert_status"];
          updated_at: string;
          user_id: string;
        };
        Insert: {
          address?: string | null;
          alert_type?: Database["public"]["Enums"]["alert_type"];
          created_at?: string;
          description?: string | null;
          id?: string;
          latitude: number;
          longitude: number;
          severity?: Database["public"]["Enums"]["alert_severity"];
          status?: Database["public"]["Enums"]["alert_status"];
          updated_at?: string;
          user_id: string;
        };
        Update: {
          address?: string | null;
          alert_type?: Database["public"]["Enums"]["alert_type"];
          created_at?: string;
          description?: string | null;
          id?: string;
          latitude?: number;
          longitude?: number;
          severity?: Database["public"]["Enums"]["alert_severity"];
          status?: Database["public"]["Enums"]["alert_status"];
          updated_at?: string;
          user_id?: string;
        };
        Relationships: [];
      };
      complaint_comments: {
        Row: {
          complaint_id: string;
          content: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          complaint_id: string;
          content: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          complaint_id?: string;
          content?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "complaint_comments_complaint_id_fkey";
            columns: ["complaint_id"];
            isOneToOne: false;
            referencedRelation: "complaints";
            referencedColumns: ["id"];
          },
        ];
      };
      complaint_likes: {
        Row: {
          complaint_id: string;
          created_at: string;
          id: string;
          user_id: string;
        };
        Insert: {
          complaint_id: string;
          created_at?: string;
          id?: string;
          user_id: string;
        };
        Update: {
          complaint_id?: string;
          created_at?: string;
          id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "complaint_likes_complaint_id_fkey";
            columns: ["complaint_id"];
            isOneToOne: false;
            referencedRelation: "complaints";
            referencedColumns: ["id"];
          },
        ];
      };
      complaints: {
        Row: {
          comments_count: number;
          created_at: string;
          description: string | null;
          donations_count: number;
          id: string;
          latitude: number | null;
          likes_count: number;
          location_label: string | null;
          longitude: number | null;
          thumbnail_url: string | null;
          title: string;
          user_id: string;
          video_url: string;
        };
        Insert: {
          comments_count?: number;
          created_at?: string;
          description?: string | null;
          donations_count?: number;
          id?: string;
          latitude?: number | null;
          likes_count?: number;
          location_label?: string | null;
          longitude?: number | null;
          thumbnail_url?: string | null;
          title: string;
          user_id: string;
          video_url: string;
        };
        Update: {
          comments_count?: number;
          created_at?: string;
          description?: string | null;
          donations_count?: number;
          id?: string;
          latitude?: number | null;
          likes_count?: number;
          location_label?: string | null;
          longitude?: number | null;
          thumbnail_url?: string | null;
          title?: string;
          user_id?: string;
          video_url?: string;
        };
        Relationships: [];
      };
      notifications: {
        Row: {
          alert_id: string | null;
          body: string | null;
          created_at: string;
          id: string;
          kind: string;
          read: boolean;
          status: string | null;
          title: string;
          user_id: string;
        };
        Insert: {
          alert_id?: string | null;
          body?: string | null;
          created_at?: string;
          id?: string;
          kind?: string;
          read?: boolean;
          status?: string | null;
          title: string;
          user_id: string;
        };
        Update: {
          alert_id?: string | null;
          body?: string | null;
          created_at?: string;
          id?: string;
          kind?: string;
          read?: boolean;
          status?: string | null;
          title?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_alert_id_fkey";
            columns: ["alert_id"];
            isOneToOne: false;
            referencedRelation: "alerts";
            referencedColumns: ["id"];
          },
        ];
      };
      profiles: {
        Row: {
          allergies: string | null;
          avatar_url: string | null;
          blood_type: string | null;
          created_at: string;
          emergency_contacts: Json | null;
          full_name: string | null;
          id: string;
          medical_notes: string | null;
          phone: string | null;
          updated_at: string;
        };
        Insert: {
          allergies?: string | null;
          avatar_url?: string | null;
          blood_type?: string | null;
          created_at?: string;
          emergency_contacts?: Json | null;
          full_name?: string | null;
          id: string;
          medical_notes?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Update: {
          allergies?: string | null;
          avatar_url?: string | null;
          blood_type?: string | null;
          created_at?: string;
          emergency_contacts?: Json | null;
          full_name?: string | null;
          id?: string;
          medical_notes?: string | null;
          phone?: string | null;
          updated_at?: string;
        };
        Relationships: [];
      };
      user_roles: {
        Row: {
          created_at: string;
          id: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          role: Database["public"]["Enums"]["app_role"];
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          role?: Database["public"]["Enums"]["app_role"];
          user_id?: string;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      admin_stats: { Args: never; Returns: Json };
      claim_first_admin: { Args: never; Returns: boolean };
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"];
          _user_id: string;
        };
        Returns: boolean;
      };
    };
    Enums: {
      alert_severity: "low" | "medium" | "high" | "critical";
      alert_status: "pending" | "dispatched" | "resolved" | "cancelled";
      alert_type: "medical" | "fire" | "police" | "accident" | "other";
      app_role: "admin" | "user";
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">;

type DefaultSchema = DatabaseWithoutInternals[Extract<
  keyof Database,
  "public"
>];

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R;
      }
      ? R
      : never
    : never;

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I;
      }
      ? I
      : never
    : never;

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U;
      }
      ? U
      : never
    : never;

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never;

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals;
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals;
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never;

export const Constants = {
  public: {
    Enums: {
      alert_severity: ["low", "medium", "high", "critical"],
      alert_status: ["pending", "dispatched", "resolved", "cancelled"],
      alert_type: ["medical", "fire", "police", "accident", "other"],
      app_role: ["admin", "user"],
    },
  },
} as const;
