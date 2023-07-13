import { Request } from "express";
import db from '../db/models';
import { UserInput } from "../input/UserInput";
import { JwtPayload } from "jsonwebtoken";
import { UserOutPut } from "../ouput/UserOutPut";
import { ListRespone } from "../ouput/CommonOutput";
import bcrypt from "bcrypt"
class UserService {

  getAll = async (page: number, limit: number): Promise<ListRespone<UserOutPut>> => {
    const DB: any = db;
    const { count, rows } = await DB.User.findAndCountAll({
      attributes: ['id', 'firstName', 'lastName', 'email'],
      offset: (page - 1) * limit,
      limit: limit,
      include: {
        model: DB.Todo, // Include the Todo model
        as: 'Todos', // The alias for the association (if defined)
      }
    });
    const respone: ListRespone<UserOutPut> = {
      data: rows,
      pagination: {
        currentPage: page,
        perPage: limit,
        total: count
      }
    }
    return respone;
  }

  create = async (userInput: UserInput): Promise<boolean> => {
    try {
      const DB: any = db;
      const hashedPassword = await bcrypt.hash(userInput.password, 10);
      userInput.password = hashedPassword;
      userInput.isActive = true;
      await DB.User.create(userInput);
      return true;
    } catch (error) {
      return false;
    }
  }

  createAndGetId = async (userInput: UserInput): Promise<number | null> => {
    try {
      const DB: any = db;
      const hashedPassword = await bcrypt.hash(userInput.password, 10);
      userInput.password = hashedPassword;
      userInput.isActive = true;
      await DB.User.create(userInput);
      const user = await DB.User.create(userInput);
      return user.id;
    } catch (error) {
      return null;
    }
  }

  getOne = async (id: string): Promise<UserOutPut | null> => {
    const DB: any = db;
    const user = await DB.User.findOne({
      where: {
        id: id,
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'userName'],
      include: {
        model: DB.Todo, // Include the Todo model
        as: 'Todos', // The alias for the association (if defined)
      }
    });
    if (!user) return null;
    return {
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      userName: user.userName
    };
  }

  getByUserName = async (userName: string | JwtPayload): Promise<UserOutPut | null> => {
    const DB: any = db;
    const user = await DB.User.findOne({
      where: {
        userName: userName,
      },
      attributes: ['id', 'firstName', 'lastName', 'email', 'userName'],
    });
    if (!user) {
      return null
    }
    const userOupt: UserOutPut = {
      email: user.email,
      firstName: user.firstName,
      id: user.id,
      lastName: user.lastName,
      userName: user.userName
    }
    return userOupt;
  }

  update = async (id: string, userInput: UserInput | object): Promise<boolean> => {
    try {
      const DB: any = db;
      await DB.User.update(userInput, {
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }

  }

  delete = async (id: string): Promise<boolean> => {
    try {
      const DB: any = db;
      const user = await DB.User.destroy({
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }
}

export default UserService;