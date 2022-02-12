const mongoose = require('mongoose')
const User = mongoose.Schema({
    email:{type:String,require:true,null:false},
    password:{type:String,require:true},
    name:{type:String,require:true},
    proimg:{type:String,require:true},
    location:{type:String,require:true},
    isStaff:{type:Boolean,require:true,default:false},
    myOrders:[{type:mongoose.Schema.Types.ObjectId,ref:'Orders'}],
    myCart :[{type:mongoose.Schema.Types.ObjectId,ref:'Product'}],
    isActive:{type:Boolean,require:true,default:false}
})
module.exports = mongoose.model('User',User)