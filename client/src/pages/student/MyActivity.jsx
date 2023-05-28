import React,{useEffect} from 'react'
import { useActivity } from '../../context/ActContext';
import Layout from './../../components/Layout/Layout';
import StudentMenu from './../../components/Layout/StudentMenu';

import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'
import { useAuth } from '../../context/Auth';


const MyActivity = () => {
  const [activity,setActivity]=useActivity()
  const [auth,SetAuth] = useAuth()
  useEffect(() => {
    setActivity(activity)
  }, [])
  return (
    <Layout title={'Dashboard-MyActivity'}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className='row'>
          <div className='col-md-3'>
            <StudentMenu/>
          </div> 
          <div className='col-md-9'>
            <h1 className='mb-4'>My Activity</h1>
            <div className='row'>
              {activity?.filter(c=>c.student_id._id===auth.user.u_id).map((c)=>(
                <Link key={c._id} to={`/dashboard/student/updateactivity/${c.slug}`} className='event-link col-lg-4 col-md-6 col-sm-12 mb-4'>
                  <div className="card border-0 shadow rounded-3">
                    <img className="card-img-top rounded-3" src={`/api/v1/activity/activity-photo/${c._id}`} alt={c.title} style={{objectFit: 'cover', height: '250px'}} />
                   <div className="card-body " style={{paddingTop: '1rem'}}>
                      <h5 className="card-title text-center">{c.title}</h5>
                      <h5 className="card-title ">{c.student_id.name}</h5>
                    </div>     
                  </div>      
                </Link>   
              ))}
            </div> 
          </div>
        </div>
      </div>
    </Layout>
  )
}

export default MyActivity

