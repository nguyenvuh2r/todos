import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { config as dotenv } from 'dotenv';

//Routes
import TodoRouter from './routes/Todo.router';
import UserRouter from './routes/User.router';
export class App {
  public app: Application;

  constructor() {
    this.app = express();
    this.plugins();
    this.routes();
    dotenv();
  }

  protected plugins(): void {
    this.app.use(bodyParser.json());
  }

  protected routes(): void {
    this.app.route('/').get((req: Request, res: Response) => {
      res.send('Api Todo List - v1.0.0');
    });

    this.app.use('/api/todos', TodoRouter);
    this.app.use('/api/users', UserRouter);
  }
}
export const starServer = (port :number)=>{
  const app = new App().app;
  return app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
}

