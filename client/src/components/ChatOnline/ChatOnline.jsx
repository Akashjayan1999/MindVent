
import React,{useEffect,useState} from 'react'
import './ChatOnline.css'
import axios from 'axios'
const ChatOnline = ({onlineUsers,currentId,setCurrentChat}) => {
 const [friends, setFriends] = useState([])
 const [onlineFriends, setOnlineFriends] = useState([])
  
 useEffect(() => {
    const getFriends=async()=>{
      const res = await axios.get('/api/v1/user/get-alluserfa')
      setFriends(res.data)
    }
    getFriends()
 }, [])
const handleClick = async(user)=>{
  try {
    const res =  await axios.get(`/api/v1/chat/find/${currentId}/${user._id}`)
    setCurrentChat(res.data)
  } catch (error) {
    console.log(error)
  }
}

 useEffect(() => {
    setOnlineFriends(friends.filter((f)=>onlineUsers.includes(f._id)))
    
 }, [friends,onlineUsers])
 
  return (
    <div className='chatOnline' > 
    {onlineFriends?.filter(o=>o._id!==currentId).map((o)=>(

      <div className="chatOnlineFriend" onClick={()=>{handleClick(o)}}>
            <div className="chatOnlineImgContainer">
                <img className="chatOnlineImg"src={o?.pic} alt=''/>
                <div className="chatOnlineBadge"></div>
            </div>
            <span className="chatOnlineName">{o.name}</span>
        </div>
          ))} 
    </div>
  )
}

export default ChatOnline