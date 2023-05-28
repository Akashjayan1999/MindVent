import React,{ useEffect, useRef, useState } from 'react'
import Layout from './../../components/Layout/Layout';
import './Messenger.css'
import Conversation from '../../components/Conversation/Conversation';
import Message from '../../components/Message/Message';
import ChatOnline from '../../components/ChatOnline/ChatOnline';
import { useAuth } from '../../context/Auth';
import axios from 'axios'
import { getMessages } from '../../api/MessageRequest';
import {io} from 'socket.io-client'
import toast from 'react-hot-toast'

const Messenger = () => {
    const [conversations, setConversations] = useState([])
    const [auth,setAuth] = useAuth()  
    const [currentChat, setCurrentChat] = useState(null)
    const [messages, setMessages] = useState([])
    const [arrivalMessage, setArrivalMessage] = useState(null)
    const [newMessage, setNewMessage] = useState('')
    const [onlineUsers, setOnlineUsers] = useState([])
    const socket = useRef()
    const scrollRef = useRef()
    const [friends, setFriends] = useState([])
    const [searchResult,setSearchResult] = useState(null)
    const [search, setSearch] = useState('')
 
  
  
    
   
  
      useEffect(() => {
        socket.current=io('ws://localhost:8900')
        socket.current.on('getMessage',(data)=>{
          setArrivalMessage({
            senderId: data.senderId,
            text:data.text,
            createdAt:Date.now()
          })
        })
      }, [])

    useEffect(()=>{
      arrivalMessage &&
      currentChat?.members.includes(arrivalMessage.senderId) &&
      setMessages((prev) => [...prev, arrivalMessage]);
    },[arrivalMessage, currentChat])
    useEffect(() => {
      const getFriends=async()=>{
        const res = await axios.get('/api/v1/user/get-alluserfa')
        setFriends(res.data)
      }
      getFriends()
   },[])
   console.log(friends)
    useEffect(()=>{
       socket.current.emit("addUser",auth.user.u_id)
       socket.current.on("getUsers",(users)=>{
        setOnlineUsers(friends.filter((c) => users.some((u) => u.userId === c._id)).map((c) => c._id));
        console.log(onlineUsers)
        
      })
    },[auth.user.u_id,friends])
         
    //fetch Conversation
    
    
    useEffect(() => {
      
     const getConverstions = async ()=>{
        try {
            const res = await axios.get(`/api/v1/chat/${auth.user.u_id}`)
            setConversations(res.data)
        } catch (error) {
           console.log(error) 
          }
        }
     getConverstions()
    }, [auth.user.u_id,currentChat])
    
    useEffect(() => {
      
      const getMessages = async ()=>{
            try {
              
              const res = await axios.get(`/api/v1/message/${currentChat?._id}`)
              setMessages(res.data) 
              
            }
            catch (error) {
              console.log(error)
            }
    }
    getMessages()
  }, [currentChat])
 
  useEffect(()=>{
    scrollRef.current?.scrollIntoView({behavior:"smooth"})
  },[messages])
  const handleSubmit = async(e)=>{
    e.preventDefault()
    
    const message={
      senderId: auth.user.u_id,  
            text:newMessage,
            chatId:currentChat._id
        }

        const receiverId = currentChat.members.find((member)=>member!==auth.user.u_id)
        console.log(receiverId)
        socket.current.emit("sendMessage",{
          senderId:auth.user.u_id,
          receiverId,
          text: newMessage
        })
      try { 
        const res = await axios.post('/api/v1/message',message)
        setMessages([...messages,res.data])
        setNewMessage("")
      } catch (error) {
        console.log(error)
      }
    }
    
const getSearch = async()=>{
  try {
    const {data}= await axios.get(`/api/v1/user/get-user?search=${search}`)
     if (data.length === 0) {
      toast.error('Nothing Matching')
    } 
      setSearchResult(data)
    
   console.log(searchResult)
  } catch (error) {
    console.log(error)
    toast.error('something went wrong')
  }
} 

const getSearchUserConversation = async(_id)=>{
  try {
    const res =  await axios.get(`/api/v1/chat/find/${auth.user.u_id}/${_id}`)
    setCurrentChat(res.data)
  } catch (error) {
    console.log(error)
    toast.error('something went wrong')
  }
}

    
  return ( 
    <Layout title={"Chat- MindV"}>
    <div className='messenger'>
    <div className="chatMenu">
        <div className='chatMenuWrapper'>
          <div className='d-flex'>

          <input value={search} placeholder='search for all users' className='form-control' onChange={(e)=>setSearch(e.target.value)}/>
          <button className='btn btn-outline-success'  onClick={() => getSearch(search)}>Search</button>
          </div>
          <div className="search-results">
    {searchResult?.map((s) => (
      <div className="search-result" onClick={()=>{getSearchUserConversation(s._id)}} >
        <div className="user-box" >
  <h5  className="name">{s?.name}</h5>
  <p className="email">{s?.email}</p>
</div> 
      </div>
    ))}
    <div className=''>
    
    {searchResult?<button className='btn btn-outline-danger text-right'  onClick={() => setSearchResult(null)}>Close</button>:""}
    </div>
  </div>
        {conversations.map((c)=>(
            <div onClick={async()=>await setCurrentChat(c) }>
              <Conversation conversation={c}  currentUser={auth.user}/>
            </div>

        ))}
        </div>
    </div>
    <div className="chatBox">
        <div className="chatBoxWrapper">
            {
                currentChat?
                <>
                <div className="chatBoxTop">
                    {messages.map(m=>(
                        <div ref={scrollRef}>
                            <Message message={m} own={m.senderId===auth.user.u_id} />
                        </div>
                        ))}
              
            </div>
            <div className="chatBoxBottom">
                <textarea className="chatMessageInput"placeholder="Type a messege" value={newMessage} onChange={(e)=>setNewMessage(e.target.value)}></textarea>
                <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
            </div>
            </>: <span className="noConversationText">Open a connversation to start a chat.</span>
            
        }

        </div>
    </div>
    <div className="chatOnline">
        <div className="chatOnlineWrapper">
            <ChatOnline onlineUsers={onlineUsers} currentId={auth.user.u_id} setCurrentChat={setCurrentChat}/>
           
        </div>
    </div>
    </div>
    </Layout>
  )
}

export default Messenger      