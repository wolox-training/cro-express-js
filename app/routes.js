const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/auth/sign-up');
const { signIn } = require('./controllers/auth/sign-in');
const { getUsers } = require('./controllers/get-users');
const { adminUser } = require('./controllers/admin-user');
const { schemaValidation } = require('./middlewares/schema-validation');
const emailValidation = require('./middlewares/email-validation');
const credentialsMatch = require('./middlewares/credentials-match');
const tokenValidation = require('./middlewares/token-validation');
const adminTokenValidation = require('./middlewares/admin-token-validation');
const { signUpSchema, signInSchema } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidation(signUpSchema), emailValidation], signUp);
  app.post('/users/sessions', [schemaValidation(signInSchema), credentialsMatch], signIn);
  app.get('/users', [tokenValidation], getUsers);
  app.post('/admin/users', [schemaValidation(signUpSchema), adminTokenValidation], adminUser);
};
