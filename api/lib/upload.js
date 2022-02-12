const multer = require('multer')
const fs = require('fs')
const storage = multer.diskStorage({
    destination:function(req,file,cb){
        var _dir = `./store/img/${req.body.name}`
        if(fs.existsSync(_dir)){
            cb(null,`./store/img/${req.body.name}`)
        }else{
            fs.mkdirSync(_dir,{ recursive: true })
            cb(null,`./store/img/${req.body.name}`)
        }
        
    },
    filename:function(req,file,cb){
        cb(null,file.originalname)
    }
})
const upload = multer({storage:storage})
module.exports = upload