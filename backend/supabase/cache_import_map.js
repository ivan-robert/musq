// cache_import_map.js
const importMap = JSON.parse(Deno.readTextFileSync("./import_map.json"));

for (const key in importMap.imports) {
  if (key[0] !== "@") continue;
  const url = importMap.imports[key];
  console.log(`Caching ${url}`);
  Deno.run({
    cmd: ["deno", "cache", url],
  }).status(); // This waits for the cache command to complete
}
