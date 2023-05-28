import mongoose from "mongoose";

const investorSchema = new mongoose.Schema({
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
    company_name:{
        type:String,
        
    },
    company_location:{
        type:String,
       
    },
    nationality:{
        type:String,
        required:true
    },
    phoneNum:{
        type:String,
        required:true
    },
     role:{
       type:Number,
       default:3
    }, status: {
        type: String,
        default: 'Pending',
        enum: ["Pending", "Approved", "Reject"],
      },
      
    pic: {
        type: "String",
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },

},{timestamps:true})

export default mongoose.model('investors',investorSchema)