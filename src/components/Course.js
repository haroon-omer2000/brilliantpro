import React, {useEffect, useState} from 'react';
import '../styles/Courses.css';
import { Link } from 'react-router-dom';

const Course = ({id, title, weeks, overview, url, price}) => {

  const [user, setUser] = useState({
    email: null,
    role: null,
    id: null
  });

  const [enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    setUser({
        email: localStorage.getItem('user'),
        role: localStorage.getItem('role'),
        id: localStorage.getItem('user_id')
    });

    fetch(`http://localhost:4000/EnrollmentInfo/${id}/${localStorage.getItem('user_id')}`).then(response => response.json()).then( status => {
      setEnrolled(status['enrollment_info'])
   });


  },[])

  return (
    <div className="col">
      <div className="card h-100 text-center">
        <img src={url} className="courses-img card-img-top" alt='...'/>
        <div className="card-body">
          <h5 className="card-title">{title}</h5>
          <p className="card-text">{overview}</p>
          <p className="card-text"><strong>Completion time: </strong>{weeks} weeks</p>
          <p className="card-text"><strong>Price: </strong>{price}$</p>
        </div>
        <div>       
          {
            (user.role === "admin") ?
              <div className='card-option'>
                <Link className='nav-link' to={"/Courses/" + id} params={{id: id}} >
                  <button className="btn btn-primary" type="submit">Show</button>
                </Link>
                <Link className='nav-link' to={"/Courses/" + id + "/Update"} params={{id: id}} >
                  <button className="btn btn-primary" type="submit">Edit</button>
                </Link>
              </div>
            : (user.role === "student" && !enrolled) ?
                <Link className='nav-link' to={"/Courses/" + id + "/Payment"} state={{price: price, user_id: user.id, course_id: id}} >
                    <button className="btn btn-primary" type="submit">Enroll</button>
                </Link>
            : (user.role === "student" && enrolled) ?
              <Link className='nav-link' to={"/Courses/" + id} params={{id: id}} >
                  <button className="btn btn-primary" type="submit">Go</button>
              </Link>
            :
              false
          }
        </div>
      </div>
    </div>
  )
}

export default Course;