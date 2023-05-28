

import {Routes,Route} from 'react-router-dom'
import About from './pages/About';
import Contact from './pages/Contact';
import Home from './pages/Home';
import Pagenotfound from './pages/Pagenotfound';
import Reg1 from './pages/Auth/Reg1';
import FacultyReg from './pages/Auth/FacultyReg';
import StdReg from './pages/Auth/StdReg';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from './pages/Auth/Login';
import StdLogin from './pages/Auth/StdLogin';
import FacultyLogin from './pages/Auth/FacultyLogin';
import InvestorReg from './pages/Auth/InvestorReg';
import InvestorLogin from './pages/Auth/InvestorLogin';
import StdDashboard from './pages/student/StdDashboard';
import PrivateRoute from './components/Routes/Private';
import AdminRoute from './components/Routes/AdminRoute';
import MentorRoute from './components/Routes/MentorRoute';
import InvestorRoute from './components/Routes/InvestorRoute';
import AdminDashboard from './pages/Admin/AdminDashboard';
import MentorDashboard from './pages/Mentor/MentorDashboard';
import InvestorDashborard from './pages/Investor/InvestorDashborard';
import AddEvent from './pages/Admin/AddEvent';
import Idea from './pages/Admin/Idea';
import Activity from './pages/Admin/Activity';
import Students from './pages/Admin/Students';
import Mentors from './pages/Admin/Mentors';
import Investors from './pages/Admin/Investors';
import Feedback from './pages/Admin/Feedback';
import Chat from './pages/Admin/Chat';
import AddIdea from './pages/student/AddIdea';
import AddActivity from './pages/student/AddActivity';
import MyIdea from './pages/student/MyIdea';
import MyActivity from './pages/student/MyActivity';
import FeedbackStd from './pages/student/FeedbackStd';

import ChatStd from './pages/student/ChatStd';
import MentorIdea from './pages/Mentor/MentorIdea';
import MentorActivity from './pages/Mentor/MentorActivity';
import ChatWStd from './pages/Mentor/ChatWStd';
import MentorFeedback from './pages/Mentor/MentorFeedback';
import ChatWAI from './pages/Mentor/ChatWAI';
import InvestorIdea from './pages/Investor/InvestorIdea';
import InvestorFeedback from './pages/Investor/InvestorFeedback';
import ChatWAM from './pages/Investor/ChatWAM';
import AdminEvents from './pages/Admin/AdminEvents';
import UpdateEvent from './pages/Admin/UpdateEvent';
import EventDetails from './pages/EventDetails';
import AllActivity from './pages/student/AllActivity';
import ActivityDetails from './pages/student/ActivityDetails';
import UpdateActivity from './pages/student/UpdateActivity';
import AdminActivityDetails from './pages/Admin/AdminActivityDetails';
import MentorActivityDetails from './pages/Mentor/MentorActivityDetails';
import StudentIdeaDetails from './pages/student/StudentIdeaDetails';
import Updateidea from './pages/student/Updateidea'
import AdminIdeaDetails from './pages/Admin/AdminIdeaDetails';
import MentorIdeaDetails from './pages/Mentor/MentorIdeaDetails';
import InvestorIdeaDeatils from './pages/Investor/InvestorIdeaDeatils';
import Messenger from './pages/Messenger/Messenger'
function App() {
  return ( 
    <>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/dashboard" element={<PrivateRoute/>}>
      <Route path="student" element={<StdDashboard/>}/>
      <Route path="student/add-idea" element={<AddIdea/>}/>
      <Route path="student/add-activity" element={<AddActivity/>}/>
      <Route path="student/idea" element={<MyIdea/>}/>
      <Route path="student/allactivity" element={<AllActivity/>}/>
      <Route path="student/activity" element={<MyActivity/>}/>
      <Route path="student/feedbacks" element={<FeedbackStd/>}/>
      <Route path="student/activitydetails/:slug" element={<ActivityDetails/>}/>
      <Route path="student/updateactivity/:slug" element={<UpdateActivity/>}/>
      <Route path='student/ideadetails/:pid' element={<StudentIdeaDetails/>}/> 
      <Route path='student/updateidea/:pid' element={<Updateidea/>}/>

      <Route path="student/Chat" element={<Messenger reload={true}/>}/>
      </Route>
      <Route path="/dashboard" element={<AdminRoute/>}>
      <Route path="admin" element={<AdminDashboard/>}/>
      <Route path="admin/add-event" element={<AddEvent/>}/>
      <Route path="admin/event/:slug" element={<UpdateEvent/>}/>
      <Route path="admin/adminideadetails/:pid" element={<AdminIdeaDetails/>}/>

      <Route path="admin/events" element={<AdminEvents/>}/>
      <Route path="admin/ideas" element={<Idea/>}/>
      <Route path="admin/activity" element={<Activity/>}/>
      <Route path="admin/activitydetails/:slug" element={<AdminActivityDetails/>}/>
      <Route path="admin/students" element={<Students/>}/>
      <Route path="admin/mentors" element={<Mentors/>}/> 
      <Route path="admin/investors" element={<Investors/>}/>
      <Route path="admin/feedbacks" element={<Feedback/>}/>
      <Route path="admin/chat" element={<Messenger reload={true}/>}/>
      </Route> 
      <Route path="/dashboard" element={<MentorRoute/>}> 
      <Route path="mentor" element={<MentorDashboard/>}/>
      <Route path="mentor/idea" element={<MentorIdea/>}/>
      <Route path="mentor/activity" element={<MentorActivity/>}/>
      <Route path="mentor/activitydetails/:slug" element={<MentorActivityDetails/>}/>
      <Route path="mentor/chatwstd" element={<Messenger reload={true}/>}/>
      <Route path="mentor/mentorideadetails/:pid" element={<MentorIdeaDetails/>}/>
      <Route path="mentor/chatwai" element={<Messenger reload={true}/>}/>
      <Route path="mentor/feedbacks" element={<MentorFeedback/>}/>
      </Route>
      <Route path="/dashboard" element={<InvestorRoute/>}>
      <Route path="investor" element={<InvestorDashborard/>}/>
      <Route path="investor/idea" element={<InvestorIdea/>}/>
      <Route path="investor/chatwam" element={<Messenger reload={true}/>}/>
      <Route path="investor/feedbacks" element={<InvestorFeedback/>}/>
      <Route path="investor/investorideadetails/:pid" element={<InvestorIdeaDeatils/>}/>

      </Route>
      <Route path='/register' element={<Reg1/>}/>
      <Route path='/register/facultyregister' element={<FacultyReg/>}/>
      <Route path='/register/investorregistor' element={<InvestorReg/>}/>
      <Route path='/register/stdregister' element={<StdReg/>}/>
      
      <Route path ='/login/stdlogin' element={<StdLogin/>}/>
      <Route path ='/login/facultylogin' element={<FacultyLogin/>}/>
      <Route path ='/login/investorlogin' element={<InvestorLogin/>}/>
      <Route path='/login' element={<Login/>} />
      <Route path='/about' element={<About/>}/>
      <Route path='/contact' element={<Contact/>}/>
      <Route path='/eventdetails/:slug' element={<EventDetails/>}/>
      
      <Route path='*' element={<Pagenotfound/>}/> 

    </Routes>
    
 
    
    
    </>
  );
}

export default App;
