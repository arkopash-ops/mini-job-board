import ApplicationModel from "./application.model";
import JobModel from "../jobs/job.model";
import type { ApplicationData, ApplicationDocument, ApplicationStatusUpdate } from "./application.type";


export const applyForJob = async (
    jobId: string,
    candidateId: string,
    data: ApplicationData
) => {
    const job = await JobModel.findById(jobId);

    if (!job) {
        const error: any = new Error('Job not found.');
        error.status = 404;
        throw error;
    }

    if (job.closed) {
        const error: any = new Error('Job is closed.');
        error.status = 400;
        throw error;
    }

    try {
        return await ApplicationModel.create({
            jobId,
            candidateId,
            coverLetter: data.coverLetter,
            status: "applied"
        });
    } catch (err: any) {
        if (err.code === 11000) {
            const error: any = new Error('You have already applied to this job.');
            error.status = 409;
            throw error;
        }
        throw err;
    }
};


export const getCandidateApplications = async (candidateId: string) => {
    return ApplicationModel.find({ candidateId })
        .populate("jobId", "title location salaryRange employmentType closed")
        .sort({ createdAt: -1 });
};


export const getJobApplications = async (jobId: string) => {
    return ApplicationModel.find({ jobId })
        .populate("candidateId", "name email")
        .sort({ createdAt: -1 });
};


export const getApplicationById = async (id: string) => {
    return ApplicationModel.findById(id);
};


export const updateApplicationStatus = async (
    application: ApplicationDocument,
    data: ApplicationStatusUpdate
) => {
    const oldStatus = application.status;
    application.status = data.status;
    const updated = await application.save();

    console.log(`[EMAIL NOTIFICATION] Application ${application._id} status changed from ${oldStatus} to ${data.status}`);

    return updated;
};
