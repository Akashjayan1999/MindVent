import React,{useEffect,useState} from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios'
import toast from 'react-hot-toast'
import {Link} from 'react-router-dom'
const Investors = () => {
  const [investor, setInvestor] = useState([])
  //get all investor
  const getAllInvestors= async()=>{
    try {
      const {data} = await axios.get('/api/v1/user/get-investor')
      setInvestor(data.investors)
    } catch (error) {
      console.log(error)
      toast.error('Something Went Wrong')
    }
  }
  useEffect(() => {
    getAllInvestors()
  }, [])
  //delete
  const deleteInvestor = async(id)=>{
    try {
      let answer =window.prompt('Are you sure? Type "yes" to confirm.')
      if(answer === "yes") {
   
          setInvestor(  investor.filter((val)=>{
          return val._id!=id;
        }))
      
        toast.success('Investor Removed Successfully')
      } else {
        return;
      } 
        
        } catch (error) {
      console.log(error)
      toast.error("something went wrong");
    }
  }
//Update
 
const UpdateInvestor = async(id)=>{
  const newStatus="Approved"
  try {
    await axios.patch(`/api/v1/user/update-investor/${id}`, { status: newStatus });
    setInvestor((prevInvestors) =>
      prevInvestors.map((investor) =>
        investor._id === id ? { ...investor, status: newStatus } : investor
      )
    );
    toast.success("Investor  updated successfully");
  } catch (error) {
    console.log(error);
    toast.error("Something went wrong");
  }
}
  return (
    <Layout title={'Dashboard-Investor'}>
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
             <th scope="col">Nationality</th>
             <th scope="col">Phone Number</th>
             <th scope="col">Status</th>
           </tr>
         </thead>
         <tbody>
         {investor?.filter(c=>c.status=='Approved').map((c,index)=>(
         (
           <tr key={c._id}>
             <th scope="row">{index+1}</th>
             <td>{c.name}</td>
             <td>{c.email}</td>
             <td>{c.nationality}</td>
             <td>{c.phoneNum}</td>
             <td>{c.status}</td>
             <td>
            <button className="btn btn-outline-danger" onClick={()=>{deleteInvestor(c._id)}}>
                    Remove
                   </button></td>
           
             
           </tr>
           )
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
             <th scope="col">Nationality</th>
             <th scope="col">Phone Number</th>
             <th scope="col">Status</th>
           </tr>
         </thead>
         <tbody>
         {investor?.filter(c=>c.status!=='Approved').map((c,index)=>(
           <tr key={c._id}>
             <th scope="row">{index+1}</th>
             <td>{c.name}</td>
             <td>{c.email}</td>
             <td>{c.nationality}</td>
             <td>{c.phoneNum}</td>
             <td>{c.status}</td>
             <td><button className="btn btn-outline-success" onClick={()=>{UpdateInvestor(c._id)}} >
                    Approve
                   </button>
            <button className="btn btn-outline-danger m-2" onClick={()=>{deleteInvestor(c._id)}}>
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

export default Investors
