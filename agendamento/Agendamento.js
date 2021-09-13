const {Sequelize} = require("sequelize")
const connection = require("../database/database")
const User = require("../users/User");
const Estacao = require("../estacao/Estacao")

const Agendamento = connection.define('agendamento', {
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    }
})
User.hasMany(Agendamento) //Uma User pode ter varios Agendamento
Agendamento.belongsTo(User)//Um Agendamento pertence a uma User
Estacao.hasMany(Agendamento) //Uma Estacao pode ter varios Agendamento
Agendamento.belongsTo(Estacao)//Um Agendamento pertence a uma Estacao   


Agendamento.sync({force: false})

module.exports = Agendamento 