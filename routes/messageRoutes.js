import express from 'express'
import { addMessage, getMessages } from '../controllers/messageController.js';


const router = express.Router()
//add messages
router.post('/', addMessage);
//get messages
router.get('/:chatId', getMessages);
export default router 