import BaseRouter from './Base.router';
import { createValidate, updateValidate } from '../validators/User.validator';

import UserController from '../controllers/User.controller';

class UserRouter extends BaseRouter {
    public routes(): void {
        this.router.get('/', UserController.index);
        this.router.post('/', createValidate, UserController.create);
        this.router.get('/:id', UserController.show);
        this.router.put('/:id', updateValidate, UserController.update);
        this.router.delete('/:id', UserController.delete);
    }
}

export default new UserRouter().router;