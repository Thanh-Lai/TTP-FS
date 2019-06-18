const router = require('express').Router()
const { Transactions } = require('../db/models')

module.exports = router

//Get all transactions api
router.get('/:id', (req, res, next) => {
    Transactions.findAll({ where: { userId: req.params.id } })
        .then(transactions => {
            res.status(200).json(transactions)
        })
        .catch(next)
})

//Get all unique transactions api
router.get('/unique/:id', (req, res, next) => {
    Transactions.findAll({ where: { userId: req.params.id } })
        .then(transactions => {
            const unique = {};
            const allUnique = [];
            transactions.forEach(transaction => {
                const symbol = transaction.symbol
                if (unique[symbol]) {
                    unique[symbol].quantity += transaction.quantity
                } else {
                    unique[symbol] = transaction
                }
            })

            for (let key in unique) {
                allUnique.push(unique[key])
            }
            res.status(200).json(allUnique)
        })
        .catch(next)
})


//Post transactions api
router.post('/', (req, res, next) => {
    Transactions.create(req.body)
        .then(createdTransaction => {
            res.status(201).json(createdTransaction)
        })
        .catch(next)
})
