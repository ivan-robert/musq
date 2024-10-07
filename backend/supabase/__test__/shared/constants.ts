let env;
try {
  env = Deno.env;
} catch (error) {
  env = { get: (key: string) => undefined };
}
export const showLogs = env.get("TEST_MODE") === "verbose";
