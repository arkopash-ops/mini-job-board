import type { Request, Response, NextFunction } from "express";
import * as userService from "./user.services";
import { AUTH_COOKIE_NAME, authCookieOptions } from "../../utils/auth";

const sendAuthResponse = (
    res: Response,
    status: number,
    result: Awaited<ReturnType<typeof userService.login>>
) => {
    res.cookie(AUTH_COOKIE_NAME, result.token, authCookieOptions);

    return res.status(status).json({
        token: result.token,
        user: {
            id: result.user._id,
            name: result.user.name,
            email: result.user.email,
            role: result.user.role
        }
    });
};


export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.register(req.body);

        sendAuthResponse(res, 201, result);
    } catch (error) {
        next(error);
    }
};


export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.login(req.body);

        sendAuthResponse(res, 200, result);
    } catch (error) {
        next(error);
    }
};
