import React,{useState} from 'react'
import toast from 'react-hot-toast'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import "../../styles/AuthStyles.css"
import {useNavigate} from 'react-router-dom'

const InvestorReg = () => {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [companyNam, setCompanyNam] = useState('')
    const [companyLoc, setCompanyLoc] = useState('')
    const [nationality, setNationality] = useState('')
    const [phoneNum, setPhoneNum] = useState('')
    const [pic, setPic] = useState()
    const [picloading,setPicLoading]=useState(false)
    const [picName, setPicName] = useState('')
    const navigate = useNavigate()
    const handleSubmit2= async (e)=>{
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
          const res = await axios.post(`/api/v1/auth/register/investorregister`,{name,email,password,companyNam,companyLoc,nationality,phoneNum,pic})
          if(res && res.data.success){
             
              navigate('/login/investorlogin')
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
    <div>
     <Layout title="InvestorRegitration">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        
        <form onSubmit={handleSubmit2}>
        <h4 className='title'>Investor Registration</h4>
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
        <input type="text"  value={companyNam} onChange={(e)=>{setCompanyNam(e.target.value)}} className="form-control" id="exampleInputDepartment" placeholder='Enter Company Name If' required/>
      </div>
      <div className="mb-3">
        
        <input type="text" value={companyLoc} onChange={(e)=>{setCompanyLoc(e.target.value)}} className="form-control" id="exampleInputYearStudying" placeholder='Enter company location If' required />
      </div>
      <div className="mb-3">
  <select className="form-control" id="nationalityDropdown" value={nationality} onChange={(e) => {setNationality(e.target.value)}} required>
    <option value="">Select your nationality</option>
    <option value="USA">USA</option>
    <option value="Canada">Canada</option>
    <option value="Mexico">Mexico</option>
    <option value="UK">UK</option>
    <option value="France">France</option>
    <option value="Germany">Germany</option>
    <option value="Japan">Japan</option>
    <option value="China">China</option>
    <option value="India">India</option>
    <option value="Others">Others</option>
  </select>
</div>
      <div className="mb-3">
        
        <input type="tel" pattern="[0-9]{10}" value={phoneNum}  onChange={(e)=>{setPhoneNum(e.target.value)}} className="form-control" id="exampleInputAdmissionNum" placeholder='Enter Phone number' required/>
      </div>
      
      
     
      <button type="submit" className={`btn btn-dark  align-items-center ${picloading ? 'btn-loading' : ''}`} disabled={picloading}>
  Register {picloading && <span className="position-absolute top-50 start-50 translate-middle spinner-border spinner-border-sm"></span>}
</button>
    </form>
    
         </div>
      </Layout>  
    </div>
  )
}

export default InvestorReg

