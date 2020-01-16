import { fetchData } from "./fetchData";

interface IScrappedData {
  careers: string;
  curriculum: string;
  entryRequirements: string;
  overview: string;
}

const fetchProgramInfo = async (url: string, isDryRun: boolean): Promise<IScrappedData> => {
  try {
    console.info("\x1b[33m%s\x1b[0m", `Fetching: ${url}`);

    if (isDryRun) {
      return null;
    }

    const $ = await fetchData(url);

    return {
      careers: $("#careers-content .program-tab-content .related-careers").html(),
      curriculum: $("#courses-content .program-tab-content").html(),
      entryRequirements: $("#admissions-content .program-tab-content .requirements").html(),
      overview: $("#details-content .program-tab-content").html(),
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
