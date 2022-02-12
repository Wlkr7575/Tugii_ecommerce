const express = require('express')
const upload = require('../lib/upload')
// const get = require('../controller/user/get')
// const create = require('../controller/user/create')
// const update = require('../controller/user/update')
// const remove = require('../controller/user/delete')
const {controller} = require('../controller')
const route = express.Router()

route.get('/',controller.user.getall)
route.post('/getmycart',controller.user.readMyCart)
route.post('/signup',upload.single('img'),controller.user.create)
route.post('/signin',controller.user.read)
route.patch('/:id',upload.single('proimg'),controller.user.update)
route.delete('/:id',controller.user.remove)
route.post('/addCart',controller.user.addProducttoCart)
route.delete('/removefmyCart/:id',controller.user.removeFromMyCart)
module.exports = route