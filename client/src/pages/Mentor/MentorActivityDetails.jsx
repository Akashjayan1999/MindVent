import React, { useState, useEffect } from 'react'
import Layout from './../../components/Layout/Layout';
import MentorMenu from './../../components/Layout/MentorMenu';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useNavigate, useParams } from 'react-router-dom';
const MentorActivityDetails = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('');
    const [ctime, setCTime] = useState('');
    const [yos, setYos] = useState('');
    const [photo, setPhoto] = useState('');
    const [department, setDepartment] = useState('');
    const [id, setId] = useState('');
    const [sName, setSName] = useState('');
  
    const params = useParams();
  
    const getSingleActivity = async () => {
      try {
        const { data } = await axios.get(`/api/v1/activity/get-activity/${params.slug}`);
        console.log(data.activity);
        setTitle(data.activity.title);
        setDescription(data.activity.description);
        setId(data.activity._id);
        setSName(data.activity.student_id.name);
        setCTime(data.activity.createdAt);
        setCategory(data.activity.category);
        setYos(data.activity.student_id.year_of_study);
        setDepartment(data.activity.student_id.department);
      } catch (error) {
        console.log(error);
      }
    };
  
    useEffect(() => {
      getSingleActivity();
    }, []);
  return (
    <Layout title={'Dashboard-feedback'}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <MentorMenu/>
        </div>
        <div className='col-md-9'>
        <div className="card border-0 shadow-sm">
              <div className="card-body">
                <img
                  src={`/api/v1/activity/activity-photo/${id}`}
                  className="card-img-top mb-4 h-100"
                  alt="Activity Photo"
                />
                <h5 className="card-title mb-3 text-center">{title}</h5>
                <h5 className="card-title mb-3">{sName}</h5>
                <h5 className="card-title mb-3">Department: {department}</h5>
                <h5 className="card-title mb-3">Year of Studying: {yos} Year</h5>
                <p className="card-text mb-2">{description}</p><br></br>
                <ul className="list-unstyled mb-4">
                  <li className=" mb-1">
                    <i className="far fa-calendar-alt mr-2"></i>
                    Category: {category}
                  </li>
                </ul>
                <p className="card-text mb-0">
                  <small className="text-muted">
                    Created At: {ctime}
                  </small>
                </p>
              </div>
            </div>
        </div>
  </div>
  </div>
</Layout>
  )
}

export default MentorActivityDetails
