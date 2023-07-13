import { Request, Response } from "express";
import UserService from "../services/User.service";
import { ERROR_CODE, NOT_FOUND_CODE, SUCCSESS_CODE } from "../const/status"
import { UserInput } from "../input/UserInput";
import { ListRespone } from "../ouput/CommonOutput";
import { UserOutPut } from "../ouput/UserOutPut";
import { Respone as ResponeOutPut } from "../ouput/CommonOutput";
class UserController {
  private userService: UserService;
  constructor() {
    this.userService = new UserService();
  }

  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const page = parseInt(String(req.query.page)) || 1;
      const limit = parseInt(String(req.query.limit)) || 10;
      const data: ListRespone<UserOutPut> = await this.userService.getAll(page, limit);
      const respone: ResponeOutPut<ListRespone<UserOutPut>> = {
        data: data,
        message: "Success Get All Users List",
        statusCode: SUCCSESS_CODE
      }
      return res.status(SUCCSESS_CODE).send(respone);
    } catch (error) {
      return res.status(ERROR_CODE).send(error)
    }
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userInput: UserInput = req.body;
      const result = await this.userService.create(userInput);
      if(result)
      {
        const respone : ResponeOutPut<null> = {
          data : null,
          message : "Create User Succsess",
          statusCode : SUCCSESS_CODE
        }
        return res.status(SUCCSESS_CODE).send(respone)
      }
      const respone : ResponeOutPut<null> = {
        data : null,
        message : "Create User Faild",
        statusCode : ERROR_CODE
      }
      return res.status(ERROR_CODE).send(respone)
    }catch (error) {
      return res.status(ERROR_CODE).send(error)
    }
  }

  show = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.id
      const result : UserOutPut | null= await this.userService.getOne(userId)
      if (result) {
        const respone : ResponeOutPut<UserOutPut> = {
          data : result,
          message : "Get User Success",
          statusCode : SUCCSESS_CODE
        }
        return res.status(SUCCSESS_CODE).send(respone)
      }
      const respone : ResponeOutPut<null> = {
        data : null,
        message : "Create User Faild",
        statusCode : ERROR_CODE
      }
      return res.status(ERROR_CODE).send(respone)
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }

  update = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.id;
      const userInput: UserInput = req.body
      const result = await this.userService.update(userId, userInput);
      if (result) {
        const respone : ResponeOutPut<null> = {
          data : null,
          message : "Updated User Success",
          statusCode : SUCCSESS_CODE
        }
        return res.status(SUCCSESS_CODE).send(respone)
      }
      const respone : ResponeOutPut<null> = {
        data : null,
        message : "Create User Faild !",
        statusCode : ERROR_CODE
      }
      return res.status(ERROR_CODE).send(respone)
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const userId = req.params.id;
      const result = await this.userService.delete(userId);
      if(result){
        const respone : ResponeOutPut<null> = {
          data : null,
          message : "Deleted User Success",
          statusCode : SUCCSESS_CODE
        }
        return res.status(SUCCSESS_CODE).send(respone)
      }
      const respone : ResponeOutPut<null> = {
        data : null,
        message : "Deleted User Faild !",
        statusCode : ERROR_CODE
      }
      return res.status(ERROR_CODE).send(respone)
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }
}

export default new UserController;