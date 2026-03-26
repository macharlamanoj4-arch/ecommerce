import express from "express";
import catalogRouter from "./api/catalog.routes";
import profileRouter from "./api/profile.routes"
import { httpLogger, HandleErrorWithLogger } from "./utils";
import { authenticate } from "./utils";

const app = express();
app.use(express.json());
app.use(httpLogger);

app.use("/", profileRouter);
app.use("/",authenticate, catalogRouter);

app.use(HandleErrorWithLogger);

export default app;
