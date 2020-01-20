import AsuScrapper from "./modules/AsuScrapper";

const args = process.argv.slice(2);
const isDryRun = args.includes("dry-run");

if (isDryRun) {
  args.splice(args.indexOf("dry-run"), 1);
}

const filename = args.length ? args[0] : "programs.csv";

const init = async () => {
  await AsuScrapper(isDryRun, filename);
};

init();
