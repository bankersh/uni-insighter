import express from "express";
import { getReportjkpaper } from "../controllers/jkpaper_controllers.js";
const router = express.Router();

router.get("/getReportjkpaper", getReportjkpaper);

export default router;
