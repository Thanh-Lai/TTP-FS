const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transaction', {
    symbol: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: true, // don't allow empty strings
        }
    },
    quantity: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    price: {
        type: Sequelize.DECIMAL(10, 2),
        allowNull: false,
    }
})

module.exports = Transactions
