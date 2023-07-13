import { expect } from 'chai';
import { starServer } from '../../app';
import TodoService from '../../services/Todo.service';
import { TodoInput } from '../../input/TodoInput';
import { TodoOutput } from '../../ouput/TodoOutput';
import { ListRespone } from "../../ouput/CommonOutput";

describe('Testing Todo Service', () => {
    let app: any;
    let todoService: TodoService;
    before(() => {
        app = starServer(3001)
        todoService = new TodoService();
    });

    it('should create a new todo', async () => {
        const todoInput: TodoInput = {
            description : "hello",
            title : "word",
            userId : 1,
            isCompleted: false
        };

        const todo = await todoService.create(todoInput);
        expect(todo).greaterThan(1);
    });

    it('should not create a new todo', async () => {
        const todoInput: TodoInput = {
            description : "",
            title : "",
            userId : 1,
            isCompleted: false
        };

        const todo = await todoService.create(todoInput);
        expect(todo).equal(0);
    });

    it('should get todos', async () => {
        const todoInput: TodoInput = {
            description : "hello",
            title : "word",
            userId : 1,
            isCompleted: false
        };

        await todoService.create(todoInput);

        const rows =  await todoService.getAll(todoInput.userId, 1, 10);
        expect(rows.data).to.be.an('array');
        expect(rows.data).length.greaterThan(0);
    });

    it('should get one todo', async () => {
        const todoInput: TodoInput = {
            description : "hello",
            title : "word",
            userId : 1,
            isCompleted: false
        };
        const todoId = await todoService.create(todoInput);

        const todo = await todoService.getOne(String(todoId));
        expect(todo).not.null;
        expect(todo).to.be.an('object');
        expect(todo?.description).to.equal(todoInput.description);
        expect(todo?.title).to.equal(todoInput.title);
        expect(todo?.isCompleted).to.equal(todoInput.isCompleted);
    });

    it('should update a todo', async () => {
        const todoInput: TodoInput = {
            description : "hello",
            title : "word",
            userId : 1,
            isCompleted: false
        };
        const todoId = await todoService.create(todoInput);

        const todoUpdate: TodoInput = {
            description : "hello1",
            title : "word1",
            userId : 1,
            isCompleted: true
        };

        await todoService.update(String(todoId), todoUpdate);
        const todo = await todoService.getOne(String(todoId));
        expect(todo).to.be.an('object');
        expect(todo?.description).to.equal(todoUpdate.description);
        expect(todo?.title).to.equal(todoUpdate.title);
        expect(todo?.isCompleted).to.equal(todoUpdate.isCompleted);
    });

    it('should delete one todo', async () => {
        const todoInput: TodoInput = {
            description : "hello",
            title : "word",
            userId : 1,
            isCompleted: false
        };
        const todoId = await todoService.create(todoInput);

        await todoService.delete(String(todoId));
        const todo = await todoService.getOne(String(todoId));
        expect(todo).to.be.null;
    });

    after((done) => {
        app.close(done);
    });
});