const models = require('../models')
const mongoose = require('mongoose')

const get = async(req,res)=>{
    try {
        const brands =await Brand.find();
        res.json(brands)
    } catch (error) {
        
    }
}
const create = async(req,res)=>{
    const brand = req.body
    const logo = req.file.originalname
    try {
        const newBrand = await models.brand({...brand,logo:logo})
        newBrand.save()
        res.json({message:'Brand is created successfully',data:newBrand})
    } catch (error) {
        console.log(error)
    }
}
const remove = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send(`No post with this id:${id}`)
    await models.brand.findByIdAndRemove(id)
    res.status(200).json({message:'Brand is removed successfully'})
}
const update = async(req,res)=>{
    const {id:_id} =req.params
    const brand = req.body
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send(`No post with this id:${_id}`)
    const updatedpost = await models.brand.findByIdAndUpdate(_id,{...brand},{new:true})
    res.json({message:"Brand is updated successfully",data:updatedpost})
}
const getbyId = async(req,res)=>{
    const {id:_id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send(`No post with this id:${_id}`)
    const post = await models.brand.findById(_id)
    res.json({message:'Here is your brand',data:post})
}
const brandController = { get,create,remove,update,getbyId}
module.exports = {brandController}