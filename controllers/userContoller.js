import userModel from "../models/userModel.js"
import activityModel from "../models/activityModel.js";
import investorModel from "../models/investorModel.js";
import facultyModel from "../models/facultyModel.js";
import feedbackModel from "../models/feedbackModel.js";
//get all student
export const getallStudentController = async(req,res)=>{
    try {
       const students =await userModel.find({}).sort({createdAt:-1})
       res.status(200).send({
         success:true,
         countTotal: students.length,
         message:"All Students",
         students
       })
 
    } catch (error) {
        console.log(error)
        res.status(500).send({
         success:false,
         message:'Error in getting Student',
         error : error.message,
         
        })
    }
 }

 //delete student
 export const deleteStudentController = async(req,res)=>{
  try {
    await userModel.findByIdAndDelete(req.params.pid)
    await activityModel.deleteMany({ student_id: req.params.pid });

    res.status(200).send({
        success:true,
        message:'User deleted Successfully'
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in deleting user',
        error 
        
       })
  }
}

//get all investor
  export const getallInvestorController = async(req,res)=>{
    try {
       const investors =await investorModel.find({}).sort({createdAt:-1})
       res.status(200).send({
         success:true,
         countTotal: investors.length,
         message:"All Students",
         investors
       })
 
    } catch (error) {
        console.log(error)
        res.status(500).send({
         success:false,
         message:'Error in getting Investor',
         error : error.message,
         
        })
    }
 }

//delete investor
export const deleteInvestorController = async(req,res)=>{
  try {
    await investorModel.findByIdAndDelete(req.params.pid)
    res.status(200).send({
        success:true,
        message:'User deleted Successfully'
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in deleting user',
        error 
        
       })
  }
}

//get all Mentor
export const getallMentorController = async(req,res)=>{
  try {
     const mentors =await facultyModel.find({}).sort({createdAt:-1})
     res.status(200).send({
       success:true,
       countTotal: mentors.length,
       message:"All Students",
       mentors
     })

  } catch (error) {
      console.log(error)
      res.status(500).send({
       success:false,
       message:'Error in getting Mentor',
       error : error.message,
       
      })
  }
}

//delete Mentor
export const deleteMentorController = async(req,res)=>{
try {
  await facultyModel.findByIdAndDelete(req.params.pid)
  res.status(200).send({
      success:true,
      message:'User deleted Successfully'
  })
} catch (error) {
  console.log(error)
  res.status(500).send({
      success:false,
      message:'Error in deleting user',
      error 
      
     })
}
}
//Update Investor
export const updateInvestorController = async(req,res)=>{
  try {
    const { pid } = req.params;
    const { status } = req.body;

    const investor = await investorModel.findByIdAndUpdate(
      pid,
      { status },
      { new: true }
    );

    if (!investor) {
      return res.status(404).json({ error: "Investor not found" });
    }

    res.json({ investor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }

}

//Update Investor
export const updateMentorController = async(req,res)=>{
  try {
    const { pid } = req.params;
    const { status } = req.body;

    const investor = await facultyModel.findByIdAndUpdate(
      pid,
      { status },
      { new: true }
    );

    if (!investor) {
      return res.status(404).json({ error: "Investor not found" });
    }

    res.json({ investor });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "Something went wrong" });
  }

}

//createfeedback
export const createFeebackController = async(req,res)=>{

  try {
    const { feedback, student_id, investor_id, mentor_id } = req.body
    if (!feedback) {
      return res.status(400).json({ error: 'Feedback is required' })
    }
    const feedbackMessage = await new feedbackModel({
      feedback,
      student_id,
      investor_id,
      mentor_id,
    }).save()
    res.status(201).json({
      success: true,
      message: 'Feedback sent successfully',
      feedbackMessage,
    })
  } catch (error) {
    console.error(error)
    res.status(500).json({
      success: false,
      error,
      message: 'Error in adding feedback',
    })
  }

}

//get all feedback

export const getallfeedbackcontoller = async(req,res)=>{
  try {
    const feedbackMessage = await feedbackModel.find({}).populate('student_id').populate('investor_id').populate('mentor_id').sort({createdAt:-1})
    res.status(200).send({
      success:true,
      countTotal: feedbackMessage.length,
      message:"All feedback",
      feedbackMessage 
    })
  } catch (error) {
    console.log(error)
        res.status(500).send({
           success:false,
           error,
           message:'Error in getting feedback'
        }) 
  }

}

export const getAllUser = async(req,res)=>{
   try {
     const keyword = req.query.search ? {
      $or: [
        { name: { $regex: req.query.search, $options: "i" } },
        { email: { $regex: req.query.search, $options: "i" } },
      ],
    } : {}; 
     
    const users = await Promise.all([
      userModel.find(keyword).find({ _id: { $ne: req.user._id } }).limit(2),
      investorModel.find(keyword).find({ _id: { $ne: req.user._id } }).limit(2),
      facultyModel.find(keyword).find({ _id: { $ne: req.user._id } }).limit(2),
    ]).then((results) => {
      // Merge the arrays of results from each collection
      return results.reduce((acc, cur) => acc.concat(cur), []);
    }); 
    
    res.send(users);
    
   } catch (error) {
    console.log(error)
    res.status(500).send({
       success:false,
       error,
       message:'Error in getting All users'
    }) 
   }
}

export const getSingleUserFAll = async (req, res) => {
  try {
    const id = req.params.pid;
    const faculty = await facultyModel.findById(id);
    if (faculty) {
      return res.status(200).json(faculty);
    }
    const student = await userModel.findById(id);
    if (student) {
      return res.status(200).json(student);
    }
    const investor = await investorModel.findById(id);
    if (investor) {
      return res.status(200).json(investor);
    }
    return res.status(404).json("No such User");
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  } 
}; 

export const getUsersFall = async(req,res)=>{
  try {
    const users = await Promise.all([
      userModel.find(),
      investorModel.find(),
      facultyModel.find(),
    ]).then((results) => {
      // Merge the arrays of results from each collection
      return results.reduce((acc, cur) => acc.concat(cur), []);
    }); 
    
    res.send(users);
  } catch (error) {
    console.log(error);
    return res.status(500).send({ success: false, message: "Internal server error" });
  } 
  }

