import { z } from "zod";
import { EMPLOYMENT_TYPE } from "./job.type";

export const createJobSchema = z.object({
    title: z.string().min(1, "Title is required."),
    location: z.string().min(1, "Location is required."),
    employmentType: z.enum(EMPLOYMENT_TYPE, { message: 'Select appropriate Employment type.' }),
    salaryRange: z.string().min(1, " Salary range is required."),
    description: z.string().min(1, "Description is required.")
});

export const updateJobSchema = z.object({
    title: z.string().min(1).optional(),
    location: z.string().min(1).optional(),
    employmentType: z.enum(EMPLOYMENT_TYPE).optional(),
    salaryRange: z.string().min(1).optional(),
    description: z.string().min(1).optional(),
    closed: z.boolean().optional()
});
