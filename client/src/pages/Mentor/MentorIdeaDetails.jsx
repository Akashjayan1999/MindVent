import React, { useState, useEffect } from 'react'
import MentorMenu from './../../components/Layout/MentorMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
import { useIdea } from '../../context/IdeaContext'; 
import {Link} from 'react-router-dom'
const MentorIdeaDetails = () => {
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
    const [members, setMembers] = useState('')
    const [investorsDetails, setInvestorsDetails] = useState([])
    const navigate = useNavigate()

    const getSingleIdea = async()=>{
       try {
          const {data}= await axios.get(`/api/v1/idea/get-idea/${params.pid}`);
          console.log(data)
          setTitle(data.idea.title)
          setCategory(data.idea.category)
          setName(data.idea.student_id.name)
          setMembers(data?.idea?.members)
          setDepartment(data.idea.student_id.department)
          setYear(data.idea.student_id.year_of_study)
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
          setInvestorsDetails(data.idea.investors)

         
       } catch (error) {
         console.log(error); 
         
       }
    }
    useEffect(()=>{
        getSingleIdea();
    },[])
  return (
    <Layout title={'Dashboard-Ideadetails'}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <MentorMenu/>
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
                  Status: {status}
                </small>
              </p>
              <p className="card-text mb-0">
                <small className="text-muted">
                  Created At: {ctime}
                </small>
              </p>
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

export default MentorIdeaDetails
