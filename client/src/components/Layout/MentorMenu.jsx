import React from 'react'
import { NavLink,Link } from 'react-router-dom'

const MentorMenu = () => {
  return (
    <>
    <div className='text-center'>
    <div className="list-group">
    <div className='form-container ' style={{ minHeight: "90vh" }}>
    <form>
 <h4 className='title'>Mentor Panel</h4>
 <div className='title1 p-2'>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/mentor/idea" className="">Idea</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/mentor/activity" className="">Activity</Link>
 </div>
 
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/mentor/feedbacks" className="">Feedback</Link>
 </div>
 <div className="form-control1 border border-dark"> 
  <Link to="/dashboard/mentor/chatwai" className="">Chat </Link>
 </div>
  
  </div>
      </form>
    </div>
</div>
    </div>
  

    </>
  )
}

export default MentorMenu
