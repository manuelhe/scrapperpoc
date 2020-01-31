import { Parser } from "json2csv";

export default (programs: any[]): string => {
  const fields = [
    {
      label: "courseId",
      value: "code",
    },
    {
      label: "programName",
      value: "title",
    },
    {
      label: "programType",
      value: "category",
    },
    {
      label: "description",
      value: "shortdesc",
    },
    {
      label: "prerequisites",
      value: "entryRequirements",
    },
    "overview",
    "degreeRequirements",
    "curriculum",
    "careers",
    {
      label: "next-start-date",
      value: "startDate",
    },
    {
      label: "image",
      value: "degreeimage",
    },
    {
      label: "interestAreas",
      value: "interestareas[0]",
    },
    {
      label: "interestAreas",
      value: "interestareas[1]",
    },
    {
      label: "interestAreas",
      value: "interestareas[2]",
    },
    {
      label: "interestAreas",
      value: "interestareas[3]",
    },
    {
      label: "interestAreas",
      value: "interestareas[4]",
    },
    {
      label: "interestAreas",
      value: "interestareas[5]",
    },
    {
      label: "weeksPerClass",
      value: "weeksperclass",
    },
    {
      label: "totalClasses",
      value: "totalclasses",
    },
    {
      label: "credits",
      value: "totalcredithours",
    },
    {
      label: "programStudy",
      value: "programstudy",
    },
  ];
  const jsonParser = new Parser({ fields });

  return jsonParser.parse(programs);
};
