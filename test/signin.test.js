const request = require('supertest');
const { factory } = require('factory-girl');
const { factoryByModel } = require('./factory/factory_by_models');
const app = require('../app');
const hashString = require('../app/utils/hash-string');

const {
  INVALID_PASSWORD,
  NOT_BELONG_COMPANY,
  WRONG_PASSWORD,
  EMAIL_DOES_NOT_EXIST
} = require('../app/errors');

const mockCredentials = {
  email: 'r.feynman@wolox.co',
  password: '12345678#'
};

factoryByModel('User');

beforeEach(async () => {
  await factory.create('User', {
    email: 'r.feynman@wolox.co',
    password: hashString('12345678#')
  });
});

describe('POST /users/sessions', () => {
  test('Valid credentials', async done => {
    const response = await request(app)
      .post('/users/sessions')
      .send(mockCredentials);
    expect(response.statusCode).toEqual(200);
    done();
  });
  test('Weak password', async done => {
    const response = await request(app)
      .post('/users/sessions')
      .send({ ...mockCredentials, password: '123' });
    expect(response.statusCode).toEqual(422);
    expect(response.body.errors).toContain(INVALID_PASSWORD);
    done();
  });
  test('Wrong password', async done => {
    const response = await request(app)
      .post('/users/sessions')
      .send({ ...mockCredentials, password: 'qwerty123' });
    expect(response.statusCode).toEqual(401);
    expect(response.body.errors).toContain(WRONG_PASSWORD);
    done();
  });
  test('Email with external domain', async done => {
    const response = await request(app)
      .post('/users/sessions')
      .send({ ...mockCredentials, email: 'r.feynman@gmail.com' });
    expect(response.statusCode).toEqual(422);
    expect(response.body.errors).toContain(NOT_BELONG_COMPANY);
    done();
  });
  test('Email does not exist', async done => {
    const response = await request(app)
      .post('/users/sessions')
      .send({ ...mockCredentials, email: 'r.feynman1@wolox.co' });
    expect(response.statusCode).toEqual(401);
    expect(response.body.errors).toContain(EMAIL_DOES_NOT_EXIST);

    done();
  });
});
