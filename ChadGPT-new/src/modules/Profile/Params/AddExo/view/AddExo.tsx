import styled from "@emotion/native";
import { Typography } from "#shared/view/components/Typography/Typography";
import { TextInput } from "#shared/view/components/TextInput";
import { useAddExoForm } from "./useAddExoForm";
import { Button } from "#shared/view/components/Button/Button";
import { Pressable, View } from "react-native";
import CrossIcon from "#shared/icons/CrossIcon";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { Muscle } from "#shared/muscle/domain/muscle.types";
import { useMuscles } from "#shared/muscle/view/useMuscles";
import { useTheme } from "@emotion/react";
import { Controller } from "react-hook-form";
import { SingleDropDownPicker } from "#shared/view/components/SingleDropDownPicker";
import { useState } from "react";
import { AddMuscleFilterModal } from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/AddMuscleModal/AddMuscleFilterModal";
import { Spacer } from "#shared/view/components/Spacer";
import { GoBackArrow } from "#shared/icons/GoBackArrow";
import { ScrollView } from "#shared/view/components/ScrollView";
import { equipmentSchema } from "#shared/exo/infra/equipment.dto";
import { muscleSchema } from "#shared/exo/infra/muscles.dto";
import { useTranslation } from "react-i18next";

export const AddExo = () => {
  const theme = useTheme();
  const { goBack } =
    useNavigation<NavigationProp<RootStackNavigatorParamList>>();
  const { addExoForm, submit } = useAddExoForm();
  const [showMuscleModal, setShowMuscleModal] = useState(false);
  const { data: existingMuscles } = useMuscles();
  const { t } = useTranslation(["profile", "muscles"]);

  return (
    <Container>
      <RowTypeContainer>
        <Pressable onPress={goBack}>
          <GoBackArrow height={48} width={48} color={theme.colors.text500} />
        </Pressable>
        <Typography.HeadlineL.regular color={theme.colors.text500}>
          {t("addExo.title")}
        </Typography.HeadlineL.regular>
      </RowTypeContainer>
      <Typography.TextM.regular color={theme.colors.text500}>
        {t("addExo.visibleByYou")}
      </Typography.TextM.regular>

      <Spacer.Vertical gap={16} />

      <HorizontalSeparator />
      <FormContentContainer>
        <RowTypeContainer style={{ zIndex: 2 }}>
          <Typography.TextM.regular color={theme.colors.text500}>
            {t("addExo.equipment")}
          </Typography.TextM.regular>
          <Controller
            control={addExoForm.control}
            name="equipment"
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  flex: 1,
                }}
              >
                <SingleDropDownPicker
                  style={{ paddingVertical: 16 }}
                  items={equipmentSchema.options.map((equipment) => ({
                    label: equipment,
                    value: equipment,
                  }))}
                  onSelect={(item) => {
                    onChange(item.value);
                  }}
                  selected={{ value, label: value }}
                />
              </View>
            )}
          />
        </RowTypeContainer>

        <RowTypeContainer>
          <Typography.TextM.regular color={theme.colors.text500}>
            {t("addExo.mainMuscle")}
          </Typography.TextM.regular>
          <Controller
            control={addExoForm.control}
            name="primaryMuscle"
            render={({ field: { onChange, value } }) => (
              <View
                style={{
                  flex: 1,
                }}
              >
                <SingleDropDownPicker
                  style={{ paddingVertical: 16 }}
                  items={muscleSchema.options.map((muscle) => ({
                    label: muscle,
                    value: muscle,
                  }))}
                  onSelect={(item) => {
                    onChange({
                      muscle_id: item.value,
                      muscle_name: item.label,
                    });
                  }}
                  selected={{
                    value: value.muscle_id,
                    label: value.muscle_name,
                  }}
                />
              </View>
            )}
          />
        </RowTypeContainer>

        <Controller
          control={addExoForm.control}
          name="exoName"
          render={({ field: { onChange, value } }) => (
            <TextInput
              autoCapitalize="none"
              placeholder="nom de l'exercice"
              onChangeText={(text) => {
                onChange(text);
              }}
              value={value}
            />
          )}
        />

        <Controller
          control={addExoForm.control}
          name="exoDescription"
          render={({ field: { onChange, value } }) => (
            <TextInput
              autoCapitalize="none"
              placeholder="description"
              onChangeText={(text) => {
                onChange(text);
              }}
              value={value}
            />
          )}
        />

        <Button.Secondary
          text="Ajouter un muscle travaillé"
          onPress={() => {
            setShowMuscleModal(true);
          }}
        />

        <Controller
          control={addExoForm.control}
          name="secondaryMuscles"
          render={({ field: { onChange, value } }) => (
            <AddMuscleFilterModal
              muscles={existingMuscles.filter((muscle) => {
                return !value
                  .map((m) => m.muscle_id)
                  .includes(muscle.muscle_id);
              })}
              closeModal={() => setShowMuscleModal(false)}
              isModalVisible={showMuscleModal}
              addMuscle={(muscle: Muscle) => {
                onChange([...value, muscle]);
              }}
            />
          )}
        />

        <Controller
          control={addExoForm.control}
          name="secondaryMuscles"
          render={({ field: { onChange, value } }) => (
            <MusclesContainer>
              {value.map((muscle) => (
                <MuscleContainer key={muscle.muscle_id}>
                  <MuscleRow>
                    <Typography.TextM.regular color={theme.colors.text500}>
                      {t(`${muscle.muscle_name}`)}
                    </Typography.TextM.regular>
                    <Pressable
                      onPress={() =>
                        onChange(
                          value.filter((m) => m.muscle_id !== muscle.muscle_id)
                        )
                      }
                    >
                      <CrossIcon
                        height={24}
                        width={24}
                        color={theme.colors.text500}
                      />
                    </Pressable>
                  </MuscleRow>
                </MuscleContainer>
              ))}
            </MusclesContainer>
          )}
        />

        <Button.Primary
          isDisabled={!addExoForm.formState.isValid}
          text="Ajouter l'exercice"
          onPress={async () => {
            submit();
            goBack();
          }}
        />
      </FormContentContainer>
    </Container>
  );
};

const MusclesContainer = styled(ScrollView)({
  flex: 1,
});

const MuscleRow = styled.View({
  flexDirection: "row",
  alignItems: "center",
  justifyContent: "space-between",
  gap: 16,
});

const Container = styled.View({ flex: 1, padding: 16 });

const RowTypeContainer = styled.View({
  flexDirection: "row",
  width: "100%",
  gap: 16,
  zIndex: 1,
  alignItems: "center",
});

const HorizontalSeparator = styled.View(({ theme }) => ({
  height: 1,
  backgroundColor: theme.colors.text500,
}));

const MuscleContainer = styled.View({
  gap: 8,
});

const FormContentContainer = styled.View({
  gap: 16,
  flex: 1,
});
