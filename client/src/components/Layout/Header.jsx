import React from 'react'
import {NavLink ,Link,useNavigate} from 'react-router-dom'
import { useAuth } from '../../context/Auth'
import { FcIdea} from 'react-icons/fc'
import toast from 'react-hot-toast'
const Header = () => {
  const [auth,SetAuth] = useAuth()
  const handleLogout = ()=>{
     SetAuth({
      ...auth,
     user:null,
     token:''
     })
     localStorage.removeItem("auth")
     
    
  }
  if(auth?.user?.role===1|| auth?.user?.role===2){
    return (
      <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
    <div className="container-fluid">
      <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
        <span className="navbar-toggler-icon" />
      </button>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
        <Link to="/" className="navbar-brand " ><FcIdea/> Mind Venture</Link>
        <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
          <li className="nav-item">
            <NavLink to="/" className="nav-link "  >Home</NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/about" className="nav-link" >About Us</NavLink>
          </li>
         
          <li className="nav-item">
            <NavLink to="/contact" className="nav-link" >Contact Us</NavLink>
          </li>
          {
        !auth.user ? (<>
           <li className="nav-item">
          <NavLink to="/register" className="nav-link" >Signup</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" >Login</NavLink>
        </li>
        </>) : (<>
         <li className="nav-item dropdown dropleft ">
  <NavLink  className="nav-link dropdown-toggle dropleft"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}>
    {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu dropdown-menu-end" >
   <li> <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role===1 ? "admin" : "mentor"}`}>Dashboard</NavLink></li>
   <li> <NavLink to="/" onClick={handleLogout} className="bg-danger text-white dropdown-item" >Logout</NavLink></li>
   
  </ul>
</li>

        </>)
       }
         
         
         
        </ul>
      
      </div>
    </div>
  </nav>
   
      </>
    )
  }
 
else{
  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
  <div className="container-fluid">
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" />
    </button>
    <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
      <Link to="/" className="navbar-brand " ><FcIdea/> Mind Venture</Link>
      <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
        <li className="nav-item">
          <NavLink to="/" className="nav-link "  >Home</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/about" className="nav-link" >About Us</NavLink>
        </li>

        <li className="nav-item">
          <NavLink to="/contact" className="nav-link" >Contact Us</NavLink>
        </li>
             {
        !auth.user ? (<>
           <li className="nav-item">
          <NavLink to="/register" className="nav-link" >Signup</NavLink>
        </li>
        <li className="nav-item">
          <NavLink to="/login" className="nav-link" >Login</NavLink>
        </li>
        </>) : (<>
         <li className="nav-item dropdown dropleft ">
  <NavLink  className="nav-link dropdown-toggle dropleft"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      style={{ border: "none" }}>
    {auth?.user?.name}
  </NavLink>
  <ul className="dropdown-menu dropdown-menu-end" >
   <li> <NavLink className="dropdown-item" to={`/dashboard/${auth?.user?.role===0 ? "student" : "investor"}`}>Dashboard</NavLink></li>
   <li> <NavLink to="/" onClick={handleLogout} className="bg-danger text-white dropdown-item" >Logout</NavLink></li>
   
  </ul>
</li>

        </>)
       }
       
       
       

      </ul>
    
    </div>
  </div>
</nav>
 
    </>
  )
}
}



export default Header

