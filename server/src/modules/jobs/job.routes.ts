import { Router } from "express";
import JobModel from "./job.model";
import { requireAuth, requireRole, type AuthRequest } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";
import { createJobSchema, updateJobSchema } from "./job.velidation";
import * as jobController from "./job.controller";

const router = Router();


// get all gob with search and filter 
router.get(
    "/",
    jobController.getAllJobsController
);


// recruiter creates a job
router.post(
    "/",
    requireAuth,
    requireRole("recruiter"),
    validateBody(createJobSchema),
    jobController.createJobController
);


// recruiter updates a job
router.put(
    "/:id",
    requireAuth,
    requireRole("recruiter"),
    validateBody(updateJobSchema),
    jobController.updateJobController
);


// close the job
router.post(
    "/:id/close",
    requireAuth,
    requireRole("recruiter"),
    jobController.closeJobController
);


// open the job
router.post(
    "/:id/open",
    requireAuth,
    requireRole("recruiter"),
    jobController.openJobController
);


export default router;