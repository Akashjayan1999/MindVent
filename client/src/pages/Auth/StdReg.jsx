import React,{useState} from 'react'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import "../../styles/AuthStyles.css"
import {useNavigate} from 'react-router-dom'
const StdReg = () => {
  const ordinalNumbers = ['First', 'Second', 'Third', 'Fourth'];    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [department, setDepartment] = useState('')
    const [year_of_study, setYear] = useState('')
    const [admission_num, setAdmissionNum] = useState('')
    const [pic, setPic] = useState()
    const [picloading,setPicLoading]=useState(false)
    const [picName, setPicName] = useState('')
    const navigate = useNavigate()
    const handleSubmit= async (e)=>{
        e.preventDefault()
          // Password validation
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/gm;
    if (!passwordRegex.test(password)) {
      toast.error(
        'Password must contain at least 8 characters including uppercase, lowercase, and numbers'
      );
      return;
    } 
        try {
            const res = await axios.post(`/api/v1/auth/register/stdregister`,{name,email,password,department,year_of_study,admission_num,pic})
            if(res && res.data.success){
               
                navigate('/login/stdlogin')
            }else{
                toast.error(res.data.message)
            }
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }
    const postDetails = (pics) => {
      setPicLoading(true);
      if (pics === undefined) {
        toast.error(
          'Please Select an Image!'
        );
        return;
      }
      console.log(pics);
      setPicName(pics.name)
      if (pics.type === "image/jpeg" || pics.type === "image/png") {
        const data = new FormData();
        data.append("file", pics);
        data.append("upload_preset", "mind-venture");
        data.append("cloud_name", "dzsjqjzge");
        fetch("https://api.cloudinary.com/v1_1/dzsjqjzge/image/upload", {
          method: "post",
          body: data,
        })
          .then((res) => res.json())
          .then((data) => {
            setPic(data.url.toString());
            
            console.log(data.url.toString());
            setPicLoading(false);
          })
          .catch((err) => {
            console.log(err);
            setPicLoading(false);
          });
      } else {
        toast.error(
          'Please Select an Image!'
        );
        setPicLoading(false);
        return;
      }
    };
  return (
    <Layout title="StudentRegistration">
        <div className="form-container" style={{ minHeight: "90vh" }}>
        
    <form onSubmit={handleSubmit}>
    <h4 className='title'>Student Registration</h4>
    <div className="mb-3">
    
    <label className="btn btn-outline-secondary col-md-12" required>
                    {picName ? picName : "Upload Profile Photo"}
                    <input
                      type="file"
                      name="photo"
                      accept="image/*"
                      onChange={(e) => postDetails(e.target.files[0])}
                      hidden
                      required
                      style={{'--placeholder-color': 'gray'}}
                    />
                  </label>  </div>
    <div className="mb-3">
  <input type="text"  value={name} onChange={(e)=>{setName(e.target.value)}} className="form-control" id="exampleInputName" placeholder='Enter Your Name' required />
  </div>
  <div className="mb-3">
    <input type="Email"  value={email} onChange={(e)=>{setEmail(e.target.value)}} className="form-control" id="exampleInputEmail" placeholder='Enter Email Address' required/>
  </div>
  <div className="mb-3">
    <input type="password"  value={password} onChange={(e)=>{setPassword(e.target.value)}} className="form-control" id="exampleInputPassword1" placeholder='Enter Password' required />
  </div>
  <div className="mb-3">
  <select value={department} onChange={(e)=>{setDepartment(e.target.value)}} className="form-control" id="exampleInputDepartment" required>
  <option value="">Select Department</option>
    <option value="MCA">MCA</option>
    <option value="Computer Science Engineering">Computer Science Engineering</option>
    <option value="Mechanical Engineering">Mechanical Engineering</option>
    <option value="EEE">EEE</option>
    <option value="Electrical Engineering">Electrical Engineering</option>
    <option value="Civil Engineering">Civil Engineering</option>
    <option value="Others">Others</option>
  </select>
</div>
<div className="mb-3">
  <select
    value={year_of_study}
    onChange={(e) => setYear(e.target.value)}
    className="form-control"
    id="exampleInputYearStudying"
    required
  >
    <option value="">Select Year of Study</option>
    {department === 'MCA' ? (
      <>
        <option value="First">{ordinalNumbers[0]}</option>
        <option value="Second">{ordinalNumbers[1]}</option>
      </>
    ) : (
      ordinalNumbers.map((number, index) => (
        <option key={index} value={number}>
          {number}
        </option>
      ))
    )}
  </select>
</div>
  <div className="mb-3">
    
    <input type="text" value={admission_num}  onChange={(e)=>{setAdmissionNum(e.target.value)}} className="form-control" id="exampleInputAdmissionNum" placeholder='Enter Admission Number' required/>
  </div>
 
 
                <button type="submit" className={`btn btn-dark  align-items-center ${picloading ? 'btn-loading' : ''}`} disabled={picloading}>
  Register {picloading && <span className="position-absolute top-50 start-50 translate-middle spinner-border spinner-border-sm"></span>}
</button></form> 

     </div>
    </Layout> 
  )
}

export default StdReg
 