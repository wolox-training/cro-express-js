const request = require('supertest');
const app = require('../app');
const {
  INVALID_PASSWORD,
  NOT_BELONG_COMPANY,
  WRONG_PASSWORD,
  EMAIL_DOES_NOT_EXIST
} = require('../app/errors');

const mockUser = {
  name: 'Richard',
  last_name: 'Feynman',
  email: 'r.feynman@wolox.co',
  password: '2w1321AScsda#'
};

const mockCredentials = {
  email: 'r.feynman@wolox.co',
  password: '2w1321AScsda#'
};

describe('POST /users/sessions', () => {
  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send(mockUser);
  });
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
      .send({ ...mockCredentials, password: 'AB' });
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
