import React, {useEffect} from 'react';
import AdminDashboard from './AdminDashboard';
import Notice from './Notice';
import StudentDashboard from './StudentDashboard';

const Home = ({user, setUser}) => {

  useEffect(() => {
    setUser({
        email: localStorage.getItem('user'),
        role: localStorage.getItem('role')
    });
  },[])

  return (
    <div>
        {
            (user.role === "admin") ?
                <AdminDashboard />
            :
            (
            (user.role === "student") ?
                <StudentDashboard />
                : 
                <Notice notice = {"You need to login before accessing any resource"} style_notice = {"alert alert-info"}/>
            )
        }
    </div>
  )
}

export default Home;