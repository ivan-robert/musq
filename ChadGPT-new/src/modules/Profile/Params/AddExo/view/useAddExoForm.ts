import { Exo } from "#shared/exo/domain/exo.types";
import { usePostExo } from "./usePostExo";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useUserContext } from "#modules/auth/context/User.context";
import { bodyPartSchema } from "#shared/exo/infra/muscles.dto";
import { equipmentSchema } from "#shared/exo/infra/equipment.dto";
import { muscleSchema } from "#shared/muscle/domain/muscle.types";

const ExoFormSchema = z.object({
  exoName: z.string().min(1),
  exoDescription: z.string(),
  primaryMuscle: muscleSchema,
  secondaryMuscles: z.array(muscleSchema),
  bodyPart: bodyPartSchema,
  equipment: equipmentSchema,
});

type ExoFormValues = z.infer<typeof ExoFormSchema>;

export const useAddExoForm = () => {
  const { user } = useUserContext();
  const addExoForm = useForm<ExoFormValues>({
    resolver: zodResolver(ExoFormSchema),
    defaultValues: {
      exoName: undefined,
      exoDescription: "",
      primaryMuscle: { muscle_id: "biceps", muscle_name: "biceps" },
      secondaryMuscles: [],
      equipment: "barbell",
      bodyPart: "back",
    },
    reValidateMode: "onChange",
  });

  const { mutate } = usePostExo();

  const submitExo = (data: ExoFormValues) => {
    const exo: Omit<Exo, "exoId"> = {
      addedBy: user.id,
      bodyPart: data.bodyPart,
      exoName: data.exoName,
      instructions:
        data.exoDescription.length > 0 ? [data.exoDescription] : undefined,
      exoType: "poids",
      muscles: {
        [data.primaryMuscle.muscle_id]: 1,
        ...Object.fromEntries(
          data.secondaryMuscles.map((muscle) => [muscle.muscle_id, 0.5])
        ),
      },
    };
    mutate({ exo, uid: user.id });
  };

  const submit = addExoForm.handleSubmit(submitExo);

  return {
    addExoForm,
    submit,
  };
};
