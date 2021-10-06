const logger = require('../../logger');
const generateToken = require('../../../utils/generate-token');

exports.signIn = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = generateToken({ email, password });
    res.send({ token });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
