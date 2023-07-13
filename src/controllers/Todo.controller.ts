import { Request, Response } from "express";
import TodoService from "../services/Todo.service";
import { TodoInput } from "../input/TodoInput";
import UserService from "../services/User.service";
import { CustomRequest } from "../middlewares/Auth.middleware";

class TodoController {

  private todoService: TodoService;
  private userService: UserService;
  constructor() {
    this.todoService = new TodoService();
    this.userService = new UserService();
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todos = await this.todoService.getAll();
      return res.send({
        data: todos,
        message: "Success Get All Todo List"
      });
    } catch (error) {
      return res.send(error)
    }
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todoInput : TodoInput = req.body;
      const username = (req as CustomRequest).token
      const user = await this.userService.getByUserName(username);
      todoInput.userId = user.id;
      const todo = await this.todoService.create(todoInput);
      return res.send({
        data: todo,
        message: "Create Todo Success"
      })
    } catch (error) {
      return res.send(error)
    }
  }

  show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todoId = req.params.id;
      const todo = await this.todoService.getOne(todoId);
      return res.send({
          data: todo,
          message: "Get Todo by id => " + todo.id
      })
    } catch (error) {
      return res.send(error);
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todoId = req.params.id;
      const todoInput : TodoInput = req.body;
      const todo = await this.todoService.update(todoId,todoInput);
      return res.send({
        message: `Update Todo success`
      })
    } catch (error) {
      return res.send(error);
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todoId = req.params.id;
      const todo = this.todoService.delete(todoId);
      return res.send({
        message: "Delete Todo Success"
      })
    } catch (error) {
      return res.send(error);
    }
  }
}

export default new TodoController;