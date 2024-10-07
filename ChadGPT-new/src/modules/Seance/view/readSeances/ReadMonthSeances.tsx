import { useTheme } from "@emotion/react";
import { Calendar, LocaleConfig } from "react-native-calendars";
import { configCalendar } from "#modules/Seance/utils/calendar.config";
import { useCallback, useEffect, useState } from "react";
import { View } from "react-native";
import { useFetchSeances } from "#modules/Seance/view/readSeances/useFetchSeances";
import { getMarkedDates } from "#modules/Seance/utils/getMarkedDates";
import {
  GestureHandlerRootView,
  PanGestureHandler,
} from "react-native-gesture-handler";
import { Spacer } from "#shared/view/components/Spacer";
import { DateTime } from "luxon";
import { Typography } from "#shared/view/components/Typography/Typography";
import { useTranslation } from "react-i18next";
import i18next from "i18next";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { SeanceItem } from "#modules/Seance/view/readSeances/SeanceItem";

const CALENDAR_HEADER_HEIGHT = 80;
const DRAGGABLE_VIEW_HEIGHT = 36;

configCalendar();

export const ReadMonthSeances = () => {
  const theme = useTheme();

  LocaleConfig.defaultLocale = i18next.language;

  const { t } = useTranslation("workouts");

  const [currentMonthFirstDay, setCurrentMonthFirstDay] = useState(new Date());

  const firstDayOfMonth = DateTime.fromJSDate(currentMonthFirstDay)
    .startOf("month")
    .toJSDate();
  const lastDayOfMonth = DateTime.fromJSDate(currentMonthFirstDay)
    .endOf("month")
    .toJSDate();

  const { data: seancesOfTheMonth } = useFetchSeances({
    start_date: firstDayOfMonth,
    end_date: lastDayOfMonth,
  });

  const [selected, setSelected] = useState("");
  const [themeMemory, setThemeMemory] = useState(theme);
  const selectedDate = selected !== "" ? new Date(selected) : undefined;

  const markedDates = getMarkedDates(seancesOfTheMonth, selected, theme);

  const [maxCalendarHeight, setMaxCalendarHeight] = useState(1400);
  const calendarHeight = useSharedValue(600);
  const readyToSnap = useSharedValue(false);

  const snapCalendar = useCallback(
    (height: number) => {
      const interHeight = (maxCalendarHeight + CALENDAR_HEADER_HEIGHT) / 2;
      const snapHeight =
        height > interHeight ? maxCalendarHeight : CALENDAR_HEADER_HEIGHT;
      calendarHeight.value = withTiming(snapHeight, {
        duration: 300,
        easing: Easing.inOut(Easing.quad),
      });
    },
    [maxCalendarHeight, calendarHeight]
  );

  useEffect(() => {
    snapCalendar(calendarHeight.value > 100 ? 1000 : 0);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [snapCalendar]);

  const calendarStyle = useAnimatedStyle(() => {
    return {
      height: calendarHeight.value,
      marginHorizontal: 16,
      marginBottom: 8,
      overflow: "hidden",
      borderRadius: 8,
    };
  });

  if (themeMemory.id !== theme.id) {
    //this is an ugly hack to fix a bug with the calendar theme. I force it to unmount and remount
    setTimeout(() => {
      setThemeMemory(theme);
    }, 100);
  }

  const selectedSeances = !selectedDate
    ? []
    : seancesOfTheMonth.filter((seance) => {
        return (
          DateTime.fromISO(seance.startDate)
            .startOf("day")
            .diff(DateTime.fromJSDate(selectedDate).startOf("day"), "days")
            .days === 0
        );
      });

  return (
    <>
      <Typography.TitleL.regular
        color={theme.colors.text500}
        style={{ paddingHorizontal: 16 }}
      >
        {t("yourWorkouts")}
      </Typography.TitleL.regular>
      <Spacer.Vertical gap={16} />
      <GestureHandlerRootView style={{}}>
        <PanGestureHandler
          onGestureEvent={(event) => {
            const height = event.nativeEvent.y;
            if (height < CALENDAR_HEADER_HEIGHT || height > maxCalendarHeight) {
              return;
            }
            if (height < calendarHeight.value - 2 * DRAGGABLE_VIEW_HEIGHT) {
              return;
            }
            calendarHeight.value = height;
            readyToSnap.value = true;
          }}
          onHandlerStateChange={(event) => {
            const height = event.nativeEvent.y;
            if (readyToSnap.value) {
              readyToSnap.value = false;
              snapCalendar(height);
            }
          }}
        >
          <Animated.View style={calendarStyle}>
            <View
              onLayout={(event) => {
                setMaxCalendarHeight(
                  event.nativeEvent.layout.height + DRAGGABLE_VIEW_HEIGHT
                );
              }}
            >
              {themeMemory.id === theme.id && (
                <Calendar
                  headerStyle={{ height: CALENDAR_HEADER_HEIGHT }}
                  theme={{
                    calendarBackground: theme.colors.primary300,
                    selectedDayTextColor: theme.colors.text500,
                    selectedDayBackgroundColor: theme.colors.CTA300,
                    dayTextColor: theme.colors.text300,
                    agendaDayTextColor: theme.colors.text300,
                    monthTextColor: theme.colors.text500,
                    textDisabledColor: theme.colors.text100,
                    arrowColor: theme.colors.CTA300,
                    disabledArrowColor: theme.colors.text200,
                  }}
                  disableArrowRight={
                    DateTime.fromJSDate(firstDayOfMonth) >=
                    DateTime.now().startOf("month")
                  }
                  onMonthChange={(date: { timestamp: number }) => {
                    setCurrentMonthFirstDay(new Date(date.timestamp));
                  }}
                  onDayPress={(day: { dateString: string }) =>
                    setSelected(
                      selected == day.dateString ? "" : day.dateString
                    )
                  }
                  style={{
                    borderTopLeftRadius: 5,
                    borderTopRightRadius: 5,
                  }}
                  markingType={"period"}
                  markedDates={markedDates}
                />
              )}
            </View>
            <DraggableView />
          </Animated.View>
        </PanGestureHandler>
      </GestureHandlerRootView>

      <View style={{ padding: 16, gap: 8 }}>
        {selectedSeances.map((seance) => (
          <SeanceItem seance={seance} />
        ))}
      </View>
    </>
  );
};

const DraggableView = () => {
  const theme = useTheme();
  return (
    <View
      style={{
        position: "absolute",
        bottom: 0,
        width: "100%",
        alignItems: "center",
        backgroundColor: theme.colors.primary300,
        paddingVertical: 16,
      }}
    >
      <View
        style={{
          width: 40,
          height: 4,
          borderRadius: 8,
          backgroundColor: theme.colors.grey300,
        }}
      />
    </View>
  );
};
