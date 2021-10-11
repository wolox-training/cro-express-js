const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../app');
const hashString = require('../app/utils/hash-string');
const { factoryByModel } = require('./factory/factory_by_models');

const mockCredentials = {
  email: 'r.feynman@wolox.co',
  password: '12345678#'
};

factoryByModel('User');

describe('GET /users', () => {
  let mockToken = null;
  beforeEach(async () => {
    await factory.create('User', {
      email: 'r.feynman@wolox.co',
      password: hashString('12345678#')
    });
    const {
      body: { token }
    } = await request(app)
      .post('/users/sessions')
      .send(mockCredentials);
    mockToken = token;
  });
  it('With the correct authorization token', async done => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', mockToken);
    expect(response.statusCode).toBe(200);
    done();
  });
  it('Without authorization token', async done => {
    const response = await request(app).get('/users');
    expect(response.statusCode).toBe(422);
    done();
  });
  it('Wrong authorization token', async done => {
    const response = await request(app)
      .get('/users')
      .set('Authorization', '123');
    expect(response.statusCode).toBe(422);
    done();
  });
});
