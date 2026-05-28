import mongoose, { Schema } from "mongoose";
import { USER_ROLES, type IUser } from "./users.type";

const UserSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true,
        trim: true,
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },

    passwordHash: {
        type: String,
        required: true
    },

    role: {
        type: String,
        enum: USER_ROLES as readonly string[],
        required: true
    }
}, { timestamps: true });

const UserModel = mongoose.model<IUser>("User", UserSchema);
export default UserModel;
