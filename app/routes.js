const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/auth/sign-up');
const { signIn } = require('./controllers/auth/sign-in');
const { getUsers } = require('./controllers/get-users');
const { adminUser } = require('./controllers/admin-user');
const { createWeet } = require('./controllers/weet/create-weet');
const { getWeets } = require('./controllers/weet/get-weets');
const { schemaValidation } = require('./middlewares/schema-validation');
const emailValidation = require('./middlewares/email-validation');
const credentialsMatch = require('./middlewares/credentials-match');
const tokenValidation = require('./middlewares/token-validation');
const adminTokenValidation = require('./middlewares/admin-token-validation');
const paramValidation = require('./middlewares/param-validation');
const { signUpSchema, signInSchema, adminSchema } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidation(signUpSchema), emailValidation], signUp);
  app.post('/users/sessions', [schemaValidation(signInSchema), credentialsMatch], signIn);
  app.get('/users', [tokenValidation], getUsers);
  app.post('/admin/users', [schemaValidation(adminSchema), adminTokenValidation], adminUser);
  app.post('/weets', [tokenValidation], createWeet);
  app.get('/weets', [tokenValidation, paramValidation('user_id')], getWeets);
};
