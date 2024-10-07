import { getEnvVar } from "#app/environment";

it("returns the URL and anon key in environment", () => {
  expect(getEnvVar("SUPABASE_URL")).toBe("http://fake-url.fr");
  expect(getEnvVar("SUPABASE_KEY")).toBe("fake-key");
});
