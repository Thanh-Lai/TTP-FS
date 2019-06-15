const router = require('express').Router()
const { Transactions } = require('../db/models')
module.exports = router

//Get all transactions
router.get('/', (req, res, next) => {
    Transactions.findAll()
        .then(transactions => {
            res.send(transactions)
        })
        .catch(next)
})


//Post transactions
router.post('/', (req, res, next) => {
    Transactions.create(req.body)
        .then(createdTransaction => {
            res.status(200).json(createdTransaction)
        })
        .catch(next)
})
