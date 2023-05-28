import { useState, useContext, createContext, useEffect } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'


const IdeaContext = createContext();
const IdeaProvider =({children})=>{
    const [idea, setIdea] = useState([]);
    //get Idea

    const getallIdea = async()=>{
        try {
            const {data} = await axios.get('/api/v1/idea/get-idea')
            setIdea(data.ideas)
        } catch (error) {
            console.log(error)
            toast.error('Something Went Wrong')
        }
    }
    useEffect(()=>{
        getallIdea()
    },[]);
    return(
        <IdeaContext.Provider value={[idea,setIdea]}>
            {children}
        </IdeaContext.Provider>
    )
    
    }

//custom hook
const useIdea =()=>useContext(IdeaContext);
export   {useIdea,IdeaProvider}