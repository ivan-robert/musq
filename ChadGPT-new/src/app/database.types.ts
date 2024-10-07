export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export type Database = {
  public: {
    Tables: {
      channels: {
        Row: {
          channel_id: string;
          channel_name: string | null;
          created_at: string;
          creator_clerk_id: string | null;
          is_support: boolean | null;
        };
        Insert: {
          channel_id?: string;
          channel_name?: string | null;
          created_at?: string;
          creator_clerk_id?: string | null;
          is_support?: boolean | null;
        };
        Update: {
          channel_id?: string;
          channel_name?: string | null;
          created_at?: string;
          creator_clerk_id?: string | null;
          is_support?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: "channels_creator_clerk_id_fkey";
            columns: ["creator_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          }
        ];
      };
      channels_participants: {
        Row: {
          channel_id: string;
          user_clerk_id: string;
        };
        Insert: {
          channel_id?: string;
          user_clerk_id: string;
        };
        Update: {
          channel_id?: string;
          user_clerk_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "channels_participants_user_clerk_id_fkey";
            columns: ["user_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          },
          {
            foreignKeyName: "public_channels_participants_channel_id_fkey";
            columns: ["channel_id"];
            isOneToOne: true;
            referencedRelation: "channels";
            referencedColumns: ["channel_id"];
          }
        ];
      };
      channels_roles: {
        Row: {
          channel_id: string;
          last_message_read: string | null;
          user_clerk_id: string;
        };
        Insert: {
          channel_id: string;
          last_message_read?: string | null;
          user_clerk_id: string;
        };
        Update: {
          channel_id?: string;
          last_message_read?: string | null;
          user_clerk_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "channels_roles_user_clerk_id_fkey";
            columns: ["user_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          },
          {
            foreignKeyName: "public_channels_roles_channel_id_fkey";
            columns: ["channel_id"];
            isOneToOne: true;
            referencedRelation: "channels";
            referencedColumns: ["channel_id"];
          },
          {
            foreignKeyName: "public_channels_roles_last_message_read_fkey";
            columns: ["last_message_read"];
            isOneToOne: false;
            referencedRelation: "messages";
            referencedColumns: ["message_id"];
          }
        ];
      };
      comments: {
        Row: {
          comment_id: string;
          content: string;
          created_at: string;
          post_id: string;
          reply_to: string | null;
          user_clerk_id: string | null;
        };
        Insert: {
          comment_id?: string;
          content?: string;
          created_at?: string;
          post_id: string;
          reply_to?: string | null;
          user_clerk_id?: string | null;
        };
        Update: {
          comment_id?: string;
          content?: string;
          created_at?: string;
          post_id?: string;
          reply_to?: string | null;
          user_clerk_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "comments_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "comments_reply_to_fkey";
            columns: ["reply_to"];
            isOneToOne: false;
            referencedRelation: "comments";
            referencedColumns: ["comment_id"];
          },
          {
            foreignKeyName: "comments_user_clerk_id_fkey";
            columns: ["user_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          }
        ];
      };
      custom_exercises: {
        Row: {
          bodyPart: string;
          equipment: string;
          gifUrl: string | null;
          id: string;
          instructions: string[] | null;
          name: string;
          secondaryMuscles: string[] | null;
          target: string;
          user_clerk_id: string | null;
        };
        Insert: {
          bodyPart: string;
          equipment: string;
          gifUrl?: string | null;
          id: string;
          instructions?: string[] | null;
          name: string;
          secondaryMuscles?: string[] | null;
          target: string;
          user_clerk_id?: string | null;
        };
        Update: {
          bodyPart?: string;
          equipment?: string;
          gifUrl?: string | null;
          id?: string;
          instructions?: string[] | null;
          name?: string;
          secondaryMuscles?: string[] | null;
          target?: string;
          user_clerk_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "custom_exercises_user_clerk_id_fkey";
            columns: ["user_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          }
        ];
      };
      exercises_patched: {
        Row: {
          created_at: string;
          exercises_list: Json | null;
          id: number;
          updated_at: string | null;
        };
        Insert: {
          created_at?: string;
          exercises_list?: Json | null;
          id?: number;
          updated_at?: string | null;
        };
        Update: {
          created_at?: string;
          exercises_list?: Json | null;
          id?: number;
          updated_at?: string | null;
        };
        Relationships: [];
      };
      followers: {
        Row: {
          created_at: string;
          followed_clerk_id: string;
          follower_clerk_id: string;
          unfollowed: boolean;
        };
        Insert: {
          created_at?: string;
          followed_clerk_id: string;
          follower_clerk_id: string;
          unfollowed?: boolean;
        };
        Update: {
          created_at?: string;
          followed_clerk_id?: string;
          follower_clerk_id?: string;
          unfollowed?: boolean;
        };
        Relationships: [
          {
            foreignKeyName: "followers_followed_clerk_id_fkey";
            columns: ["followed_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          },
          {
            foreignKeyName: "followers_follower_clerk_id_fkey";
            columns: ["follower_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          }
        ];
      };
      likes: {
        Row: {
          created_at: string;
          id: number;
          post_id: string | null;
          user_clerk_id: string;
          user_id: string | null;
        };
        Insert: {
          created_at?: string;
          id?: number;
          post_id?: string | null;
          user_clerk_id: string;
          user_id?: string | null;
        };
        Update: {
          created_at?: string;
          id?: number;
          post_id?: string | null;
          user_clerk_id?: string;
          user_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "likes_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          },
          {
            foreignKeyName: "likes_user_clerk_id_fkey";
            columns: ["user_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          }
        ];
      };
      media: {
        Row: {
          asset_id: string;
          bucket_name: string;
          created_at: string;
          duration: number | null;
          file_name: string;
          file_size: number;
          folder: string;
          height: number;
          id: number;
          mime_type: string | null;
          type: string | null;
          uploaded_by: string;
          uploaded_by_clerk_id: string;
          width: number;
        };
        Insert: {
          asset_id: string;
          bucket_name: string;
          created_at?: string;
          duration?: number | null;
          file_name: string;
          file_size: number;
          folder: string;
          height: number;
          id?: number;
          mime_type?: string | null;
          type?: string | null;
          uploaded_by: string;
          uploaded_by_clerk_id: string;
          width: number;
        };
        Update: {
          asset_id?: string;
          bucket_name?: string;
          created_at?: string;
          duration?: number | null;
          file_name?: string;
          file_size?: number;
          folder?: string;
          height?: number;
          id?: number;
          mime_type?: string | null;
          type?: string | null;
          uploaded_by?: string;
          uploaded_by_clerk_id?: string;
          width?: number;
        };
        Relationships: [
          {
            foreignKeyName: "media_bucket_name_fkey";
            columns: ["bucket_name"];
            isOneToOne: false;
            referencedRelation: "buckets";
            referencedColumns: ["name"];
          },
          {
            foreignKeyName: "media_uploaded_by_clerk_id_fkey";
            columns: ["uploaded_by_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          },
          {
            foreignKeyName: "media_uploaded_by_fkey";
            columns: ["uploaded_by"];
            isOneToOne: false;
            referencedRelation: "users";
            referencedColumns: ["id"];
          }
        ];
      };
      messages: {
        Row: {
          channel_id: string;
          content: string;
          created_at: string;
          message_id: string;
          user_clerk_id: string;
        };
        Insert: {
          channel_id?: string;
          content: string;
          created_at?: string;
          message_id?: string;
          user_clerk_id: string;
        };
        Update: {
          channel_id?: string;
          content?: string;
          created_at?: string;
          message_id?: string;
          user_clerk_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "messages_user_clerk_id_fkey";
            columns: ["user_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          },
          {
            foreignKeyName: "public_messages_channel_id_fkey";
            columns: ["channel_id"];
            isOneToOne: false;
            referencedRelation: "channels";
            referencedColumns: ["channel_id"];
          }
        ];
      };
      notifications: {
        Row: {
          body: string | null;
          created_at: string;
          data: Json | null;
          id: string;
          read_at: string | null;
          title: string | null;
          user_clerk_id: string;
          user_id: string;
        };
        Insert: {
          body?: string | null;
          created_at?: string;
          data?: Json | null;
          id?: string;
          read_at?: string | null;
          title?: string | null;
          user_clerk_id: string;
          user_id: string;
        };
        Update: {
          body?: string | null;
          created_at?: string;
          data?: Json | null;
          id?: string;
          read_at?: string | null;
          title?: string | null;
          user_clerk_id?: string;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "notifications_user_clerk_id_fkey";
            columns: ["user_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          }
        ];
      };
      perfs: {
        Row: {
          exo_id: string | null;
          index: number;
          perf_id: string;
          rest_time: number;
          seance_id: string;
        };
        Insert: {
          exo_id?: string | null;
          index?: number;
          perf_id?: string;
          rest_time?: number;
          seance_id: string;
        };
        Update: {
          exo_id?: string | null;
          index?: number;
          perf_id?: string;
          rest_time?: number;
          seance_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "perfs_seance_id_fkey";
            columns: ["seance_id"];
            isOneToOne: false;
            referencedRelation: "seances";
            referencedColumns: ["seance_id"];
          }
        ];
      };
      posts: {
        Row: {
          created_at: string;
          description: string | null;
          post_id: string;
          title: string | null;
          user_clerk_id: string | null;
          workout_id: string | null;
        };
        Insert: {
          created_at?: string;
          description?: string | null;
          post_id?: string;
          title?: string | null;
          user_clerk_id?: string | null;
          workout_id?: string | null;
        };
        Update: {
          created_at?: string;
          description?: string | null;
          post_id?: string;
          title?: string | null;
          user_clerk_id?: string | null;
          workout_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "posts_user_clerk_id_fkey";
            columns: ["user_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          },
          {
            foreignKeyName: "posts_workout_id_fkey";
            columns: ["workout_id"];
            isOneToOne: false;
            referencedRelation: "seances";
            referencedColumns: ["seance_id"];
          }
        ];
      };
      posts_media: {
        Row: {
          media_id: number;
          post_id: string;
        };
        Insert: {
          media_id: number;
          post_id: string;
        };
        Update: {
          media_id?: number;
          post_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "posts_media_media_id_fkey";
            columns: ["media_id"];
            isOneToOne: false;
            referencedRelation: "media";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "posts_media_post_id_fkey";
            columns: ["post_id"];
            isOneToOne: false;
            referencedRelation: "posts";
            referencedColumns: ["post_id"];
          }
        ];
      };
      private_profiles: {
        Row: {
          clerk_user_id: string;
          created_at: string;
          expo_push_token: string | null;
        };
        Insert: {
          clerk_user_id: string;
          created_at?: string;
          expo_push_token?: string | null;
        };
        Update: {
          clerk_user_id?: string;
          created_at?: string;
          expo_push_token?: string | null;
        };
        Relationships: [];
      };
      profiles: {
        Row: {
          clerk_id: string;
          profile_picture_filename: string | null;
          username: string | null;
        };
        Insert: {
          clerk_id: string;
          profile_picture_filename?: string | null;
          username?: string | null;
        };
        Update: {
          clerk_id?: string;
          profile_picture_filename?: string | null;
          username?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "profiles_clerk_id_fkey";
            columns: ["clerk_id"];
            isOneToOne: true;
            referencedRelation: "private_profiles";
            referencedColumns: ["clerk_user_id"];
          }
        ];
      };
      salles: {
        Row: {
          salle_id: string;
          salle_nom: string;
        };
        Insert: {
          salle_id?: string;
          salle_nom: string;
        };
        Update: {
          salle_id?: string;
          salle_nom?: string;
        };
        Relationships: [];
      };
      seances: {
        Row: {
          end_date: string | null;
          salle_id: string | null;
          seance_id: string;
          seance_types: string[] | null;
          start_date: string | null;
          template_id: number | null;
          user_clerk_id: string | null;
        };
        Insert: {
          end_date?: string | null;
          salle_id?: string | null;
          seance_id?: string;
          seance_types?: string[] | null;
          start_date?: string | null;
          template_id?: number | null;
          user_clerk_id?: string | null;
        };
        Update: {
          end_date?: string | null;
          salle_id?: string | null;
          seance_id?: string;
          seance_types?: string[] | null;
          start_date?: string | null;
          template_id?: number | null;
          user_clerk_id?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: "seances_salle_id_fkey";
            columns: ["salle_id"];
            isOneToOne: false;
            referencedRelation: "salles";
            referencedColumns: ["salle_id"];
          },
          {
            foreignKeyName: "seances_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "workout_templates";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "seances_user_clerk_id_fkey";
            columns: ["user_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          }
        ];
      };
      sets: {
        Row: {
          exercise_id: string | null;
          failure: boolean | null;
          index: number | null;
          is_dropset: boolean;
          is_warmup: boolean | null;
          perf_id: string | null;
          reps: number | null;
          rest_in_seconds: number;
          set_id: string;
          time_in_seconds: number | null;
          weight: number | null;
        };
        Insert: {
          exercise_id?: string | null;
          failure?: boolean | null;
          index?: number | null;
          is_dropset?: boolean;
          is_warmup?: boolean | null;
          perf_id?: string | null;
          reps?: number | null;
          rest_in_seconds: number;
          set_id?: string;
          time_in_seconds?: number | null;
          weight?: number | null;
        };
        Update: {
          exercise_id?: string | null;
          failure?: boolean | null;
          index?: number | null;
          is_dropset?: boolean;
          is_warmup?: boolean | null;
          perf_id?: string | null;
          reps?: number | null;
          rest_in_seconds?: number;
          set_id?: string;
          time_in_seconds?: number | null;
          weight?: number | null;
        };
        Relationships: [
          {
            foreignKeyName: "public_sets_perf_id_fkey";
            columns: ["perf_id"];
            isOneToOne: false;
            referencedRelation: "perfs";
            referencedColumns: ["perf_id"];
          }
        ];
      };
      template_folders: {
        Row: {
          created_at: string;
          id: number;
          is_public: boolean;
          name: string;
          owner_clerk_id: string;
        };
        Insert: {
          created_at?: string;
          id?: number;
          is_public?: boolean;
          name: string;
          owner_clerk_id: string;
        };
        Update: {
          created_at?: string;
          id?: number;
          is_public?: boolean;
          name?: string;
          owner_clerk_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: "template_folders_owner_clerk_id_fkey";
            columns: ["owner_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          }
        ];
      };
      workout_templates: {
        Row: {
          content: Json | null;
          copied_from_workout: string | null;
          created_at: string;
          creator_clerk_id: string;
          description: string | null;
          id: number;
          is_public: boolean;
          title: string;
        };
        Insert: {
          content?: Json | null;
          copied_from_workout?: string | null;
          created_at?: string;
          creator_clerk_id: string;
          description?: string | null;
          id?: number;
          is_public?: boolean;
          title: string;
        };
        Update: {
          content?: Json | null;
          copied_from_workout?: string | null;
          created_at?: string;
          creator_clerk_id?: string;
          description?: string | null;
          id?: number;
          is_public?: boolean;
          title?: string;
        };
        Relationships: [
          {
            foreignKeyName: "workout_templates_copied_from_workout_fkey";
            columns: ["copied_from_workout"];
            isOneToOne: false;
            referencedRelation: "seances";
            referencedColumns: ["seance_id"];
          },
          {
            foreignKeyName: "workout_templates_creator_clerk_id_fkey";
            columns: ["creator_clerk_id"];
            isOneToOne: false;
            referencedRelation: "profiles";
            referencedColumns: ["clerk_id"];
          }
        ];
      };
      workout_templates__template_folders: {
        Row: {
          folder_id: number;
          template_id: number;
        };
        Insert: {
          folder_id: number;
          template_id: number;
        };
        Update: {
          folder_id?: number;
          template_id?: number;
        };
        Relationships: [
          {
            foreignKeyName: "workout_templates__template_folders_folder_id_fkey";
            columns: ["folder_id"];
            isOneToOne: false;
            referencedRelation: "template_folders";
            referencedColumns: ["id"];
          },
          {
            foreignKeyName: "workout_templates__template_folders_template_id_fkey";
            columns: ["template_id"];
            isOneToOne: false;
            referencedRelation: "workout_templates";
            referencedColumns: ["id"];
          }
        ];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      assemble_seances:
        | {
            Args: {
              seance_data: Json;
            };
            Returns: Json;
          }
        | {
            Args: {
              seance_data: Json;
              input_user_id: string;
            };
            Returns: Json;
          };
      create_channel: {
        Args: {
          channel_name: string;
          is_support: boolean;
          creator_id: string;
        };
        Returns: string;
      };
      fetch_channel_status: {
        Args: {
          user_id: string;
          channel_id: string;
        };
        Returns: {
          last_message_id: string;
          nb_unread_messages: number;
        }[];
      };
      fetch_messages: {
        Args: {
          channel_id: string;
          min_index: number;
          max_index: number;
        };
        Returns: {
          creation_date: string;
          content: string;
          user_name: string;
          user_id: string;
          message_id: string;
        }[];
      };
      fetch_posts: {
        Args: {
          input_user_id: string;
          results_limit: number;
          results_offset: number;
        };
        Returns: {
          post_id: string;
          created_at: string;
          illustration_link: string;
          user_id: string;
          workout_id: string;
          title: string;
          description: string;
          number_of_likes: number;
          number_of_comments: number;
        }[];
      };
      fetch_seance_by_id: {
        Args: {
          input_seance_id: string;
          input_user_id: string;
        };
        Returns: Json;
      };
      fetch_seances_bulk: {
        Args: {
          id__in: string[];
        };
        Returns: Json;
      };
      fetch_user_channels: {
        Args: {
          user_id: string;
          is_support_channel?: boolean;
        };
        Returns: {
          channel_id: string;
          channel_name: string;
          created_at: string;
          creator_id: string;
          is_support: boolean;
          participants_names: string[];
        }[];
      };
      get_popular_exercises: {
        Args: {
          min_date: string;
          max_date: string;
          display_limit: number;
        };
        Returns: {
          exo_id: string;
          count: number;
        }[];
      };
      get_secret: {
        Args: {
          name: string;
        };
        Returns: string;
      };
      invite_to_channel: {
        Args: {
          channel_id: string;
          inviter_id: string;
          invitee_id: string;
        };
        Returns: boolean;
      };
      is_participant: {
        Args: {
          channel_id: string;
          user_id: string;
        };
        Returns: boolean;
      };
      list_participants: {
        Args: {
          channel_id: string;
        };
        Returns: {
          user_id: string;
          username: string;
        }[];
      };
      requesting_user_id: {
        Args: Record<PropertyKey, never>;
        Returns: string;
      };
      retrieve_all_user_sets_by_exo: {
        Args: {
          user_id: string;
          exo_id: string;
        };
        Returns: {
          set_id: string;
          perf_id: string;
          reps: number;
          weight: number;
          time_in_seconds: number;
          rest_in_seconds: number;
          failure: boolean;
          date: string;
        }[];
      };
      search_user: {
        Args: {
          search_text: string;
          results_limit: number;
          results_offset: number;
        };
        Returns: {
          user_id: string;
          username: string;
          profile_picture_filename: string;
        }[];
      };
      send_message: {
        Args: {
          channel_id: string;
          user_id: string;
          message_text: string;
        };
        Returns: string;
      };
      smart_fetch_seances: {
        Args: {
          fetch_limit: number;
          fetch_offset: number;
          input_user_id: string;
        };
        Returns: Json;
      };
      smart_fetch_seances_with_dates: {
        Args: {
          min_date: string;
          max_date: string;
          input_user_id: string;
        };
        Returns: Json;
      };
    };
    Enums: {
      exo_type: "poids" | "reps" | "temps";
      poids_type: "halteres" | "poids_libres" | "barre" | "poulie";
    };
    CompositeTypes: {
      seance_selection_data: {
        seance_id: string | null;
        start_date: string | null;
        user_id: string | null;
        salle_id: string | null;
        seance_types: string[] | null;
        end_date: string | null;
      };
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Tables<
  PublicTableNameOrOptions extends
    | keyof (PublicSchema["Tables"] & PublicSchema["Views"])
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
        Database[PublicTableNameOrOptions["schema"]]["Views"])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions["schema"]]["Tables"] &
      Database[PublicTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema["Tables"] &
      PublicSchema["Views"])
  ? (PublicSchema["Tables"] &
      PublicSchema["Views"])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends
    | keyof PublicSchema["Tables"]
    | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions["schema"]]["Tables"]
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema["Tables"]
  ? PublicSchema["Tables"][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends
    | keyof PublicSchema["Enums"]
    | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions["schema"]]["Enums"]
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema["Enums"]
  ? PublicSchema["Enums"][PublicEnumNameOrOptions]
  : never;
