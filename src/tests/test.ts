import { expect } from 'chai';
import request from 'supertest';
import {App} from '../index';

describe('App', () => {
  let app :any;

  before(() => {
    app = new App().app;
  });

  it('should respond with "Api Todo List - v1.0.0" on the root endpoint', async () => {
    const response = await request(app).get('/');
    expect(response.status).to.equal(200);
    expect(response.text).to.equal('Api Todo List - v1.0.0');
  });

  // Add more test cases as needed

  after(() => {
    // Perform any cleanup or teardown tasks
  });
});