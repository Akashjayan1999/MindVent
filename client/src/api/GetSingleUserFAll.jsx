import axios from 'axios'

export const getUser= async(pid)=> await axios.get(`/api/v1/user/get-userfa/${pid}`)