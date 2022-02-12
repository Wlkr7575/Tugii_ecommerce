const models = require('../models')
const mongoose = require('mongoose')

const get = async(req,res)=>{
    try {
        const brands = await Categories.find();
        res.json(brands)
    } catch (error) {
        
    }
}
const create = async(req,res)=>{
    const brand = req.body
    try {
        const newBrand = await models.category({...brand})
        newBrand.save()
        res.json({message:'Categories is created successfully',data:newBrand})
    } catch (error) {
        console.log(error)
    }
}
const remove = async(req,res)=>{
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id))return res.status(404).send(`No post with this id:${id}`)
    await models.category.findByIdAndRemove(id)
    res.status(200).json({message:'Categories is removed successfully'})
}
const update = async(req,res)=>{
    const {id:_id} =req.params
    const brand = req.body
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send(`No post with this id:${_id}`)
    const updatedpost = await models.category.findByIdAndUpdate(_id,{...brand,_id},{new:true})
    res.json({message:"Categories is updated successfullt",data:updatedpost})
}
const getbyId = async(req,res)=>{
    const {id:_id} = req.params
    if(!mongoose.Types.ObjectId.isValid(_id))return res.status(404).send(`No post with this id:${_id}`)
    const post = await models.category.findById(_id)
    res.json({message:'Here is your category',data:post})
}
const categoryController = { get,create,remove,update,getbyId}
module.exports  = {categoryController}