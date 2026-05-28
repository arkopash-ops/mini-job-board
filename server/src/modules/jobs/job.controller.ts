import type { Request, Response, NextFunction } from "express";
import * as jobService from "./job.sevices";
import type { AuthRequest } from "../../middleware/auth";


export const getAllJobsController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { title, location } = req.query;

        const jobs = await jobService.getAllJobs(
            title as string,
            location as string
        );

        res.json(jobs);
    } catch (error) {
        next(error);
    }
};


export const createJobController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const job = await jobService.createJob(
            req.user!.userId,
            req.body
        );

        res.status(201).json(job);
    } catch (error) {
        next(error);
    }
};


export const upadteJobController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const job = await jobService.getJobById(req.params.id);

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

        const updatedJob = await jobService.upadteJob(job, req.body);

        res.json(updatedJob);
    } catch (error) {
        next(error);
    }
};


export const closeJobController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const job = await jobService.getJobById(req.params.id);

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

        if (job.closed === true) {
            return res.status(400).json({
                error: "Already closed.",
            });
        }

        const updatedJob = await jobService.closeJob(job);

        res.json(updatedJob);
    } catch (error) {
        next(error);
    }
};


export const openJobController = async (req: AuthRequest, res: Response, next: NextFunction) => {
    try {
        const job = await jobService.getJobById(req.params.id);

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

        if (job.closed === false) {
            return res.status(400).json({
                error: "Already opened.",
            });
        }

        const updatedJob = await jobService.openJob(job);

        res.json(updatedJob);
    } catch (error) {
        next(error);
    }
};
