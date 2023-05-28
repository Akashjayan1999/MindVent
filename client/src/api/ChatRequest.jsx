import axios from 'axios';

export const userChats =async(userId)=> await axios.get(`/api/v1/chat/${userId}`)