import fg from "fast-glob";
import fs from "fs-extra";
import _ from "lodash";
import prettier from "prettier";

const ASSET_PREFIX = "public/assets/images/";

const removeExtension = (filePath: string) => {
  const arr = filePath.split(".");
  arr.splice(arr.length - 1, 1);
  return arr.join(".");
};

(async () => {
  const rawEntries = await fg(`${ASSET_PREFIX}**/*`);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};
  for (const entry of rawEntries) {
    const filePath = entry.substr("public".length);
    const objPath = removeExtension(entry)
      .substr(ASSET_PREFIX.length)
      .split("/")
      .map(_.camelCase)
      .map((v) => (v.match(/^[0-9](.*)/) ? `_${v}` : v));
    _.set(result, objPath, filePath);
  }
  const resultPath = "./src/constants/assets.ts";
  const configFile = await prettier.resolveConfigFile();
  await fs.writeFile(
    resultPath,
    prettier.format(
      `
    /**
    * THIS IS AUTOMATICALLY GENERATED USING /generateAssets.ts.
    * DON'T CHANGE IT MANUALLY.
    */

    export const assets = ${JSON.stringify(result)}
    `,
      {
        filepath: configFile ?? undefined,
      },
    ),
  );
})();

const PAGES_PREFIX = "src/pages/";

(async () => {
  const rawEntries = await fg(`${PAGES_PREFIX}**/*`, {
    ignore: ["src/pages/_document.tsx", "src/pages/_app.tsx"],
  });
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const result: any = {};
  for (const rawEntry of rawEntries) {
    const entry = removeExtension(rawEntry);
    const filePath = entry.substr(PAGES_PREFIX.length - 1);
    const objPath = entry
      .substr(PAGES_PREFIX.length)
      .split("/")
      .map(_.camelCase)
      .map((v) => (v.match(/^[0-9](.*)/) ? `_${v}` : v));
    _.set(result, objPath, filePath.replace(/\/index$/, "/"));
  }
  const resultPath = "./src/constants/urls.ts";
  const configFile = await prettier.resolveConfigFile();
  await fs.writeFile(
    resultPath,
    prettier.format(
      `
    /**
    * THIS IS AUTOMATICALLY GENERATED USING /generateAssets.ts.
    * DON'T CHANGE IT MANUALLY.
    */

    export const urls = ${JSON.stringify(result)}
    `,
      {
        filepath: configFile ?? undefined,
      },
    ),
  );
})();
