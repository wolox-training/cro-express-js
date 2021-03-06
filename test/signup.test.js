const request = require('supertest');
const app = require('../app');
const { INVALID_PASSWORD, NOT_BELONG_COMPANY, NOT_NULL } = require('../app/errors');

const mockUser = {
  name: 'Richard',
  last_name: 'Feynman',
  email: 'r.feynman@wolox.co',
  password: '2w1321AScsda#'
};

describe('POST /users', () => {
  test('Valid params', async done => {
    const response = await request(app)
      .post('/users')
      .send(mockUser);
    expect(response.statusCode).toEqual(200);
    done();
  });
  test('Weak password', async done => {
    const response = await request(app)
      .post('/users')
      .send({ ...mockUser, password: 'AB' });
    expect(response.statusCode).toEqual(422);
    expect(response.body.errors).toContain(INVALID_PASSWORD);
    done();
  });
  test('Email with external domain', async done => {
    const response = await request(app)
      .post('/users')
      .send({ ...mockUser, email: 'r.feynman@gmail.com' });
    expect(response.statusCode).toEqual(422);
    expect(response.body.errors).toContain(NOT_BELONG_COMPANY);
    done();
  });
  test('Null parameter', async done => {
    const response = await request(app)
      .post('/users')
      .send({ ...mockUser, name: null });
    expect(response.statusCode).toEqual(422);
    expect(response.body.errors).toContain(`Name ${NOT_NULL}`);
    done();
  });
});
