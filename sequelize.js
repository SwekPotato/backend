const Sequelize = require('sequelize')

const sequelize = new Sequelize('letsunite', 'jonathanpark', 'jjmj1010', {
    host: 'localhost',
    dialect: 'postgres',
})

module.exports = sequelize