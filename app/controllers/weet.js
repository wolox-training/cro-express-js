const logger = require('../logger');
const { getWeet, create } = require('../services/weets');
const { notAcceptableError, LENGTH_WEET } = require('../errors');

exports.weet = async (req, res, next) => {
  const { user_id } = req.body;
  try {
    const { joke } = await getWeet();
    if (joke.length > 140) throw notAcceptableError('weet schema', LENGTH_WEET);
    const weet = await create({ userId: user_id, content: joke });
    res.send(weet);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
