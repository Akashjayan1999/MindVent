import React from 'react'
import {Link} from 'react-router-dom'
import "../../styles/AuthStyles.css"
import Layout from '../../components/Layout/Layout'
const Login = () => {
  return (
    <div>
    <Layout title="Login">
     
   <div className='form-container ' style={{ minHeight: "90vh" }}>
   <form>
    <div className='title1 p-2'>
<div className="form-control1 border border-dark">

<Link to="stdlogin">  Student</Link>
</div>
<div className="form-control1 border border-dark">
<Link to="investorlogin">Investor</Link>
</div>
<div className="form-control1 border border-dark">
<Link to="facultylogin">Faculty</Link>
</div>
</div>
</form>
</div>



</Layout>
</div>
  )
}

export default Login
