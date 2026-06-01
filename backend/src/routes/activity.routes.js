import { Router } from "express";
import {
  addActivity,
  getActivities,
} from "../controllers/activity.controller.js";

const router = Router();

router.post("/", addActivity);
router.get("/", getActivities);

export default router;
