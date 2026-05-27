import type { Request, Response, NextFunction } from "express";

export const errorHandler = (
    error: any,
    _req: Request,
    res: Response,
    _next: NextFunction
) => {
    console.error(error);

    if (error.code === 11000) {
        return res.status(409).json({
            error: "Duplicate key error",
            details: error.keyValue
        });
    }

    const status = error.status || 500;
    const message = error.message || "Insternal Server Error";

    res.status(status).json({ error: message });
}
