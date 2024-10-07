import { adaptRepartitionToPoints } from "#modules/Statistics/SessionsStats/utils/adaptRepartitionToPoints";

describe("adaptRepartitionToPoints", () => {
  it("should return an array of DataPoint with the correct values", () => {
    expect(adaptRepartitionToPoints({ a: 1, b: 2, c: 3, d: 0 })).toEqual([
      { label: "a", value: 33.33 },
      { label: "b", value: 66.67 },
      { label: "c", value: 100 },
    ]);
  });
  it("should work fine with 0 values", () => {
    expect(adaptRepartitionToPoints({ a: 0, b: 0, c: 0 })).toEqual([]);
  });
});
