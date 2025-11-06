import express from "express";
import { getReportwelspun } from "../controllers/welspun_controllers.js";
const router = express.Router();

router.get("/getReportwelspun", getReportwelspun);

export default router;
