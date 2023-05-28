import express from 'express'
import { isAdmin, isInvestor, isMentor, isStudent, requireStdSignIn } from '../middlewares/authMiddleware.js'
import {stdRegisterController, stdLoginController ,stdtestController} from "../controllers/stdAuthController.js"
import { facultyLoginController,facultyRegisterController } from '../controllers/facultyAuthController.js'
import { investorLoginController,investorRegisterController } from '../controllers/investorAuthController.js'
const router = express.Router()

//Registration
router.post('/register/stdregister',stdRegisterController)

//Login
router.post('/login/stdlogin',stdLoginController)


router.post('/register/facultyregister',facultyRegisterController)
router.post('/login/facultylogin',facultyLoginController)

router.post('/register/investorregister',investorRegisterController)
router.post('/login/investorlogin',investorLoginController)
//test

router.get('/test',requireStdSignIn,isAdmin, stdtestController)

//Student
router.get('/std-auth',requireStdSignIn,(req,res)=>{
    res.status(200).send({ok:true})
})

//Admin
router.get('/admin-auth',requireStdSignIn,isAdmin,(req,res)=>{
    res.status(200).send({ok:true})
})

//Mentor
router.get('/mentor-auth',requireStdSignIn ,isMentor,(req,res)=>{
    res.status(200).send({ok:true})
})

router.get('/investor-auth',requireStdSignIn ,isInvestor,(req,res)=>{
    res.status(200).send({ok:true})
})
export default router




