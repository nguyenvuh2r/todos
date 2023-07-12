import { Request, Response } from "express";
import UserService from "../services/User.service";
import { ERROR_CODE, NOT_FOUND_CODE, SUCCSESS_CODE } from "../const/status"
import { UserInput } from "../input/UserInput";

class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 10;
      const { count, rows } = await this.userService.getAll(page, limit);
      const respone = {
        data: rows,
        pagination: {
          total: count,
          current_page: page,
          per_page: limit
        }
      }
      return res.status(SUCCSESS_CODE).send({
        data: respone,
        message: "Success Get All Users List"
      });
    } catch (error) {
         console.log(error);
         
         return res.status(ERROR_CODE).send(error)
    }
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userInput: UserInput = req.body;
      const user = await this.userService.create(userInput);
      return res.status(SUCCSESS_CODE).send({
        data: user,
        message: "Create User Success"
      })
    } catch (error) {
      return res.status(ERROR_CODE).send(error)
    }
  }

  show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.id
      const user = await this.userService.getOne(userId)
      if (user === null) {
        return res.status(NOT_FOUND_CODE).send({
          message: "Not found!"
        });
      }
      return res.status(SUCCSESS_CODE).send({
        data: user,
        message: "Get User by id => " + user.id
      })
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.id;
      const userInput: UserInput = req.body
      const user = await this.userService.update(userId, userInput);
      if (user === null) {
        return res.status(NOT_FOUND_CODE).send({
          message: "Not found!"
        })
      }
      return res.status(SUCCSESS_CODE).send({
        data: user,
        message: `Update User success`
      })
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.id;
      const user = await this.userService.delete(userId);
      return res.status(SUCCSESS_CODE).send({
        data: user,
        message: "Delete Todo Success"
      })
    } catch (error) {
      return res.send(error); res.status(ERROR_CODE).send(error);
    }
  }
}

export default new UserController;