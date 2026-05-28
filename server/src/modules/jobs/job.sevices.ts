import JobModel from "./job.model";
import type { JobData, JobDataUpdate, JobDocument } from "./job.type";


export const getAllJobs = async (
    title?: string,
    location?: string
) => {
    const filter: any = { closed: false };

    if (title) {
        filter.title = { $regex: new RegExp(title, "i") };
    }

    if (location) {
        filter.location = { $regex: new RegExp(location, "i") };
    }

    return JobModel.find(filter)
        .sort({ createdAt: -1 })
        .limit(25);
};


export const createJob = async (
    recruiterId: string,
    data: JobData
) => {
    return JobModel.create({
        recruiterId,
        ...data,
    });
};


export const getJobById = async (id: string) => {
    return JobModel.findById(id);
};


export const updateJob = async (
    job: JobDocument,
    data: JobDataUpdate
) => {
    Object.assign(job, data);
    return job.save();
};


export const closeJob = async (job: JobDocument) => {
    job.closed = true;
    return job.save();
};


export const openJob = async (job: JobDocument) => {
    job.closed = false;
    return job.save();
};