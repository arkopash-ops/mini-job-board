import type { HydratedDocument, Types } from "mongoose";

export const EMPLOYMENT_TYPE = ["Full-time", "Part-time", "Contract", "Internship"] as const;
export type EmploymentType = (typeof EMPLOYMENT_TYPE)[number];

export interface IJob {
    recruiterId: Types.ObjectId;
    title: string;
    location: string;
    employmentType: EmploymentType;
    salaryRange: string;
    description: string;
    closed: boolean;
    createdAt: Date;
}

export type JobDocument = HydratedDocument<IJob>;
