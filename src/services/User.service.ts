import { Request } from "express";
import db from '../db/models';
// import { Op } from "sequelize"

class UserService {
  body: Request['body'];
  params: Request['params'];
  query: Request['query'];
  constructor(req: Request) {
    this.query = req.query;
    this.body = req.body;
    this.params = req.params;
  }

  getAll = async () => {
    const DB: any = db;
 
    const page = parseInt(String(this.query.page)) || 1;
    const limit = parseInt(String(this.query.limit)) || 10;

    const { count, rows } = await DB.User.findAndCountAll ({
      attributes: ['id', 'firstName', 'lastName', 'email'],
      offset: page - 1 ,
      limit: limit,
    });

    return { count, rows };
  }

  create = async () => {
    const DB: any = db;
    const user = await DB.User.create(this.body);

    return user;
  }

  getOne = async () => {
    const DB: any = db;
    const user = await DB.User.findOne({
      where: {
        id: this.params.id,
      },
      attributes: ['id', 'firstName', 'lastName', 'email'],
    });

    return user;
  }

  update = async () => {
    const DB: any = db;

    const user = await DB.User.update(this.body, {
      where: {
          id: this.params.id,
      },
    });

    return user;
  }

  delete = async () => {
    const DB: any = db;
    const user = await DB.User.destroy({
      where: {
          id: this.params.id,
      },
    });
    return user;
  }
}

export default UserService;