import { Router, type IRouter } from "express";
import healthRouter from "./health/index.js";
import contactRouter from "./contact/index.js";

const router: IRouter = Router();

router.use(healthRouter);
router.use(contactRouter);

export default router;
