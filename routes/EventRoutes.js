import express from 'express'
import { isAdmin, requireStdSignIn } from './../middlewares/authMiddleware.js';
import { addProductContoller, deleteEventController, eventPhotoController, getEventController, updateProductContoller,getSingleEventController } from './../controllers/eventController.js';
import formidable from 'express-formidable'
const router =express.Router()
//add
router.post('/add-events',requireStdSignIn,isAdmin,formidable(),addProductContoller)
//update
router.put('/update-event/:pid',formidable(),updateProductContoller)
//get events

router.get('/get-event',getEventController)
//get Single event
router.get('/get-event/:slug',getSingleEventController)

//get photo
router.get('/event_photo/:pid',eventPhotoController)

//delete product
router.delete('/delete-event/:pid',deleteEventController)
export default router

