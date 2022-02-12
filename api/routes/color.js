const express = require('express')
const route = express.Router()
const {controller} = require('../controller')
route.get('/',controller.color.get)
route.post('/',controller.color.create)
// route.patch('/:id',update)
// route.delete('/:id',remove)

module.exports = route