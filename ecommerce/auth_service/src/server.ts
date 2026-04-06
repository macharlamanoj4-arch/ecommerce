import "reflect-metadata";
import expressApp from "./expressApp";
import { logger } from "./utils";
import dotenv from 'dotenv';

dotenv.config({ path: '.env' });

const PORT = process.env.PORT || 8001;

export const StartServer = async () => {
  expressApp.listen(PORT, () => {
    logger.info(`App is listening to ${PORT}`);
  });

  process.on("uncaughtException", async (err) => {
    logger.error(err);
    process.exit(1);
  });
};

StartServer().then(() => {
  logger.info("server is up and running..");
});
