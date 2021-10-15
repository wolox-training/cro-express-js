const { Weet, Grade, sequelize } = require('../models');
const { findOne } = require('../services/users');
const { notFoundError, NOT_WEET } = require('../errors');
const { positions } = require('../utils/score-position');

const findOneWeet = async condition => {
  const weet = await Weet.findOne({ where: condition });
  if (!weet) throw notFoundError('weet schema', NOT_WEET);
  return weet;
};

const getPosition = points => positions.find(position => points >= position.min && points < position.max);

const create = async values => {
  const grade = await Grade.create(values);
  return grade;
};

const scoreWeet = async (weetId, score) => {
  let transaction = {};
  try {
    transaction = await sequelize.transaction();
    const weet = await findOneWeet({ id: weetId });
    const { id, userId } = weet.dataValues;
    const user = await findOne({ id: userId });
    const { points, name } = user.dataValues;
    let currentPosition = getPosition(points);
    const newPosition = getPosition(points + score);
    if (score > 0) {
      await user.increment('points', { transaction });
    } else {
      await user.decrement('points', { transaction });
    }

    if (currentPosition.namePosition !== newPosition.namePosition) {
      user.position = newPosition.namePosition;
      await user.save({ transaction });
      currentPosition = { ...newPosition };
    }

    await create({ gradeUserId: userId, weetId: id, score }, transaction);

    await transaction.commit();
    return { name, namePosition: currentPosition.namePosition };
  } catch (error) {
    if (transaction.rollback) await transaction.rollback();
    throw error;
  }
};

module.exports = { scoreWeet };
