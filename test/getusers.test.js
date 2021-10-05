const request = require('supertest');
const app = require('../app');

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

describe('GET /users', () => {
  let mockToken = null;
  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send(mockUser);
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
