import dotenv from "dotenv";

dotenv.config();

export default {
  asuAPIUrl: process.env.ASU_API_URL,
  asuBasePath: process.env.ASU_BASE_PATH,
};
