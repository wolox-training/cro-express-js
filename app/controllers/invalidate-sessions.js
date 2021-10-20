const logger = require('../logger');

exports.invalidateSessions = (req, res, next) => {
  try {
    const { session } = req;
    session.destroy();
    if (session.email) {
      return res.json(`All sessions with email ${session.email} have been invalidated.`);
    }
    return res.json('No open sessions');
  } catch (error) {
    logger.error(error);
    return next(error);
  }
};
