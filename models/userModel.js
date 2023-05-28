import mongoose from "mongoose";
const stdSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    department:{
        type:String,
        required:true
    },
    year_of_study:{
        type:String,
        required:true
    },
    admission_num:{
        type:String,
        required:true
    },
     role:{
       type:Number,
       default:0 
    },
    pic: {
        type: "String",
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },

},{timestamps:true})

export default mongoose.model('std_registrations',stdSchema)