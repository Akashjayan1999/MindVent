import React from 'react'
import StudentMenu from './../../components/Layout/StudentMenu';
import Layout from './../../components/Layout/Layout';

const ChatStd = () => {
  return (
    <Layout title={'Dashboard-Chat'}>
    <div className="container-fluid m-3 p-3 dashboard">
    <div className='row'>
        <div className='col-md-3'>
            <StudentMenu/>
        </div>
        <div className='col-md-9'>
        <h1>Chat</h1>
        </div>
  </div>
  </div>
</Layout>
  )
}

export default ChatStd
