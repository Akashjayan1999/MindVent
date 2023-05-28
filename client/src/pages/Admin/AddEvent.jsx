import React,{useState,useEffect} from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';
import axios from 'axios'
import toast from 'react-hot-toast'
import { Select ,TimePicker } from "antd";
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

import Title from 'antd/es/typography/Title';
import {useNavigate} from 'react-router-dom'
import moment from 'moment';

const AddEvent = () => {
 
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [date, setDate] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [time, setTime] = useState('')
  const [location, setLocation] = useState('')
  const [photo, setPhoto] = useState('')
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const navigate = useNavigate()
  const handleDateChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  const formattedDate = startDate && endDate
    ? `${moment(startDate).format('ddd, DD MMM YYYY')} - ${moment(endDate).format('ddd, DD MMM YYYY')}`
    : 'Select date range from following Calender';

  const handleCreate = async(e)=>{
      e.preventDefault()
      try {

       
        const ProductData =new FormData()
        ProductData.append('title',title)
        ProductData.append('description',description)
        ProductData.append('date',formattedDate)
        ProductData.append('time',time)
        ProductData.append('location',location)
        ProductData.append('photo',photo)
         const {data} =await axios.post('/api/v1/event/add-events',ProductData)
         if(data?.success){
          toast.success('Event Added')
          
          navigate('/dashboard/admin/events')
          
         }else{
      
          toast.error(data?.message)
         }
      } catch (error) {
        console.log(error)
        toast.error('something went wrong')
      }
  }

  return (
    <Layout title={'Dashboard-AddEvents'}>
      <div className="container-fluid m-3 p-3 dashboard">
       <div className='row'>
        <div className='col-md-3'>
            <AdminMenu/>
        </div>
        <div className='col-md-9'>
        <h1 className=''>Add Event</h1>
        <div className="m-1 w-75 ">
          
        <div className="mb-3">
                <label className="btn btn-outline-secondary col-md-12" required>
                  {photo ? photo.name : "Upload Photo size upto 2 mb"}
                  <input
                    type="file"
                    name="photo"
                    accept="image/*"
                    onChange={(e) => setPhoto(e.target.files[0])}
                    hidden
                    required
                    style={{'--placeholder-color': 'gray'}}
                  />
                </label>
              </div>
              <div className="mb-3">
                {photo && (
                  <div className="text-center">
                    <img
                      src={URL.createObjectURL(photo)}
                      alt="product_photo"
                      height={"200px"}
                      className="img img-responsive"
                    />
                  </div>
                )}
              </div>
              <div className="mb-3">
                <input
  type="text"
  value={title} 
  placeholder="Add title"
  className="form-control"
  onChange={(e) => setTitle(e.target.value)}
  required  // add this attribute
/>
              </div>
             
              
              <div className="mb-3">
                <textarea
                  type="text"
                  value={description}
                  placeholder="write a description"
                  className="form-control"

                  onChange={(e) => setDescription(e.target.value)}
                  required
                />
              </div>
              <div className="mb-3  align-items-center">
             

<DatePicker
  selected={startDate}
  onChange={handleDateChange}
  startDate={startDate}
  className=" form-control"
  placeholder="write a description"
  endDate={endDate}
  selectsRange
  value={formattedDate}
  style={{ display: showDatePicker ? 'block' : 'none',color: formattedDate === 'Select date range from following Calender' ? 'gray' : 'black' }}
  onBlur={() => setShowDatePicker(false)}
/>
</div>
              
              <div className="mb-3">
  <TimePicker
    value={time ? moment(time, "h:mm a") : null}
    format="h:mm a"
    placeholder="Add time"
    className="form-control"
    onChange={(value) => setTime(value ? value.format("h:mm a") : "")}
    style={{'--placeholder-color': 'gray'}}
  />
</div>
              
              <div className="mb-3">
                <input
                  type="text"
                  value={location}
                  placeholder="Add location"
                  className="form-control"
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <div className="mb-3">
                <button className="btn btn-outline-dark" onClick={handleCreate}>
                  Create Event
                </button>
              </div>
              </div>
              </div>
              </div>
  </div>
</Layout>

  )
}

export default AddEvent
