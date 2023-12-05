import express from "express";
import userAuth from "../middlewares/authMiddleware.js";
import {
  createJobController,
  deleteJobController,
  getAllJobController,
  jobStatsController,
  updateJobController,
} from "../controllers/jobController.js";

const router = express.Router();

//create job
router.post("/create-job", userAuth, createJobController);

//get routes

router.get("/get-job", userAuth, getAllJobController);

//update jobs

router.patch("/update-job/:id", userAuth, updateJobController);

//delete jobs

router.delete("/delete-job/:id", userAuth, deleteJobController);

// jobs stats filter

router.get("/job-stats", userAuth, jobStatsController);

export default router;
