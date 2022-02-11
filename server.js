const express = require('express')
const bodyParser=  require('body-parser')
const cors = require('cors')
const app = express()
const connectDb  = require('./api/db')
// const {routes} = require('./route')
const path = require('path');
app.use(bodyParser.json({ limit: '30mb', extended: true }))
app.use(bodyParser.urlencoded({ limit: '30mb', extended: true }))
app.use(cors());
connectDb()
// app.use('/api',routes.user)
// app.use('/api/admin',routes.admin)
// app.use(express.static(path.join(__dirname,'./client')))
app.use(express.static(path.join(__dirname, './client/build')));
app.listen(process.env.PORT||3000,()=>{
    console.log('listening port 3000....')
})