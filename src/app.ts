import config from "config";
import dbConnect from "./utils/connect";
import logger from "./utils/logger";
import createServer from "./utils/server";

const port = config.get<number>("port");
const app = createServer();

app.listen(port, async () => {
  logger.info(`App is listening!! ${port}!!`);
  await dbConnect();
});