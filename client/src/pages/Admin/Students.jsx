import React,{useEffect,useState} from 'react'
import { useActivity } from '../../context/ActContext';
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'
import {useNavigate} from 'react-router-dom'
const Students = () => {
  const [student, setStudent] = useState([])
  const [activity,setActivity]= useActivity()
  const navigate = useNavigate()
  //get all Students
  const getAllStds= async()=>{
    try {
      const {data} = await axios.get('/api/v1/user/get-std')
      setStudent(data.students)
      console.log(activity)
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }
  useEffect(() => {
  getAllStds()
  }, [])
  //delete studeent
  const deleteStd = async(id)=>{
    try {
      let answer = window.prompt('Are you sure? Type "yes" to confirm.');
      if(answer === "yes") {
        
        setStudent(student.filter(val => val._id !== id));
        toast.success('Student Removed Successfully');
      } else {
        return;
      } 
    } catch (error) {
      console.log(error)
      toast.error("something went wrong");
    }
   
  }
  
  return (
    <Layout title={'Dashboard-Students'}>
         <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
        
       <div>
       
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th scope="col">Sl No</th>
        <th scope="col">Name</th>
        <th scope="col">E-mail</th>
        <th scope="col">Department</th>
        <th scope="col">Year of Studying</th>
        <th scope="col">Admission Number</th>
      </tr>
    </thead>
    <tbody>
    {student?.map((c,index)=>(
      <tr key={c._id}>
        <th scope="row">{index+1}</th>
        <td>{c.name}</td>
        <td>{c.email}</td>
        <td>{c.department}</td>
        <td>{c.year_of_study}</td>
        <td>{c.admission_num}</td>
       <td><button className="btn btn-outline-danger" onClick={()=>{deleteStd(c._id)}}>
               Remove
              </button></td>
        
      </tr>
     ))}
    </tbody>
  </table>

  
</div>
 

        </div>
      </div>
  </div>
</Layout>
  )
}


export default Students
