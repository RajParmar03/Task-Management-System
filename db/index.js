const mongoose = require('mongoose');
require('dotenv').config();

const CONFIG = require('../config');

const databaseUrl = CONFIG.DATABASEURL;


const connection = mongoose.connect(databaseUrl);

module.exports = connection;

