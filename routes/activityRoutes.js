import express from 'express'
import { activityPhotoController, createActivityController, deleteActivityController, getAllActivityController, getSingleActivityController, updateActivityController } from '../controllers/activityContoller.js'
import { requireStdSignIn } from '../middlewares/authMiddleware.js'
import formidable from 'express-formidable'
const router = express.Router()
//add Activity
router.post('/create-activity',requireStdSignIn,formidable(),createActivityController)
//Update Activity
router.put('/update-activity/:pid',requireStdSignIn,formidable(),updateActivityController)

//get all Activity
router.get('/get-activity',getAllActivityController)
//get single Activity
router.get('/get-activity/:slug',getSingleActivityController)
//get Photo
router.get('/activity-photo/:pid',activityPhotoController)
//delete Activity
router.delete('/delete-activity/:pid',deleteActivityController)
export default router
