const mongoose=require('mongoose')
const userSchema=new mongoose.Schema({
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
    profileImageUrl:{
        type:String,
    },
    role:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    isActive:{
        type:Boolean,
        default:true
    }
})
const User=mongoose.model('user',userSchema);
module.exports=User;
