import UserModel from './user.model';
import { comparePassword, hashPassword, signToken } from '../../utils/auth';
import type { UserLoginData, UserRegisterData } from './user.type';


export const register = async (data: UserRegisterData) => {
    const { name, email, password, role } = data;

    const existingEmail = await UserModel.findOne({ email });
    if (existingEmail) {
        const error: any = new Error('Email already exists');
        error.status = 409;
        throw error;
    }

    const passwordHash = await hashPassword(password);

    const user = await UserModel.create({
        name,
        email,
        passwordHash,
        role
    });

    const token = signToken(user);

    return { token, user };
};


export const login = async (data: UserLoginData) => {
    const { email, password } = data;

    const user = await UserModel.findOne({ email });
    if (!user) {
        const error: any = new Error('Invalid Credentials');
        error.status = 401;
        throw error;
    }

    const validPassword = await comparePassword(password, user.passwordHash);
    if (!validPassword) {
        const error: any = new Error('Invalid Credentials');
        error.status = 401;
        throw error;
    }

    const token = signToken(user);

    return { token, user };
};
