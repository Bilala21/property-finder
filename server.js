require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const { logger, logEvents } = require('./middleware/logger')
const errorHandler = require('./middleware/errorHandler')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const Category = require('models/Category')

mongoose.set('strictQuery', false)
const PORT = process.env.PORT || 3500
connectDB()

app.use(logger)

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

// app.use('/category', require('./routes/propertyRoutes'))
app.get("/find-prod",(req,res)=>{
    const property =Category.find({}).lean();
    return res.json(property)
})
app.use(errorHandler)

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

mongoose.connection.on('error', err => {
    console.log(err)
    logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
})


