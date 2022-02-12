const brandModel = require('./brand')
const categoryModel = require('./category')
const colorsModel = require('./colors')
const orderModel = require('./order')
const productModel = require('./product')
const userModel = require('./user')
const models = {
    brand:brandModel,
    category:categoryModel,
    colors:colorsModel,
    order:orderModel,
    product:productModel,
    user:userModel
}
module.exports = models