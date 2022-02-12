const express = require('express')
const {jwtAuth}  = require('../controller/token')
const route = express.Router()

route.post('/',jwtAuth.check)

module.exports = route