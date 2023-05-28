import React,{useState,useEffect,useContext} from 'react'
import StudentMenu from './../../components/Layout/StudentMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios'
import toast from 'react-hot-toast'

import Title from 'antd/es/typography/Title';
import {useNavigate,useParams} from 'react-router-dom'

import { useAuth } from '../../context/Auth';
import { useActivity } from '../../context/ActContext';


const UpdateActivity = () => {
    const [activity,setActivity]= useActivity()
    const[auth,SetAuth]= useAuth()
    const params = useParams()
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [category, setCategory] = useState('')
    const [student_id, setStudent_id] = useState('')
    const [photo, setPhoto] = useState('')
    const [id, setId] = useState()
    const navigate = useNavigate()
    useEffect(() => {
        setStudent_id(auth?.user?.u_id)
      }, [])
      const getSingleActivity = async () => {
        try {
          const { data } = await axios.get(`/api/v1/activity/get-activity/${params.slug}`);
          console.log(data.activity);
          setTitle(data.activity.title);
          setDescription(data.activity.description);
          setId(data.activity._id);
          setCategory(data.activity.category);
          

        } catch (error) {
          console.log(error);
        }
      };
    
      useEffect(() => {
        getSingleActivity();
      }, []);

      const handleUpdate = async(e)=>{
        e.preventDefault()
        try {
    
         
          const ProductData =new FormData()
          ProductData.append('title',title)
          ProductData.append('description',description)
          ProductData.append('category',category)
          ProductData.append('student_id',student_id)
          ProductData.append('photo',photo)
           const {data} =await axios.put(`/api/v1/activity/update-activity/${id}`,ProductData)
           if(data?.success){
            toast.success('Event Updated Successfully')
            setActivity(data.activities)
            
            navigate('/dashboard/student/activity')
            
           }else{
        
            toast.error(data?.message)
           }
        } catch (error) {
          console.log(error)
          toast.error('something went wrong')
        }
        window.location.reload();
    }
    const handleDelete = async()=>{
        try {
            let answer =window.prompt('Are you sure?')
            if(!answer) return;
            
              const {data} = await axios.delete(`/api/v1/activity/delete-activity/${id}`)
              toast.success('Activity Deleted Successfully')
              setActivity(data.activities)
              navigate("/dashboard/student/activity");
        } catch (error) {
            console.log(error)
            toast.error("something went wrong");
        }
    }
  return (
    <Layout title={'Dashboard-Chat'}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <StudentMenu/>
        </div>
        <div className='col-md-9'>
        <h1>Update Activity</h1>

<div className="m-1 w-75 ">
  
  <div className="mb-3">
          <label className="btn btn-outline-secondary col-md-12" required>
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
                    alt="Activity_photo"
                    height={"200px"}
                    className="img img-responsive"
                  />
                </div>
              ):(
                <div className="text-center">
                  <img
                    src={`/api/v1/activity/activity-photo/${id}`}
                    alt="Activity_photo"
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
required  // add this attribute
/>
        </div>
        <div className="mb-3">
          <input
            type="text"
            value={category}
            placeholder="Choose Category"
            className="form-control"
            onChange={(e) => setCategory(e.target.value)}
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
          <button className="btn btn-primary" onClick={handleUpdate}>
            Update Activity
          </button>
        </div>
        <div className="mb-3">
              <button className="btn btn-danger" onClick={handleDelete}>
                Delete Activity
              </button>
            </div>
        </div>
        </div>
  </div>
  </div>
</Layout>
  )
}

export default UpdateActivity
