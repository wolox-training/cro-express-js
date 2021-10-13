const request = require('supertest');
const { factory } = require('factory-girl');
const axios = require('axios');
const app = require('../app');
const hashString = require('../app/utils/hash-string');
const { factoryByModel } = require('./factory/factory_by_models');
const { LENGTH_WEET } = require('../app/errors');

const mockCredentials = {
  email: 'r.feynman@wolox.co',
  password: '12345678#'
};

factoryByModel('User');

jest.mock('axios');

describe('POST /weets', () => {
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
    axios.get
      .mockResolvedValueOnce({
        data: {
          joke: '182,000 Americans die from Chuck Norris-related accidents every year.'
        }
      })
      .mockResolvedValueOnce({
        data: {
          joke:
            'Teenage Mutant Ninja Turtles is based on a true story: ' +
            'Chuck Norris once swallowed a turtle whole, and when he crapped it out, the turtle was six feet tall and had learned karate.'
        }
      });
  });
  test('Normal weet', async done => {
    const response = await request(app)
      .post('/weets')
      .set('Authorization', mockToken)
      .send({ user_id: 1 });
    expect(response.statusCode).toBe(200);
    done();
  });
  test('Weet too long', async done => {
    const response = await request(app)
      .post('/weets')
      .set('Authorization', mockToken)
      .send({ user_id: 1 });
    expect(response.statusCode).toBe(406);
    expect(response.body.errors).toContain(LENGTH_WEET);
    done();
  });
});
