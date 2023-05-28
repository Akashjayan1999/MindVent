import axios from 'axios';

export const getMessages =async(id)=> await axios.get(`/api/v1/message/${id}`)