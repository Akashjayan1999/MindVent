import ideaModel from "../models/ideaModel.js";
import fs from 'fs'
import investorModel from "../models/investorModel.js";


//create idea

export const createIdeaContoller = async(req,res)=>{
    try {
        const {title,description,members,category,impact,scalability,feasibility,implementation_timeline,future_scope,budget,student_id}= req.fields  
        const {photo} =req.files
        switch(true){
            case !title:
                return res.status(500).send({error:'Title is required'})
            case !description:
                return res.status(500).send({error:'Description is required'})
                case !members:
                return res.status(500).send({error:'Team members is required'})
            case !student_id:
                return res.status(500).send({error:'Student id is required'})
            case !category:
                return res.status(500).send({error:'Category is required'})
            case !impact:
                return res.status(500).send({error:'Impact is required'})
            case !scalability:
                return res.status(500).send({error:'Category is required'})
            case !implementation_timeline:
                return res.status(500).send({error:'implementation timeline is required'})
            case !budget:
                return res.status(500).send({error:'budget is required'})
            case !future_scope:
                return res.status(500).send({error:'future_scope is required'})
            case photo&& photo.size>10000000:
                return res.status(500).send({error:'Photo is required and Should be less than 1mb'})
             }

             const idea = new ideaModel({title,description,members,category,impact,scalability,feasibility,implementation_timeline,future_scope,budget,student_id})
             if(photo){
                idea.photo.data =fs.readFileSync(photo.path);
                idea.photo.contentType = photo.type;
               }
               const savedIdea= await idea.save()
               const ideas =await ideaModel.find({}).populate('student_id').populate('mentor_id').populate('investors.investor_id').select("-photo").sort({createdAt:-1})
               res.status(201).send({
                success:true,
                message:'Idea added Successfully',
                ideas
               })
                
     } catch (error) {
        console.log(error)
     res.status(500).send({
        success:false,
        error,
        message:'Error in adding Idea'
     })  
    }
}
//get all idea

export const getAllIdeaController = async(req,res)=>{
    try {
        const ideas =await ideaModel.find({}).populate('student_id').populate('mentor_id').populate('investors.investor_id').select("-photo").sort({createdAt:-1})
        res.status(200).send({
          success:true,
          countTotal: ideas.length,
          message:"All ideas",
          ideas
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
           success:false,
           error,
           message:'Error in getting ideas'
        }) 
    }
}

//get single idea
export const getSingleIdeaController =async(req,res)=>{
    try {
        const idea = await ideaModel.findById(req.params.pid).populate('student_id').populate('mentor_id').populate('investors.investor_id').select("-photo");
        
        res.status(200).send({
          success: true,
          message: "Single Idea Fetched",
          idea,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr while getitng single idea",
          error,
        });
      }
}

//get Photo
export const ideaPhotoController = async(req,res)=>{
    try {
        const idea =await ideaModel.findById(req.params.pid).select('photo')
        if(idea.photo.data){
            res.set('Content-type',idea.photo.contentType)
            return res.status(200).send(idea.photo.data)
        }
     } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in getting Photo',
            error 
            
           })
     }
}

//delete idea
export const deleteIdeaController =async(req,res)=>{
    try {
        await ideaModel.findByIdAndDelete(req.params.pid).select('-photo')
        const ideas =await ideaModel.find({}).populate('student_id').populate('mentor_id').populate('investors.investor_id').select("-photo").sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:'Idea deleted Successfully',
            ideas
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in deleting Idea',
            error 
            
           })
      }
}

//update idea

export const updateIdeaController = async (req, res) => {
    try {
        console.log(req.fields);
      const { title, description,members, category, impact, scalability, feasibility, implementation_timeline, future_scope, budget, student_id } = req.fields;
      const { photo } = req.files;
      console.log(req.fields);
      switch (true) {
        case !title:
          return res.status(500).send({ error: "Title is required" });
        case !description:
          return res.status(500).send({ error: "Description is required" });
          case !members:
          return res.status(500).send({ error: "Team Members is required" });
        case !student_id:
          return res.status(500).send({ error: "Student id is required" }); 
        case !category:
          return res.status(500).send({ error: "Category is required" });
        case !impact:
          return res.status(500).send({ error: "Impact is required" });
        case !scalability:
          return res.status(500).send({ error: "Category is required" });  
        case !implementation_timeline:
          return res.status(500).send({ error: "implementation timeline is required" });
        case !budget:
          return res.status(500).send({ error: "budget is required" });
        case !future_scope:
          return res.status(500).send({ error: "future_scope is required" });
        case photo && photo.size > 10000000:
          return res.status(500).send({ error: "Photo is required and Should be less than 1mb" });
      }
  
      const idea = await ideaModel.findByIdAndUpdate(req.params.pid, { title, description,members, category, impact, scalability, feasibility, implementation_timeline, future_scope, budget, student_id }, { new: true });
      if (!idea) {
        return res.status(404).send({ error: "Idea not found" });
        console.log(req.fields);
      }
  
      if (photo) {
        idea.photo.data = fs.readFileSync(photo.path);
        idea.photo.contentType = photo.type;
      }
      const savedIdea = await idea.save();
      const ideas = await ideaModel.find({}).populate("student_id").populate("mentor_id").populate("investors.investor_id").select("-photo").sort({ createdAt: -1 });
      res.status(201).send({
        success: true,
        message: "Idea Updated Successfully",
        ideas,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        error,
        message: "Error in Updating Idea",
      });
    }
  };

  //update admin status

  export const updateAdminStatusController = async(req,res)=>{
    try {
        const { pid } = req.params;
        const { status } = req.body;

        const idea = await ideaModel.findByIdAndUpdate(
            pid,
            { status },
            { new: true } 
        )
        if (!idea) {
            return res.status(404).json({ error: "Idea not found" });
          }
          res.json({ idea });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
  }
// update admin mentor
export const updateAdminMentorController = async(req,res)=>{
    try {
        const { pid } = req.params;
        const { mentor_id } = req.body;
  
        const idea = await ideaModel.findByIdAndUpdate(
            pid,
             { mentor_id } , // use $set to set mentor_id value
            { new: true } 
        )
        if (!idea) {
          return res.status(404).json({ error: "Idea not found" });
        }
        const ideas = await ideaModel.find({})
          .populate("student_id")
          .populate("mentor_id")
          .populate("investors.investor_id")
          .select("-photo")
          .sort({ createdAt: -1 });
        
        res.status(201).send({
          success: true,
          message: "Mentor allocated Successfully",
          ideas,
          
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Something went wrong" });
    }
  }

  //update investor Status

export const updateInvestorIdeaStatusController = async(req,res)=>{
  try {   
    const ideaId = req.params.pid;
    const investorId = req.body.investorId;
    const investorStatus = req.body.status;

    // Check if the idea exists
    const idea = await ideaModel.findById(ideaId);
    if (!idea) {
      return res.status(404).json({ message: 'Idea not found' });
    }
 
    // Check if the investor is already in the list
    const investor = idea.investors.find((inv) => inv.investor_id.equals(investorId));
    if (investor) {
      // Update the existing investor status
      investor.investor_status = investorStatus;
      await idea.save();
      const ideas = await ideaModel.find({})
      .populate("student_id")
      .populate("mentor_id")
      .populate("investors.investor_id")
      .select("-photo")
      .sort({ createdAt: -1 });
    
    res.status(201).send({
      success: true,
      message: "Mentor allocated Successfully",
      ideas,
      
    });
    } else {
      // Add a new investor with the given status
      idea.investors.push({ investor_id: investorId, investor_status: investorStatus });
      await idea.save();
      const ideas = await ideaModel.find({})
      .populate("student_id")
      .populate("mentor_id")
      .populate("investors.investor_id")
      .select("-photo")
      .sort({ createdAt: -1 });
    
    res.status(201).send({
      success: true,
      message: "Mentor allocated Successfully",
      ideas,
      
    });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal server error' });
  }
  }
  
       