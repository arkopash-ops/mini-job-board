import type { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import { AUTH_COOKIE_NAME, verifyToken, type JWTPayload } from "../utils/auth";
import type { UserRole } from "../modules/users/user.type";

export interface AuthRequest<P = ParamsDictionary> extends Request<P> {
    user?: JWTPayload;
}


export const requireAuth = (
    req: AuthRequest,
    res: Response,
    next: NextFunction
) => {
    const header = req.headers.authorization;
    const bearerToken = header?.startsWith('Bearer ') ? header.split(' ')[1] : undefined;
    const cookieToken = req.cookies?.[AUTH_COOKIE_NAME];
    const token = typeof cookieToken === 'string' ? cookieToken : bearerToken;

    if (!token) {
        return res.status(401).json({ error: 'Missing or invalid Token.' });
    }

    try {
        const payload = verifyToken(token);
        req.user = payload;
        next();
    } catch {
        return res.status(401).json({ error: 'Invalid Token.' });
    }
};


export const requireRole = (role: UserRole) => {
    return (
        req: AuthRequest,
        res: Response,
        next: NextFunction
    ) => {
        if (!req.user || req.user.role !== role) {
            return res.status(403).json({ error: 'Forbidden. Insufficient permissions.' });
        }
        next();
    }
}
