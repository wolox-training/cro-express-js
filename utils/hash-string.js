const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashString = text => bcrypt.hashSync(text, saltRounds);

module.exports = hashString;
