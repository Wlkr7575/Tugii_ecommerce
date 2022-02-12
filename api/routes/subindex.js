const productroute= require('./product')
const brandroute = require('./brand')
const typesroute = require('./type')
const userRoute = require('./user')
const colorRoute = require('./color')
const orderRoute = require('./order')
const tokenRoute = require('./token')
const routes = {
    product:productroute,
    brand:brandroute,
    category:typesroute,
    user:userRoute,
    color:colorRoute,
    order:orderRoute,
    token:tokenRoute
}
module.exports = routes