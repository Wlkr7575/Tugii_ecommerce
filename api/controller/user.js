const models = require('../models')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const mongoose = require('mongoose')
/*Get All */
const getall = async(req,res)=>{
    const users = await models.user.find()
    res.json(users)
}
/* Create*/
const create = async(req,res) =>{
    const {email,password,name,isStaff} = req.body
    const proimg = req.file.originalname
    console.log(proimg)
    try {
        const useexist = await models.user.findOne({email})
        if(useexist) return res.status(400).json({message:'User is already exist'})
        const hashPassword = await bcrypt.hash(password,12)
        const newUser = await models.user.create({email:email,password:hashPassword,name:name,proimg:proimg,isStaff:isStaff?true:false})
        const token = jwt.sign({email:newUser.email,id:newUser._id},'test',{expiresIn:"12h"})
        // const newUser = await User({...user,proimg:proimg})
        // newUser.save()
        res.status(200).json({message:'user create successfully',user:newUser,token})
    } catch (error) {
        res.json(error)
    }
}
/* Read*/
const read = async(req,res)=>{
    const {email,password} = req.body
    try {
        const useexist = await models.user.findOne({email})
        .populate({path:'myOrders',populate:{path:'orderproducts.productId',select:{name:1,price:1,image:{$arrayElemAt: [ "$images", 0 ]}}}})
        .select({email:1,name:1,password:1,myorders:1,proimg:1,myCart:1})
        if(!useexist)return res.status(400).json({message:`No user with this email:${email}`})
        const correctPassword = await bcrypt.compare(password,useexist.password)
        if(!correctPassword) return res.status(400).json({message:`Incorrect Password`})
        useexist.isActive = true
        useexist.save()
        const token  = jwt.sign({email:useexist.email,id:useexist._id},'test',{expiresIn:'12h'})
        res.status(200).json({message:'User Logged in Successfully',userData:useexist,token})
    } catch (error) {
        res.json(error)
    }
}
/* Update*/
const update = async(req,res) =>{
    const {id:_id} = req.params
    const user = req.body
    const proimg = req.file.originalname
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).json({message:`No user with this id:${_id}`})
    const updatedUser = await models.user.findByIdAndUpdate(_id,{...user,proimg:proimg},{new:true})
    res.status(200).json({message:"User update successfullya",updatedUser})
}
/* Delete*/
const remove = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send(`No post with this id:${id}`)
    await models.user.findByIdAndRemove(id)
    res.status(200).json({message:"User removed successfully"})
}
const myorders = async(req,res)=>{
    try {
        const {id:_id} = req.params
        if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send(`No post with this id:${_id}`)
        const res = await models.user.findById(_id).populate({path:'userId',select:['name']}).populate({path:'productId',select:['name']})
    } catch (error) {
        
    }
}
const addProducttoCart = async(req,res)=>{
    const query = req.query
    const user = await models.user.findById(query.userId)
    const index = user.myCart.findIndex(id => String(id) === String(query.productID)) 
    if(index === -1) {
        user.myCart.push(query.productID)
    }else{
        user.myCart = user.myCart.filter((p)=>String(p) !== String(query.productID))
    }
    const updatedMyCart = await models.user.findByIdAndUpdate(query.userId,user,{new:true})
    res.json({data:updatedMyCart})
}
const readMyCart = async(req,res)=>{
    const ids = req.body
    console.log(ids)
    const result = await models.product.find({'_id':{$in:ids}}).select({name:1,createdAt:1,price:1,image:{$first:'$images'}})
    res.json({data:result})
}
const removeFromMyCart = async(req,res)=>{
    const {id:_id} = req.params
    const {PID} = req.query
    const result = await models.user.findById(_id)
    if(!result){res.status(400).json({message:'No User with this id'})}
    result.myCart = result.myCart.filter((p)=>String(p) !== String(PID))
    const removedCart = await models.user.findByIdAndUpdate(_id,result,{new:true})
    const data = await models.product.find({'_id':{$in:removedCart.myCart}}).select({name:1,createdAt:1,price:1,image:{$first:'$images'}})
    res.json({data})
}
const userController = {getall,create,update,remove,read,addProducttoCart,readMyCart,removeFromMyCart}
module.exports = {userController}