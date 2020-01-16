import { Parser } from "json2csv";

export default (programs: any[]): string => {
  const fields = [
    "code",
    "title",
    "category",
    {
      label: "interest-areas",
      value: "interestareas[0]",
    },
    {
      label: "interest-areas",
      value: "interestareas[1]",
    },
    {
      label: "interest-areas",
      value: "interestareas[2]",
    },
    {
      label: "interest-areas",
      value: "interestareas[3]",
    },
    {
      label: "interest-areas",
      value: "interestareas[4]",
    },
    {
      label: "interest-areas",
      value: "interestareas[5]",
    },
    {
      label: "description",
      value: "shortdesc",
    },
    "overview",
    {
      label: "entry-requirements",
      value: "entryRequirements",
    },
    {
      label: "degree-requirements",
      value: "degreeRequirements",
    },
    "curriculum",
    "careers",
    {
      label: "weeks-per-class",
      value: "weeksperclass",
    },
    {
      label: "total-classes",
      value: "totalclasses",
    },
    "credits",
    {
      label: "program-study",
      value: "programstudy",
    },
    {
      label: "next-start-date",
      value: "nextstartdate",
    },
  ];
  const jsonParser = new Parser({ fields });

  return jsonParser.parse(programs);
};
