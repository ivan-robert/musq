import styled from "@emotion/native";

import React, { useReducer } from "react";

import { TextInput } from "#shared/view/components/TextInput";
import { Muscle } from "#shared/muscle/domain/muscle.types";
import {
  filterMuscles,
  reduceMuscles,
} from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/AddMuscleModal/reduceMuscles";
import { SeanceFormModal } from "#modules/Seance/view/addSeance/SeanceFormModal";

import { PressableMuscle } from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/AddMuscleModal/PressableMuscle";
import { ScrollView } from "#shared/view/components/ScrollView";
import { useTranslation } from "react-i18next";

type AddMuscleFilterModalProps = {
  closeModal: () => void;
  isModalVisible: boolean;
  addMuscle: (muscle: Muscle) => void;
  muscles: Muscle[];
};

export const AddMuscleFilterModal = React.memo(
  ({
    closeModal,
    isModalVisible,
    addMuscle,
    muscles,
  }: AddMuscleFilterModalProps) => {
    const { t } = useTranslation(["workouts"]);
    const [musclesFilter, dispatchMusclesFilter] = useReducer(reduceMuscles, {
      muscleName: "",
    });

    const clearModal = () => {
      dispatchMusclesFilter({ type: "RESET_FILTER" });
      closeModal();
    };

    const filteredMuscles = filterMuscles(muscles, musclesFilter);

    return (
      <SeanceFormModal
        isModalVisible={isModalVisible}
        closeModal={clearModal}
        title={t("addWorkout.addMuscle")}
      >
        <ContentContainer>
          <TextInput
            autoCapitalize="none"
            placeholder={t("addWorkout.filterByName")}
            onChangeText={(text) => {
              dispatchMusclesFilter({
                type: "CHANGE_MUSCLE_FILTER_NAME",
                newName: text,
              });
            }}
          />

          <ScrollView
            style={{ flexGrow: 0, height: 300 }}
            contentContainerStyle={{
              gap: 8,
              paddingTop: 16,
            }}
          >
            {filteredMuscles.map((muscle) => (
              <PressableMuscle
                key={muscle.muscle_id}
                name={muscle.muscle_name}
                onPress={() => {
                  addMuscle(muscle);
                  closeModal();
                }}
              />
            ))}
          </ScrollView>
        </ContentContainer>
      </SeanceFormModal>
    );
  }
);

const ContentContainer = styled.View({
  padding: 16,
});
