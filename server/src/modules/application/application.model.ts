import mongoose, { Schema } from "mongoose";
import { APPLICATION_STATUS, type IApplication } from "./application.type";

const ApplicationSchema = new Schema<IApplication>({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: "Job",
        required: true,
    },

    candidateId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    coverLetter: {
        type: String,
        required: true,
        trim: true,
    },

    status: {
        type: String,
        enum: APPLICATION_STATUS as readonly string[],
        default: "applied",
    },

    createdAt: {
        type: Date,
        default: Date.now,
    }
});

ApplicationSchema.index(
    { jobId: 1, candidateId: 1 },
    { unique: true }
);

const ApplicationModel = mongoose.model<IApplication>("Application", ApplicationSchema);
export default ApplicationModel;
