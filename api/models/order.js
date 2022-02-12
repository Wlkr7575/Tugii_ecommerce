const mongoose = require('mongoose')

const Orders = new mongoose.Schema({
    userId:{type:mongoose.Schema.Types.ObjectId,ref:'User'},
    orderproducts:[{
        productId:{type:mongoose.Schema.Types.ObjectId,ref:'Product'},
        quantity:{type:Number,require:true,default:1},
    }],
    orderedAt:{type:Date,default:new Date()},
    status:{type:String,default:'Waiting'}
})

module.exports = mongoose.model('Orders',Orders)