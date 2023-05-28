import express from 'express'
import { deleteInvestorController, deleteStudentController, getallStudentController,getallInvestorController, getallMentorController, deleteMentorController, updateInvestorController, updateMentorController,createFeebackController, getallfeedbackcontoller, getAllUser, getSingleUserFAll, getUsersFall } from '../controllers/userContoller.js'
import { requireStdSignIn } from '../middlewares/authMiddleware.js'



const router = express.Router()
//get students
router.get('/get-std',getallStudentController)
//delete student
router.delete('/delete-std/:pid',deleteStudentController)
//get investors
router.get('/get-investor',getallInvestorController)
//delete investor
router.delete('/delete-investor/:pid',deleteInvestorController)
//update investor Status
router.patch('/update-investor/:pid',updateInvestorController)

//get Mentor
router.get('/get-mentor',getallMentorController)
//delete Mentor
router.delete('/delete-Mentor/:pid',deleteMentorController)
//update Mentor Status
router.patch('/update-mentor/:pid',updateMentorController)

//create feedback
router.post('/create-feedback',createFeebackController)

router.get('/get-feedback',getallfeedbackcontoller)


//search user
router.get('/get-user',requireStdSignIn,getAllUser)
export default router
//get single user from all collection
router.get('/get-userfa/:pid',getSingleUserFAll)

router.get('/get-alluserfa',getUsersFall)




