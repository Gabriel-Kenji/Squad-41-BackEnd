const {Sequelize} = require("sequelize")
const connection = require("../database/database")

const User = connection.define('users', {
    email:{
        type: Sequelize.STRING,
        allowNull: false
    },
    password:{
        type: Sequelize.STRING,
        allowNull: false
    },
    admin:{
        type: Sequelize.BOOLEAN,
        allowNull: false,
        defaultValue: 0
    }
})


User.sync({force: false})

module.exports = User