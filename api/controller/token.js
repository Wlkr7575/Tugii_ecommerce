const jwt = require('jsonwebtoken')
const {CheckExpiration} = require('../lib/jwtexpired')
const models = require('../models')
get= async(req,res)=>{
    const {token} = await req.body
    if (!token) return res.status(403).send({ message: "No token provided!"});
    jwt.verify(token,'test',async(err,decoded)=>{
        if(err)return res.status(401).send({message:'Unauthorized'})
        const r = jwt.decode(token)
        const user = await models.user.findOne({email:r.email})
        .populate({path:'myOrders',populate:{path:'orderproducts.productId',select:{name:1,price:1,image:{$arrayElemAt: [ "$images", 0 ]}}}})
        .populate({path:'myCart'})
        .select({email:1,name:1,password:1,myorders:1,proimg:1,myCart:1})
        return res.status(200).json({user})
    })
}

const jwtAuth ={
    check:get
}
module.exports = {jwtAuth}