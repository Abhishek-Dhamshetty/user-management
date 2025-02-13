const User=require('../models/userModel')
async function studentfac(req,res){
    const newUser=req.body;
    const inDb=await User.findOne({email:newUser.email})
    if(inDb!==null){
        if(newUser.role===inDb.role){
            res.status(200).send({message:inDb.role,payload:inDb})
        }
        else{
            res.status(200).send({message:"Invalid Role"})
        }
    }
    else{
        let newUserr=new User(newUser);
        let userDoc=await newUserr.save()
        res.status(200).send({message:userDoc.role,payload:userDoc})
    }
}

module.exports=studentfac;