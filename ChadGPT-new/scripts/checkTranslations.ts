//@ts-nocheck
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

function checkTranslations(
  baseObj,
  targetObj,
  missingTranslations: string[] = [],
  baseKeypath = ""
) {
  Object.keys(baseObj).forEach((key) => {
    const currentPath = baseKeypath ? `${baseKeypath}.${key}` : key;
    if (!targetObj.hasOwnProperty(key) || targetObj[key] === "") {
      missingTranslations.push(currentPath);
    } else if (
      typeof baseObj[key] === "object" &&
      baseObj[key] !== null &&
      typeof targetObj[key] === "object" &&
      targetObj[key] !== null
    ) {
      checkTranslations(
        baseObj[key],
        targetObj[key],
        missingTranslations,
        currentPath
      );
    }
  });
  return { missingKeys: missingTranslations };
}

async function checkAllTranslations() {
  for (const lang of languages) {
    if (lang === BASE_LANGUAGE) continue;
    console.log(
      chalk.bold(
        `Checking translations for language ${chalk.magentaBright.bold(lang)}\n`
      )
    );

    const langDir = path.join(LOCALES_DIRECTORY, lang);
    let hasMissing = false;

    for (const [namespace, englishTranslations] of Object.entries(baseIndex)) {
      const filePath = path.join(langDir, `${namespace}.json`);

      if (!fs.existsSync(filePath)) {
        console.error(chalk.red(`Translation file not found: ${filePath}`));
        continue;
      }

      const translations = JSON.parse(fs.readFileSync(filePath, "utf8"));
      const missingKeys = checkTranslations(
        englishTranslations,
        translations
      ).missingKeys;

      if (missingKeys.length > 0) {
        logMissing(namespace, missingKeys);
        hasMissing = true;
      }
    }

    if (!hasMissing) {
      console.log(chalk.green(`All translations present for ${lang}.`));
    } else {
      throw new Error(`Missing translations found for ${lang}.`);
    }
  }
}

function logMissing(namespace, missingKeys) {
  console.log(
    chalk.redBright.bold(
      `Missing translations in namespace ${chalk.yellowBright.bold(namespace)}:`
    )
  );
  missingKeys.forEach((key) => {
    console.log(`   ${chalk.red(key)}`);
  });
  console.log(); // Add an empty line for better readability
}

// Start the check process
checkAllTranslations().catch((error) => {
  console.error(
    chalk.redBright(`Error checking translations: ${error.message}`)
  );
  throw error;
});
