const mongoose = require('mongoose')
const url ='mongodb+srv://dbUser:node1234@cluster0.pzd9e.mongodb.net/Task?retryWrites=true&w=majority'
const connectDb =async () =>{
    console.log('Starting connect to Database')
    try {
        await mongoose.connect(process.env.MONGO_URL || url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          })
        console.log('db connected successful')
    } catch (error) {
        console.log('Something Wrong connect database')
    }
}
module.exports = connectDb