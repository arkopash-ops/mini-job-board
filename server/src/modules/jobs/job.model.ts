import mongoose, { Schema } from "mongoose";
import { EMPLOYMENT_TYPE, type JobDocument } from "./job.type";

const JobSchema = new Schema<JobDocument>({
    recruiterId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    title: {
        type: String,
        required: true,
        trim: true,
    },

    location: {
        type: String,
        required: true,
        trim: true,
    },

    employmentType: {
        type: String,
        enum: EMPLOYMENT_TYPE as readonly string[],
        required: true,
    },

    salaryRange: {
        type: String,
        required: true,
        trim: true,
    },

    description: {
        type: String,
        trim: true,
    },

    closed: {
        type: Boolean,
        default: false,
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

JobSchema.index({ title: "text", location: "text" });

const JobModel = mongoose.model<JobDocument>("Job", JobSchema);
export default JobModel;