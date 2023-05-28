import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import "../../styles/AuthStyles.css"
const AdminMenu = () => {
  return (
    <>
    <div className='text-center'>
    <div className="list-group">
    <div className='form-container ' style={{ minHeight: "90vh" }}>
      <form>

 <h4 className='title'>Admin Panel</h4>
 <div className='title1 p-2'>

 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/admin/add-event" className="">Add Events</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/admin/events" className="">Events</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/admin/ideas" className="">Idea</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/admin/activity" className="">Activity</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/admin/students" className="">Students</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/admin/mentors" className="">Mentors</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/admin/investors" className="">Investors</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/admin/feedbacks" className="">Feedbacks</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/admin/chat" className="">Chat</Link>
 </div>
</div>
      </form>
 </div>
    </div>
  
    </div>
    </>
  )
}

export default AdminMenu
