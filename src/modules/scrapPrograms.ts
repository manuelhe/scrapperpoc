import sanitize from "sanitize-html";
import Config from "./Config";
import { fetchData } from "./fetchData";

interface IScrappedData {
  academicPartnerId: string;
  careers: string;
  college: string;
  curriculum: string;
  entryRequirements: string;
  overview: string;
  rawCareers: string;
  rawCurriculum: string;
  rawEntryRequirements: string;
  rawOverview: string;
}

const sanitizeOptions = {
  allowedAttributes: {},
  allowedTags: ["h1", "h2", "h3", "h4", "h5", "h6", "blockquote", "p", "ul", "ol",
    "nl", "li", "b", "i", "strong", "em", "strike", "code", "hr", "br",
  ],
  transformTags: {
    div: "p",
    table: "ul",
    tr: "li",
  },
};

const htmlCleanup = (html: string): string => {
  return sanitize(html, sanitizeOptions)
    .trim()
    .replace(/\s+/g, " ")
    .replace("&lt;", "<")
    .replace("&gt;", ">");
};
const collegeSeparator = "<h3>Faculty</h3>";

const fetchProgramInfo = async (url: string, isDryRun: boolean): Promise<IScrappedData> => {
  try {
    console.info("\x1b[33m%s\x1b[0m", `Fetching: ${url}`);

    if (isDryRun) {
      return null;
    }

    const $ = await fetchData(url);
    const rawCareers = $("#careers-content .program-tab-content").html();
    const rawCurriculum = $("#courses-content .program-tab-content").html();
    const rawEntryRequirements = $("#admissions-content .program-tab-content .requirements").html();
    const rawOverview = $("#details-content .program-tab-content").html();
    const college = rawCurriculum.substr(rawCurriculum.indexOf(collegeSeparator) + collegeSeparator.length);

    return {
      academicPartnerId: Config.academicPartnerId,
      careers: htmlCleanup(rawCareers),
      college: htmlCleanup(college),
      curriculum: htmlCleanup(rawCurriculum.substr(0, rawCurriculum.indexOf(collegeSeparator))),
      entryRequirements: htmlCleanup(rawEntryRequirements),
      overview: htmlCleanup(rawOverview),
      rawCareers,
      rawCurriculum,
      rawEntryRequirements,
      rawOverview,
    };

  } catch (error) {
    console.error("\x1b[41m%s\x1b[0m", `Error fetching data from ${url}`);
    return null;
  }
};

const asyncForEach = async (array: any[], callback: any) => {
  for (let index = 0; index < array.length; index++) {
    await callback(array[index], index, array);
  }
};

export default async (programsList: any[], basePath: string, isDryRun: boolean): Promise<any[]> => {
  const fetchedPrograms = [];

  await asyncForEach(programsList, async (program: any) => {
    if (!program.detailpage) {
      console.error("\x1b[41m%s\x1b[0m", `Error: Program without detail page ${program.code}`);
      return;
    }
    const scrappedData = await fetchProgramInfo(`${basePath}${program.detailpage}`, isDryRun);

    fetchedPrograms.push({ ...program, ...scrappedData });
  });

  return fetchedPrograms;
};
