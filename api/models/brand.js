const mongoose = require('mongoose')
const brand = mongoose.Schema({
    name:{type:String,require:true},
    logo:{type:String,require:true},
    detail:{type:String,require:true}
})
module.exports = mongoose.model('Brand',brand)