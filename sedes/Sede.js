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

// Sede.create({
//     name: "São Paulo",
//     address: "Rua Bela Cintra, 986 - 2º andar Consolação, São Paulo - SP",
//     description: "Sede São Paulo"
// })

// Sede.create({
//     name: "Santos",
//     address: "Praça Dos Expedicionários, 19 2º andar Gonzaga, Santos - SP",
//     description: "Sede Santos"
// })


module.exports = Sede