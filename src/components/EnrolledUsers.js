import React, {useState,useEffect} from 'react';
import { useLocation } from 'react-router-dom';

const EnrolledUsers = () => {

  const location = useLocation();

  const course_id = location.state?.id;

  const [students, setStudents] = useState([]);
 
  useEffect(() => {
    fetch(`http://localhost:4000/courses/${course_id}/EnrolledUsers`).then(response => response.json()).then( status => {
       setStudents(status['enrolled_users']);
       console.log(status['enrolled_users'])
    });
  },[])

  return (
    <table className="table">
        <thead>
            <tr>
                <th scope="col">#{students.length}</th>
                <th scope="col">Email</th>
                <th scope="col">Enrollment Date</th>
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
                            </tr>
                        )
                    }))
                : 
                <tr>
                    <th scope="row">-</th>
                    <td>-</td>
                    <td>-</td>
                </tr>
            }    
        </tbody>
    </table>
  )
}

export default EnrolledUsers;