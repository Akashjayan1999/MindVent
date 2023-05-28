
import React,{useState,useEffect} from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select,DatePicker } from "antd";
import Title from 'antd/es/typography/Title';
import {useNavigate,useParams} from 'react-router-dom'

const UpdateEvent = () => {
    const [title, setTitle] = useState('')
    const [events, setEvent] = useState([])
    const params = useParams()
    
    const [description, setDescription] = useState('')
    const [date, setDate] = useState('')
    const [time, setTime] = useState('')
    const [location, setLocation] = useState('')
    const [photo, setPhoto] = useState('')
    const [id,setId] = useState('')
    const navigate = useNavigate();
    const getSingleProduct=async()=>{
        try {
            const {data} = await axios.get(`/api/v1/event/get-event/${params.slug}`)
            setTitle(data.event.title);
            setDescription(data.event.description)
            setDate(data.event.date)
            setTime(data.event.time)
            setLocation(data.event.location)
            setId(data.event._id)
            setEvent(data.event)
            
        } catch (error) {
           console.log(error) 
        }
    }

    useEffect(() => {
        getSingleProduct()
    }, [])
    const handleUpdate = async (e) => {
      e.preventDefault();
      try {
        const ProductData = new FormData();
        ProductData.append("title", title);
        ProductData.append("description", description);
        ProductData.append("date", date);
        ProductData.append("time", time);
        ProductData.append("location", location);
        photo && ProductData.append("photo", photo);
        const { data } = await axios.put(`/api/v1/event/update-event/${id}`, ProductData);
      
        if (data?.success) {
          toast.success("Event Updated Successfully");
          setTitle("");
          setDescription("");
          setDate("");
          setTime("");
          setLocation("");
          setPhoto("");
          navigate("/dashboard/admin/events");

          
        } else {
        
          toast.error(data?.message);
        }
      } catch (error) {
        console.log(error);
        toast.error("something went wrong");
      }
      window.location.reload();
    };

    const handleDelete =async()=>{
      try {
        let answer =window.prompt('Are you sure?')
        if(!answer) return;
        
          const {data} = await axios.delete(`/api/v1/event/delete-event/${id}`)
          toast.success('Event Deleted Successfully')
          navigate("/dashboard/admin/events");
       
        
      } catch (error) {
        console.log(error)
        toast.error("something went wrong");
      }

    }
  return (
    <Layout title={'Dashboard-AddEvents'}>
    <div className="container-fluid m-3 p-3 dashboard">
     <div className='row'>
      <div className='col-md-3'>
          <AdminMenu/>
      </div>
      <div className='col-md-9'>
      <h1 className=''>Update Event details</h1>
      <div className="m-1 w-75 ">
      <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12">
                {photo ? photo.name : "Upload Photo"}
                <input
                  type="file"
                  name="photo"
                  accept="image/*"
                  onChange={(e) => setPhoto(e.target.files[0])}
                  hidden
                  required
                />
              </label>
            </div>
            <div className="mb-3">
              {photo ? (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="Event_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ):(
                <div className="text-center">
                  <img
                    src={`/api/v1/event/event_photo/${id}`}
                    alt="Event_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>

              )}
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={title}
                placeholder="Add title"
                className="form-control"
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
           
            
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a description"
                className="form-control"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={date}
                placeholder="Add date"
                className="form-control"
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={time}
                placeholder="Add time"
                className="form-control"
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <input
                type="text"
                value={location}
                placeholder="Add location"
                className="form-control"
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-primary" onClick={handleUpdate}>
                Update Event
              </button>
            </div>
            <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Event
              </button>
            </div>
            </div>
            </div>
            </div>
</div>
</Layout>
  )
}

export default UpdateEvent
