import express, { type Express } from "express";
import cors from "cors";
import pinoHttp from "pino-http";
import router from "./routes";
import { logger } from "./lib/logger";

const app: Express = express();

app.use(
  pinoHttp({
    logger,
  }),
);

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
