import eventModel from '../models/EventModel.js'
import fs from 'fs'
import slugify from 'slugify'


//add event
export const addProductContoller = async(req,res) =>{
    try {
       const {title,slug,description,date,time,location} = req.fields 
       const {photo} = req.files
       switch(true){
        case !title:
            return res.status(500).send({error:'Title is required'})
        case !description:
            return res.status(500).send({error:'Description is required'})
        case !date:
            return res.status(500).send({error:'Date is required'})
        
        case photo&& photo.size>10000000:
            return res.status(500).send({error:'Photo is required and Should be less than 1mb'})

       }
       const events = new eventModel({...req.fields,slug:slugify(title)})
       if(photo){
        events.photo.data = fs.readFileSync(photo.path);
        events.photo.contentType = photo.type;
       }
       await events.save()
       res.status(201).send({
        success:true,
        message:'Event added Successfully',
        events
       })

    
    } catch (error) {
        console.log(error)
        res.status(500).send({
            success:false,
            error,
            message:'Error in adding Event'
        })
    }
}

//get all event
export const getEventController = async(req,res)=>{
   try {
      const events =await eventModel.find({}).select("-photo").limit(12).sort({createdAt:-1})
      res.status(200).send({
        success:true,
        countTotal: events.length,
        message:"All Events",
        events
      })

   } catch (error) {
       console.log(error)
       res.status(500).send({
        success:false,
        message:'Error in getting Event',
        error : error.message,
        
       })
   }
}

//get single event
export const getSingleEventController = async (req, res) => {
    try {
      const event = await eventModel.findOne({ slug: req.params.slug }).select("-photo");
      res.status(200).send({
        success: true,
        message: "Single Event Fetched",
        event,
      });
    } catch (error) {
      console.log(error);
      res.status(500).send({
        success: false,
        message: "Erorr while getitng single Event",
        error,
      });
    }
  };

//get photo

export const eventPhotoController =async (req,res)=>{
 try {
    const event =await eventModel.findById(req.params.pid).select('photo')
    if(event.photo.data){
        res.set('Content-type',event.photo.contentType)
        return res.status(200).send(event.photo.data)
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

//delete Event

export const deleteEventController = async(req,res)=>{
  try {
    await eventModel.findByIdAndDelete(req.params.pid).select('-photo')
    res.status(200).send({
        success:true,
        message:'Event deleted Successfully'
    })
} catch (error) {
    console.log(error)
    res.status(500).send({
        success:false,
        message:'Error in deleting Event',
        error 
        
       })
  }
}
//update Event
export const updateProductContoller =async(req,res)=>{
    try {
        const {title,slug,description,date,time,location} = req.fields 
        const {photo} = req.files
        switch(true){
         case !title:
             return res.status(500).send({error:'Title is required'})
         case !description:
             return res.status(500).send({error:'Description is required'})
         case !date:
             return res.status(500).send({error:'Date is required'})
         
         case photo && photo.size>10000000:
             return res.status(500).send({error:'Photo is required and Should be less than 1mb'})
 
        }
        
        const event = await eventModel.findByIdAndUpdate(
            req.params.pid,
            {
              title,
              slug: slugify(title),
              description,
              date,
              time,
              location
            },
            { new: true } 
          );
        if(photo){
         event.photo.data = fs.readFileSync(photo.path);
         event.photo.contentType = photo.type;
        }
        await event.save()
        res.status(201).send({
         success:true,
         message:'Event Updated Successfully',
         event
        })
 
     
     } catch (error) {
         console.log(error)
         res.status(500).send({
             success:false,
             error,
             message:'Error in Update Event'
         })
     }
}

