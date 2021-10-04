const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/auth/sign-up');
const { signIn } = require('./controllers/auth/sign-in');
const { schemaValidation } = require('./middlewares/schema-validation');
const emailValidation = require('./middlewares/email-validation');
const credentialsMatch = require('./middlewares/credentials-match');
const { authSchema } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidation(authSchema), emailValidation], signUp);
  app.post('/users/sessions', [schemaValidation(authSchema), credentialsMatch], signIn);
};
