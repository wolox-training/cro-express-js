const axios = require('axios');

const { url } = require('../../config').common.weetsApi;
const { defaultError } = require('../errors');

exports.getWeet = async () => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch (error) {
    return defaultError(error);
  }
};
