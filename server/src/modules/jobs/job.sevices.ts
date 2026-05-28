import JobModel from "./job.model";

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
    payload: any
) => {
    return JobModel.create({
        recruiterId,
        ...payload,
    });
};


export const getJobById = async (id: string) => {
    return JobModel.findById(id);
};


export const upadteJob = async (
    job: any,
    payload: any
) => {
    Object.assign(job, payload);
    return job.save();
};


export const closeJob = async (job: any) => {
    job.closed = true;
    return job.save();
};


export const openJob = async (job: any) => {
    job.closed = false;
    return job.save();
};
