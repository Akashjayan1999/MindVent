import React,{useState} from 'react'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import "../../styles/AuthStyles.css"
import {useNavigate} from 'react-router-dom'
const FacultyReg = () => {

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [category, setCategory] = useState('')
  const [description, setDescription] = useState('')
  const [phoneNum, setPhoneNum] = useState('')
  const [pic, setPic] = useState()
  const [picloading,setPicLoading]=useState(false)
  const [picName, setPicName] = useState('')
  const navigate = useNavigate()
  const handleSubmit1= async (e)=>{
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
          const res = await axios.post(`/api/v1/auth/register/facultyregister`,{name,email,password,category,description,phoneNum,pic})
          if(res && res.data.success){
             
              navigate('/login/facultylogin')
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
    <Layout title="FacultyRegitration">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        
        <form onSubmit={handleSubmit1}>
        <h4 className='title'>Faculty Registration</h4>
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
  <select value={category} onChange={(e)=>{setCategory(e.target.value)}} className="form-control" id="exampleInputDepartment" required>
    <option value="">Select category</option>
    
    
    <option value="Healthcare">Healthcare </option>
    
    <option value="Education">Education </option>
    <option value="Consumer products">Consumer products</option>
    <option value="Entertainment">Entertainment </option>
    <option value="Technology">Technology</option>
    <option value="Social">Social</option>
    <option value="Others">Others</option>
  </select>
</div>
      <div className="mb-3">
  
  <textarea className="form-control" id="exampleInputDescription" rows="3" value={description} onChange={(e) => {setDescription(e.target.value)}} placeholder='Tell Something about you:' required></textarea>
</div>

      <div className="mb-3">
        
        <input type="tel" value={phoneNum}  onChange={(e)=>{setPhoneNum(e.target.value)}} pattern="[0-9]{10}" className="form-control" id="exampleInputAdmissionNum" placeholder='Enter Phone number' required/>
      </div>
      
     
     
                <button type="submit" className={`btn btn-dark  align-items-center ${picloading ? 'btn-loading' : ''}`} disabled={picloading}>
  Register {picloading && <span className="position-absolute top-50 start-50 translate-middle spinner-border spinner-border-sm"></span>}
</button>
    </form>
    
         </div>
      </Layout>
  )
}

export default FacultyReg
