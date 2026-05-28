import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import type { CookieOptions } from 'express';
import type { UserDocument, UserRole } from '../modules/users/user.type';

export const AUTH_COOKIE_NAME = 'token';
export const AUTH_TOKEN_EXPIRES_IN = '1h';

export const authCookieOptions: CookieOptions = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    path: '/',
    maxAge: 60 * 60 * 1000
};

const getJWTSecret = () => {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("JWT_SECRET is not defined");
    return secret;
}

export const hashPassword = (password: string) =>
    bcrypt.hash(password, 10);

export const comparePassword = (password: string, hash: string) =>
    bcrypt.compare(password, hash);

export interface JWTPayload {
    userId: string;
    role: UserRole;
}

export const signToken = (user: UserDocument) => {
    const payload: JWTPayload = {
        userId: user.id,
        role: user.role
    }

    return jwt.sign(
        payload,
        getJWTSecret(),
        { expiresIn: AUTH_TOKEN_EXPIRES_IN },
    );
}

export const verifyToken = (token: string) =>
    jwt.verify(token, getJWTSecret()) as JWTPayload;
