import { Session } from "@supabase/gotrue-js/src/lib/types";

export type SessionType = {
  session: Session | null;
};

export interface PostType {
  color: string;
  content: string;
  created_at: string;
  id: string;
  pinned: boolean;
  private: boolean;
  title: string | null;
  user_id: string;
  profiles: {
    name: string | null;
  } | null;
}
