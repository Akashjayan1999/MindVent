import React, { useState, useEffect } from 'react'
import InvestorMenu from './../../components/Layout/InvestorMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdea } from '../../context/IdeaContext'; 
import {Link} from 'react-router-dom'
import { useAuth } from '../../context/Auth';
const InvestorIdeaDeatils = () => {
    const params = useParams();
    const[auth,SetAuth]= useAuth()
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
    const [status, setStatus] = useState([])
    const [id, setId] = useState()
    const [mentorName, setMentorName] = useState('')
    const [investorId, setInvestorId] = useState('')
    const navigate = useNavigate()

    const getSingleIdea = async()=>{
        try {
           const {data}= await axios.get(`/api/v1/idea/get-idea/${params.pid}`);
           console.log(data)
           setTitle(data.idea.title)
           setCategory(data.idea.category)
           setImpact(data.idea.impact)
           setScalability(data.idea.scalability)
           setFeasibility(data.idea.feasibility)
           setImplementation_timeline(data.idea.implementation_timeline)
           setFuture_scope(data.idea.future_scope)
           setBudget(data.idea.budget)
           setDescription(data.idea.description)
           setCTime(data.idea.createdAt);
           
           setId(data.idea._id);
           setMentorName(data.idea.mentor_id.name)
           const investorData = data.idea.investors.find((inv)=>inv.investor_id._id===auth.user.u_id)
           setStatus(investorData.investor_status)
           console.log(investorData)
        } catch (error) {
          console.log(error); 
          
        }
     }
     useEffect(()=>{
         setInvestorId(auth?.user?.u_id)
         getSingleIdea();
         
     },[])
     const UpdateStatus = async(id,newStatus)=>{
    
      try {
       const {data}= await axios.put(`/api/v1/idea/update-investorstatus/${id}`, { status: newStatus,investorId: investorId});
       console.log(data)
       setIdea(data.ideas)
       setStatus(newStatus)
        
        toast.success("Status  updated successfully");
      } catch (error) {
        console.log(error);
        toast.error("Something went wrong");
      }
    }
  return (
    <Layout title={'Dashboard-Ideadetails'}>
         <div className="container-fluid m-3 p-3 dashboard">
        <div className='row'>
            <div className='col-md-3'>
                <InvestorMenu/>
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
              <h5 className="card-title mb-3">{title}</h5>
              
              <ul className="list-unstyled mb-4">
                <li className="text-secondary mb-1">
                  <i className="far fa-calendar-alt mr-2"></i>
                  Category:  {category}
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
                  Status: {status}
                </small>
              </p>
              <p className="card-text mb-0">
                <small className="text-muted">
                  Mentor: {mentorName}
                </small>
              </p>
             
              <p className="card-text mb-0">
                <small className="text-muted">
                  Created At: {ctime}
                </small>
              </p>
            </div>
            <div className="mb-3">
            
            <button className="btn btn-outline-success m-2" onClick={()=>{UpdateStatus(id,"Approved")}} >
                    Approve
                   </button>   
           <button className="btn btn-outline-warning m-2" onClick={()=>{UpdateStatus(id,"Need to imporve")}} >
                    Need to imporve
                   </button>         
          
          <button className="btn btn-outline-danger m-2" onClick={()=>{UpdateStatus(id,"Rejected")}}>
                Reject
              </button>
        </div>
            
        
          </div>
         
        </div>
        
      </div>
            </div>
            </div>
      </div>
    </Layout>
  )
}

export default InvestorIdeaDeatils
