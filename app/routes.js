const { healthCheck } = require('./controllers/healthCheck');
const { signUp } = require('./controllers/auth/sign-up');
const { schemaValidation } = require('./middlewares/schema-validation');
const { emailValidation } = require('./middlewares/email-validation');
const { signUpSchema } = require('./schemas/user');

exports.init = app => {
  app.get('/health', healthCheck);
  app.post('/users', [schemaValidation(signUpSchema), emailValidation], signUp);
};
