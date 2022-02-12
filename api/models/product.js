const mongoose = require('mongoose')
const Product = mongoose.Schema({
    name:{type:String,require:true},
    createdAt:{type:Date,default:new Date()},
    type:{type:mongoose.Schema.Types.ObjectId,ref:'Categories'},
    brands:{type:mongoose.Schema.Types.ObjectId,ref:'Brand'},
    colors:[{type:mongoose.Schema.Types.ObjectId,ref:'color'}],
    price:{type:Number,require:true,default:0},
    images:[String],
    stored:Number,
    detail:String,
    saled:{type:Number,default:0},
    rating:[{
        userId:{type:String,require:true},
        rating:{type:Number,require:true,default:0}
    }]
})

module.exports = mongoose.model('Product',Product)