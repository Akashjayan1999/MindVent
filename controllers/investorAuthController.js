import investorModel from "../models/investorModel.js";
import {comparePassword, hashPassword} from "../helpers/stdAuthHelper.js"
import JWT from 'jsonwebtoken'

export const investorRegisterController =async (req,res)=>{
    try{
       const {name,email,password,company_name,company_location,nationality,phoneNum,pic}= req.body
       if(!name){
          return res.send({message:'Name is Empty'})
       }
       if(!email){
           return res.send({message:'Email is Empty'})
        }
        if(!nationality){
           return res.send({message:'Nationality is Empty'})
        }
       
        if(!password){
           return res.send({message:'Password is Empty'})
        }
        if(!phoneNum){
           return res.send({message:'Phone Number is Empty'})
        }
   
        const existingUser =await investorModel.findOne({email})
         
        if(existingUser){
           return res.status(200).send({
               success:false,
               message:"Already registered please login"
           })
       }
           const hashedPassword =await hashPassword(password)
           const user =await new investorModel({name,email,password:hashedPassword,company_name,company_location,nationality,phoneNum,pic}).save()
          
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

   export const investorLoginController = async (req,res)=>{
    try {
       const {email,password} = req.body
   
       if(!email || !password){
           return res.status(404).send({
               success:false,
               message:'Invalid email or password'
           })
       }
       const user = await investorModel.findOne({email})
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
       if(user.status==='Approved'){
       res.status(200).send({
           success:true,
           status:user.status,
           message:'login sucessfully',
           
           user:{
              name:user.name,
              email:user.email,
              company_name:user.company_name,
              company_location:user.company_location,
              nationality:user.nationality,
              phoneNum:user.phoneNum,
              role:user.role,
              u_id:user._id,
              pic:user.pic ?? null
           },token
       })
    }else{
        res.status(200).send({
            success:true,
            status:user.status,
            message:'Need to verify',
            
            user:{
               name:user.name,
               email:user.email,
               company_name:user.company_name,
               company_location:user.company_location,
               nationality:user.nationality,
               phoneNum:user.phoneNum,
               role:user.role,
               pic:user.pic ?? null,
               u_id:user._id,
            },token
        })
    }
}
     catch (error) {
       console.log(error)
       res.status(500).send({
           success:false,
           message:'Error in Login',
           error
       })
    }
   }