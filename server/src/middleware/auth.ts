import type { Request, Response, NextFunction } from "express";
import type { ParamsDictionary } from "express-serve-static-core";
import { verifyToken, type JWTPayload } from "../utils/auth";
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
    if (!header?.startsWith('Bearer ')) {
        return res.status(401).json({ error: 'Missing or invalid Token.' });
    }

    const token = header.split(' ')[1];
    if (!token) {
        return res.status(401).json({ error: 'Token not found.' });
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
