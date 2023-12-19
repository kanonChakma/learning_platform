import config from "config";
import mongoose from "mongoose";
import logger from "./logger";

const dbConnect = async () => {
  try {
    const dbUri = config.get<string>("dbUri");
    await mongoose.connect(dbUri);
    logger.info("Database is connected!!!");
  } catch (error) {
    logger.error("Database not able to connect!!!");
    process.exit(1);
  }
};

export default dbConnect;
