import { Request, Response } from "express";
import TodoService from "../services/Todo.service";
import { ERROR_CODE, NOT_FOUND_CODE, SUCCSESS_CODE } from "../const/status"
import { TodoInput } from "../input/TodoInput";
import { TodoOutput } from "../ouput/TodoOutput";
import UserService from "../services/User.service";
import { CustomRequest } from "../middlewares/Auth.middleware";
import { UserOutPut } from "../ouput/UserOutPut";
import { ListRespone } from "../ouput/CommonOutput";
import { Respone as ResponeOutPut } from "../ouput/CommonOutput";

class TodoController {

  private todoService: TodoService;
  private userService: UserService;
  constructor() {
    this.todoService = new TodoService();
    this.userService = new UserService();
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 10;
      const userId = String(req.params.userId);
      const user :UserOutPut | null  = await this.userService.getOne(userId);
      if(!user)
      {
        return res.status(NOT_FOUND_CODE).send("Not found user!");
      }

      const data: ListRespone<TodoOutput> = await this.todoService.getAll(parseInt(userId), page, limit);
      const respone: ResponeOutPut<ListRespone<TodoOutput>> = {
        data: data,
        message: "Success Get All Todos List",
        statusCode: SUCCSESS_CODE
      }
      return res.status(SUCCSESS_CODE).send(respone);
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todoInput : TodoInput = req.body;

      const user :UserOutPut | null  = await this.userService.getOne(String(todoInput.userId));
      if (user)
      {
        todoInput.userId = user?.id;
      }
      const result = await this.todoService.create(todoInput);
      if (result) {
        const respone : ResponeOutPut<number> = {
          data : result,
          message : "Create Todo Succsess",
          statusCode : SUCCSESS_CODE
        }
        return res.status(SUCCSESS_CODE).send(respone);
      }

      const respone : ResponeOutPut<null> = {
        data : null,
        message : "Create Todo Failed",
        statusCode : ERROR_CODE
      }
      return res.status(ERROR_CODE).send(respone);
    } catch (error) {
      return res.send(error);
    }
  }

  show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todoId = req.params.id;
      const result = await this.todoService.getOne(todoId);
      if (result) {
        const respone : ResponeOutPut<TodoOutput> = {
          data : result,
          message : "Get Todo Success",
          statusCode : SUCCSESS_CODE
        }
        return res.status(SUCCSESS_CODE).send(respone);
      }
      const respone : ResponeOutPut<null> = {
        data : null,
        message : "Get Todo Failed",
        statusCode : ERROR_CODE
      }
      return res.status(ERROR_CODE).send(respone);
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todoId = req.params.id;
      const todoInput : TodoInput = req.body;
      const result = await this.todoService.update(todoId, todoInput);
      if (result) {
        const respone : ResponeOutPut<null> = {
          data : null,
          message : "Updated Todo Success",
          statusCode : SUCCSESS_CODE
        }
        return res.status(SUCCSESS_CODE).send(respone);
      }
      const respone : ResponeOutPut<null> = {
        data : null,
        message : "Update Todo Failed !",
        statusCode : ERROR_CODE
      }
      return res.status(ERROR_CODE).send(respone);
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const todoId = req.params.id;
      const result = await this.todoService.delete(todoId);
      if (result){
        const respone : ResponeOutPut<null> = {
          data : null,
          message : "Deleted Todo Success",
          statusCode : SUCCSESS_CODE
        }
        return res.status(SUCCSESS_CODE).send(respone);
      }
      const respone : ResponeOutPut<null> = {
        data : null,
        message : "Deleted Todo Failed !",
        statusCode : ERROR_CODE
      }
      return res.status(ERROR_CODE).send(respone);
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }
}

export default new TodoController;