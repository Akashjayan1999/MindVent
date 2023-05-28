import mongoose from "mongoose";
const feedbackSchema = new mongoose.Schema({
    feedback:{
        type:String,
        required:true,
        trim:true
    },
    student_id:{
        type:mongoose.ObjectId,
        ref:'std_registrations'
        
    },
    investor_id:{
        type:mongoose.ObjectId,
        ref:'investors'
        
    },
    mentor_id:{
        type:mongoose.ObjectId,
        ref:'mentors'
    }

},{timestamps:true})

export default mongoose.model('feedback',feedbackSchema)