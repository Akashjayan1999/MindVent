import React,{useState,useEffect} from 'react'
import Layout from '../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'

const Home = () => {
  const [events,setEvents] =useState([])

  //get all events
  const getAllEvents =async()=>{
      try {
          const {data} = await axios.get('/api/v1/event/get-event')
          setEvents(data.events)
      } catch (error) {
          console.log(error)
          toast.error('Something Went Wrong')
      }
  }
  useEffect(() => {
    getAllEvents() 
  }, [])

  useEffect(() => {
  // Reload the page when this component mounts
  }, []);
  return (
<Layout title={'Home'}>
  <div className="container-fluid py-5 bg-light" style={{width: '90rem'}}>
   
    <div className="row">
      {events?.map((c) => (
        <div className="col-md-12 mb-4">
          <div className="card h-100 border-0 shadow-lg card-hover">
            <div className="row no-gutters">
              <div className="col-md-6">
                <img
                  className="card-img h-100"
                  style={{ objectFit: 'cover' }}
                  src={`/api/v1/event/event_photo/${c._id}`}
                  alt={c.title}
                />
              </div>
              <div className="col-md-6 d-flex align-items-center">
                <div className="card-body p-4">
                  <h5 className="card-title text-center">{c.title}</h5>
                  <p className="card-text text-center">{c.description}</p>
                  <div className="d-flex justify-content-center">
                  <Link key={c._id} to={`/eventdetails/${c.slug}`} className='event-link'>
                    <button className="btn btn-outline-dark">Learn More</button>
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
</Layout>

  
   
  )
}

export default Home
