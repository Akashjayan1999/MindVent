import React from 'react'
import {Link} from 'react-router-dom'
import "../../styles/AuthStyles.css"
import Layout from '../../components/Layout/Layout'
const Reg1 = () => {
  return (
    <div>
        <Layout title="Register">
         
       <div className='form-container ' style={{ minHeight: "90vh" }}>
       <form>
       <h2 className='title'>Registration</h2>
        <div className='title1 p-2'>
  <div className="form-control1 border border-dark">
    
   <Link to="stdregister">Student</Link>
  </div>
  <div className="form-control1 border border-dark">
    <Link to="investorregistor">Investor</Link>
  </div>
  <div className="form-control1 border border-dark">
  <Link to="facultyregister">Faculty</Link>
  </div>
  </div>
  </form>
</div>



   </Layout>
    </div>
  )
}

export default Reg1
