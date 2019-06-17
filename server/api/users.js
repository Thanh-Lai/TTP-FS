const router = require('express').Router()
const { User } = require('../db/models')
module.exports = router

router.get('/', (req, res, next) => {
  User.findAll({
    // explicitly select only the id and email fields - even though
    // users' passwords are encrypted, it won't help if we just
    // send everything to anyone who asks!
    attributes: ['id', 'email']
  })
    .then(users => {
      console.log(users)
      res.json(users)
    })
    .catch(next)
})

//Find user balance api
router.get('/:id', (req, res, next) => {
  User.findById(req.params.id)
    .then(user => {
      res.status(200).json(user.cash)
    })
    .catch(next)
})

//Update balance api
router.put('/:id', (req, res, next) => {
  console.log('in api users',req.body)
  User.findById(req.params.id)
    .then(user => {
      user.update( {cash: req.body.balance} )
    })
    .catch(next)
})

