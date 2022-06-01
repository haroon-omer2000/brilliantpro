import React, {useState,useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

const EnrolledUsers = () => {

  const location = useLocation();
  const navigate = useNavigate();

  const course_id = location.state?.id;

  const [students, setStudents] = useState([]);
  const [user, setUser] = useState({
    email: null,
    role: null,
    id: null
  });

  useEffect(() => {
    setUser({
        email: localStorage.getItem('user'),
        role: localStorage.getItem('role'),
        id: localStorage.getItem('user_id')
    });
 
    fetch(`http://localhost:4000/courses/${course_id}/EnrolledUsers`).then(response => response.json()).then( status => {
       setStudents(status['enrolled_users']);
    });
  },[])

  const unenroll = async (user_id) => {
      alert("Are you sure?");

      const enroll_info = {
        user_id,
        course_id
      };

      fetch('http://localhost:4000/Unenroll',{
        method: "DELETE",
        headers: {
            "Content-Type":"application/json"
        },
        body: JSON.stringify(enroll_info)
      }).then(response => response.json()).then(status => {
          navigate(0);
      });
  }

  return (
    <div>
        <h1 className='page-header'>Enrolled Users ({students.length})</h1>
        <table className="table table-hover">
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">Email</th>
                    <th scope="col">Enrollment Date</th>
                    <th scope="col">Handle</th>
                </tr>
            </thead>
            <tbody>
                {
                    (students.length != 0) ?
                        (students.map((student, i) => {
                            return (
                                <tr key={i}>
                                    <th scope="row">{i+1}</th>
                                    <td>{student.email}</td>
                                    <td>{student.enrollment_date}</td>
                                    <td><button className='btn btn-danger' onClick={ () => unenroll(student.id)}>Unenroll</button></td>
                                </tr>
                            )
                        }))
                    : 
                    <tr>
                        <th scope="row">-</th>
                        <td>-</td>
                        <td>-</td>
                        <td><button className='btn btn-danger' disabled>Unenroll</button></td>
                    </tr>
                }    
            </tbody>
        </table>
    </div>
  )
}

export default EnrolledUsers;