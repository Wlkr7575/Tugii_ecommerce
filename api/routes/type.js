const express = require('express')
// const {TopCategories}  = require('../controller/queries/topcategories')
const {controller} = require('../controller')
const route = express.Router()

route.get('/',controller.category.get)
// route.get('/top',TopCategories)
route.get('/get/:id',controller.category.getbyId)
route.post('/',controller.category.create)
route.patch('/:id',controller.category.update)
route.delete('/:id',controller.category.remove)

module.exports = route