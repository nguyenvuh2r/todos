import { Request, Response } from "express";
import UserService from "../services/User.service";
import { ERROR_CODE,NOT_FOUND_CODE,SUCCSESS_CODE } from "../const/status"
class UserController {
  index = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: UserService = new UserService(req);
      const {count , rows} = await service.getAll();
      const respone = {
          data : rows,
          pagination : {
            total : count,
            current_page : req.query.page ?? 1,
            per_page : req.query.limit ?? 3
          }
      }
      return res.status(SUCCSESS_CODE).send({
        data: respone,
        message: "Success Get All Users List"
      });
    } catch (error) {
      return res.status(ERROR_CODE).send(error)
    }
  }

  create = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: UserService = new UserService(req);
      const user = await service.create();
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
      const service: UserService = new UserService(req);
      const user = await service.getOne();
      if(user === null)
      {
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
      const service: UserService = new UserService(req);
      const user = await service.update();
      if(user === null)
      {
        return res.status(NOT_FOUND_CODE).send({
            message: "Not found!"
        })
      }
      return res.status(SUCCSESS_CODE).send({
        data : user,
        message: `Update User success`
      })
    } catch (error) {
      return res.status(ERROR_CODE).send(error);
    }
  }

  delete = async (req: Request, res: Response): Promise<Response> => {
    try {
      const service: UserService = new UserService(req);
      const user = await service.delete();
      return res.status(SUCCSESS_CODE).send({
        data : user,
        message: "Delete Todo Success"
      })
    } catch (error) {
      return res.send(error); res.status(ERROR_CODE).send(error);
    }
  }
}

export default new UserController;