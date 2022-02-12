const express = require('express')
const upload = require('../lib/upload')
// const { brandController } = require('../controller/brand/index')
const {controller} = require('../controller')
const router = express.Router()
router.get('/',controller.brand.get)
router.get('/get/:id',controller.brand.getbyId)
router.post('/',upload.single('logo'),controller.brand.create)
router.patch('/:id',upload.single('logo'),controller.brand.update)
router.delete('/:id',controller.brand.remove)

module.exports = router