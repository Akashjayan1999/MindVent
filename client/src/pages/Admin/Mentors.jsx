import React,{useEffect,useState} from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'
const Mentors = () => {
  const [mentor, setMentor] = useState([])
  //get all Mentors
  const getAllMentors= async()=>{
    try {
      const {data} = await axios.get('/api/v1/user/get-mentor')
      setMentor(data.mentors)
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }
  useEffect(() => {
    getAllMentors()
  }, [])

  const deleteMentor = async(id)=>{
    try {
      let answer =window.prompt('Are you sure? Type "yes" to confirm.')
      if(answer === "yes") {
      
        setMentor(  mentor.filter((val)=>{
          return val._id!=id;
        }))
     
        toast.success('Mentor Removed Successfully')
      } else {
        return;
      } 
        
        
     
      
    } catch (error) {
      console.log(error)
      toast.error("something went wrong");
    }
  }
  //update Mentor
  const UpdateMentor = async(id)=>{
    const newStatus="Approved"
    try {
      await axios.patch(`/api/v1/user/update-mentor/${id}`, { status: newStatus });
      setMentor((prevMentors) =>
      prevMentors.map((mentor) =>
      mentor._id === id ? { ...mentor, status: newStatus } : mentor
        )
      );
      toast.success("Mentor  updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  }
  return (
    <Layout title={'Dashboard-Mentors'}>
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
        <th scope="col">Category</th>
        <th scope="col">Description</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
    {mentor?.filter(c => c.status === 'Approved'&c.name!=='Admin').map((c,index)=>(
          <tr key={c._id}>
            <th scope="row">{index + 1}</th>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.category}</td>
            <td className="fixed-width">{c.description}</td>
            <td>{c.phoneNum}</td>
            <td>{c.status}</td>
            <td>
              <button 
                className="btn btn-outline-danger"
                onClick={() => {
                  deleteMentor(c._id);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        
      ))}
    </tbody>
  </table>
</div>

<div>
  <table className="table">
    <thead className="thead-dark">
      <tr>
        <th scope="col">Sl No</th>
        <th scope="col">Name</th>
        <th scope="col">E-mail</th>
        <th scope="col">Category</th>
        <th scope="col">Description</th>
        <th scope="col">Phone Number</th>
        <th scope="col">Status</th>
      </tr>
    </thead>
    <tbody>
    {mentor?.filter(c => c.status !== 'Approved').map((c,index)=> (
          <tr key={c._id}>
            <th scope="row">{index + 1}</th>
            <td>{c.name}</td>
            <td>{c.email}</td>
            <td>{c.category}</td>
            <td className="fixed-width">{c.description}</td>
            <td>{c.phoneNum}</td>
            <td>{c.status}</td>
            <td>
              <button
                className="btn btn-outline-success "
                onClick={() => {
                  UpdateMentor(c._id);
                }}
              >
                Approve
              </button>
              <button
                className="btn btn-outline-danger m-2"
                onClick={() => {
                  deleteMentor(c._id);
                }}
              >
                Remove
              </button>
            </td>
          </tr>
        ) 
      )}
    </tbody>
  </table>
</div>
     
            </div>
    </div>
      </div>
    </Layout>
  )
}

export default Mentors
