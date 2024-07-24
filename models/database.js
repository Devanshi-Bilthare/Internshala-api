const mongoose = require('mongoose')

exports.connectDatabase = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Database connection Established')
    }catch(err){
    console.log(err.message)
    }
}