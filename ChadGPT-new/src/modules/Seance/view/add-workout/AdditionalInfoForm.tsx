import { WorkoutFullForm } from "#modules/Seance/domain/workoutFullForm.schema";
import { FakeTimeDropDown } from "#modules/Seance/view/FakeDropDown";
import { bodyPartSchema } from "#shared/exo/infra/muscles.dto";
import { ArrowIcon } from "#shared/icons/ArrowIcon";
import { CameraModal } from "#shared/view/components/CameraModal";
import { ScrollView } from "#shared/view/components/ScrollView";
import { Spacer } from "#shared/view/components/Spacer";
import { TextInput } from "#shared/view/components/TextInput";
import { Typography } from "#shared/view/components/Typography/Typography";
import { SelectableTag } from "#shared/view/Tag";
import styled from "@emotion/native";
import { useTheme } from "@emotion/react";
import { Icon } from "@rneui/base";
import { ImagePickerAsset } from "expo-image-picker";
import { useState } from "react";
import { Control, Controller } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { Dimensions, View } from "react-native";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { Pressable } from "react-native";

const screenWidth = Dimensions.get("window").width;

const MAX_IMAGES = 5;

const getImageDimensions = (image: ImagePickerAsset) => {
  const maxWidth = screenWidth - 32;
  const maxHeight = (screenWidth * 9) / 16;
  const ratio = Math.min(maxWidth / image.width, maxHeight / image.height);
  return {
    width: image.width * ratio,
    height: image.height * ratio,
  };
};

type Props = {
  control: Control<WorkoutFullForm>;
  images: ImagePickerAsset[];
};
export const AdditionalInfoForm: React.FC<Props> = ({ control, images }) => {
  const [isCameraModalVisible, setIsCameraModalVisible] = useState(false);
  const theme = useTheme();
  const { t } = useTranslation("workouts");

  return (
    <>
      <Container>
        <Typography.TextM.regular color={theme.colors.text200}>
          {t("newAddWorkout.title")}
        </Typography.TextM.regular>
        <Spacer.Vertical gap={4} />
        <Controller
          control={control}
          name="title"
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                value={value}
                onChangeText={onChange}
                placeholder={t("newAddWorkout.titlePlaceholder")}
              />
            );
          }}
        />
        <Spacer.Vertical gap={16} />

        <Typography.TextM.regular color={theme.colors.text200}>
          {t("newAddWorkout.description")}
        </Typography.TextM.regular>
        <Spacer.Vertical gap={4} />
        <Controller
          control={control}
          name="description"
          render={({ field: { onChange, value } }) => {
            return (
              <TextInput
                value={value}
                onChangeText={onChange}
                multiline
                style={{ height: 100 }}
                placeholder={t("newAddWorkout.descriptionPlaceholder")}
              />
            );
          }}
        />
        <View style={{ flexDirection: "row", alignItems: "center" }}>
          <View style={{ flex: 1 }}>
            <Controller
              control={control}
              name="workout"
              render={({ field: { onChange, value } }) => {
                return (
                  <FakeTimeDropDown
                    style={{ padding: 16 }}
                    setValue={(date) => onChange({ ...value, startDate: date })}
                    value={value.startDate}
                    maximumDate={value.endDate}
                  />
                );
              }}
            />
          </View>
          <ArrowIcon height={16} width={16} color={theme.colors.text200} />
          <View style={{ flex: 1, padding: 16 }}>
            <Controller
              control={control}
              name="workout"
              render={({ field: { onChange, value } }) => {
                return (
                  <FakeTimeDropDown
                    style={{ padding: 16 }}
                    setValue={(date) => onChange({ ...value, endDate: date })}
                    value={value.endDate}
                    minimumDate={value.startDate}
                  />
                );
              }}
            />
          </View>
        </View>
      </Container>
      <Typography.TextM.regular
        color={theme.colors.text200}
        style={{ paddingHorizontal: 16 }}
      >
        {t("newAddWorkout.targets")}
      </Typography.TextM.regular>
      <Spacer.Vertical gap={4} />
      <Controller
        control={control}
        name="workout.types"
        render={({ field: { onChange, value } }) => {
          return (
            <ScrollView
              horizontal
              contentContainerStyle={{ gap: 8, paddingHorizontal: 16 }}
            >
              {bodyPartSchema.options.map((bodyPart) => {
                const isSelected = value.includes(bodyPart);
                return (
                  <SelectableTag
                    isSelected={isSelected}
                    label={bodyPart}
                    onPress={() => {
                      isSelected
                        ? onChange(value.filter((v) => v !== bodyPart))
                        : onChange([...value, bodyPart]);
                    }}
                  />
                );
              })}
            </ScrollView>
          );
        }}
      />

      <Spacer.Vertical gap={16} />

      <Controller
        control={control}
        name="images"
        render={({ field: { onChange, value } }) => {
          return (
            <>
              <Typography.TextM.regular
                color={theme.colors.text200}
                style={{ paddingHorizontal: 16 }}
              >
                {t("newAddWorkout.imagesIndicator", {
                  index: images.length,
                  total: MAX_IMAGES,
                })}
              </Typography.TextM.regular>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                pagingEnabled
              >
                {images.map((image) => (
                  <CarouselItemContainer key={image.uri}>
                    <Image
                      source={{ uri: image.uri }}
                      style={{
                        ...getImageDimensions(image),
                        borderRadius: 16,
                      }}
                    />
                    <DeleteIconContainer
                      onPress={() =>
                        onChange(value.filter((img) => img.uri !== image.uri))
                      }
                    >
                      <Icon
                        name="cancel"
                        size={32}
                        color={theme.colors.redDelete}
                      />
                    </DeleteIconContainer>
                  </CarouselItemContainer>
                ))}
                {images.length < MAX_IMAGES && (
                  <CarouselItemContainer>
                    <Pressable
                      onPress={() => {
                        setIsCameraModalVisible(true);
                      }}
                    >
                      {({ pressed }) => (
                        <>
                          <ImageContainer pressed={pressed}>
                            <Icon
                              name={
                                !images.length ? "image" : "add-circle-outline"
                              }
                              size={48}
                              color={theme.colors.text200}
                            />
                          </ImageContainer>
                        </>
                      )}
                    </Pressable>
                  </CarouselItemContainer>
                )}
              </ScrollView>
              <CameraModal
                isVisible={isCameraModalVisible}
                onConfirm={(result) => {
                  onChange([...value, ...result].slice(0, MAX_IMAGES));
                }}
                closeModal={() => {
                  setIsCameraModalVisible(false);
                }}
              />
            </>
          );
        }}
      />
    </>
  );
};

const CarouselItemContainer = styled.View({
  width: screenWidth,
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  paddingHorizontal: 16,
  paddingVertical: 8,
});

const DeleteIconContainer = styled(TouchableOpacity)({
  position: "absolute",
  top: 16,
  right: 16,
  zIndex: 1,
});

const ImageContainer = styled.View<{ pressed: boolean }>(
  ({ theme, pressed }) => ({
    aspectRatio: 16 / 9,
    width: "100%",
    backgroundColor: pressed ? "transparent" : theme.colors.primary200,
    flexDirection: "row",
    borderWidth: 1,
    borderColor: theme.colors.text200,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  })
);

const Container = styled.View({ paddingHorizontal: 16 });
