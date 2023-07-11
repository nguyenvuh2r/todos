"use strict";
require('dotenv').config();
const { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } = process.env;
process.env.NODE_ENV = 'development';
module.exports = {
    "development": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": 'mariadb',
    },
    "test": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": 'mariadb',
    },
    "production": {
        "username": DB_USERNAME,
        "password": DB_PASSWORD,
        "database": DB_NAME,
        "host": DB_HOST,
        "dialect": 'mariadb',
    }
};
