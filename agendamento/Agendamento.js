const {Sequelize} = require("sequelize")
const connection = require("../database/database")
const User = require("../users/User");

const Agendamento = connection.define('agendamento', {
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    }
})
User.hasMany(Agendamento) //Uma User pode ter varios Agendamento
Agendamento.belongsTo(User)//Um Agendamento pertence a uma User


Agendamento.sync({force: false})

module.exports = Agendamento 