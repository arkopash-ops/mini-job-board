import { z } from 'zod';
import { USER_ROLES } from './user.type';

export const userRegisterValidation = z.object({
    name: z.string().min(1, { message: 'Name is required.' }),
    email: z.email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
    role: z.enum(USER_ROLES, { message: 'Role must be either "recruiter" or "candidate".' }),
});

export const userLoginValidation = z.object({
    email: z.email({ message: 'Invalid email address.' }),
    password: z.string().min(6, { message: 'Password must be at least 6 characters long.' }),
});
