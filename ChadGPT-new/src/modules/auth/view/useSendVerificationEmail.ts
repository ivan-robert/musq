import { useSupabaseClient } from "#app/supabaseClient";
import { useMutation } from "@tanstack/react-query";

export const useSendVerificationEmail = async () => {
  const supabaseClient = useSupabaseClient();
  const { mutate, isPending, isError } = useMutation({
    mutationFn: async (email: string) =>
      await supabaseClient.auth.resetPasswordForEmail(email),
  });

  return { sendVerificationEmail: mutate, isLoading: isPending, isError };
};
