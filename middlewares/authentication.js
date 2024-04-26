const jwt = require('jsonwebtoken');

const CONFIG = require('../config');


const jwtKey = CONFIG.JWTKEY;


const authentication = (req, res, next) => {
    try {
        const token = req.headers.authorization || "";
        jwt.verify(token, jwtKey, (error, decoded) => {
            if (error) {
                return res.status(500).json({
                    status: 'failed',
                    data: null,
                    error: error.message
                })
            }
            req.userId = decoded.userId;
        });
        next();
    } catch (error) {
        res.status(500).json({
            status: 'failed',
            data: null,
            error: error.message
        });
    }
}

module.exports = authentication;