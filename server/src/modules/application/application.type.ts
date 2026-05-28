import type { HydratedDocument, Types } from "mongoose";

export const APPLICATION_STATUS = ["applied", "shortlisted", "rejected"] as const;
export type ApplicationStatus = (typeof APPLICATION_STATUS)[number];

export interface IApplication {
    jobId: Types.ObjectId;
    candidateId: Types.ObjectId;
    coverLetter: string;
    status: ApplicationStatus;
    createdAt: Date;
}

export type ApplicationDocument = HydratedDocument<IApplication>;

export interface ApplicationData {
    coverLetter: string;
}

export interface ApplicationStatusUpdate {
    status: ApplicationStatus;
}
