import express, { Application, Request, Response } from 'express';
import bodyParser from 'body-parser';
import { config as dotenv } from 'dotenv';

//Routes

class App {
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
  }
}

const port: number = Number(process.env.PORT) || 3000
const app = new App().app;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
