import { describe, it } from "@testing-library";
import { assertThrows, assertEquals } from "@assert";
import { annotateTimeSerie } from "./compute_statistics.ts";
import {
  threePointsRepsTimeSerie,
  threePointsRepsTimeSerieInput,
} from "./__mocks__/timeserie.mock.ts";

describe("annotateTimeSerie", () => {
  it("returns an empty array when given an empty array", () => {
    const repsAnnotated = annotateTimeSerie([], "reps");
    const weightAnnotated = annotateTimeSerie([], "weight");
    const timeAnnotated = annotateTimeSerie([], "time_in_seconds");
    assertEquals(weightAnnotated, []);
    assertEquals(repsAnnotated, []);
    assertEquals(timeAnnotated, []);
  });

  describe("intensity annotation", () => {
    it("works for 3-point reps time series", () => {
      const repsAnnotated = annotateTimeSerie(
        threePointsRepsTimeSerieInput,
        "reps"
      );
      assertEquals(repsAnnotated, threePointsRepsTimeSerie);
    });
  });

  it("throws specific error when given a broken timeserie", () => {
    assertThrows(
      () => {
        return annotateTimeSerie(
          threePointsRepsTimeSerieInput,
          "time_in_seconds"
        );
      },
      Error,
      "Invalid time_in_seconds timeserie point: "
    );
  });
});
