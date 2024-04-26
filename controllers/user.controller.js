const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const CONFIG = require('../config');
const User = require('../models/user.model');

const saltRounds = CONFIG.SALT;
const jwtKey = CONFIG.JWTKEY;

exports.userRegistration = async (req, res) => {
    try {
        const { name, email, mobile, password } = req.body;
        bcrypt.hash(password, Number(saltRounds), async (error, hash) => {
            if (error) {
                return res.status(500).json({
                    status: "failed",
                    data: null,
                    error: error.message
                });
            }
            req.body.password = hash;
            const newUser = new User(req.body);
            const response = await newUser.save();
            res.status(201).json({
                status: "success",
                data: {
                    newUser: response
                },
                error: null
            });
        });
    } catch (error) {
        res.status(201).json({
            status: "failed",
            data: null,
            error: error.message
        });
    }
}

exports.userLogin = async (req, res) => {
    try {
        const { email, password } = req.body;
        let userList = await User.find({ email: email });
        if (!userList || userList.length === 0) {
            return res.status(404).json({
                status: "failed",
                data: null,
                error: "User not found"
            });
        }
        const user = userList[0];
        bcrypt.compare(password, user.password, (error, result) => {
            if (error) {
                return res.status(500).json({
                    status: "failed",
                    data: null,
                    error: error.message,
                });
            }
            if (!result) {
                return res.status(401).json({
                    status: "failed",
                    data: null,
                    error: "Invalid credentials"
                });
            }
            jwt.sign({ userId : user._id }, jwtKey, (error, token) => {
                if (error) {
                    return res.status(500).json({
                        status: "failed",
                        data: null,
                        error: error.message
                    });
                }
                res.status(200).json({
                    status: "success",
                    data: {
                        token: token,
                        user : user
                    },
                    error: null
                });
            });

        });
    } catch (error) {
        res.status(401).json({
            status: "failed",
            data: null,
            error: error.message
        });
    }
}