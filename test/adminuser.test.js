const request = require('supertest');
const app = require('../app');
const generateToken = require('../app/utils/generate-token');
const { INVALID_ADMIN_TOKEN } = require('../app/errors');

const mockUser = {
  name: 'Richard',
  last_name: 'Feynman',
  email: 'r.feynman@wolox.co',
  password: '2w1321AScsda#'
};

const mockAdmin = {
  ...mockUser,
  role: 'admin'
};

describe('POST /admin/users', () => {
  const mockAdminToken = generateToken(mockAdmin);
  const mockToken = generateToken(mockUser);
  beforeEach(async () => {
    await request(app)
      .post('/users')
      .send(mockUser);
  });
  it('Create or update user if authenticated as administrator', async done => {
    const response = await request(app)
      .post('/admin/users')
      .set('Authorization', mockAdminToken)
      .send(mockAdmin);
    expect(response.statusCode).toBe(200);
    done();
  });
  test('If not authenticated as administrator', async done => {
    const response = await request(app)
      .post('/admin/users')
      .set('Authorization', mockToken)
      .send(mockAdmin);
    expect(response.statusCode).toEqual(401);
    expect(response.body.errors).toContain(INVALID_ADMIN_TOKEN);
    done();
  });
});
