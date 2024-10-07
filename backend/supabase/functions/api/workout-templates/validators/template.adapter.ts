import { PreparedWorkout } from "#shared/infra/types/seance.dto.ts";
import { Tables } from "#shared/infra/types/db/database.types.ts";
import { z } from "@zod";
import { preparedPerfSchema } from "#shared/infra/types/perf.dto.ts";
import { PublicUser } from "#shared/infra/types/publicUser.dto.ts";

export const adaptTemplate = (
  template: Tables<"workout_templates">,
  user: PublicUser
): PreparedWorkout => {
  const content = z.array(preparedPerfSchema).parse(template);
  return {
    content: content,
    created_at: template.created_at,
    creator: user,
    description: template.description ?? undefined,
    id: template.id,
    title: template.title,
  };
};
