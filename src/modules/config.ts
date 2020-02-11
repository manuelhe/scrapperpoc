import dotenv from "dotenv";

dotenv.config();

export default {
  asuAPIUrl: process.env.ASU_API_URL,
  asuBasePath: process.env.ASU_BASE_PATH,
  academicPartnerId: process.env.ASU_ACADEMIC_PARTNER_ID,
  academicPartnerName: process.env.ASU_NAME,
  academicPartnerShortName: process.env.ASU_SHORT_NAME,
};
