import { expect } from 'chai';
import request from 'supertest';
import { starServer } from '../app';
describe('App', () => {
  let app :any;
  let server : any;
  before(() => {
    app = starServer(3001)
  });

  it('should respond with "Api User List - v1.0.0" on the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
  });
  // Add more test cases as needed
  it('should create a new User', async () => {
    const response = await request(app)
      .post('/api/users')
      .send({
        "firstName" : "TEST",
        "lastName" : "OC",
        "email" : "ihi@gmail.com"
    });
    expect(response.status).to.equal(200);
  });
  it('should retrieve all Users', async () => {
    const response = await request(app).get('/api/users');
    expect(response.status).to.equal(200);
  });
  it('should update a User', async () => {
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
  it('should delete a User', async () => {
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
  // after((done) => {
  //   server.close(done);
  // });
});