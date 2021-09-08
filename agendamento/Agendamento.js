const {Sequelize} = require("sequelize")
const connection = require("../database/database")
const User = require("../users/User");

const Agendamento = connection.define('agendamento', {
    date:{
        type: Sequelize.DATEONLY,
        allowNull: false
    }
})
User.hasMany(Agendamento) //Uma Categoria pode ter varios artigos
Agendamento.belongsTo(User)//Um artigo pertence a uma categoria


Agendamento.sync({force: false})

module.exports = Agendamento 