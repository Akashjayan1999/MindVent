import mongoose from 'mongoose'
import colors from 'colors'
const connectDB =async ()=>{
    try{
        const conn =await mongoose.connect(process.env.MONGO_URL)
        console.log('Connected')
    }catch(err){
          console.log(`error in mongoDB ${err}`.bgRed.white)
    }
}

export default connectDB;