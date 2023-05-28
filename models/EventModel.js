import mongoose from "mongoose";

const eventSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
      type:String,
      required:true  
    },
    description:{
        type:String,
        required:true
    },
    date:{
        type:String,
        required:true
    },
    time:{
       type:String,
      
    }, 
    location:{
        type:String,
      },

    photo:{
        data: Buffer,
        contentType: String,
       
    }


},{timestamps:true})

export default mongoose.model('events',eventSchema)