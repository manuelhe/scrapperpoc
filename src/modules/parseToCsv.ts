import { Parser } from "json2csv";

export default (programs: any[]): string => {
  const fields = [
    "academicPartnerId",
    "academicPartnerShortName",
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
    "college",
    {
      label: "startDate",
      value: "nextstartdate",
    },
    {
      label: "image",
      value: "degreeimage",
    },
    {
      label: "interestAreas1",
      value: "interestareas[0]",
    },
    {
      label: "interestAreas2",
      value: "interestareas[1]",
    },
    {
      label: "interestAreas3",
      value: "interestareas[2]",
    },
    {
      label: "interestAreas4",
      value: "interestareas[3]",
    },
    {
      label: "interestAreas5",
      value: "interestareas[4]",
    },
    {
      label: "interestAreas6",
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
    "rawCareers",
    "rawCurriculum",
    "rawEntryRequirements",
    "rawOverview",
  ];
  const jsonParser = new Parser({ fields });

  return jsonParser.parse(programs);
};
