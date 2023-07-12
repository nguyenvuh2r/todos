import { Request } from "express";
import db from '../db/models';
import { UserInputDTO } from "../DTO/UserInputDTO";
class UserService {

  getAll = async (page:number, limit:number) => {
    const DB: any = db;
    const { count, rows } = await DB.User.findAndCountAll ({
      attributes: ['id', 'firstName', 'lastName', 'email'],
      offset: ( page - 1) * limit ,
      limit: limit,
    });
    return { count, rows };
  }

  create = async (userInput: UserInputDTO) => {
    const DB: any = db;
    const user = await DB.User.create(userInput);
    return user;
  }

  getOne = async (id:string) => {
    const DB: any = db;
    const user = await DB.User.findOne({
      where: {
        id: id,
      },
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });
    return user;
  }

  update = async (id:string, userInput: UserInputDTO) => {
    const DB: any = db;
    const user = await DB.User.update(userInput, {
      where: {
          id: id,
      },
    });
    return user;
  }

  delete = async (id:string) => {
    const DB: any = db;
    const user = await DB.User.destroy({
      where: {
          id: id,
      },
    });
    return user;
  }
}

export default UserService;