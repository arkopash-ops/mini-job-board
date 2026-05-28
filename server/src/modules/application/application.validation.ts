import { z } from "zod";
import { APPLICATION_STATUS } from "./application.type";

export const applyJobSchema = z.object({
    coverLetter: z.string().min(10, "Cover letter must be at least 10 characters long."),
});

export const updateApplicationStatusSchema = z.object({
    status: z.enum(APPLICATION_STATUS, { message: 'Status must be "applied", "shortlisted", or "rejected".' }),
});
