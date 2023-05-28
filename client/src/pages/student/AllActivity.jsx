import React from 'react'
import StudentMenu from './../../components/Layout/StudentMenu';
import Layout from './../../components/Layout/Layout';
import { useActivity } from '../../context/ActContext';

import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'
const AllActivity = () => {
    const [activity,setActivity]=useActivity()
  return (
    <Layout title={'Dashboard-Activity'}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <StudentMenu/>
        </div>
        <div className='col-md-9'>
            <h1 className='mb-4'>All Activity</h1>
            <div className='row'>
              {activity?.map((c)=>(
                <Link key={c._id} to={`/dashboard/student/activitydetails/${c.slug}`} className='event-link col-lg-4 col-md-6 col-sm-12 mb-4'>
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

export default AllActivity
