import type { Request, Response, NextFunction } from "express";
import * as userService from "./user.services";


export const registerController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.register(req.body);

        res.status(201).json({
            token: result.token,
            user: {
                id: result.user._id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role
            }
        });
    } catch (error) {
        next(error);
    }
};


export const loginController = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = await userService.login(req.body);

        res.json({
            token: result.token,
            user: {
                id: result.user._id,
                name: result.user.name,
                email: result.user.email,
                role: result.user.role
            }
        });
    } catch (error) {
        next(error);
    }
};
