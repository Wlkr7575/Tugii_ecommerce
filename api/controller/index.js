const {brandController} = require('./brand')
const {colorController} = require('./colors')
const {orderController} = require('./order')
const {categoryController} = require('./catergories')
const {userController} = require('./user')
const {productController} = require('./product')
const controller = {
    brand:brandController,
    user:userController,
    product:productController,
    color:colorController,
    category:categoryController,
    order:orderController,

}
module.exports = {controller}