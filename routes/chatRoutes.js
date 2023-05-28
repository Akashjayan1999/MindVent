import express from 'express'
import { createChat, findChat, userChats } from '../controllers/chatController.js'

const router = express.Router()
//create chat
router.post('/', createChat);
//get chat
router.get('/:userId', userChats);
//get particular chat
router.get('/find/:firstId/:secondId', findChat);
export default router