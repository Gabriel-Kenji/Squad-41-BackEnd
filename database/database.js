const {Sequelize} = require("sequelize");

const connection = new Sequelize('apiteste_fcamara', 'root', 'admin',{
    host: 'localhost',
    dialect: 'mysql',
    timezone: '-03:00'
});

module.exports = connection;