import React,{useState,useEffect,useContext} from 'react'
import StudentMenu from './../../components/Layout/StudentMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios'
import toast from 'react-hot-toast'

import Title from 'antd/es/typography/Title';
import {useNavigate} from 'react-router-dom'

import { useAuth } from '../../context/Auth';
import { useActivity } from '../../context/ActContext';
const AddActivity = () => {
  
  const [activity,setActivity]= useActivity()
  const[auth,SetAuth]= useAuth()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [student_id, setStudent_id] = useState('')
  const [photo, setPhoto] = useState('')
  const navigate = useNavigate()
  const categories = ['Hackathon', 'Cultural', 'Skill', 'Others'];
  useEffect(() => {
    setStudent_id(auth?.user?.u_id)
  }, [])
  const handleCreate = async(e)=>{
    e.preventDefault()
    try {

     
      const ProductData =new FormData()
      ProductData.append('title',title)
      ProductData.append('description',description)
      ProductData.append('category',category)
      ProductData.append('student_id',student_id)
      ProductData.append('photo',photo)
       const {data} =await axios.post('/api/v1/activity/create-activity',ProductData)
       if(data?.success){
        toast.success('Event Added')
        setActivity(data.activities)
        
        navigate('/dashboard/student/activity')
        
       }else{
    
        toast.error(data?.message)
       }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
}
return (
  <Layout title={'Dashboard-AddActivity'}>
    <div className="container-fluid m-3 p-3 dashboard">
      <div className='row'>
        <div className='col-md-3'>
          <StudentMenu/>
        </div>
        <div className='col-md-9'>
          <h1>Add Activity</h1>
          <div className="m-1 w-75">
            <div className="mb-3">
              <label className="btn btn-outline-secondary col-md-12" required>
                {photo ? photo.name : "Upload Photo size upto 2 mb"}
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
              {photo && (
                <div className="text-center">
                  <img
                    src={URL.createObjectURL(photo)}
                    alt="product_photo"
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
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="">Choose Category</option>
                {categories.map((category, index) => (
                  <option key={index} value={category}>
                    {category}
                  </option>
                ))}
              </select>
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
              <button className="btn btn-outline-dark" onClick={handleCreate}>
                Create Activity
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </Layout>
)
}

export default AddActivity
