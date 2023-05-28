import mongoose from "mongoose";

const ideaSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        trim:true
    },
    members:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    impact:{
        type:String,
        required:true
    },
    scalability:{
        type:String,
        required:true
    },
    feasibility:{
        type:String,
        required:true
    },
    implementation_timeline:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    budget:{
        type:String,
        required:true
    },
    future_scope:{
        type:String,
        required:true
    },

    student_id:{
        type:mongoose.ObjectId,
        ref:'std_registrations',
        required:true
    }, 
    mentor_id:{
        type:mongoose.ObjectId,
        ref:'mentors'
    },
    investors:[{
        investor_id:{
            type:mongoose.ObjectId,
            ref:'investors',
            
        }, 
        investor_status: {
            type: String,
            default: 'Pending',
            enum: ["Pending", "Approved", "Rejected","Need to imporve"],
          }
     }], 
    status: {
        type: String,
        default: 'Pending',
        enum: ["Pending", "Approved", "Reject"],
      },   

    photo:{
        data: Buffer,
        contentType: String,
       
    }


},{timestamps:true})

export default mongoose.model('ideas',ideaSchema)
