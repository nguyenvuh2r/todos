import BaseRouter from './Base.router';

import AuthController from '../controllers/Auth.controller';
import { LOGIN_VALIDATE, REGISTER_VALIDATE } from '../validators/Auth.validator';



class AuthRouter extends BaseRouter {
    public routes(): void {
        this.router.post('/login',LOGIN_VALIDATE, AuthController.login);
        this.router.post('/register', REGISTER_VALIDATE, AuthController.register);
    }
}

export default new AuthRouter().router;