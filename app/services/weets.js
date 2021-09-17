const axios = require('axios');

const { weet } = require('../../config').common.api;
const { defaultError } = require('../errors');

exports.getWeet = async () => {
  try {
    const { data } = await axios.get(weet);
    return data;
  } catch (error) {
    return defaultError(error);
  }
};
