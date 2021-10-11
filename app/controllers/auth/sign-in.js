const logger = require('../../logger');
const generateToken = require('../../utils/generate-token');
const { findOne } = require('../../services/users');

exports.signIn = async (req, res, next) => {
  try {
    const user = await findOne({ email: req.body.email });
    const token = generateToken(user.dataValues);
    res.send({ token });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
