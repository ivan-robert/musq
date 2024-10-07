import { service_client } from "./environment";
import { fetchExosAPI } from "./fetchOfficialExos";

export const populateExosAPI = async (limit: number, offset: number): Promise<"OK" | "FAILURE"> => {
    console.log("ATTEMPTING AN UDATE FROM ", offset, " TO ", offset + limit)
    const { data: existingExos, error } = await service_client
      .from("exercises_patched")
      .select("*");
    if (!existingExos) {
      return "FAILURE"
    }
    if (error) {
      throw error;
    }
    const inExos = existingExos[0].exercises_list;
    try {
      const exos = await fetchExosAPI(limit, offset);
      let acc: Record<string, any> = {};
      for (const exo of exos) {
        acc[exo.id] = exo;
      }
      for (const exo of inExos) {
        acc[exo.id] = exo;
      }
      const outExos = Object.values(acc);
      await service_client.from("exercises_patched").upsert([
        {
          id: "1",
          exercises_list: outExos,
          updated_at: new Date().toISOString(),
        },
      ]);
      return "OK"
    } catch (error) {
      console.error("Error fetching exercises: ", error);
      return "FAILURE"
    }
  };