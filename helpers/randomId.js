const { v4: uuidv4 } = require('uuid');

const randomId = () => uuidv4();

module.exports = {
    randomId
}