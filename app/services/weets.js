const axios = require('axios');

const { Weet } = require('../models');
const { url } = require('../../config').common.weetsApi;
const { notFoundError, NOT_WEET } = require('../errors');

const getWeet = async () => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    throw notFoundError('generic schema', NOT_WEET);
  }
};

const findAndCountAll = async (userId, page, limit) => {
  const offset = page * limit;
  const data = await Weet.findAndCountAll({
    where: {
      user_id: userId
    },
    offset: offset - limit,
    limit
  });
  return data;
};

const create = async values => {
  const weet = await Weet.create(values);
  return weet;
};

module.exports = { getWeet, findAndCountAll, create };
