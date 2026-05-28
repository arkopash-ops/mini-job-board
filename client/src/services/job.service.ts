import type { CreateJobData, Job } from "../types";
import api from "./api";

export const JobService = {
    getAllJobs: async (title?: string, location?: string): Promise<Job[]> => {
        const params = new URLSearchParams();
        if (title) params.append('title', title);
        if (location) params.append('location', location);

        const res = await api.get<Job[]>(`/job?${params.toString()}`);
        return res.data;
    },

    getJobById: async (id: string): Promise<Job> => {
        const res = await api.get<Job>(`/job/${id}`);
        return res.data;
    },

    createJob: async (data: CreateJobData): Promise<Job> => {
        const response = await api.post<Job>('/job', data);
        return response.data;
    },

    updateJob: async (id: string, data: Partial<CreateJobData>): Promise<Job> => {
        const response = await api.put<Job>(`/job/${id}`, data);
        return response.data;
    },

    closeJob: async (id: string): Promise<Job> => {
        const response = await api.post<Job>(`/job/${id}/close`);
        return response.data;
    },

    openJob: async (id: string): Promise<Job> => {
        const response = await api.post<Job>(`/job/${id}/open`);
        return response.data;
    }
};
