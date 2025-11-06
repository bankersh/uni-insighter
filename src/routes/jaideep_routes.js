import express from "express";
import { getReportjaideep } from "../controllers/jaideep_controllers.js";
const router = express.Router();

router.get("/getReportjaideep", getReportjaideep);

export default router;
