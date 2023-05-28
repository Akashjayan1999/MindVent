import React,{useEffect, useState} from 'react'
import InvestorMenu from './../../components/Layout/InvestorMenu';
import Layout from './../../components/Layout/Layout';
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'
import  {useIdea}  from '../../context/IdeaContext';
import { useAuth } from '../../context/Auth';
const InvestorIdea = () => {
  const [idea,setIdea] = useIdea()
  const[auth,SetAuth]= useAuth()
  const [status, setStatus] = useState([])
  useEffect(() => {
    setIdea(idea)
    console.log(idea)
   }, [])
  return (
    <Layout title={'Dashboard-Idea'}>
         <div className="container-fluid m-3 p-3 dashboard">
        <div className='row'>
            <div className='col-md-3'>
                <InvestorMenu/>
            </div>
            <div className='col-md-9'>
            <h1>Idea</h1>
            <div className='row justify-content-center '>
              {idea?.filter(c=>c?.status=='Approved'&&c.investors?.find((inv)=>inv?.investor_id?._id===auth.user.u_id)?.investor_status!='Rejected').filter(c=>c.investors?.find((inv)=>inv?.investor_id?._id!==auth.user.u_id)?.investor_status!='Approved').map((c)=>(
                <div className="col-md-12 mb-4">
                <div className="card h-100 border-0 shadow-lg card-hover">
                  <div className="row no-gutters">
                    <div className="col-md-6">
                      <img 
                        className="card-img h-100"
                        style={{ objectFit: 'cover' }}
                        src={`/api/v1/idea/idea-photo/${c?._id}`}
                        alt={c?.title}
                      />
                    </div>
                    <div className="col-md-6 d-flex align-items-center">
                      <div className="card-body p-4">
                        <h5 className="card-title text-center">{c?.title}</h5>
                        <p className="card-text text-center">{c?.impact}</p>
                        <div className="d-flex justify-content-center">
                        <Link key={c?._id} to={`/dashboard/investor/investorideadetails/${c?._id}`} className='event-link'>
                          <button className="btn btn-dark">Learn More</button>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
            </div>
            </div>
      </div>
    </Layout>
  )
}

export default InvestorIdea
