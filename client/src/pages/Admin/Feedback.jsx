import React, { useEffect, useState } from 'react';
import Layout from './../../components/Layout/Layout';
import AdminMenu from './../../components/Layout/AdminMenu';
import axios from 'axios';
import toast from 'react-hot-toast';

const Feedback = () => {
  const [feedback, setFeedback] = useState([]);

  // get all Feedback
  const getFeedbacks = async () => {
    try {
      const { data } = await axios.get('/api/v1/user/get-feedback');
      setFeedback(data.feedbackMessage);
      console.log(feedback)
      console.log(data.feedbackMessage);
    } catch (error) {
      console.log(error);
      toast.error('Something Went Wrong');
    }
  };

  useEffect(() => {
    getFeedbacks();
  }, []);

  return (
    <Layout title={'Dashboard-Feedback'}>
      <div className="container-fluid m-3 p-3 dashboard">
        <div className='row'>
          <div className='col-md-3'>
            <AdminMenu />
          </div>
          <div className='col-md-9'>
            <h1 className='text-center'>Student Feedback</h1>
            <div>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Admission Number</th>
                    <th scope="col">Year</th>
                    <th scope="col">Department</th>
                    <th scope="col">Feedback</th>
                  </tr>
                </thead>
                <tbody>
    {feedback?.filter(c => c.student_id!=null).map((c,index)=>(
          <tr key={c._id}>
            <th scope="row">{index + 1}</th>
            <td>{c.student_id.name}</td>
            <td>{c.student_id.email}</td>
            <td>{c.student_id.admission_num}</td>
            <td className="fixed-width">{c.student_id.year_of_study}</td>
            <td>{c.student_id.department}</td>
            <td>{c.feedback}</td>
           
          </tr>
        
      ))}
    </tbody>
              </table>
            </div>
            <h1 className='text-center pt-3'>Investor Feedback</h1>
            <div>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Nationality</th>
                    <th scope="col">Phone Number</th>
      
                    <th scope="col">Feedback</th>
                  </tr>
                </thead>
                <tbody>
    {feedback?.filter(c => c.investor_id!=null).map((c,index)=>(
          <tr key={c._id}>
            <th scope="row">{index + 1}</th>
            <td>{c.investor_id.name}</td>
            <td>{c.investor_id.email}</td>
            <td>{c.investor_id.nationality}</td>
            <td >{c.investor_id.phoneNum}</td>
            <td className="fixed-width">{c.feedback}</td>
           
          </tr>
        
      ))}
    </tbody>
              </table>
            </div>
            <h1 className='text-center pt-3'>Faculty Feedback</h1>
            <div>
              <table className="table">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Sl No</th>
                    <th scope="col">Name</th>
                    <th scope="col">E-mail</th>
                    <th scope="col">Category</th>
                    <th scope="col">Phone Number</th>
      
                    <th scope="col">Feedback</th>
                  </tr>
                </thead>
                <tbody>
    {feedback?.filter(c => c.mentor_id!=null).map((c,index)=>(
          <tr key={c._id}>
            <th scope="row">{index + 1}</th>
            <td>{c.mentor_id.name}</td>
            <td>{c.mentor_id.email}</td>
            <td>{c.mentor_id.category}</td>
            <td >{c.mentor_id.phoneNum}</td>
            <td className="fixed-width">{c.feedback}</td>
           
          </tr>
        
      ))}
    </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Feedback;
