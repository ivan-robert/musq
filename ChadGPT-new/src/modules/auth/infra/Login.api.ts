import { SupabaseAuthClient } from "@supabase/supabase-js/dist/module/lib/SupabaseAuthClient";

type signInWithCredentialsProps = {
  auth: SupabaseAuthClient;
  email: string;
  password: string;
};

export const signInWithCredentials = async ({
  auth,
  email,
  password,
}: signInWithCredentialsProps) => {
  const { data, error } = await auth.signInWithPassword({ email, password });

  if (error) {
    throw error;
  }

  return data;
};
