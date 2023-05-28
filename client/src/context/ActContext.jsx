import { useState, useContext, createContext, useEffect } from "react";
import axios from 'axios'
import toast from 'react-hot-toast'
const ActivityContext = createContext();
const ActivityProvider = ({ children }) => {
  const [activity, setActivity] = useState([]);

//get all Activity
const getallActivity = async()=>{
    try {
        const {data} = await axios.get('/api/v1/activity/get-activity')
        setActivity(data.activities)
    } catch (error) {
        console.log(error)
        toast.error('Something Went Wrong')
    }

}

  useEffect(() => {
    getallActivity()
  }, []);

  return (
    <ActivityContext.Provider value={[activity, setActivity]}>
      {children}
    </ActivityContext.Provider>
  );
};

// custom hook
const useActivity = () => useContext(ActivityContext);

export { useActivity, ActivityProvider };