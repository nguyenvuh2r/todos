import { Request } from "express";
import db from '../db/models';
import { UserInput } from "../input/UserInput";
import { JwtPayload } from "jsonwebtoken";

class UserService {

  getAll = async (page:number, limit:number) => {
    const DB: any = db;
    const { count, rows } = await DB.User.findAndCountAll ({
      attributes: ['id', 'firstName', 'lastName', 'email'],
      offset: ( page - 1) * limit ,
      limit: limit,
      include: {
        model: DB.Todo, // Include the Todo model
        as: 'Todos', // The alias for the association (if defined)
      }
    });
    return { count, rows };
  }

  create = async (userInput: UserInput) => {
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
      include: {
        model: DB.Todo, // Include the Todo model
        as: 'Todos', // The alias for the association (if defined)
      }
    });
    return user;
  }

  getByUserName = async (userName:string|JwtPayload) => {
    const DB: any = db;
    const user = await DB.User.findOne({
      where: {
        userName: userName,
      },
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });
    return user;
  }

  update = async (id:string, userInput: UserInput) => {
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