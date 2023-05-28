import React,{useState,useEffect,useContext} from 'react'
import Layout from './../../components/Layout/Layout';
import StudentMenu from './../../components/Layout/StudentMenu';
import axios from 'axios'
import toast from 'react-hot-toast'

import Title from 'antd/es/typography/Title';
import {useNavigate} from 'react-router-dom'
import {useIdea} from '../../context/IdeaContext'
import { useAuth } from '../../context/Auth';
const categories = ['Healthcare', 'Education', 'Consumer products','Entertainment','Technology','Social','Others'];
const AddIdea = () => {
  const[auth,SetAuth]= useAuth()
  const [idea,setIdea]=useIdea()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [category, setCategory] = useState('')
  const [impact, setImpact] = useState('')
  const [scalability, setScalability] = useState('')
  const [feasibility, setFeasibility] = useState('')
  const [implementation_timeline, setImplementation_timeline] = useState('')
  const [future_scope, setFuture_scope] = useState('')
  const [budget, setBudget] = useState('')
  const [student_id, setStudent_id] = useState('')
  const [photo, setPhoto] = useState('')
  const [members, setMembers] = useState('')
  const navigate = useNavigate()
  useEffect(() => {
    setStudent_id(auth?.user?.u_id)
  }, [])

  const handleCreate = async(e)=>{
    e.preventDefault()
    try {

     
      const ProductData =new FormData()
      ProductData.append('title',title)
      ProductData.append('description',description)
      ProductData.append('members',members)
      ProductData.append('category',category)
      ProductData.append('impact',impact)
      ProductData.append('scalability',scalability)
      ProductData.append('feasibility',feasibility)
      ProductData.append('implementation_timeline',implementation_timeline)
      ProductData.append('future_scope',future_scope)
      ProductData.append('budget',budget)
      ProductData.append('student_id',student_id)
      ProductData.append('photo',photo)
       const {data} =await axios.post('/api/v1/idea/create-idea',ProductData)
       if(data?.success){
        toast.success('Idea Added')
        setIdea(data.ideas)
        
        navigate('/dashboard/student/idea')
        
       }else{
    
        toast.error(data?.message)
       }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
}
  return (
    <Layout title={'Dashboard-AddIdea'}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <StudentMenu/>
        </div>
        <div className='col-md-9'>
        <h1>Add Idea</h1>
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
                placeholder="Add the title of the innovative idea."
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
              <input
                type="text"
                value={members}
                placeholder="Add team members name,add comma's in between otherwise enter your name."
                className="form-control"
                onChange={(e) => setMembers(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={impact}
                placeholder="Describes the potential impact of the idea on society, the environment, or a specific industry."
                className="form-control"
                onChange={(e) => setImpact(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={scalability}
                placeholder=" Describes the scalability potential of the idea (e.g., whether it can be easily replicated or expanded)."
                className="form-control"
                
                onChange={(e) => setScalability(e.target.value)}
                required
              />
              
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={feasibility}
                placeholder=" Describes the feasiability potential of the idea (e.g., whether it economically)."
                className="form-control"
                
                onChange={(e) => setFeasibility(e.target.value)}
                required
              />
              
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={implementation_timeline}
                placeholder="Provide the proposed timeline for implementing the idea."
                className="form-control"
                onChange={(e) => setImplementation_timeline(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={future_scope}
                placeholder="Provide future scope of your idea."
                className="form-control"
                
                onChange={(e) => setFuture_scope(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <input
                type="number"
                value={budget}
                placeholder="Add the estimated budget required to implement the idea."
                className="form-control"
                onChange={(e) => setBudget(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <textarea
                type="text"
                value={description}
                placeholder="write a brief description of the idea."
                className="form-control"
                rows="10"
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            <div className="mb-3">
              <button className="btn btn-outline-dark" onClick={handleCreate}>
                Create Idea
              </button>
            </div>
          </div>
        </div>
  </div>
  </div>
</Layout>
  )
}

export default AddIdea
