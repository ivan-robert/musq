import { ProgressionNavigatorStackParamList } from "#navigation/Authenticated/pages/AuthenticatedTabNavigator/pages/Progression/ProgressionNavigator.types";
import { ArrowIcon } from "#shared/icons/ArrowIcon";
import { ShowArrowIcon } from "#shared/icons/ShowArrowIcon";
import { Typography } from "#shared/view/components/Typography/Typography";
import styled from "@emotion/native";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { DateTime } from "luxon";
import { useState } from "react";
import { Pressable } from "react-native";
import DateTimePicker from "react-native-modal-datetime-picker";

type Props = {
  referenceDate: DateTime;
  setReferenceDate: (date: DateTime) => void;
};

export const SessionsStatsHeader: React.FC<Props> = ({
  referenceDate,
  setReferenceDate,
}) => {
  const { goBack } =
    useNavigation<NavigationProp<ProgressionNavigatorStackParamList>>();
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  return (
    <Container>
      <RowContainer>
        <Pressable
          onPress={() => {
            goBack();
          }}
        >
          <ArrowIcon
            height={32}
            width={32}
            style={{ transform: [{ rotate: "180deg" }] }}
          />
        </Pressable>
        <MonthContainer>
          <Pressable
            onPress={() => {
              setReferenceDate(referenceDate.minus({ month: 1 }));
            }}
          >
            <ShowArrowIcon
              height={24}
              width={24}
              transform={[{ rotate: "180deg" }]}
            />
          </Pressable>
          <Pressable
            onPress={() => {
              setDatePickerVisibility(true);
            }}
          >
            <Typography.TitleL.regular>
              {referenceDate.toLocaleString({ month: "long", year: "numeric" })}
            </Typography.TitleL.regular>
          </Pressable>
          <Pressable
            onPress={() => {
              setReferenceDate(referenceDate.plus({ month: 1 }));
            }}
          >
            <ShowArrowIcon height={24} width={24} />
          </Pressable>
          <DateTimePicker
            onCancel={() => {
              setDatePickerVisibility(false);
            }}
            onConfirm={(date) => {
              setReferenceDate(DateTime.fromJSDate(date));
              setDatePickerVisibility(false);
            }}
            mode="date"
            isVisible={isDatePickerVisible}
          />
        </MonthContainer>
      </RowContainer>
    </Container>
  );
};

const Container = styled.View(({ theme }) => ({
  backgroundColor: theme.colors.white,
  padding: 16,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  borderWidth: 1,
  borderColor: theme.colors.text500,
}));

const RowContainer = styled.View({
  flexDirection: "row",
  gap: 8,
});

const MonthContainer = styled.View({
  flexDirection: "row",
  gap: 8,
  alignItems: "center",
  justifyContent: "center",
  flex: 1,
});
