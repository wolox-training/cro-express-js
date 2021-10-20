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

describe('POST /weets/:id/ratings', () => {
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
    await factory.create('Weet', {
      content: '182,000 Americans die from Chuck Norris-related accidents every year.',
      userId: 1
    });
  });
  test('Correct parameters', async done => {
    const response = await request(app)
      .post(`/weets/${1}/ratings`)
      .set('Authorization', mockToken)
      .send({ score: 1 });
    expect(response.statusCode).toBe(200);
    done();
  });
  test('Incorrect score', async done => {
    const response = await request(app)
      .post(`/weets/${1}/ratings`)
      .set('Authorization', mockToken)
      .send({ score: 3 });
    expect(response.statusCode).toBe(422);
    expect(response.body.errors[0]).toContain('The score should be -1 or 1.');
    done();
  });
  test('Weet does not exist', async done => {
    const response = await request(app)
      .post(`/weets/${2}/ratings`)
      .set('Authorization', mockToken)
      .send({ score: -1 });
    expect(response.statusCode).toBe(404);
    expect(response.body.errors).toContain('It was not possible to get a weet');
    done();
  });
});
