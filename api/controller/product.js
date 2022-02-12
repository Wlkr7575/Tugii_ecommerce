const models = require('../models')
const mongoose = require('mongoose')
/*Get All */
const getProductList = async(req,res)=>{
    try {
        const result = await models.product.find()
        res.status(200).json({result})
    } catch (error) {
        res.json({error})
    }
}
/*Create */
const createProduct = async(req,res)=>{
    try {
        const product = req.body
        const images = req.files
        const other = images.map(p=>p.originalname)
        const newPost = new models.product({...product,images:other})
        await newPost.save()
        res.status(200).json('Created Successfully')
    } catch (error) {
        res.json({error:error})
    }
}
/*Read */
const getProduct = async(req,res)=>{
    const {id:_id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No posts with that id");
        const result = await models.product.findById(_id).populate({path:'type',select:['name']}).populate({path:'brands',select:['name','logo']}).populate({path:'colors',select:['name']})
        res.status(200).json({result})
    } catch (error) {
        res.json({error})
    }
}
/*Update */
const updateProduct = async(req,res)=>{
    const {id:_id} = req.params
    const body = req.body
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
        const product = await models.product.findByIdAndUpdate(_id,{...body},{new:true})
        res.status(200).json({product})
    } catch (error) {
        res.json(error)
    }
}
/*Delete */
const deleteProduct = async(req,res)=>{
    const {id:_id} = req.params
    try {
        if(!mongoose.Types.ObjectId.isValid(_id)) return res.status(404).send("No post with that id");
        await models.product.findByIdAndRemove(_id)
        res.status(200).json('Deleted Successfully')
    } catch (error) {
        res.json(error)
    }
}
const getNewProduct = async(req,res)=>{
    try {
        const p = await models.product.find()
        .sort({'createdAt':-1}).select({name:1, brands:1 ,images: { $slice: 1 }}).limit(3).populate({path:'brands',select:'name'})
        res.json(p)
    } catch (error) {
        
    }
}
const searchProduct = async(req,res)=>{
    const query = req.query
    try{
        const data = await models.product.aggregate([
            {$match:{name:new RegExp(query.search,'i' )}},
            {$project:{name:1,images:{$arrayElemAt: [ "$images", 0 ]},price:1,rating:{$first:'$rating.rating'}}}
        ])
        if(data.length === 0) return res.send('NotFound')
        res.json(data)
    }catch(err){
        res.json(err)
    }
}
const addRate = async(req,res)=>{
    const {id} = req.params
    const body = req.body
    const data = await models.product.findById(id)
    const index = data.rating.findIndex((p)=>p.userId === body.userId)
    if(index === -1){
        data.rating.push(body)
    }else{
        data.rating = data.rating.map((p)=>p.userId === body.userId?{...body,rating:body.rating}:{...p})
    }
    data.save()
    res.json(data)
}
const getProductbyCategory = async(req,res)=>{
    const r = req.query.search
    const result = await models.product.aggregate([
        {$lookup:{
            from:models.category.collection.name,
            localField:'type',
            foreignField:'_id',
            as:'category'
        }},
        {$lookup:{from : models.brand.collection.name,localField:'brands',foreignField:'_id',as:'brandlist'}},
        {$addFields:{category:{ $arrayElemAt:["$category",0]}}},
        {$addFields:{brand:{$first:"$brandlist"}}},
        {$match :{'category.name':r}},
        {$project:{name:1,images:{$first:'$images'},rating:{$first:'$rating.rating'},price:1,brand:'$brand.name'}}
    ])
    const brandsofcategory = await models.product.aggregate([
        {$lookup:{from : models.brand.collection.name,localField:'brands',foreignField:'_id',as:'brand'}},
        {$lookup:{from:models.category.collection.name,localField:'type',foreignField:'_id',as:'categor'}},
        {$addFields:{category:{$first:"$categor"}}},
        {$match :{'category.name':r}},
        {$addFields:{equalbrands:{$first:"$brand"}}},
        {$replaceRoot:{newRoot:"$equalbrands"}},
        {$project:{detail:0}}
    ])
    res.json({result,brandsofcategory}) 
}
const getProducts = async(req,res)=>{
    const re = req.query
    var sorting
    switch (re.sort) {
        case 'A-Z': sorting = {$sort:{name:1}} 
        break;
        case "Z-A": sorting = {$sort:{name:-1}} 
        break;
        case 'Newest': sorting = {$sort:{createdAt:-1}} 
        break;
        case 'Oldest': sorting = {$sort:{createdAt:1}} 
        break;
        default: sorting = {$sort:{_id:1}} 
        break;
    }
    const result = await models.product.aggregate([
        {$lookup:{from:models.category.collection.name,localField:'type',foreignField:'_id',as:'category'}},
        {$lookup:{from : models.brand.collection.name,localField:'brands',foreignField:'_id',as:'brand'}},
        {$lookup:{from:models.colors.collection.name,localField:'colors',foreignField:'_id',as:'colors'}},
        {$addFields:{category:{$first:"$category"}}},
        {$addFields:{brand:{$first:"$brand"}}},
        {$match:{
            'brand.name':re.brand||{$ne: ""},
            'category.name':re.category||{$ne: ""},
            'colors.name':re.color||{$ne: ""},
            'rating.rating':re.rating?{$gte:parseInt(re.rating)}:{$ne: ""}
        }},
        sorting,
        {$project:{name:1,images:{$first:'$images'},rating:{$first:'$rating.rating'},price:1,sorting:1}},
    ])
    const colors = await models.product.aggregate([
        {$lookup:{from:models.colors.collection.name,localField:'colors',foreignField:'_id',as:'colors'}},
        {$lookup:{from:models.category.collection.name,localField:'type',foreignField:'_id',as:'category'}},
        {$match :{'category.name':re.category||{$ne: ""}}},
        {$project:{colors:1,_id:0,}},
        {$unwind:"$colors"},
        {$group:{_id:'$colors._id',name:{$first:'$colors.name'}}}
    ])
    const brands = await models.product.aggregate([
        {$lookup:{from : models.brand.collection.name,localField:'brands',foreignField:'_id',as:'brand'}},
        {$lookup:{from:models.category.collection.name,localField:'type',foreignField:'_id',as:'category'}},
        {$match :{'category.name':re.category||{$ne: ""}}},
        {$group:{_id:'$brand._id',brand:{$first:"$brand"}}},
        {$replaceRoot:{newRoot:{$first:"$brand"}}},
        {$project:{detail:0}}
    ])
    res.json({result,brands,colors})
}
const productController= {getProduct,getProductList,createProduct,updateProduct,deleteProduct,getNewProduct,searchProduct,addRate,getProductbyCategory,getProducts}
module.exports = {productController}