const jwt = require('jsonwebtoken');
const logger = require('../../logger');

exports.signIn = (req, res, next) => {
  try {
    const { email, password } = req.body;
    const token = jwt.sign({ email, password }, process.env.TOKEN_KEY, {
      expiresIn: '1h'
    });
    res.send({ token });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
