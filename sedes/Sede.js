const {Sequelize} = require("sequelize")
const connection = require("../database/database")

const Sede = connection.define('sedes', {
    name:{
        type: Sequelize.STRING,
        allowNull: false
    },
    address:{
        type: Sequelize.TEXT,
        allowNull: false
    },
    description:{
        type: Sequelize.TEXT,
        allowNull: false
    }
})


Sede.sync({force: false})

module.exports = Sede