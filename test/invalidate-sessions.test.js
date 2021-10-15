const { factory } = require('factory-girl');
const session = require('supertest-session');
const app = require('../app');
const hashString = require('../app/utils/hash-string');
const { factoryByModel } = require('./factory/factory_by_models');

const mockCredentials = {
  email: 'r.feynman@wolox.co',
  password: '12345678#'
};

factoryByModel('User');

describe('GET /users/sessions/invalidate_all', () => {
  let testSession = null;
  let mockToken = null;
  beforeAll(async () => {
    testSession = session(app);
    await factory.create('User', {
      email: 'r.feynman@wolox.co',
      password: hashString('12345678#')
    });
    const {
      body: { token }
    } = await testSession.post('/users/sessions').send(mockCredentials);
    mockToken = token;
  });
  test('when there is an open session', async done => {
    const response = await testSession.get('/users/sessions/invalidate_all').set('Authorization', mockToken);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe(`"All sessions with email ${mockCredentials.email} have been invalidated."`);
    done();
  });
  test('when there is not an open session', async done => {
    const response = await testSession.get('/users/sessions/invalidate_all').set('Authorization', mockToken);
    expect(response.statusCode).toBe(200);
    expect(response.text).toBe('"No open sessions"');
    done();
  });
});
