import React, { useState, useEffect } from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdea } from '../../context/IdeaContext'; 
import {Link} from 'react-router-dom'

const AdminIdeaDetails = () => {
    const params = useParams();
    
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
    const [idea,setIdea] = useIdea()
    const [ctime, setCTime] = useState('');
    const [status, setStatus] = useState('')
    const [id, setId] = useState()
    const [name, setName] = useState('')
    const [department, setDepartment] = useState('')
    const [year, setYear] = useState('')
    const [mentors, setMentor] = useState([])
    const [mentorName, setMentorName] = useState('')
    const [members, setMembers] = useState('')
    const [investorsDetails, setInvestorsDetails] = useState([])
    const navigate = useNavigate()

    const getSingleIdea = async()=>{
        try {
           const {data}= await axios.get(`/api/v1/idea/get-idea/${params.pid}`);
           console.log(data)
           setTitle(data.idea.title)
           setName(data.idea.student_id.name)
           setMembers(data?.idea?.members)
           setDepartment(data.idea.student_id.department)
           setYear(data.idea.student_id.year_of_study)
           setCategory(data.idea.category)
           setImpact(data.idea.impact)
           setScalability(data.idea.scalability)
           setFeasibility(data.idea.feasibility)
           setImplementation_timeline(data.idea.implementation_timeline)
           setFuture_scope(data.idea.future_scope)
           setBudget(data.idea.budget)
           setDescription(data.idea.description)
           setCTime(data.idea.createdAt);
           setStatus(data.idea.status)
           setId(data.idea._id);
           setMentorName(data.idea.mentor_id.name)
           setInvestorsDetails(data.idea.investors)
           console.log(data.idea.investors)
        } catch (error) {
          console.log(error); 
          
        }
     }
     useEffect(()=>{
         getSingleIdea();
     },[])
    
     const handleDelete = async()=>{
        try {
            let answer =window.prompt('Are you sure?')
            if(!answer) return;
            
              const {data} = await axios.delete(`/api/v1/idea/delete-idea/${id}`)
              toast.success('Idea Deleted Successfully')
              setIdea(data.ideas)
              navigate("/dashboard/admin/ideas");
        } catch (error) {
            console.log(error)
            toast.error("something went wrong");
        }
    }
    //Update admin Status
   
const UpdateStatus = async(id,newStatus)=>{
    
    try {
      await axios.patch(`/api/v1/idea/update-adminstatus/${id}`, { status: newStatus });
      await idea?.filter(c=>c._id==params.pid).map((c)=>{
        c.status=newStatus
        
      })
      console.log(idea)
      setStatus(newStatus)
       setIdea(idea)
  
      
      toast.success("Status  updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
    //get all Mentors
    const getAllMentors= async()=>{
        try {
          const {data} = await axios.get('/api/v1/user/get-mentor')
          setMentor(data.mentors)
        } catch (error) {
          console.log(error)
          toast.error('Something Went Wrong')
        }
      }
      useEffect(() => {
        getAllMentors()
      }, [])
      const updateMentor = async(id,mentor_id)=>{
    
        try {
          const {data}=await axios.put(`/api/v1/idea/update-adminmentor/${id}`, { mentor_id: mentor_id });
          await setIdea(data.ideas)
          await idea?.filter(c=>c._id==params.pid).map((c)=>{
            
           
          })
           
           
      
          
          toast.success("Mentor allocatef successfully");
        } catch (error) {
          console.log(error);
          toast.error("Something went wrong");
        }      
      }      
      
  return (
    <Layout title={'Dashboard-IdeaDetails'}>
         <div className="container-fluid m-3 p-3 dashboard">
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
            <h1>Idea Details</h1>
            <div className="row justify-content-center">
        <div className="col-md-11">
          <div className="card border-0 shadow-sm">
            <div className="card-body">
              <img
                src={`/api/v1/idea/idea-photo/${params.pid}`}
                className="card-img-top mb-4 h-100"
                alt="Idea Photo"
              />
              <h5 className="card-title mb-3 text-center">{title}</h5><br></br>
              <h5 className="card-title mb-3 ">{name}</h5>
              <h5 className="card-title mb-3 ">{year} Year {department}</h5><br></br>
              <ul className="list-unstyled mb-4">
                <li className="text-secondary mb-1">
                  <i className="far fa-calendar-alt mr-2"></i>
                  Category:  {category}
                </li>
                <br></br>
                <li className="text-secondary mb-1">
                  <i className="far fa-calendar-alt mr-2"></i>
                  Team Members:  {members? members: name}
                </li>
                <br></br>
                <li className="text-secondary mb-1">
                  <i className="far fa-clock mr-2"></i>
                  Impact:  {impact}
                </li>
                <br></br>
                <li className="text-secondary">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Scalability:  {scalability}
                </li>
                <br></br>
                <li className="text-secondary">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Feasibility:  {feasibility}
                </li>
                <br></br>
                <li className="text-secondary">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Implementation timeline:  {implementation_timeline} 
                </li>
                <br></br>
                <li className="text-secondary">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Future scope: {future_scope}
                </li>
                <br></br>
                <li className="text-secondary">
                  <i className="fas fa-map-marker-alt mr-2"></i>
                  Budget: {budget}Rs
                </li>
                <br></br>
              </ul>
              <p className="card-text mb-2 text-secondary fas fa-map-marker-alt mr-2">{description}</p>
              <p className="card-text mb-0">
                <small className="text-muted">
                  Mentor: {mentorName}
                </small>
              </p>
              <p className="card-text mb-0">
                <small className="text-muted">
                  Status: {status}
                </small>
              </p>
              <p className="card-text mb-0">
                <small className="text-muted">
                  Created At: {ctime}
                </small>
              </p>
            </div>
            <div className="mb-3">
            <div className="form-group">
  
  <select
    className="form-control"
    
    onChange={(e) => {  const selectedMentor = mentors.find(mentor => mentor._id === e.target.value);
      setMentorName(selectedMentor ? selectedMentor.name : "");
      updateMentor(id, e.target.value);} }
  >
    <option value="">Select Mentor</option>
    {mentors.filter(mentor=>mentor.category===category).map((mentor) => (
      <option key={mentor.name} value={mentor._id}>
        {mentor.name}
      </option>
      
    ))}
         
  </select>
  
</div>
            <button className="btn btn-outline-success m-2" onClick={()=>{UpdateStatus(id,"Approved")}} >
                    Approve
                   </button>   
           <button className="btn btn-outline-warning m-2" onClick={()=>{UpdateStatus(id,"Rejected")}} >
                    Reject
                   </button>         
          
          <button className="btn btn-outline-danger m-2" onClick={handleDelete}>
                Remove Idea
              </button>
        </div>
        
          </div>
          {investorsDetails.length>=1?
          <div>
       
       <table className="table">
         <thead className="thead-dark">
           <tr>
             <th scope="col">Sl No</th>
             <th scope="col">Name</th>
             <th scope="col">E-mail</th>
             <th scope="col">Phone Number</th>
             <th scope="col">Status</th>
           </tr>
         </thead>
         <tbody>
        {investorsDetails?.map((c,index)=>(
          (
            <tr key={c._id}>
             <th scope="row">{index+1}</th>
             <td>{c.investor_id.name}</td>
             <td>{c.investor_id.email}</td>
             
             <td>{c.investor_id.phoneNum}</td>
             <td>{c.investor_status}</td>
             
           
             
           </tr>
           )
           ))}
         </tbody>
       </table>
     
       
      
     </div>
        :""} 
        </div>
        
      </div>
            </div>
         </div>
      </div>
    </Layout>
  )
}

export default AdminIdeaDetails
