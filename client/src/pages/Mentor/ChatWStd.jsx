import React from 'react'
import MentorMenu from './../../components/Layout/MentorMenu';
import Layout from './../../components/Layout/Layout';

const ChatWStd = () => {
  return (
    <Layout title={'Dashboard-Chat-with-Std'}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <MentorMenu/>
        </div>
        <div className='col-md-9'>
        <h1>Chat With Student</h1>
        </div>
  </div>
  </div>
</Layout>
  )
}

export default ChatWStd
