import { useMutation } from "@tanstack/react-query";
import { useSupabaseClient } from "#app/supabaseClient";
import { postExo } from "#shared/exo/infra/postExo.api";
import { exoAdapter } from "#shared/exo/infra/exo.adapter";
import { Exo } from "#shared/exo/domain/exo.types";

export const usePostExo = () => {
  const client = useSupabaseClient();
  const mutation = useMutation({
    mutationFn: async ({
      exo,
    }: {
      uid: string;
      exo: Omit<Exo, "exoId">;
    }): Promise<void> => {
      await postExo(client, exoAdapter.send(exo));
    },
  });
  return mutation;
};
