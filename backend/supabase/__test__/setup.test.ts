import { setup_test_db } from "./shared/setup/index.ts";

Deno.test("check db setup", async () => {
  await setup_test_db();
});
