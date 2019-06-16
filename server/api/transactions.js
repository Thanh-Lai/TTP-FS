const router = require('express').Router()
const { Transactions } = require('../db/models')

module.exports = router

//Get all transactions api
router.get('/:id', (req, res, next) => {
    Transactions.findAll({where: {userId: req.params.id}})
        .then(transactions => {
            res.json(transactions)
        })
        .catch(next)
})


//Post transactions api
router.post('/', (req, res, next) => {
    Transactions.create(req.body)
        .then(createdTransaction => {
            console.log('in transaction post ',createdTransaction)
            res.status(201).json(createdTransaction)
        })
        .catch(next)
})
