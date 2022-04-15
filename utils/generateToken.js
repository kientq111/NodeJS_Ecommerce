const jwt = require('jsonwebtoken');

const generateToken = (id) => {
    return jwt.sign({ id }, 'masobimat123', {
        expiresIn: '1d',
    });
}

const verifyToken = (token) => {
    const checkToken = jwt.verify(token, 'masobimat123');
    if (checkToken) {
        return true;
    } else {
        return false;
    }
}

module.exports = { generateToken, verifyToken }