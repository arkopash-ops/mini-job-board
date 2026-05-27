import { Router } from 'express';
import { validateBody } from '../../middleware/validate';
import { userLoginValidation, userRegisterValidation } from './user.velidation';
import * as userController from './user.controller';

const router = Router();

router.post(
    '/register',
    validateBody(userRegisterValidation),
    userController.registerController
);


router.post(
    '/login',
    validateBody(userLoginValidation),
    userController.loginController
);


export default router;
