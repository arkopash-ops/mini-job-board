import type { Response, NextFunction } from "express";
import * as applicationService from "./application.services";
import type { AuthRequest } from "../../middleware/auth";
import JobModel from "../jobs/job.model";

type JobIdParams = {
    id: string;
};

type ApplicationIdParams = {
    id: string;
};


export const applyForJobController = async (
    req: AuthRequest<JobIdParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const application = await applicationService.applyForJob(
            req.params.id,
            req.user!.userId,
            req.body
        );

        res.status(201).json(application);
    } catch (error) {
        next(error);
    }
};


export const getCandidateApplicationsController = async (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    try {
        const applications = await applicationService.getCandidateApplications(
            req.user!.userId
        );

        res.json(applications);
    } catch (error) {
        next(error);
    }
};


export const getJobApplicationsController = async (
    req: AuthRequest<JobIdParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const job = await JobModel.findById(req.params.id);

        if (!job) {
            return res.status(404).json({
                error: "Job not found.",
            });
        }

        if (String(job.recruiterId) !== req.user!.userId) {
            return res.status(403).json({
                error: "Forbidden. Insufficient permissions.",
            });
        }

        const applications = await applicationService.getJobApplications(req.params.id);

        res.json(applications);
    } catch (error) {
        next(error);
    }
};


export const updateApplicationStatusController = async (
    req: AuthRequest<ApplicationIdParams>,
    res: Response,
    next: NextFunction
) => {
    try {
        const application = await applicationService.getApplicationById(req.params.id);

        if (!application) {
            return res.status(404).json({
                error: "Application not found.",
            });
        }

        const job = await JobModel.findById(application.jobId);

        if (!job) {
            return res.status(404).json({
                error: "Associated job not found.",
            });
        }

        if (String(job.recruiterId) !== req.user!.userId) {
            return res.status(403).json({
                error: "Forbidden. Insufficient permissions.",
            });
        }

        const updated = await applicationService.updateApplicationStatus(
            application,
            req.body
        );

        res.json(updated);
    } catch (error) {
        next(error);
    }
};
