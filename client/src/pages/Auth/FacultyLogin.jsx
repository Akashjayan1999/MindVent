import React,{useState} from 'react'
import Layout from '../../components/Layout/Layout'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/Auth'
import axios from 'axios'
import "../../styles/AuthStyles.css"
import {useNavigate} from 'react-router-dom'

const FacultyLogin = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [auth,setAuth] = useAuth()
    const navigate = useNavigate()
    const handleSubmit3= async (e)=>{
        e.preventDefault();
        try {
            const res = await axios.post(`/api/v1/auth/login/facultylogin`,{email,password})
            if(res && res.data.status=='Approved'&& res.data.success ){
                setAuth({
                  ...auth,
                  user:res.data.user,
                  token:res.data.token,
                });
                localStorage.setItem('auth',JSON.stringify(res.data))
                navigate('/')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Invalid email or password')
        }
    };
  return (
    <div>
        <Layout title="FacultyLogin">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        
        <form onSubmit={handleSubmit3}>
        <h4 className='title'>Login Form</h4>
     
      <div className="mb-3">
        <input type="Email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" id="exampleInputEmail" placeholder='Enter Email Address' required/>
      </div>
      <div className="mb-3">
        <input type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control" id="exampleInputPassword1" placeholder='Enter Password' required />
      </div>
     
    
     
      <button type="submit" className="btn btn-primary">Login</button>
    </form>
    
         </div>
      </Layout>
    </div>
  )
}

export default FacultyLogin
