const {Sequelize} = require("sequelize")
const connection = require("../database/database")
const Sede = require("../sedes/Sede");

const Estacao = connection.define('estacao', {
    number:{
        type: Sequelize.INTEGER,
        allowNull: false
    }
})
Sede.hasMany(Estacao) //Uma Sede pode ter varios Estacao
Estacao.belongsTo(Sede)//Um Estacao pertence a uma Sede


Estacao.sync({force: false})

module.exports = Estacao 