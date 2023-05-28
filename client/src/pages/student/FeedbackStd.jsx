import React,{useState,useEffect} from 'react'
import Layout from './../../components/Layout/Layout';
import StudentMenu from './../../components/Layout/StudentMenu';
import axios from 'axios'
import toast from 'react-hot-toast'
import '../../styles/feedback.css'
import { useAuth } from '../../context/Auth';
import {useNavigate} from 'react-router-dom'

const FeedbackStd = () => {
  const[auth,SetAuth]= useAuth()
  const [student_id, setStudent_id] = useState('')
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate()
  useEffect(() => {
    setStudent_id(auth?.user?.u_id)
    
  }, [])
  const handleCreate = async(e)=>{
    e.preventDefault()
    try {
      
      
      
       const {data} =await axios.post('/api/v1/user/create-feedback',{feedback,student_id})
       if(data?.success){
        toast.success('feedback sent successfully')
        
         navigate('/dashboard/student')
        
       }else{
    
        toast.error(data?.message)
       }
    } catch (error) {
      console.log(error)
      toast.error('something went wrong')
    }
  }
  return (
    <Layout title={'Dashboard-Feedback'}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <StudentMenu/>
        </div>
        <div className='col-md-9'>
        <form  className="feedback-form">
      <h2 className="feedback-heading">Feedback</h2>
      <p className="feedback-description">Please share your feedback with us:</p>
      <label>
        <textarea value={feedback}  className="feedback-input" onChange={(e)=>setFeedback(e.target.value)} placeholder="Enter your feedback here"></textarea>
      </label>
      <button type="submit" className="feedback-submit" onClick={handleCreate}>Submit</button>
    </form>
        </div>
  </div>
  </div>
</Layout>
  )
}

export default FeedbackStd
