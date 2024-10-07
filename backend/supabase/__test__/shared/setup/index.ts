import { assertEquals } from "https://deno.land/std@0.210.0/assert/assert_equals.ts";
import { supabase_service_client } from "../client.ts";
import { Logger } from "#shared/service/logger.service.ts";
import { setup_auth } from "./auth.setup.ts";
import { createExoEntries } from "./exos.setup.ts";
import { createPerfEntries, perfEntries } from "./perfs.setup.ts";
import { createSalleEntries, sallesEntries } from "./salles.setup.ts";
import { seancesEntries, create_all_seances } from "./seances.setup.ts";
import { createSetEntries, seriesPoidsEntries } from "./sets.setup.ts";

export const setup_test_db = async () => {
  await createExoEntries();

  const { data: exoData } = await supabase_service_client
    .from("seances")
    .select("*");

  if (exoData?.length === 0) {
    await populateDb();
  }
};

const populateDb = async () => {
  await setup_auth();
  await createExoEntries();

  await createSalleEntries();
  const { data: salleData } = await supabase_service_client
    .from("salles")
    .select("*");

  assertEquals(salleData?.length, Object.keys(sallesEntries).length);
  await create_all_seances();
  const { data: seanceData } = await supabase_service_client
    .from("seances")
    .select("*");
  assertEquals(seanceData?.length, Object.keys(seancesEntries).length);
  await createPerfEntries();
  const { data: perfData } = await supabase_service_client
    .from("perfs")
    .select("*");

  assertEquals(perfData?.length, Object.keys(perfEntries).length);
  await createSetEntries();
  const { data: setData } = await supabase_service_client
    .from("sets")
    .select("*");
  assertEquals(
    setData?.length,
    3 * //we assume we have the same amout of entries for each exo type
      Object.keys(seriesPoidsEntries).reduce(
        (acc, key) =>
          acc +
          // @ts-expect-error string indexing
          (Array.isArray(seriesPoidsEntries[key])
            ? // @ts-expect-error string indexing
              seriesPoidsEntries[key].length
            : 1),
        0
      )
  );

  Logger.info("🔨 ---DB POPULATED--- 🔨");
  Logger.info("\n✅ ---TEST SETUP COMPLETE--- ✅");
};
