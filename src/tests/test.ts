import { expect } from 'chai';
import request from 'supertest';
import { App } from '..';
describe('App', () => {
  let app :any;

  before(() => {
    app = new App().app;

    app.listen(3001, () => {
      console.log(`Server running on port ${3001}`);
    });
  });
  it('should respond with "Api Todo List - v1.0.0" on the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Api Todo List - v1.0.0');
  });
  // Add more test cases as needed
  it('should create a new todo', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        "firstName" : "TEST",
        "lastName" : "OC",
        "email" : "ihi@gmail.com"
    });
    expect(response.status).to.equal(200);
  });
  it('should retrieve all todos', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).to.equal(200);
  });
  it('should update a todo', async () => {
    const createResponse = await request(app)
      .post('/api/users')
      .send({
        "firstName" : "TEST",
        "lastName" : "OC",
        "email" : "ihi@gmail.com"
    });
    const userId = createResponse.body.data.id;
    const updateResponse = await request(app)
      .put(`/api/users/${userId}`)
      .send({
        "firstName" : "Aaaa",
        "lastName" : "OC",
        "email" : "ihi@gmail.com"
    });
    expect(updateResponse.status).to.equal(200);
  });
  it('should delete a todo', async () => {
    const createResponse = await request(app)
      .post('/api/users')
      .send({
        "firstName" : "TEST",
        "lastName" : "OC",
        "email" : "ihi@gmail.com"
    });
    const userId = createResponse.body.data.id;
    const deleteResponse = await request(app).delete(`/api/users/${userId}`);
    expect(deleteResponse.status).to.equal(200);
  });
  after(() => {

  });
});