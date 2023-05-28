import mongoose from "mongoose";
const activitySchema = new mongoose.Schema({
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
    category:{
        type:String,
        required:true
    },
    student_id:{
        type:mongoose.ObjectId,
        ref:'std_registrations',
        required:true
    },
    photo:{
        data: Buffer,
        contentType: String,
    }

},{timestamps:true})

export default mongoose.model('activity',activitySchema)