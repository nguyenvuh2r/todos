import { Request } from "express";
import db from '../db/models';
import { Op } from "sequelize"
import { TodoInput } from "../input/TodoInput";

class TodoService {

  getAll = async () => {
    const DB: any = db;
    const todos = await DB.Todo.findAll({
      attributes: ['id', 'title', 'description','userId', 'isCompleted']
    });
    return todos;
  }

  create = async (todoInput:TodoInput) => {
    const DB: any = db;
    const todo = await DB.Todo.create(todoInput);
    return todo;
  }

  getOne = async (id:string) => {
    const DB: any = db;
    const todo = await DB.Todo.findOne({
      where: {
        id: id,
      },
      attributes: ['id', 'title', 'description','userId', 'isCompleted'],
    });
    return todo;
  }

  update = async (id:string, todoInput : TodoInput) => {
    const DB: any = db;
    const todo = await DB.Todo.update(todoInput, {
      where: {
          id: id,
      },
    });
    return todo;
  }

  delete = async (id:string) => {
    const DB: any = db;
    const todo = await DB.Todo.destroy({
      where: {
          id: id,
      },
    });

    return todo;
  }
}

export default TodoService;