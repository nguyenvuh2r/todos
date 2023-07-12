import { expect } from 'chai';
import { starServer } from '../../app';
import TodoService from '../../services/Todo.service';
import { TodoInput } from '../../input/TodoInput';

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
            userId : "55"
        };

        const todo = await todoService.create(todoInput);
        expect(todo).to.be.an('object');
        expect(todo.description).to.equal(todoInput.description);
        expect(todo.title).to.equal(todoInput.title);
        expect(todo.userId).to.equal(todoInput.userId);

    });

    it('should get todos', async () => {
        const rows =  await todoService.getAll();
        expect(rows).to.be.an('array');
    });


    it('should get one todo', async () => {
        // create new
        const todoInput: TodoInput = {
            description : "hello",
            title : "word",
            userId : "55"
        };

        const todoCreated = await todoService.create(todoInput);
        let todoId: string = todoCreated.id;
        // get user created
        const todo = await todoService.getOne(todoId);

        expect(todo).to.be.an('object');
        expect(todo.description).to.equal(todoCreated.description);
        expect(todo.title).to.equal(todoCreated.title);
        expect(todo.userId).to.equal(todoCreated.userId);

    });

    it('should update a todo', async () => {
        // create new
        const todoInput: TodoInput = {
            description : "hello",
            title : "word",
            userId : "55"
        };

        const todoCreated = await todoService.create(todoInput);
        let todoId: string = todoCreated.id;

        const todoUpdate: TodoInput = {
            description : "hello1",
            title : "word1",
            userId : "55"
        };

        await todoService.update(todoId,todoUpdate);
        const todo = await todoService.getOne(todoId);
        expect(todo).to.be.an('object');
        expect(todo.description).to.equal(todoUpdate.description);
        expect(todo.title).to.equal(todoUpdate.title);
        expect(todo.userId).to.equal(todoUpdate.userId);

    });

    it('should delete one todo', async () => {
        // create new
        const todoInput: TodoInput = {
            description : "hello",
            title : "word",
            userId : "55"
        };
        const todoCreated = await todoService.create(todoInput);
        let todoId: string = todoCreated.id;
        // get user created
        await todoService.delete(todoId);
        const todo = await todoService.getOne(todoId);
        expect(todo).to.be.null;
    });

    after((done) => {
        app.close(done);
    });
});