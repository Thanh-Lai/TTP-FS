const Sequelize = require('sequelize')
const db = require('../db')

const Transactions = db.define('transaction', {
    ticker: {
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
        validate: {
            isFloat: true, // checks for valid floating point numbers
        }
    }
})

module.exports = Transactions
