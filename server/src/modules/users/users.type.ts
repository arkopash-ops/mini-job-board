import type { HydratedDocument } from "mongoose";

export const USER_ROLES = ["recruiter", "candidate"] as const;
export type UserRole = (typeof USER_ROLES)[number];

export interface IUser {
    name: string;
    email: string;
    passwordHash: string;
    role: UserRole;
}

export type UserDocument = HydratedDocument<IUser>;

export type UserRegisterData = {
    name: string;
    email: string;
    password: string;
    role: UserRole;
};

export type UserLoginData = {
    email: string;
    password: string;
}
