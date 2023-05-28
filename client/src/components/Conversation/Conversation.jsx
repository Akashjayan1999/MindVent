import React, { useState } from 'react'
import "./Conversation.css"
import axios from 'axios'
import { useEffect } from 'react'
const Conversation = ({conversation, currentUser}) => {
   const [user, setUser] = useState(null) 
   

   useEffect(() => {
    
     const friendId = conversation?.members?.find((m)=>m!==currentUser.u_id)
 
     const getUser = async ()=>{
        try {
            const res = await axios.get(`/api/v1/user/get-userfa/${friendId}`)
            setUser(res.data)
            
        } catch (error) {
            console.log(error)
        }
     }
     getUser()
   }, [currentUser,conversation])
   
  return (
    <div className='conversation'>
        <img className='conversationImg' src={user?.pic} alt=''/>
        <span className='conversationName'>{user?.name}</span>
    </div>
  )
}

export default Conversation