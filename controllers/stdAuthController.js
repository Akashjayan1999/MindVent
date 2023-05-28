import userModel from "../models/userModel.js"
import {comparePassword, hashPassword} from "../helpers/stdAuthHelper.js"
import JWT from 'jsonwebtoken'
export const stdRegisterController =async (req,res)=>{
 try{
    const {name,email,password,department,year_of_study,admission_num,pic}= req.body
    if(!name){
       return res.send({message:'Name is Empty'})
    }
    if(!email){
        return res.send({message:'Email is Empty'})
     }
     if(!department){
        return res.send({message:'Department is Empty'})
     }
     if(!year_of_study){
        return res.send({message:'Year of studying is Empty'})
     }
     if(!password){
        return res.send({message:'password is Empty'})
     }
     if(!admission_num){
        return res.send({message:'Admission Number is Empty'})
     }

     const existingUser = await userModel.findOne({
      $or: [
        { email },
        { admission_num }
      ]
    });
      
     if(existingUser){
        return res.status(200).send({
            success:false,
            message:"Already registered please login"
        })
    }
        const hashedPassword =await hashPassword(password)
        const user =await new userModel({name,email,password:hashedPassword,department,year_of_study,admission_num,pic}).save()
       
         res.status(201).send({
            success:true,
            message:'User Register Sucessfully',
            user,
         })

 }catch(error){
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in registration',
        error
    })
 }
}

//Login

export const stdLoginController = async (req,res)=>{
 try {
    const {email,password} = req.body

    if(!email || !password){
        return res.status(404).send({
            success:false,
            message:'Invalid email or password'
        })
    }
    const user = await userModel.findOne({email})
    if(!user){
        return res.status(404).send({
            success:false,
            message:'Email is not Registered'
        })
    }
    const match =await comparePassword(password,user.password)
    if(!match){
        return res.status(200).send({
            success:false,
            message:'Invalid password'
        })
    }
    const token = await JWT.sign({_id:user._id},process.env.JWT_SECRET,{expiresIn:"7d"});
    res.status(200).send({
        success:true,
        message:'login sucessfully',
        user:{
           name:user.name,
           email:user.email,
           department:user.department,
           year_of_study:user.year_of_study,
           admission_num:user.admission_num,
           u_id:user._id,
           role:user.role,
           pic:user.pic ?? null
        },token
    })
 } catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in Login',
        error
    })
 }
}

//test

export const stdtestController = (req,res)=>{
   res.send('protected Route')
}    