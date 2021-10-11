const axios = require('axios');

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

module.exports = getWeet;
