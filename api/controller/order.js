const models = require('../models')
const mongoose = require('mongoose')
const get = async(req,res)=>{
    try {
        const orders = await models.order.find().populate({path:'userId',select:['name']}).sort('orderedAt').populate('orderproducts.productId',{'name':1,'price':1,'image':{$first:'$images'}})
        res.json({message:'here is all data',data:orders})
    } catch (error) {
        res.json(error)
    }
}
const create = async(req,res)=>{
    const order = req.body
    console.log(order)
    try {
        const newOrder = await models.order({...order})
        newOrder.save()
        const product = await models.product.find({'_id':mongoose.Types.ObjectId(order.orderproducts.productId)})
        const user = await models.user.findById(order.userId)
        const index = user.myOrders.findIndex((id)=>id === String(newOrder._id))
        if(index === -1){
            user.myOrders.push(newOrder._id)
        }else{
            user.myOrders = user.myOrders.filter((id)=>id !== String(newOrder._id))
        }
        user.save()
        res.json({message:'Ordered Succesfully',data:newOrder,test:product})
    } catch (error) {
        res.json(error)
    }
}
const update = async(req,res)=>{
    try {
        
    } catch (error) {
        res.json(error)
    }
}
const remove = async(req,res)=>{
    const {id} = req.params
    console.log(id)
    try {
        if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send(`No post with this id:${id}`)
        await models.order.findByIdAndRemove(id)
        res.status(200).json({message:'Order is removed successfully'})
    } catch (error) {
        res.json(error)
    }
}
const getbyId = async(req,res)=>{
    try {
        
    } catch (error) {
        res.json(error)
    }
}
const myOrders = async (req,res) =>{
    const {id} = req.params
    try{
        const orders = await models.order.find({'userId':mongoose.Types.ObjectId(id)}).populate('orderproducts.productId',{'name':1,'price':1,'image':{$first:'$images'}})
        res.json({message:'here is your order',data:orders})
    }catch (err){
        res.json(err)
    }
}
const test= async(req,res)=>{
    const {id} = req.params
    const order = await models.order.findByIdAndUpdate(id,{status:'Delivered'})
    for(const {productId,quantity} of order.orderproducts){
        await models.product.updateOne({_id:productId},{ "$inc": { "stored": -quantity } })
    }
    res.json({message:'ok'})
}
const orderController = {get,create,update,remove,getbyId,myOrders,test}
module.exports = {orderController}