import React,{useEffect,useState} from 'react'
import AdminMenu from '../../components/Layout/AdminMenu'
import Layout from '../../components/Layout/Layout'
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'


const AdminEvents = () => {
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
    <Layout title={'Dashboard-Events'}>
     <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='text-center col-md-9'>
        <h1>All Events List</h1>
        <div className='row'>
            
        {events?.map((c)=>(
            <Link key={c._id} to={`/dashboard/admin/event/${c.slug}`} className='event-link col-lg-4 col-md-6 col-sm-12 mb-4 '>
           <div className="card border-0 shadow rounded-3"  >
  <img className="card-img-top rounded-3" src={`/api/v1/event/event_photo/${c._id}`} alt={c.title} style={{objectFit: 'cover', height: '250px'}} />
  <div className="card-body" style={{paddingTop: '1rem'}}>
    <h5 className="card-title">{c.title}</h5>
    
   
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

export default AdminEvents
