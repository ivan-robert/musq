import styled from "@emotion/native";
import { useTheme } from "@emotion/react";

import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useReducer, useState } from "react";

import { DeletableTag, tagContainerStyle } from "#shared/view/Tag";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  filterExos,
  initialExoFilter,
  reduceExoFilterData,
} from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/reduceExoFilterData";
import { PlusIcon } from "#shared/icons/PlusIcon";
import { PressableExo } from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/PressableExo";
import { RootStackNavigatorParamList } from "#navigation/Authenticated/rootStackNavigator.types";
import { Exo } from "#shared/exo/domain/exo.types";
import { FlatList, Modal, Pressable, View } from "react-native";
import { TextInput } from "#shared/view/components/TextInput";
import { Spacer } from "#shared/view/components/Spacer";
import { Muscle } from "#shared/muscle/domain/muscle.types";
import { Typography } from "#shared/view/components/Typography/Typography";
import { ComponentTabs } from "#shared/view/components/ComponentTabs";
import { exoTypeItems } from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/exoTypeItems";
import { CheckboxPressable } from "#shared/view/components/CheckBoxPressable";
import { ArrowIcon } from "#shared/icons/ArrowIcon";
import Collapsible from "react-native-collapsible";
import { AddMuscleFilterModal } from "#modules/Seance/view/addSeance/ExoCard/ChooseExoModal/AddMuscleModal/AddMuscleFilterModal";
import { useMuscles } from "#shared/muscle/view/useMuscles";
import { ScrollView } from "#shared/view/components/ScrollView";
import { useOfficialExosContext } from "#shared/exo/view/OfficialExos.context";
import { featureFlags } from "#app/featureFlags";
import { useTranslation } from "react-i18next";

type ChooseExoModalProps = {
  closeModal: () => void;
  isModalVisible: boolean;
  onExoPress: (exo: Exo) => void;
};

export const ChooseExoModal: React.FC<ChooseExoModalProps> = React.memo(
  ({ closeModal, isModalVisible, onExoPress }) => {
    const { data: muscles } = useMuscles();
    const { t } = useTranslation(["workouts"]);

    const exos = useOfficialExosContext();

    const [filter, dispatchFilter] = useReducer(
      reduceExoFilterData,
      initialExoFilter
    );

    const [showAddMuscleModal, setShowAddMuscleModal] = useState(false);

    const { navigate } =
      useNavigation<NavigationProp<RootStackNavigatorParamList>>();

    const clearModal = () => {
      closeModal();
      dispatchFilter({ type: "RESET_FILTER" });
    };

    const filteredExos = filterExos(Object.values(exos), filter);

    return (
      <Modal
        visible={isModalVisible}
        animationType="slide"
        onRequestClose={clearModal}
      >
        <AddMuscleFilterModal
          muscles={muscles.filter((muscle) => !filter.muscles.includes(muscle))}
          closeModal={() => {
            setShowAddMuscleModal(false);
          }}
          isModalVisible={showAddMuscleModal}
          addMuscle={(muscle) =>
            dispatchFilter({ type: "ADD_MUSCLE", newMuscle: muscle })
          }
        />
        <ContentContainer>
          <PaddingContainer style={{ gap: 16 }}>
            <Typography.TextL.bold>
              {t("addWorkout.chooseExercise")}
            </Typography.TextL.bold>
            <TextInput
              autoCapitalize="none"
              placeholder={t("addWorkout.filterByName")}
              onChangeText={(text) => {
                dispatchFilter({
                  type: "CHANGE_EXO_FILTER_NAME",
                  newName: text,
                });
              }}
            />

            <Typography.TextM.regular>
              {t("addWorkout.filterByTrainedMuscles")}
            </Typography.TextM.regular>
          </PaddingContainer>
          <Spacer.Vertical gap={8} />
          <MuscleTagsShrinkContainer>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={{ gap: 16, paddingHorizontal: 16 }}
              style={{ flex: 0 }}
            >
              {filter.muscles.map((muscle: Muscle) => (
                <DeletableTag
                  onPress={() => {
                    dispatchFilter({
                      type: "REMOVE_MUSCLE",
                      muscleToRemove: muscle,
                    });
                  }}
                  onCrossPress={() => {
                    dispatchFilter({
                      type: "REMOVE_MUSCLE",
                      muscleToRemove: muscle,
                    });
                  }}
                  key={muscle.muscle_id}
                  label={t(muscle.muscle_name)}
                />
              ))}
              <PlusTag
                onPress={() => {
                  setShowAddMuscleModal(true);
                }}
              />
            </ScrollView>
          </MuscleTagsShrinkContainer>
          <Spacer.Vertical gap={8} />
          <PaddingContainer>
            <FilterDescriptionContainer>
              <CheckboxPressable
                onPress={() => {
                  dispatchFilter({
                    type: "CHANGE_USE_TYPE_FILTER",
                    newValue: !filter.useTypeFilter,
                  });
                }}
                isChecked={filter.useTypeFilter}
                size={24}
              />
              <Typography.TextM.regular>
                {t("addWorkout.filterByEquipment")}
              </Typography.TextM.regular>
            </FilterDescriptionContainer>
          </PaddingContainer>

          <Spacer.Vertical gap={8} />

          <Collapsible collapsed={!filter.useTypeFilter}>
            <ComponentTabs
              tabsItems={exoTypeItems}
              selectedTabValue={filter.exoType}
              onTabPress={(item) => {
                dispatchFilter({
                  type: "CHANGE_EXO_FILTER_TYPE",
                  newType: item.value,
                });
              }}
            />
          </Collapsible>

          <PaddingContainer style={{ flex: 1 }}>
            <ExosContainer>
              <FlatList
                style={{ flex: 1 }}
                contentContainerStyle={{ gap: 8, paddingTop: 16 }}
                data={filteredExos}
                keyExtractor={(item) => item.exoId}
                renderItem={({ item }) => (
                  <PressableExo
                    key={item.exoId}
                    exo={item}
                    onPress={() => {
                      closeModal();
                      onExoPress(item);
                    }}
                  />
                )}
              />
            </ExosContainer>
            {featureFlags.addOwnExo && (
              <Pressable
                style={{
                  justifyContent: "center",
                  alignItems: "center",
                  padding: 16,
                  gap: 8,
                  flexDirection: "row",
                }}
                onPress={() => {
                  clearModal();
                  navigate("AddExoPage");
                }}
              >
                <Typography.TextM.regular>
                  {t("addWorkout.addNewExercise")}
                </Typography.TextM.regular>
                <ArrowIcon height={16} width={16} />
              </Pressable>
            )}
            <Spacer.Vertical gap={16} />
            <CancelButton onPress={clearModal} />
          </PaddingContainer>
        </ContentContainer>
      </Modal>
    );
  }
);

const CancelButton = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();
  const { t } = useTranslation();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        paddingVertical: 8,
        paddingHorizontal: 16,
        borderRadius: 8,
        borderWidth: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "transparent",
        borderColor: pressed ? theme.colors.black : theme.colors.redDelete,
      })}
    >
      {({ pressed }) => (
        <Typography.TitleM.regular
          color={pressed ? theme.colors.black : theme.colors.redDelete}
        >
          {t("common:actions.cancel")}
        </Typography.TitleM.regular>
      )}
    </Pressable>
  );
};

export const PlusTag = ({ onPress }: { onPress: () => void }) => {
  const theme = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => ({
        ...tagContainerStyle,
        backgroundColor: pressed
          ? theme.colors.CTA500
          : theme.colors.primary200,
        borderColor: pressed ? theme.colors.CTA500 : theme.colors.primary200,
      })}
    >
      <PlusIcon height={16} width={16} color={theme.colors.text500} />
    </Pressable>
  );
};

const ContentContainer = ({ children }: { children: React.ReactNode }) => {
  const { top, bottom } = useSafeAreaInsets();
  return (
    <View
      style={{
        marginTop: top,
        marginBottom: bottom,
        paddingTop: 16,
        paddingBottom: 24,
        flex: 1,
      }}
    >
      {children}
    </View>
  );
};

const ExosContainer = styled.View({ flex: 1 });

const PaddingContainer = styled.View({ paddingHorizontal: 16 });

const MuscleTagsShrinkContainer = styled.View({});

const FilterDescriptionContainer = styled.View({
  flexDirection: "row",
  gap: 8,
  flexWrap: "wrap",
  alignItems: "center",
});
