import activityModel from "../models/activityModel.js"
import fs from 'fs'
import slugify from 'slugify'
//create Activity
export const createActivityController=async(req,res)=>{
   try {
    const {title,slug,description,category,student_id}= req.fields
    const {photo} =req.files
    switch(true){
        case !title:
            return res.status(500).send({error:'Title is required'})
        case !description:
            return res.status(500).send({error:'Description is required'})
        case !student_id:
            return res.status(500).send({error:'Student id is required'})
        case !category:
            return res.status(500).send({error:'Category is required'})
        case photo&& photo.size>10000000:
            return res.status(500).send({error:'Photo is required and Should be less than 1mb'})

       }
    const activity =new activityModel({...req.fields,slug:slugify(title)})
    if(photo){
        activity.photo.data =fs.readFileSync(photo.path);
        activity.photo.contentType = photo.type;
       }
       
    const savedActivity = await activity.save();

    const activities =await activityModel.find({}).populate('student_id').select("-photo").sort({createdAt:-1})

      

        
       res.status(201).send({
        success:true,
        message:'Activity added Successfully',
        activities
       });
   } catch (error) {
     console.log(error)
     res.status(500).send({
        success:false,
        error,
        message:'Error in adding Activity'
     })
   }
}

//get all activity
export const getAllActivityController = async(req,res)=>{
    try {
        const activities =await activityModel.find({}).populate('student_id').select("-photo").sort({createdAt:-1})
        res.status(200).send({
          success:true,
          countTotal: activities.length,
          message:"All activities",
          activities
        }) 
    } catch (error) {
        console.log(error)
        res.status(500).send({
           success:false,
           error,
           message:'Error in getting Activity'
        }) 
    }
}

//get single Activity

export const getSingleActivityController =async(req,res)=>{
    try {
        const activity = await activityModel.findOne({ slug: req.params.slug }).select("-photo").populate('student_id');
        res.status(200).send({
          success: true,
          message: "Single Activity Fetched",
          activity,
        });
      } catch (error) {
        console.log(error);
        res.status(500).send({
          success: false,
          message: "Erorr while getitng single activity",
          error,
        });
      }
}
//get Photo
export const activityPhotoController = async(req,res)=>{
    try {
        const activity =await activityModel.findById(req.params.pid).select('photo')
        if(activity.photo.data){
            res.set('Content-type',activity.photo.contentType)
            return res.status(200).send(activity.photo.data)
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

//delete Activity

export const deleteActivityController =async(req,res)=>{
    try {
        await activityModel.findByIdAndDelete(req.params.pid).select('-photo')
        const activities =await activityModel.find({}).populate('student_id').select("-photo").sort({createdAt:-1})
        res.status(200).send({
            success:true,
            message:'Activity deleted Successfully',
            activities
        })
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            message:'Error in deleting Activity',
            error 
            
           })
      }
}

//update Activity

export const updateActivityController=async(req,res)=>{
    try {
     const {title,slug,description,category,student_id}= req.fields
     const {photo} =req.files
     switch(true){
         case !title:
             return res.status(500).send({error:'Title is required'})
         case !description:
             return res.status(500).send({error:'Description is required'})
         case !student_id:
             return res.status(500).send({error:'Student id is required'})
         case !category:
             return res.status(500).send({error:'Category is required'})
         case photo&& photo.size>10000000:
             return res.status(500).send({error:'Photo is required and Should be less than 1mb'})
 
        }
     const activity = await activityModel.findByIdAndUpdate(
        req.params.pid,
        {
          title,
          slug: slugify(title),
          description,
          category,
          student_id
          
          
        },
        { new: true }
      );
     if(photo){
         activity.photo.data =fs.readFileSync(photo.path);
         activity.photo.contentType = photo.type;
        }
        const savedActivity = await activity.save();

    const activities =await activityModel.find({}).populate('student_id').select("-photo").sort({createdAt:-1})

        res.status(201).send({
         success:true,
         message:'Activity Updated Successfully',
         activities,
        });
    } catch (error) {
      console.log(error)
      res.status(500).send({
         success:false,
         error,
         message:'Error in Updating Activity'
      })
    }
 }
