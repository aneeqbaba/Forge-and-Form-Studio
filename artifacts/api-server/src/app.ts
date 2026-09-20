import express, { type Express } from "express";
import cors from "cors";
import router from "./routes";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/api", router);

app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
