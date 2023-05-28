import React from 'react'
import AdminMenu from './../../components/Layout/AdminMenu';
import Layout from './../../components/Layout/Layout';

const Chat = () => {
  return (
    <Layout title={'Dashboard-Chat'}>
         <div className="container-fluid m-3 p-3 dashboard">
        <div className='row'>
            <div className='col-md-3'>
                <AdminMenu/>
            </div>
            <div className='col-md-9'>
            <h1>chat</h1>
            </div>
         </div>
      </div>
    </Layout>
  )
}

export default Chat
