const request = require('supertest');
const { factory } = require('factory-girl');
const app = require('../app');
const generateToken = require('../app/utils/generate-token');
const hashString = require('../app/utils/hash-string');
const { factoryByModel } = require('./factory/factory_by_models');
const { INVALID_ADMIN_TOKEN } = require('../app/errors');

factoryByModel('User');

let mockUser = null;
let mockAdminToken = null;
let mockToken = null;

describe('POST /admin/users', () => {
  beforeEach(async () => {
    const user = await factory.create('User', {
      email: 'r.feynman@wolox.co',
      password: hashString('2w1321AScsda#'),
      role: 'admin'
    });
    mockUser = user.dataValues;
    mockAdminToken = generateToken(mockUser);
    mockToken = generateToken({ ...mockUser, role: 'user' });
  });
  test('Create or update user if authenticated as administrator', async done => {
    const response = await request(app)
      .post('/admin/users')
      .set('Authorization', mockAdminToken)
      .send({ ...mockUser, last_name: mockUser.lastName });
    expect(response.statusCode).toBe(200);
    done();
  });
  test('If not authenticated as administrator', async done => {
    const response = await request(app)
      .post('/admin/users')
      .set('Authorization', mockToken)
      .send({ ...mockUser, last_name: mockUser.lastName, role: 'user' });
    expect(response.statusCode).toEqual(401);
    expect(response.body.errors).toContain(INVALID_ADMIN_TOKEN);
    done();
  });
});
