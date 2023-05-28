import React from 'react'
import InvestorMenu from './../../components/Layout/InvestorMenu';
import Layout from './../../components/Layout/Layout';

const ChatWAM = () => {
  return (
    <Layout title={'Dashboard-Chat'}>
         <div className="container-fluid m-3 p-3 dashboard">
        <div className='row'>
            <div className='col-md-3'>
                <InvestorMenu/>
            </div>
            <div className='col-md-9'>
            <h1>Chat</h1>
            </div>
            </div>
      </div>
    </Layout>
  )
}

export default ChatWAM
