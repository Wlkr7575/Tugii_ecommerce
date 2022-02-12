const mongoose = require('mongoose')
const color = mongoose.Schema({
    name:{type:String,require:true},
})
module.exports = mongoose.model('color',color)