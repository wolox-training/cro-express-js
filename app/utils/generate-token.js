const jwt = require('jsonwebtoken');

const generateToken = payload =>
  jwt.sign(payload, process.env.TOKEN_KEY, {
    expiresIn: '1h'
  });

module.exports = generateToken;
