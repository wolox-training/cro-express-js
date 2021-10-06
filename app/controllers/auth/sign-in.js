const logger = require('../../logger');
const { User } = require('../../models');
const generateToken = require('../../../utils/generate-token');

exports.signIn = async (req, res, next) => {
  try {
    const user = await User.findOne({ where: { email: req.body.email } });
    const token = generateToken(user.dataValues);
    res.send({ token });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
