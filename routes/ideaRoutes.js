import express from 'express'
import { requireStdSignIn } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
import { createIdeaContoller, deleteIdeaController, getAllIdeaController, getSingleIdeaController, ideaPhotoController, updateAdminMentorController, updateAdminStatusController, updateIdeaController ,updateInvestorIdeaStatusController} from '../controllers/ideaController.js'
const router = express.Router()

//add Idea

router.post('/create-idea',formidable(),createIdeaContoller)
//update Idea
router.put('/update-idea/:pid',formidable(),updateIdeaController)
//get all idea
router.get('/get-idea',getAllIdeaController)
//get single idea
router.get('/get-idea/:pid',getSingleIdeaController)
//get photo
router.get('/idea-photo/:pid',ideaPhotoController)
//delete idea
router.delete('/delete-idea/:pid',deleteIdeaController)

//update admin status
router.patch('/update-adminstatus/:pid',updateAdminStatusController)
//update admin mentor
router.put('/update-adminmentor/:pid',updateAdminMentorController)

router.put('/update-investorstatus/:pid',updateInvestorIdeaStatusController)
export default router   