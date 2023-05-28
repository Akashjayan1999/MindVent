import express from 'express'
import color from 'colors'
import dotenv from 'dotenv'
import morgan from 'morgan'
import connectDB from './config/db.js';
import authStdRouter from './routes/AuthRouter.js'
import eventRouter from "./routes/EventRoutes.js"
import userRouter from './routes/userRouter.js'
import activityRouter from './routes/activityRoutes.js'
import ideaRouter from './routes/ideaRoutes.js'
import chatRouter from './routes/chatRoutes.js'
import messageRouter from './routes/messageRoutes.js'
import cors from 'cors'
dotenv.config();

connectDB();

const app = express();


app.use(cors())
app.use(express.json())
app.use(morgan('dev'))


app.use('/api/v1/auth', authStdRouter);
app.use('/api/v1/event', eventRouter);
app.use('/api/v1/activity', activityRouter);
app.use('/api/v1/user',userRouter)
app.use('/api/v1/idea', ideaRouter);
app.use('/api/v1/chat',chatRouter)
app.use('/api/v1/message',messageRouter)


app.get('/',(req,res)=>{
    res.send("Welcome to Mind Venture")
})

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log('Sever Running'.bgCyan.white)
})
