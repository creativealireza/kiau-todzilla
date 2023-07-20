const bcrypt = require('bcrypt');

const saltRounds = 10;

const hashPassword = (password) =>
    bcrypt.hash(password, saltRounds, (err, hash) => hash ? hash : err);

module.exports = {
    hashPassword,
};