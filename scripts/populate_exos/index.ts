import { populateExosAPI } from "./populate";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const fetchWithRetries = async (
  limit: number,
  offset: number,
  attempts = 0,
  retryLimit = 5,
  delay = 5000
): Promise<string> => {
  console.log(`Fetching data for offset ${offset}, attempt ${attempts + 1}`);
  const status = await populateExosAPI(limit, offset);

  if (status === "OK") {
    console.log(`Successfully fetched data for offset ${offset}`);
    return status
  }

  if (attempts < retryLimit) {
    console.log(`Retrying in ${delay} ms...`);
    await sleep(delay);
    return fetchWithRetries(limit, offset, attempts + 1, retryLimit, delay);
  }

  throw new Error(
    `Failed to fetch data for offset ${offset} after ${retryLimit} attempts.`
  );
};

const populateJob = async () => {
  const limit = 100;
  const maxOffset = 1300;
  const retryLimit = 5;
  const delay = 5000; // 5 seconds

  for (let offset = 0; offset <= maxOffset; offset+=limit) {
    await fetchWithRetries(limit, offset, 0, retryLimit, delay);
  }
};

try {
  populateJob().then(() => {
    console.log("🎉🎉🎉 Successfully populated exercises 🎉🎉🎉");
  });
} catch (error) {
  console.error("Failed to populate exercises:", error);
}
