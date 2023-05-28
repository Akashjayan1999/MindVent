import facultyModel from "../models/facultyModel.js";
import {comparePassword, hashPassword} from "../helpers/stdAuthHelper.js"
import JWT from 'jsonwebtoken'

export const facultyRegisterController =async (req,res)=>{
    try{
       const {name,email,password,category,description,phoneNum,pic}= req.body
       if(!name){
          return res.send({message:'Name is Empty'})
       }
       if(!email){
           return res.send({message:'Email is Empty'})
        }
        if(!category){
           return res.send({message:'Category is Empty'})
        }
        if(!description){
           return res.send({message:'Description is Empty'})
        }
        if(!password){
           return res.send({message:'password is Empty'})
        }
        if(!phoneNum){
           return res.send({message:'Phone Number is Empty'})
        }
   
        const existingUser =await facultyModel.findOne({email})
         
        if(existingUser){
           return res.status(200).send({
               success:false,
               message:"Already registered please login"
           })
       }
           const hashedPassword =await hashPassword(password)
           const user =await new facultyModel({name,email,password:hashedPassword,category,description,phoneNum,pic}).save()
          
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

   export const facultyLoginController = async (req,res)=>{
    try {
       const {email,password} = req.body
   
       if(!email || !password){
           return res.status(404).send({
               success:false,
               message:'Invalid email or password'
           })
       }
       const user = await facultyModel.findOne({email})
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
               category:user.category,
               description:user.description,
               phoneNum:user.phoneNum,
               role:user.role,
               u_id:user._id,
               pic:user.pic ?? null
            },token
        })
       }
       else{
        res.status(200).send({
            success:true,
            status:user.status,
            
            message:'Need to verify',
            
            user:{
               name:user.name,
               email:user.email,
               category:user.category,
               description:user.description,
               phoneNum:user.phoneNum,
               role:user.role,
               pic:user.pic ?? null
            },token
            
        })
       }
      
    } catch (error) {
       console.log(error)
       res.status(500).send({
           success:false,
           message:'Error in Login',
           error
       })
    }
   }