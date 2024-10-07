import fs from "fs";
import path from "path";
import chalk from "chalk";

const BASE_LANGUAGE = "en";
const LOCALES_DIRECTORY = path.join(
  __dirname,
  "../src/app/translations/locales"
);
const languages = fs
  .readdirSync(LOCALES_DIRECTORY)
  .filter((f) => fs.statSync(path.join(LOCALES_DIRECTORY, f)).isDirectory());

const baseLangDir = path.join(LOCALES_DIRECTORY, BASE_LANGUAGE);
const baseIndex = require(baseLangDir).default;

function deepMergeObjects(
  baseObj: any,
  targetObj: any,
  addedKeypaths: string[] = [],
  baseKeypath: string = ""
): { addedKeys: string[] } {
  Object.keys(baseObj).forEach((key) => {
    const currentPath = baseKeypath ? `${baseKeypath}.${key}` : key;
    if (!targetObj.hasOwnProperty(key)) {
      if (typeof baseObj[key] === "string") {
        targetObj[key] = "";
        addedKeypaths.push(currentPath);
      } else {
        targetObj[key] = {};
        deepMergeObjects(
          baseObj[key],
          targetObj[key],
          addedKeypaths,
          currentPath
        );
      }
    } else if (
      typeof baseObj[key] === "object" &&
      baseObj[key] !== null &&
      typeof targetObj[key] === "object" &&
      targetObj[key] !== null
    ) {
      deepMergeObjects(
        baseObj[key],
        targetObj[key],
        addedKeypaths,
        currentPath
      );
    }
  });
  return { addedKeys: addedKeypaths };
}

async function updateTranslations() {
  for (const lang of languages) {
    if (lang === BASE_LANGUAGE) continue;
    console.log(
      chalk.bold(
        `Updating translations for language ${chalk.magentaBright.bold(lang)}\n`
      )
    );

    const langDir = path.join(LOCALES_DIRECTORY, lang);
    for (const [namespace, englishTranslations] of Object.entries(baseIndex)) {
      const filePath = path.join(langDir, `${namespace}.json`);

      if (!fs.existsSync(filePath)) {
        throw new Error(`Translation file not found: ${filePath}`);
      }

      let translations = JSON.parse(fs.readFileSync(filePath, "utf8"));
      let addedKeys: string[] = [];

      const { addedKeys: newKeys } = deepMergeObjects(
        englishTranslations,
        translations,
        addedKeys,
        ""
      );

      logUpdate(namespace, newKeys);

      fs.writeFileSync(filePath, JSON.stringify(translations, null, 2), "utf8");
    }
  }
  console.log(chalk.greenBright("🎉 Translation update complete. 🎉"));
}

function logUpdate(namespace: string, addedKeys: string[]) {
  console.log(
    chalk.blueBright.bold(
      `Updating namespace ${chalk.yellowBright.bold(namespace)}...`
    )
  );

  if (addedKeys.length > 0) {
    addedKeys.forEach((key) => {
      console.log(
        `   ${chalk.green(`Found new key: ${chalk.cyanBright(key)}`)}`
      );
    });
  } else {
    console.log(chalk.blue(`   No new keys added to namespace.`));
  }

  console.log(
    chalk.greenBright(
      `✅ Successfully updated ${chalk.yellowBright(namespace)} namespace ✅\n`
    )
  );
}

// Start the update process
updateTranslations().catch((error) => {
  console.error(
    chalk.redBright(`Error updating translations: ${error.message}`)
  );
});
