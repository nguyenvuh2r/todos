import BaseRouter from './Base.router';
import { createValidate, updateValidate } from '../validators/Todo.validator';

import TodoController from '../controllers/Todo.controller';

class TodoRouter extends BaseRouter {
    public routes(): void {
        this.router.get('/', TodoController.index);
        this.router.post('/', createValidate, TodoController.create);
        this.router.get('/:id', TodoController.show);
        this.router.put('/:id', updateValidate, TodoController.update);
        this.router.delete('/:id', TodoController.delete);
    }
}

export default new TodoRouter().router;