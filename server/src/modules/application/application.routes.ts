import { Router } from "express";
import { requireAuth, requireRole } from "../../middleware/auth";
import { validateBody } from "../../middleware/validate";
import { applyJobSchema, updateApplicationStatusSchema } from "./application.validation";
import * as applicationController from "./application.controller";

const router = Router();

router.post(
    "/jobs/:id/apply",
    requireAuth,
    requireRole("candidate"),
    validateBody(applyJobSchema),
    applicationController.applyForJobController
);

router.get(
    "/applications/my",
    requireAuth,
    requireRole("candidate"),
    applicationController.getCandidateApplicationsController
);

router.get(
    "/jobs/:id/applications",
    requireAuth,
    requireRole("recruiter"),
    applicationController.getJobApplicationsController
);

router.put(
    "/applications/:id/status",
    requireAuth,
    requireRole("recruiter"),
    validateBody(updateApplicationStatusSchema),
    applicationController.updateApplicationStatusController
);

export default router;
