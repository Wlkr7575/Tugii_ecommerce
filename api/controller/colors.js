const models = require('../models')
const get = async(req,res)=>{
    try {
        const colors =await models.colors.find();
        res.json(colors)
    } catch (error) {
        
    }
}
const create = async(req,res)=>{
    const colors = req.body
    try {
        const newcolor = await models.colors({...colors})
        newcolor.save()
        res.json({message:'Brand is created successfully'})
    } catch (error) {
        console.log(error)
    }
}
const  colorController = {get,create}
module.exports = {colorController}