import fs from "fs";
import { fetchASUPrograms } from "./modules/fetchData";
import parseToCsv from "./modules/parseToCsv";
import scrapPrograms from "./modules/scrapPrograms";

const asuBasePath = "https://asuonline.asu.edu";
const asuAPIUrl = "https://api.edpl.us/v1/asuo/programs";
const args = process.argv.slice(2);
const isDryRun = args.includes("dry-run");

if (isDryRun) {
  args.splice(args.indexOf("dry-run"), 1);
}

const filename = args.length ? args[0] : "programs.csv";

const init = async () => {
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

init();
