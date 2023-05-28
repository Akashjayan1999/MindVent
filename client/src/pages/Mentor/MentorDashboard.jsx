import React from 'react'
import Layout from './../../components/Layout/Layout';
import MentorMenu from './../../components/Layout/MentorMenu';
import { useAuth } from '../../context/Auth';

const MentorDashboard = () => {
  const [auth] = useAuth();
  return (
    <Layout title={'Dashboard'}>
    <div className="container-fluid m-3 p-3 dashboard">
      <div className="row">
        <div className="col-md-3">
          <MentorMenu />
        </div>
        <div className="col-md-9">
        <div className="card w-75 p-3">
        <img style={{ width: '92px',
                            height: '92px',
                            borderRadius: '50%',
                            objectFit: 'cover',
                            marginRight: '20px' }} className='conversationImg' src={auth?.user?.pic} alt='Faculty photo'/>
              <h3>  Name : {auth?.user?.name}</h3>
              <h3>  Email : {auth?.user?.email}</h3>
              <h3>  Contact : {auth?.user?.phoneNum}</h3>
            </div>
        </div>
      </div>
    </div>
  </Layout>
  )
}

export default MentorDashboard
