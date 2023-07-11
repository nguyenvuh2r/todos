"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const chai_1 = require("chai");
const supertest_1 = __importDefault(require("supertest"));
const index_1 = require("../src/index");
describe('App', () => {
    let app;
    before(() => {
        app = new index_1.App().app;
    });
    it('should respond with "Api Todo List - v1.0.0" on the root endpoint', () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield (0, supertest_1.default)(app).get('/');
        (0, chai_1.expect)(response.status).to.equal(200);
        (0, chai_1.expect)(response.text).to.equal('Api Todo List - v1.0.0');
    }));
    // Add more test cases as needed
    after(() => {
        // Perform any cleanup or teardown tasks
    });
});
