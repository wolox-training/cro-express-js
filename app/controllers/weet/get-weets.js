const logger = require('../../logger');
const { findAndCountAll } = require('../../services/weets');
const { pagination } = require('../../utils/pagination');

exports.getWeets = async (req, res, next) => {
  const { user_id } = req.query;
  const { page, limit } = pagination(req.query.page, req.query.limit);
  try {
    const weets = await findAndCountAll(user_id, page, limit);
    res.send({
      weets: weets.rows,
      totalPages: Math.ceil(weets.count / Number.parseInt(limit))
    });
  } catch (error) {
    logger.error(error);
    next(error);
  }
};
