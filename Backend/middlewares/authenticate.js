const jwt = require('jsonwebtoken');
const { StatusCode } = require('../consts/const');
const { responseHandler } = require("../utils/responseHandler");
// Middleware to verify token
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader;
    if (!token) {
        return responseHandler(res, StatusCode.FORBIDDEN, 'Token required');
    }
    jwt.verify(token, process.env.SECRET_KEY_JWT, (err, user) => {
        if (err) {
            return responseHandler(res, StatusCode.FORBIDDEN, 'Invalid token');
        }
        req.user = user;
        next();
    });
}

module.exports = authenticateToken;