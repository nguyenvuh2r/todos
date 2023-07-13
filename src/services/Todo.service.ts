import { Request } from "express";
import db from '../db/models';
import { Op } from "sequelize"
import { TodoInput } from "../input/TodoInput";
import { TodoOutput } from "../ouput/TodoOutput"
import { ListRespone } from "../ouput/CommonOutput";

class TodoService {

  getAll = async (userId: number, page: number, limit: number): Promise<ListRespone<TodoOutput>> => {
    const DB: any = db;
    const { count, rows } = await DB.Todo.findAndCountAll({
      attributes: ['id', 'title', 'description','userId', 'isCompleted'],
      where: {
        userId: userId
      },
      offset: (page - 1) * limit,
      limit: limit,
    });

    const respone: ListRespone<TodoOutput> = {
      data: rows,
      pagination: {
        currentPage: page,
        perPage: limit,
        total: count
      }
    }
    return respone;
  }

  create = async (todoInput:TodoInput): Promise<number> => {
    try
    {
      const DB: any = db;
      var todo = await DB.Todo.create(todoInput);
      return todo.id;
    }
    catch (e){
      console.log(e);
      return 0;
    }
  }

  getOne = async (id:string): Promise<TodoOutput | null> => {
    const DB: any = db;
    const todo = await DB.Todo.findOne({
      where: {
        id: id,
      },
      attributes: ['id', 'title', 'description','userId', 'isCompleted'],
    });
    if (!todo) return null
    return {
      id: todo.id,
      title: todo.title, 
      description: todo.description,
      isCompleted: todo.isCompleted
    };
  }

  update = async (id:string, todoInput : TodoInput | object): Promise<boolean> => {
    try {
      const DB: any = db;
      await DB.Todo.update(todoInput, {
        where: {
          id: id,
        },
      });
      return true;
    } catch (error) {
      return false;
    }
  }

  delete = async (id:string): Promise<boolean> => {
    try {
      const DB: any = db;
      await DB.Todo.destroy({
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

export default TodoService;