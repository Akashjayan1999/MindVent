import React from 'react'
import { NavLink,Link } from 'react-router-dom'
import "../../styles/AuthStyles.css"
const StudentMenu = () => {
  return (
    <>
    <div className='text-center'>
    <div className="list-group">
    <div className='form-container ' style={{ minHeight: "90vh" }}>
    <form>

 <h4 className='title'>Student Panel</h4>

 <div className="form-control1 border border-dark">
  <Link to="/dashboard/student/add-idea" className="">Add Idea</Link>
 </div>
 <div className="form-control1 border border-dark">
  <Link to="/dashboard/student/add-activity" className="">Add Activity</Link>
 </div>
 <div className="form-control1 border border-dark">
  <Link to="/dashboard/student/allactivity" className="">All Activity</Link>
 </div>
 <div className="form-control1 border border-dark">
  <Link to="/dashboard/student/idea" className="">My Idea</Link>
 </div>
 <div className="form-control1 border border-dark">
  <Link to="/dashboard/student/activity" className="">My Activity</Link>
 </div>
 <div className="form-control1 border border-dark">
  <Link to="/dashboard/student/feedbacks" className="">Feedback</Link>
 </div>
 <div className="form-control1 border border-dark">
  <Link to="/dashboard/student/chat" className="">Chat</Link>
 </div>
    </form>
</div>
    </div>
    </div>
  

    </>
  )
}

export default StudentMenu

