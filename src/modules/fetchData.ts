import axios from "axios";
import cheerio from "cheerio";

export const fetchData = async (url: string): Promise<CheerioStatic> => {
  const result = await axios.get(url);
  return cheerio.load(result.data);
};

export const fetchASUPrograms = async (url: string): Promise<any[]> => {
  const asuProgramsData = await axios.get(url);
  return asuProgramsData.data;
};
