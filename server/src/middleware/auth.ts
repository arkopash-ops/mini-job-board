import type { Request, Response, NextFunction } from "express";
import { verifyToken, type JWTPayload } from "../utils/auth";
import type { UserRole } from "../modules/users/users.type";

export interface AuthRequest extends Request {
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
