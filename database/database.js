const {Sequelize} = require("sequelize");

// Carrega as variáveis de ambiente (útil para desenvolvimento local sem Docker)
require('dotenv').config();

const connection = new Sequelize(
    process.env.DB_NAME,      // Nome do banco
    process.env.DB_USER,      // Usuário
    process.env.DB_PASSWORD,  // Senha
    {
        host: process.env.DB_HOST, // Onde o banco está rodando
        dialect: 'mysql',
        timezone: '-03:00'
    }
);

module.exports = connection;