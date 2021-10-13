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
factoryByModel('Weet');

describe('GET /weets', () => {
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
  test('With the correct authorization token', async done => {
    const response = await request(app)
      .get('/weets')
      .query({ user_id: 1, page: 1, limit: 5 })
      .set('Authorization', mockToken);
    expect(response.statusCode).toBe(200);
    expect(response.body).toHaveProperty('weets');
    expect(response.body).toHaveProperty('totalPages');
    done();
  });
  test('Without user_id param', async done => {
    const response = await request(app)
      .get('/weets')
      .query({ page: 1, limit: 5 })
      .set('Authorization', mockToken);
    expect(response.statusCode).toBe(422);
    expect(response.body.errors).toContain('The user_id parameter is required.');
    done();
  });
});
