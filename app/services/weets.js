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

const findAndCountAll = async (user_id, page, limit) => {
  const data = await Weet.findAndCountAll({
    where: {
      user_id
    },
    offset: page * limit,
    limit
  });
  return data;
};

module.exports = { getWeet, findAndCountAll };
