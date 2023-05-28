import JWT from "jsonwebtoken"
import facultyModel from "../models/facultyModel.js";
import investorModel from "../models/investorModel.js";
import userModel from "../models/userModel.js";
export const requireStdSignIn = (req,res,next)=>{
 try {
    const decode = JWT.verify(
        req.headers.authorization,
        process.env.JWT_SECRET
    );
    req.user=decode;
    
    next()
    
 } catch (error) {
    console.log(error)
 }
}

export const isAdmin =async(req,res,next)=>{
    try {
        const user = await facultyModel.findById(req.user._id)
        if(user.role!==1){
            return res.status(401).send({
                success:false,

                message:'UnAuthorized Acesss'
            })
        }else{
        
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin middleware '
        })
    }
}

export const isMentor =async(req,res,next)=>{
    try {
        const user = await facultyModel.findById(req.user._id)
        if(user.role!==2){
            return res.status(401).send({
                success:false,

                message:'UnAuthorized Acesss'
            })
        }else{
        
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            sucess:false,
            error,
            message:'Error in admin middleware '
        })
    }
}

export const isInvestor =async(req,res,next)=>{
    try {
        const user = await investorModel.findById(req.user._id)
        if(user.role!==3){
            return res.status(401).send({
                success:false,

                message:'UnAuthorized Acesss'
            })
        }else{
        
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin middleware '
        })
    }
}

export const isStudent =async(req,res,next)=>{
    try {
        const user = await userModel.findById(req.user._id)
        if(user.role!==0){
            return res.status(401).send({
                success:false,

                message:'UnAuthorized Acesss'
            })
        }else{
        
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success:false,
            error,
            message:'Error in admin middleware '
        })
    }
}