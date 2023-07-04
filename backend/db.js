const mongoose= require('mongoose')
require('dotenv').config();

const connectDB=async()=>{
    try{
        await mongoose.connect('mongodb://0.0.0.0:27017/userManagement')
        console.log('database connected')
    }catch(err){
        console.log(err,'error')
        process.exit(1)
    }
}
module.exports = connectDB;

  