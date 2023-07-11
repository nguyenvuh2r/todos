"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const dotenv_1 = require("dotenv");
//Routes
class App {
    constructor() {
        this.app = (0, express_1.default)();
        (0, dotenv_1.config)();
    }
    plugins() {
        this.app.use(body_parser_1.default.json());
    }
    routes() {
        this.app.route('/').get((req, res) => {
            res.send('Api Todo List - v1.0.0');
        });
    }
}
const port = Number(process.env.PORT) || 3000;
const app = new App().app;
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
