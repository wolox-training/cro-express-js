const logger = require('../../logger');
const { scoreWeet } = require('../../services/grades');
// const { notAcceptableError, LENGTH_WEET } = require('../../errors');

exports.gradeWeet = async (req, res, next) => {
  try {
    const { id: weetId } = req.params;
    const { score } = req.body;
    const position = await scoreWeet(weetId, score);
    res.json(`${position.name} position is: ${position.namePosition}`);
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
