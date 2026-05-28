import type { Application, ApplicationStatus, ApplyJobData } from "../types";
import api from "./api";

export const ApplicationService = {
    applyForJob: async (jobId: string, data: ApplyJobData): Promise<Application> => {
        const res = await api.post<Application>(`/jobs/${jobId}/apply`, data);
        return res.data;
    },

    getMyApplications: async (): Promise<Application[]> => {
        const response = await api.get<Application[]>('/applications/my');
        return response.data;
    },

    getJobApplications: async (jobId: string): Promise<Application[]> => {
        const response = await api.get<Application[]>(`/jobs/${jobId}/applications`);
        return response.data;
    },

    updateApplicationStatus: async (applicationId: string, status: ApplicationStatus): Promise<Application> => {
        const response = await api.put<Application>(`/applications/${applicationId}/status`, { status });
        return response.data;
    }
};
