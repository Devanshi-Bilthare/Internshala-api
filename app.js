require('dotenv').config('./.env')
const express = require('express')
const app = express()

// db connection
require('./models/database').connectDatabase()

// logger
const logger = require('morgan')
app.use(logger("tiny"))
// bodyparser
app.use(express.json())
app.use(express.urlencoded({extended:false}))

//session and cookie
const session = require('express-session')
const cookieParser = require('cookie-parser')

app.use(session({
    saveUninitialized:true,
    resave:true,
    secret:process.env.EXPRESS_SESSION_SECRET
}))
app.use(cookieParser())

// routes
app.use('/',require('./routes/indexRoutes'))

// error handling
const ErrorHandler = require('./utils/ErrorHandler')
const {generatedErrors} = require("./middlewares/error")
app.all('*',(req,res,next)=> {
    next(new ErrorHandler(`Requested Url Not Found ${req.url}`,404))
})
app.use(generatedErrors)

app.listen(process.env.PORT)