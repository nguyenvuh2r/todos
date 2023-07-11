import { expect } from 'chai';
import request from 'supertest';
import { App } from '..';

describe('Todo API', () => {
  let app: any;

  before(() => {
    app = new App().app;

    app.listen(3001, () => {
      console.log('Server running on port 3001');
    });
  });

  it('should respond with "Api Todo List - v1.0.0" on the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Api Todo List - v1.0.0');
  });

  it('should create a new todo', async () => {
    const response = await request(app).post('/api/todos').send({
      title: 'New Todo',
      description: 'New Description',
      isCompleted: false
    });

    expect(response.status).to.equal(200);
  });

  it('should retrieve all todos', async () => {
    const response = await request(app).get('/api/todos');
    expect(response.status).to.equal(200);
  });

  it('should update a todo', async () => {
    const createResponse = await request(app).post('/api/todos').send({
      title: 'Todo',
      description: 'Description',
      isCompleted: false
    });
    const createdTodoId = createResponse.body.data.id;

    const updateResponse = await request(app)
      .put(`/todos/${createdTodoId}`)
      .send({
        title: 'Updated Todo',
        description: 'Updated Description',
        isCompleted: true
      });
    expect(updateResponse.status).to.equal(200);
  });

  it('should delete a todo', async () => {
    const createResponse = await request(app).post('/api/todos').send({
      title: 'Todo',
      description: 'Description',
      isCompleted: false
    });
    const createdTodoId = createResponse.body.data.id;

    const deleteResponse = await request(app).delete(`/api/todos/${createdTodoId}`);
    expect(deleteResponse.status).to.equal(200);
  });

  after(() => {
    
  });
});
