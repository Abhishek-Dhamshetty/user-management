const mongoose=require('mongoose')
const adminSchema=new mongoose.Schema({
    username:{
        type:String,
        required:true,
        unique:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    }
})
const Admin=mongoose.model('admin',adminSchema)
module.exports=Admin;