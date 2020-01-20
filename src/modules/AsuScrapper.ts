import fs from "fs";
import Config from "./Config";
import { fetchASUPrograms } from "./fetchData";
import parseToCsv from "./parseToCsv";
import scrapPrograms from "./scrapPrograms";

const { asuAPIUrl, asuBasePath } = Config;

export default async (isDryRun: boolean, filename: string) => {
  if (isDryRun) {
    console.info("\x1b[35m%s\x1b[0m", "Starting dry-run process...\n");
  } else {
    console.info("\x1b[36m%s\x1b[0m", "Starting scrapping process...\n");
  }

  const asuData = await fetchASUPrograms(asuAPIUrl);

  console.info(`Trying to fetch data from ${asuData.length} pages\n`);

  const scrappedData = await scrapPrograms(asuData, asuBasePath, isDryRun);

  console.info("\x1b[36m%s\x1b[0m", `\nData fetched succesfully from ${scrappedData.length} pages\n`);

  if (!isDryRun) {
    const csv = parseToCsv(scrappedData);

    fs.writeFile(filename, csv, (err) => {
      if (err) {
        console.log(err);
      }
      console.log("\x1b[32m%s\x1b[0m", `CSV file stored in: ${filename}`);
    });
  }
};
